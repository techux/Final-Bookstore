import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv' ;
dotenv.config();

const cn = process.env.CLOUDINARY_CLOUD_NAME

//console.log(cn);


cloudinary.config({
  cloud_name: cn,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default cloudinary;
