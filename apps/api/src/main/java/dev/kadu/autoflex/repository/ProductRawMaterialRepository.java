package dev.kadu.autoflex.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.kadu.autoflex.model.LOM;

public interface ProductRawMaterialRepository extends JpaRepository<LOM, Long> {
}
