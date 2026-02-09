package dev.kadu.autoflex.service;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dev.kadu.autoflex.exception.NotFoundException;
import dev.kadu.autoflex.model.Product;
import dev.kadu.autoflex.repository.ProductRepository;

@Service
public class ProductService {

  private final ProductRepository productRepository;

  public ProductService(ProductRepository productRepository) {
    this.productRepository = productRepository;
  }

  public List<Product> getAll() {
    if (productRepository.count() == 0) {
      return List.of();
    }

    return productRepository.findAll();
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
}
