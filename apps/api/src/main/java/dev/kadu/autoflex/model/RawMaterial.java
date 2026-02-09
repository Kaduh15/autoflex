package dev.kadu.autoflex.model;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "raw_materials")
@Getter
@Setter
public class RawMaterial {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Schema(accessMode = Schema.AccessMode.READ_ONLY, description = "ID gerado automaticamente")
  private Long id;

  @Column(unique = true, nullable = false)
  private String code;

  @Column(nullable = false)
  private String name;

  @Column(name = "stock_quantity", nullable = false)
  private int stockQuantity;

  public RawMaterial(String code, String name, int stockQuantity) {
    this.code = code;
    this.name = name;
    this.stockQuantity = stockQuantity;
  }

  protected RawMaterial() {
  }
}
