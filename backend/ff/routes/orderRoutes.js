express = require("express");
const router = express.Router();
const {
  getOrders,
  getOrder,
  addOrder,
  removeOrder,
  updateOrder,
} = require("../controllers/orderController");

const { isAuthenticated } = require("../controllers/authController");

router.get("/", getOrders);
router.get("/:id", getOrder);
router.delete("/:id", isAuthenticated, removeOrder);
router.post("/", isAuthenticated, addOrder);
router.put("/", isAuthenticated, updateOrder);

module.exports = router;
