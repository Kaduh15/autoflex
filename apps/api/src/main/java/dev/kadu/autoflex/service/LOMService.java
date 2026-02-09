package dev.kadu.autoflex.service;

import java.util.List;

import org.springframework.stereotype.Service;

import dev.kadu.autoflex.dto.lom.LomItemRequest;
import dev.kadu.autoflex.model.LOM;
import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.repository.ProductRawMaterialRepository;

@Service
public class LOMService {

  private final ProductRawMaterialRepository productRawMaterialRepository;
  private final ProductService productService;
  private final RawMaterialService rawMaterialService;

  public LOMService(ProductRawMaterialRepository productRawMaterialRepository, ProductService productService,
      RawMaterialService rawMaterialService) {
    this.productRawMaterialRepository = productRawMaterialRepository;
    this.productService = productService;
    this.rawMaterialService = rawMaterialService;
  }

  public List<LOM> getLOMByProduct(Long productId) {
    return productRawMaterialRepository.findAll().stream()
        .filter(lom -> lom.getProduct().getId().equals(productId))
        .toList();
  }

  public List<LOM> addItemsInProduct(Long productId, List<LomItemRequest> data) {
    Product product = productService.getById(productId);
    List<LOM> lomList = data.stream().map(item -> {
      var rawMaterial = rawMaterialService.getById(item.rawMaterialId());
      return new LOM(product, rawMaterial, item.quantity());
    }).toList();

    return productRawMaterialRepository.saveAll(lomList);
  }

  public void deleteLOMByProductId(Long productId, Long rawMaterialId) {
    var loms = this.productRawMaterialRepository.findAll().stream()
        .filter(lom -> lom.getProduct().getId().equals(productId) && lom.getRawMaterial().getId().equals(rawMaterialId))
        .toList();
    productRawMaterialRepository.deleteAll(loms);
  }

}
