import express from 'express';
import { purchaseBook,getUserPurchases,DeletePurchasedBook } from '../controller/purchase.controller.js';
const router = express.Router();

router.post("/buy", purchaseBook); // Buy a book
router.get("/my-purchases", getUserPurchases); // Fetch purchased books
router.post("/delete-purchased-book",DeletePurchasedBook);

export default router;

