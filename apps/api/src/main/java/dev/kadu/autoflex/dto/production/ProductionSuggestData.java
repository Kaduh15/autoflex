package dev.kadu.autoflex.dto.production;

import java.math.BigDecimal;
import java.util.List;

public record ProductionSuggestData(
    List<ProductionSuggestionItem> suggestions,
    BigDecimal totalProductionValue) {
}
