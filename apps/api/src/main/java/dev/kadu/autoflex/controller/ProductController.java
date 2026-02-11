package dev.kadu.autoflex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kadu.autoflex.dto.common.ApiResult;
import dev.kadu.autoflex.dto.product.ProductRequest;
import dev.kadu.autoflex.dto.product.ProductResponse;
import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.service.ProductService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.PutMapping;
import jakarta.validation.Valid;

@RestController
@RequestMapping("products")
@Tag(name = "Products", description = "Gerenciamento de produtos")
public class ProductController {
  private final ProductService productService;

  public ProductController(ProductService productService) {
    this.productService = productService;
  }

  @GetMapping()
  @Operation(summary = "Listar todos os produtos", description = "Retorna uma lista com todos os produtos cadastrados")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Lista de produtos retornada com sucesso")
  })
  public ResponseEntity<ApiResult<List<ProductResponse>>> getAll() {
    return ResponseEntity.ok(new ApiResult<>("OK", productService.getAllWithRawMaterials()));
  }

  @GetMapping("{id}")
  @Operation(summary = "Buscar produto por ID", description = "Retorna um produto específico pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public ResponseEntity<ApiResult<Product>> getById(@Parameter(description = "ID do produto") @PathVariable Long id) {
    return ResponseEntity.ok(new ApiResult<>("OK", this.productService.getById(id)));
  }

  @PostMapping()
  @Operation(summary = "Criar novo produto", description = "Cria um novo produto no sistema")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Produto criado com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos")
  })
  public ResponseEntity<ApiResult<Product>> create(
      @Parameter(description = "Dados do produto a ser criado") @Valid @RequestBody ProductRequest request) {
    Product created = this.productService.create(new Product(request.code(), request.name(), request.price()));
    return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResult<>("Criado com sucesso", created));
  }

  @PutMapping("{id}")
  @Operation(summary = "Atualizar produto existente", description = "Atualiza os dados de um produto existente pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public ResponseEntity<ApiResult<Product>> update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
    Product updated = this.productService.update(id, new Product(request.code(), request.name(), request.price()));
    return ResponseEntity.ok(new ApiResult<>("Atualizado com sucesso", updated));
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Excluir produto", description = "Exclui um produto existente pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Produto excluído com sucesso"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public ResponseEntity<Void> delete(@Parameter(description = "ID do produto a ser excluído") @PathVariable Long id) {
    this.productService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
