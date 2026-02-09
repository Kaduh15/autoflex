package dev.kadu.autoflex.dto.lom;

import java.util.List;

import dev.kadu.autoflex.model.Product;

public record LomResponse(Product product, List<LomMaterialItemResponse> materials) {
}
