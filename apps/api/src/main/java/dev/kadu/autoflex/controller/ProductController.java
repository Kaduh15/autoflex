package dev.kadu.autoflex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.service.ProductService;

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
  public List<Product> getAll() {
    return productService.getAll();
  }

  @GetMapping("{id}")
  @Operation(summary = "Buscar produto por ID", description = "Retorna um produto específico pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Produto encontrado com sucesso"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public Product getById(@Parameter(description = "ID do produto") @PathVariable String id) {
    return this.productService.getById(Long.parseLong(id));
  }

  @PostMapping()
  @Operation(summary = "Criar novo produto", description = "Cria um novo produto no sistema")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Produto criado com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos")
  })
  public Product create(@Parameter(description = "Dados do produto a ser criado") @RequestBody Product entity) {
    return this.productService.create(entity);
  }

  @PutMapping("{id}")
  @Operation(summary = "Atualizar produto existente", description = "Atualiza os dados de um produto existente pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Produto atualizado com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public Product update(@PathVariable String id, @RequestBody Product entity) {
    return this.productService.update(Long.parseLong(id), entity);
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Excluir produto", description = "Exclui um produto existente pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Produto excluído com sucesso"),
      @ApiResponse(responseCode = "404", description = "Produto não encontrado")
  })
  public void delete(@Parameter(description = "ID do produto a ser excluído") @PathVariable String id) {
    this.productService.delete(Long.parseLong(id));
  }
}
