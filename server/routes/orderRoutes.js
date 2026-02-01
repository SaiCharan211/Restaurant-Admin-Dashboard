import express from 'express'
import { createOrder, getOrderById, getOrders, updateStatus } from '../controllers/orderController.js'

const router=express.Router()

router.get("/", getOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
router.patch("/:id/status", updateStatus);

export default router;