package dev.kadu.autoflex.dto.product;

public record ProductRawMaterialResponse(
    Long id,
    String code,
    String name,
    Integer stockQuantity,
    Integer quantityRequired) {
}
