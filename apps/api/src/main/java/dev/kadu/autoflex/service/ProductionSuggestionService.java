package dev.kadu.autoflex.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import dev.kadu.autoflex.dto.production.ProductionSuggestData;
import dev.kadu.autoflex.dto.production.ProductionSuggestionItem;
import dev.kadu.autoflex.model.LOM;
import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.repository.ProductRawMaterialRepository;
import dev.kadu.autoflex.repository.ProductRepository;

@Service
public class ProductionSuggestionService {
  private final ProductRepository productRepository;
  private final ProductRawMaterialRepository productRawMaterialRepository;

  public ProductionSuggestionService(ProductRepository productRepository,
      ProductRawMaterialRepository productRawMaterialRepository) {
    this.productRepository = productRepository;
    this.productRawMaterialRepository = productRawMaterialRepository;
  }

  public ProductionSuggestData suggestProduction() {
    List<Product> products = productRepository.findAll();
    if (products.isEmpty()) {
      return new ProductionSuggestData(List.of(), BigDecimal.ZERO);
    }

    List<LOM> loms = productRawMaterialRepository.findAll();
    if (loms.isEmpty()) {
      return new ProductionSuggestData(List.of(), BigDecimal.ZERO);
    }

    Map<Long, List<LOM>> lomsByProduct = loms.stream()
        .filter(lom -> lom.getProduct() != null && lom.getProduct().getId() != null)
        .collect(Collectors.groupingBy(lom -> lom.getProduct().getId()));

    Map<Long, Integer> stockByRawMaterial = new HashMap<>();
    for (LOM lom : loms) {
      if (lom.getRawMaterial() == null || lom.getRawMaterial().getId() == null) {
        continue;
      }
      stockByRawMaterial.putIfAbsent(
          lom.getRawMaterial().getId(),
          lom.getRawMaterial().getStockQuantity());
    }

    List<Product> sortedProducts = products.stream()
        .filter(product -> product.getPrice() != null)
        .sorted(Comparator.comparing(Product::getPrice).reversed())
        .toList();

    List<ProductionSuggestionItem> suggestions = new ArrayList<>();
    BigDecimal totalValue = BigDecimal.ZERO;

    for (Product product : sortedProducts) {
      List<LOM> productLoms = lomsByProduct.get(product.getId());
      if (productLoms == null || productLoms.isEmpty()) {
        continue;
      }

      Integer maxQuantity = calculateMaxQuantity(productLoms, stockByRawMaterial);
      if (maxQuantity == null || maxQuantity <= 0) {
        continue;
      }

      BigDecimal productTotal = product.getPrice().multiply(BigDecimal.valueOf(maxQuantity));
      totalValue = totalValue.add(productTotal);

      suggestions.add(new ProductionSuggestionItem(
          product.getId(),
          product.getCode(),
          product.getName(),
          product.getPrice(),
          maxQuantity,
          productTotal));

      consumeStock(productLoms, stockByRawMaterial, maxQuantity);
    }

    return new ProductionSuggestData(suggestions, totalValue);
  }

  private Integer calculateMaxQuantity(List<LOM> productLoms,
      Map<Long, Integer> stockByRawMaterial) {
    Integer maxQuantity = null;

    for (LOM lom : productLoms) {
      if (lom.getRawMaterial() == null || lom.getRawMaterial().getId() == null) {
        return 0;
      }

      Integer required = lom.getQuantityRequired();
      if (required == null || required <= 0) {
        return 0;
      }

      Integer stock = stockByRawMaterial.getOrDefault(lom.getRawMaterial().getId(), 0);
      int possible = stock / required;

      maxQuantity = Objects.requireNonNullElse(maxQuantity, possible);
      maxQuantity = Math.min(maxQuantity, possible);
    }

    return maxQuantity;
  }

  private void consumeStock(List<LOM> productLoms,
      Map<Long, Integer> stockByRawMaterial,
      int quantity) {
    for (LOM lom : productLoms) {
      if (lom.getRawMaterial() == null || lom.getRawMaterial().getId() == null) {
        continue;
      }

      Integer required = lom.getQuantityRequired();
      if (required == null || required <= 0) {
        continue;
      }

      Long rawMaterialId = lom.getRawMaterial().getId();
      Integer stock = stockByRawMaterial.getOrDefault(rawMaterialId, 0);
      int updated = stock - (required * quantity);
      stockByRawMaterial.put(rawMaterialId, Math.max(updated, 0));
    }
  }
}
