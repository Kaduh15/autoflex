package dev.kadu.autoflex.dto.lom;

import dev.kadu.autoflex.dto.rawmaterial.RawMaterialResponse;

public record LomMaterialItemResponse(RawMaterialResponse rawMaterial, Integer quantity) {
}
