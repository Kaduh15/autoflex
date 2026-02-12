package dev.kadu.autoflex.dto.production;

import java.math.BigDecimal;

public record ProductionSuggestionItem(
    Long productId,
    String code,
    String name,
    BigDecimal price,
    Integer maxQuantity,
    BigDecimal totalValue) {
}
