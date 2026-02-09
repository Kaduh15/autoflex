package dev.kadu.autoflex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.kadu.autoflex.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
