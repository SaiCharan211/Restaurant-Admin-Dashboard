import express from 'express'
import { createMenu, deleteMenu, getMenu, getMenuById, searchMenu, toggleAvailability, updateMenu } from '../controllers/menuController.js';

const router=express.Router()

router.get("/", getMenu);
router.get("/search", searchMenu);
router.get("/:id", getMenuById);
router.post("/", createMenu);
router.put("/:id", updateMenu);
router.delete("/:id", deleteMenu);
router.patch("/:id/availability",toggleAvailability);

export default router;