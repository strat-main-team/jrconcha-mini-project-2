"use server";
import cloudinary from "@/lib/cloudinary-server";

export async function uploadToCloudinary(file: File, filename: string) {
  const arrayBuffer = await file.arrayBuffer(); // Convert file to an array of bytes - buffer.
  const buffer = Buffer.from(arrayBuffer);
  const base64 = buffer.toString("base64"); // encode buffer to a base64 string

  const mimeType = file.type; // e.g. "image/png"
  const base64DataUrl = `data:${mimeType};base64,${base64}`; // construct the dataurl

  // construct a unique filename prefixing the existing filename with a timestamp to prevent collisions
  const timestamp = Date.now();
  const finalFileName = `${timestamp}_${filename.slice(
    0,
    filename.indexOf(".")
  )}`;

  const options = {
    public_id: finalFileName,
    folder: "blog-cover-image",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  const result = await cloudinary.uploader.upload(base64DataUrl, options);

  return result.secure_url; // return the secure_url to be saved in the database.
}
