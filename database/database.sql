CREATE DATABASE dbclientes;

CREATE TABLE clientes(
    id SERIAL primary key,
    nombre varchar (50) not null,
    apellido varchar(50) not null,
    fecnac timestamp
);

INSERT INTO clientes(nombre, apellido) VALUES 
('Carlos','Martel'),
('William','Wallace');