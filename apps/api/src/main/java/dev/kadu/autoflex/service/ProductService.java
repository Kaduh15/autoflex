package dev.kadu.autoflex.service;

import java.util.List;

import dev.kadu.autoflex.dto.product.ProductRawMaterialResponse;
import dev.kadu.autoflex.dto.product.ProductResponse;
import dev.kadu.autoflex.model.LOM;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dev.kadu.autoflex.exception.NotFoundException;
import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.repository.ProductRawMaterialRepository;
import dev.kadu.autoflex.repository.ProductRepository;

@Service
public class ProductService {

  private final ProductRepository productRepository;
  private final ProductRawMaterialRepository productRawMaterialRepository;

  public ProductService(ProductRepository productRepository,
      ProductRawMaterialRepository productRawMaterialRepository) {
    this.productRepository = productRepository;
    this.productRawMaterialRepository = productRawMaterialRepository;
  }

  public List<Product> getAll() {
    if (productRepository.count() == 0) {
      return List.of();
    }

    return productRepository.findAll();
  }

  public List<ProductResponse> getAllWithRawMaterials() {
    if (productRepository.count() == 0) {
      return List.of();
    }

    return productRepository.findAll().stream().map(product -> {
      List<ProductRawMaterialResponse> rawMaterials = productRawMaterialRepository
          .findByProductId(product.getId())
          .stream()
          .map(this::mapToRawMaterialResponse)
          .toList();
      return new ProductResponse(product.getId(), product.getCode(), product.getName(), product.getPrice(),
          rawMaterials);
    }).toList();
  }

  public Product getById(Long id) {
    return productRepository.findById(id).orElseThrow(() -> new NotFoundException("Produto não encontrado"));
  }

  public Product create(Product product) {
    return productRepository.save(product);
  }

  public Product update(Long id, Product updatedProduct) {
    return productRepository.findById(id).map(product -> {
      product.setCode(updatedProduct.getCode());
      product.setName(updatedProduct.getName());
      product.setPrice(updatedProduct.getPrice());
      return productRepository.save(product);
    }).orElseThrow(() -> new NotFoundException("Produto não encontrado"));
  }

  public void delete(Long id) {
    try {
      productRepository.deleteById(id);
    } catch (EmptyResultDataAccessException | IllegalArgumentException ex) {
      throw new NotFoundException("Produto não encontrado");
    }
  }

  private ProductRawMaterialResponse mapToRawMaterialResponse(LOM lom) {
    return new ProductRawMaterialResponse(
        lom.getRawMaterial().getId(),
        lom.getRawMaterial().getCode(),
        lom.getRawMaterial().getName(),
        lom.getRawMaterial().getStockQuantity(),
        lom.getQuantityRequired());
  }
}
