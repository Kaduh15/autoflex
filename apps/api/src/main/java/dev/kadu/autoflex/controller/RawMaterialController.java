package dev.kadu.autoflex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kadu.autoflex.dto.common.ApiResult;
import dev.kadu.autoflex.dto.rawmaterial.RawMaterialRequest;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import dev.kadu.autoflex.model.RawMaterial;
import dev.kadu.autoflex.service.RawMaterialService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("raw-materials")
@Tag(name = "Raw Materials", description = "Gerenciamento de matérias-primas")
public class RawMaterialController {
  private final RawMaterialService rawMaterialService;

  public RawMaterialController(RawMaterialService rawMaterialService) {
    this.rawMaterialService = rawMaterialService;
  }

  @GetMapping()
  @Operation(summary = "Listar todas as matérias-primas", description = "Retorna uma lista com todas as matérias-primas cadastradas")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Lista de matérias-primas retornada com sucesso")
  })
  public ResponseEntity<ApiResult<List<RawMaterial>>> getAll() {
    return ResponseEntity.ok(new ApiResult<>("OK", rawMaterialService.getAll()));
  }

  @GetMapping("{id}")
  @Operation(summary = "Buscar matéria-prima por ID", description = "Retorna uma matéria-prima específica pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Matéria-prima encontrada com sucesso"),
      @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
  })
  public ResponseEntity<ApiResult<RawMaterial>> getById(
      @Parameter(description = "ID da matéria-prima") @PathVariable Long id) {
    return ResponseEntity.ok(new ApiResult<>("OK", this.rawMaterialService.getById(id)));
  }

  @PostMapping()
  @Operation(summary = "Criar nova matéria-prima", description = "Cria uma nova matéria-prima no sistema")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Matéria-prima criada com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos")
  })
  public ResponseEntity<ApiResult<RawMaterial>> create(@Valid @RequestBody RawMaterialRequest request) {
    RawMaterial created = this.rawMaterialService
        .create(new RawMaterial(request.code(), request.name(), request.stockQuantity()));
    return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResult<>("Criado com sucesso", created));
  }

  @PutMapping("{id}")
  @Operation(summary = "Atualizar matéria-prima", description = "Atualiza os dados de uma matéria-prima existente")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Matéria-prima atualizada com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos"),
      @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
  })
  public ResponseEntity<ApiResult<RawMaterial>> update(
      @Parameter(description = "ID da matéria-prima a ser atualizada") @PathVariable Long id,
      @Valid @RequestBody RawMaterialRequest request) {
    RawMaterial updated = this.rawMaterialService
        .update(id, new RawMaterial(request.code(), request.name(), request.stockQuantity()));
    return ResponseEntity.ok(new ApiResult<>("Atualizado com sucesso", updated));
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Excluir matéria-prima", description = "Exclui uma matéria-prima existente pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Matéria-prima excluída com sucesso"),
      @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
  })
  public ResponseEntity<Void> delete(@Parameter(description = "ID da matéria-prima a ser excluída") @PathVariable Long id) {
    this.rawMaterialService.delete(id);
    return ResponseEntity.noContent().build();
  }
}
