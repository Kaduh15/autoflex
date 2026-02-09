package dev.kadu.autoflex.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import dev.kadu.autoflex.model.RawMaterial;
import dev.kadu.autoflex.service.RawMaterialService;
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
  public List<RawMaterial> getAll() {
    return rawMaterialService.getAll();
  }

  @GetMapping("{id}")
  @Operation(summary = "Buscar matéria-prima por ID", description = "Retorna uma matéria-prima específica pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Matéria-prima encontrada com sucesso"),
      @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
  })
  public RawMaterial getById(@Parameter(description = "ID da matéria-prima") @PathVariable String id) {
    return this.rawMaterialService.getById(Long.parseLong(id));
  }

  @PostMapping()
  @Operation(summary = "Criar nova matéria-prima", description = "Cria uma nova matéria-prima no sistema")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Matéria-prima criada com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos")
  })
  public RawMaterial create(@RequestBody RawMaterial entity) {
    return this.rawMaterialService.create(entity);
  }

  @PutMapping("{id}")
  @Operation(summary = "Atualizar matéria-prima", description = "Atualiza os dados de uma matéria-prima existente")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Matéria-prima atualizada com sucesso"),
      @ApiResponse(responseCode = "400", description = "Dados inválidos"),
      @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
  })
  public RawMaterial update(@Parameter(description = "ID da matéria-prima a ser atualizada") @PathVariable String id,
      @RequestBody RawMaterial entity) {
    return this.rawMaterialService.update(Long.parseLong(id), entity);
  }

  @DeleteMapping("{id}")
  @Operation(summary = "Excluir matéria-prima", description = "Exclui uma matéria-prima existente pelo seu ID")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "204", description = "Matéria-prima excluída com sucesso"),
      @ApiResponse(responseCode = "404", description = "Matéria-prima não encontrada")
  })
  public void delete(@Parameter(description = "ID da matéria-prima a ser excluída") @PathVariable String id) {
    this.rawMaterialService.delete(Long.parseLong(id));
  }
}
