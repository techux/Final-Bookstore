import razorpay from '../utils/razorpay.js'
import Purchase from '../models/purchase.model.js'

export const createOrder = async (req, res) => {


    try {
      const { amount, currency = 'INR', receipt = 'receipt_1', bookId, userId } = req.body;      

      const isAlreadyPurchased = await Purchase.find({
        userId,
        bookId
      })
       
     // console.log(isAlreadyPurchased);
      
      if (isAlreadyPurchased.length > 0) {
        return res.status(200).json({ 
          success: false,
          message: "Book already Purchased by you"
        });
      }
  

      // Options for creating an order
      const options = {
        amount: amount * 100, // Convert amount to smallest currency unit (paise for INR)
        currency,
        receipt,
      };
  
      // Create the order with Razorpay
      const order = await razorpay.orders.create(options);
      
      // Send the created order as a response
      return res.status(201).json({
        success: true,
        order,
      });

    } catch (error) {
      console.error('Error creating order:', error);
      return res.status(500).json({
        success: false,
        message: 'Unable to create order. Try again later.'+ error.message,
      });
    }
  }