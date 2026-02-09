package dev.kadu.autoflex.dto.lom;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record LomItemRequest(
    @NotNull(message = "ID da matéria-prima é obrigatório")
    Long rawMaterialId,
    @NotNull(message = "Quantidade é obrigatória")
    @Positive(message = "Quantidade deve ser positiva")
    Integer quantity
) {
}
