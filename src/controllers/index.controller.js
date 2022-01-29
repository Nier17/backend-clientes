const { Pool } = require("pg");
var moment = require("moment");

const pool = new Pool({
  host: "159.223.161.105",
  user: "postgres",
  password: "e98899fd62f08c581d79c714c80e7f08",
  database: "dbclientes",
  port: "17935",
});

const getClientes = async (req, res) => {
  const response = await pool.query("SELECT * FROM clientes");
  res.status(200).json(response.rows);
};

const getPromedio = async (req, res) => {
  const response = await pool.query("SELECT * FROM clientes");
  var years = [];
  response.rows.forEach((element) => {
    console.log(element.fecnac.toString());
    console.log(moment().diff(moment(element.fecnac), "years"));
    years.push(moment().diff(moment(element.fecnac), "years"));
  });
  console.log(years);
  const sum = years.reduce((a, b) => a + b, 0);
  console.log(sum);
  var avg = sum / years.length || 0;
  avg = Number(avg).toFixed(2);
  console.log(avg);
  res.status(200).json(response.rows);
};

const getClienteById = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("SELECT * FROM clientes where id = $1", [
    id,
  ]);
  res.status(200).json(response.rows);
};

const createCliente = async (req, res) => {
  var { nombre, apellido, fecnac } = req.body;
  var fecnacFormat = moment(fecnac, "DD/MM/YYYY").toDate();
  const response = await pool.query(
    "INSERT INTO clientes (nombre,apellido, fecnac) VALUES ($1, $2, $3)",
    [nombre, apellido, fecnacFormat]
  );
  console.log(response);
  res.status(200).json({
    message: "Client added successfully",
    body: { cliente: { nombre, apellido, fecnacFormat } },
  });
};

const deleteCliente = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query("DELETE FROM clientes where id = $1", [id]);
  console.log(response);
  res.status(200).json(`User ${id} deleted successfully`);
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  deleteCliente,
  getPromedio,
};
