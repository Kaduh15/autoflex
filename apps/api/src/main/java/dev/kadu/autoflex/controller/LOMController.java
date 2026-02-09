package dev.kadu.autoflex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kadu.autoflex.dto.common.ApiResult;
import dev.kadu.autoflex.dto.lom.LomItemRequest;
import dev.kadu.autoflex.dto.lom.LomMaterialItemResponse;
import dev.kadu.autoflex.dto.lom.LomResponse;
import dev.kadu.autoflex.dto.rawmaterial.RawMaterialResponse;
import dev.kadu.autoflex.model.LOM;
import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.service.LOMService;
import dev.kadu.autoflex.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import org.springframework.web.bind.annotation.RequestBody;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping()
@Tag(name = "LOMs", description = "Gerenciamento de LOMs (Lista de Materiais)")
public class LOMController {

  private final ProductService productService;
  private final LOMService lomService;

  public LOMController(ProductService productService, LOMService lomService) {
    this.productService = productService;
    this.lomService = lomService;
  }

  @GetMapping("products/{id}/lom")
  @Operation(summary = "Obter LOM de um produto", description = "Retorna a Lista de Materiais (LOM) associada a um produto específico pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "LOM do produto retornada com sucesso"),
      @ApiResponse(responseCode = "404", description = "Produto ou LOM não encontrado")
  })
  public ResponseEntity<ApiResult<LomResponse>> getLOMByProductId(
      @Parameter(description = "ID do produto") @PathVariable Long id) {
    Product product = this.productService.getById(id);
    List<LomMaterialItemResponse> materials = this.lomService.getLOMByProduct(product.getId()).stream()
        .map(lom -> {
          var raw = lom.getRawMaterial();
          return new LomMaterialItemResponse(
              new RawMaterialResponse(raw.getId(), raw.getCode(), raw.getName(), raw.getStockQuantity()),
              lom.getQuantityRequired());
        })
        .toList();
    return ResponseEntity.ok(new ApiResult<>("OK", new LomResponse(product, materials)));
  }

  @PostMapping("products/{id}/lom/items")
  @Operation(summary = "Adicionar itens na LOM de um produto", description = "Adiciona itens à Lista de Materiais (LOM) de um produto específico pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Itens adicionados à LOM do produto com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public ResponseEntity<ApiResult<List<LOM>>> addItemsInProduct(
      @PathVariable Long id,
      @Valid @RequestBody List<LomItemRequest> entity) {
    List<LOM> lomList = this.lomService.addItemsInProduct(id, entity);
    return ResponseEntity.ok(new ApiResult<>("OK", lomList));
  }

  @DeleteMapping("products/{id}/lom/items/{rawMaterialId}")
  @Operation(summary = "Excluir item da LOM de um produto", description = "Exclui um item específico da Lista de Materiais (LOM) de um produto pelo ID do produto e ID da matéria-prima")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Item excluído da LOM do produto com sucesso"),
      @ApiResponse(responseCode = "404", description = "Produto ou item da LOM não encontrado")
  })
  public ResponseEntity<Void> deleteItemsInProduct(@PathVariable Long id, @PathVariable Long rawMaterialId) {
    this.lomService.deleteLOMByProductId(id, rawMaterialId);
    return ResponseEntity.noContent().build();
  }
}
