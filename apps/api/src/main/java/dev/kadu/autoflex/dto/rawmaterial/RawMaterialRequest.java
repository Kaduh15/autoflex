package dev.kadu.autoflex.dto.rawmaterial;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record RawMaterialRequest(
    @NotBlank(message = "Código é obrigatório")
    String code,
    @NotBlank(message = "Nome é obrigatório")
    String name,
    @NotNull(message = "Quantidade em estoque é obrigatória")
    @PositiveOrZero(message = "Quantidade em estoque deve ser zero ou positiva")
    Integer stockQuantity
) {
}
