import { v2 as cloudinary } from "cloudinary"; // instead of const cloudinary = require('cloudinary').v2; as  https://typescript-eslint.io/rules/no-require-imports/

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export default cloudinary;
