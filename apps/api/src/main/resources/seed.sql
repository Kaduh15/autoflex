-- Seed data for Autoflex

INSERT INTO raw_materials (id, code, name, stock_quantity)
VALUES
    (1, 'RM-001', 'Aco', 600),
    (2, 'RM-002', 'Plastico', 900),
    (3, 'RM-003', 'Borracha', 1200),
    (4, 'RM-004', 'Aluminio', 350);

INSERT INTO products (id, code, name, price)
VALUES
    (1, 'PRD-001', 'Pneu Aro 14', 120.50),
    (2, 'PRD-002', 'Pneu Aro 17', 198.90),
    (3, 'PRD-003', 'Volante Esportivo', 245.00),
    (4, 'PRD-004', 'Parachoque Compacto', 310.75);

INSERT INTO product_raw_material (id, product_id, raw_material_id, quantity_required)
VALUES
    (1, 1, 3, 18),
    (2, 1, 1, 2),
    (3, 1, 2, 1),
    (4, 2, 3, 22),
    (5, 2, 1, 3),
    (6, 2, 2, 2),
    (7, 3, 4, 2),
    (8, 3, 3, 4),
    (9, 3, 2, 6),
    (10, 4, 2, 18),
    (11, 4, 4, 4);

SELECT setval('raw_materials_id_seq', (SELECT MAX(id) FROM raw_materials));
SELECT setval('products_id_seq', (SELECT MAX(id) FROM products));
SELECT setval('product_raw_material_id_seq', (SELECT MAX(id) FROM product_raw_material));
