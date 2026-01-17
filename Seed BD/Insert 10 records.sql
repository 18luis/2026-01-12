CREATE DATABASE expenses_db;

CREATE TABLE expenses (
    id BIGSERIAL PRIMARY KEY,
    description TEXT NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    "date" TIMESTAMP NOT NULL,
    category VARCHAR(50) NOT NULL
);

INSERT INTO expenses (description,amount,"date",category) VALUES
	 ('Teclado',134.00,'2026-01-16 00:00:00','Oficina'),
	 ('Recibos de agua',400.00,'2026-01-15 00:00:00','Servicios'),
	 ('Llanta',958.00,'2025-12-31 00:00:00','Otros'),
	 ('Ropa',237.00,'2026-01-14 00:00:00','Otros'),
	 ('Office Plus 2026',1200.00,'2026-01-13 00:00:00','Software'),
	 ('Facebook ad',300.00,'2026-01-05 00:00:00','Marketing'),
	 ('Flores',280.00,'2026-01-14 00:00:00','Otros'),
	 ('Comida',1900.00,'2026-01-11 00:00:00','Otros'),
	 ('Mesa',349.00,'2026-01-15 00:00:00','Oficina'),
	 ('Mouse Logitech',500.00,'2026-01-07 00:00:00','Oficina');