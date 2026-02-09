package dev.kadu.autoflex.service;

import java.util.List;

import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;

import dev.kadu.autoflex.exception.NotFoundException;
import dev.kadu.autoflex.model.RawMaterial;
import dev.kadu.autoflex.repository.RawMaterialRepository;

@Service
public class RawMaterialService {

  public final RawMaterialRepository rawMaterialRepository;

  public RawMaterialService(RawMaterialRepository rawMaterialRepository) {
    this.rawMaterialRepository = rawMaterialRepository;
  }

  public List<RawMaterial> getAll() {
    return rawMaterialRepository.findAll();
  }

  public RawMaterial getById(long long1) {
    return rawMaterialRepository.findById(long1).orElseThrow(() -> new NotFoundException("Matéria-prima não encontrada"));
  }

  public RawMaterial create(RawMaterial entity) {
    return rawMaterialRepository.save(entity);
  }

  public RawMaterial update(Long id, RawMaterial updatedEntity) {
    return rawMaterialRepository.findById(id).map(entity -> {
      entity.setCode(updatedEntity.getCode());
      entity.setName(updatedEntity.getName());
      entity.setStockQuantity(updatedEntity.getStockQuantity());
      return rawMaterialRepository.save(entity);
    }).orElseThrow(() -> new NotFoundException("Matéria-prima não encontrada"));
  }

  public void delete(Long id) {
    try {
      rawMaterialRepository.deleteById(id);
    } catch (EmptyResultDataAccessException | IllegalArgumentException ex) {
      throw new NotFoundException("Matéria-prima não encontrada");
    }
  }

}
