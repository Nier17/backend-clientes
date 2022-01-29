const { Router } = require("express");
const router = Router();

const {
  getClientes,
  createCliente,
  getClienteById,
  deleteCliente,
  getPromedio,
} = require("../controllers/index.controller");

router.get("/clientes", getClientes);
router.get("/promedio", getPromedio);
router.get("/clientes/:id", getClienteById);
router.post("/clientes", createCliente);
router.delete("/clientes/:id", deleteCliente);

module.exports = router;
