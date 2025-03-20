
import Book from '../models/book.model.js';
import Purchase from "../models/purchase.model.js";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';



export const purchaseBook = async (req, res) => {

    try {
        const { bookId } = req.body;

        const token = req.headers['authorization']?.split(' ')[1];



        if (!token) {
            return res.status(401).json({
                message: "token not found!"
            })
        }

        // console.log("JWT Secret at Verification:", process.env.JWT_SECRET);

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
            // console.log("Decoded Token:", decoded);
        } catch (err) {
            return res.status(401).json({ message: "Invalid token!" });
        }



        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({
                message: "book not found!"
            })
        }

        const purchaseNow = await Purchase.findOne({ bookId, userId });

        if (purchaseNow) {
            return res.status(400).json({ message: "You have already purchased this book" });
        }

        const newPurchase = new Purchase({ userId, bookId });
        await newPurchase.save();

        res.status(201).json({
            message: "Book purchased successfully",
            purchase: newPurchase
        });


    } catch (error) {
        console.error("Purchase Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};



//purchase fetch kr rha
export const getUserPurchases = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        let userId;
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            userId = decoded.id;
        } catch (err) {
            return res.status(401).json({ message: "Invalid token!" });
        }


        // Fetch purchases for the logged-in user
        const booksPurchased = await Purchase.find({ userId })
            .select("bookId")
            .populate("bookId")

        res.status(200).json({ books: booksPurchased });

    } catch (error) {
        console.error("Fetch Purchases Error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const DeletePurchasedBook = async (req, res) => {
    try {
       
        const { bookId } = req.body;
       

        if (!bookId) {
            return res.status(400).json({ message: "Book ID is required" });
        }

        // Check if bookId is a valid ObjectId
        if (!mongoose.isValidObjectId(bookId)) {
            return res.status(400).json({ message: "Invalid Book ID format" });
        }
       // console.log(bookId);
        
        // Delete the purchase entry associated with the bookId
        const deletedPurchase = await Purchase.findOneAndDelete({ bookId });


        if (!deletedPurchase) {
            return res.status(404).json({ message: "Purchased book not found" });
        }
        

        res.status(200).json({ message: "Purchased book deleted successfully" });
        

    } catch (error) {
        console.error("Error deleting purchased book:", error);
        res.status(500).json({ message: "Server error" });
    }
};