import mongoose from "mongoose";

const purchaseSchema= mongoose.Schema({
   
    // userId:{
    //     type: String,
    //     required: true,
    // },

    // bookId:{
    //     type: String,
    //     required: true,
    // },

    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },

})

const Purchase = mongoose.model('purchase',purchaseSchema);
export default Purchase;
