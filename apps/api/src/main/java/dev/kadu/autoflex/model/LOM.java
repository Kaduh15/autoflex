package dev.kadu.autoflex.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_raw_material")
public class LOM {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "ID gerado automaticamente")
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "product_id", nullable = false)
  private Product product;

  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "raw_material_id", nullable = false)
  private RawMaterial rawMaterial;

  @Column(name = "quantity_required", nullable = false)
  private Integer quantityRequired;

  public LOM(Product product, RawMaterial rawMaterial, Integer quantityRequired) {
    this.product = product;
    this.rawMaterial = rawMaterial;
    this.quantityRequired = quantityRequired;
  }

  public LOM() {
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Product getProduct() {
    return product;
  }

  public void setProduct(Product product) {
    this.product = product;
  }

  public RawMaterial getRawMaterial() {
    return rawMaterial;
  }

  public void setRawMaterial(RawMaterial rawMaterial) {
    this.rawMaterial = rawMaterial;
  }

  public Integer getQuantityRequired() {
    return quantityRequired;
  }

  public void setQuantityRequired(Integer quantityRequired) {
    this.quantityRequired = quantityRequired;
  }

}
