import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1);
    }
};

export default dbConnect;
