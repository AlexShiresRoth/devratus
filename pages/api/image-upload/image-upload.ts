import { v2 as cloudinary } from "cloudinary";

//@TODO secure these
cloudinary.config({
  cloud_name: process.env.CLD_NAME,
  api_key: process.env.CLD_PUB_KEY,
  api_secret: process.env.CLD_PRIVATE_KEY,
  secure: true,
});

export const uploadImage = async (
  file: string,
  name: string
): Promise<{ imageUrl: string; success: boolean }> => {
  try {
    console.log("data:image/jpeg;base64," + file.slice(0, 100));
    const upload = await cloudinary.uploader.upload(
      "data:image/jpeg;base64," + file,
      {
        folder: "/devratus/resources",
        public_id: name,
      }
    );

    console.log("upload", upload?.secure_url);
    return {
      imageUrl: upload.secure_url,
      success: true,
    };
  } catch (error) {
    console.error("Error uploading image", error);
    return {
      imageUrl: "",
      success: false,
    };
  }
};
