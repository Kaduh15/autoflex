package dev.kadu.autoflex.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.kadu.autoflex.dto.common.ApiResult;
import dev.kadu.autoflex.dto.production.ProductionSuggestData;
import dev.kadu.autoflex.service.ProductionSuggestionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("production")
@Tag(name = "Production", description = "Gerenciamento de produção e sugestões de produção")
public class ProductionController {
  private final ProductionSuggestionService productionSuggestionService;

  public ProductionController(ProductionSuggestionService productionSuggestionService) {
    this.productionSuggestionService = productionSuggestionService;
  }

  @GetMapping("/suggestion")
  @Operation(summary = "Sugerir produção", description = "Gera uma sugestão de produção com base nos produtos e matérias-primas disponíveis")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Sugestão de produção gerada com sucesso"),
      @ApiResponse(responseCode = "400", description = "Não foi possível gerar a sugestão de produção devido a dados insuficientes ou inconsistentes")
  })
  public ResponseEntity<ApiResult<ProductionSuggestData>> suggestProduction() {
    ProductionSuggestData data = productionSuggestionService.suggestProduction();
    return ResponseEntity.ok(new ApiResult<>("OK", data));
  }
}
