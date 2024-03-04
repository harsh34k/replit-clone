
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Function to retrieve files from Cloudinary based on submitted value
const retrieveFilesFromCloudinary = async (submittedValue, replitName) => {
  try {
    if (submittedValue === "node") {
      const result = await cloudinary.search
        .expression('folder:base-node')
        .execute();
      const uploadedFiles = await Promise.all(result.resources.map(async ({ url, filename }) => {

        const uploadedFile = await uploadFileToCloudinary(url, replitName, filename);
        return uploadedFile;
      }));

      return uploadedFiles;
    } else {
      // Handle the case where submitted value doesn't match "node"
      console.log("Submitted value does not match 'node'");
      return [];
    }
  } catch (error) {
    console.error("Error retrieving or uploading files:", error);
    throw error;
  }
};

const uploadFileToCloudinary = async (fileContent, replitName, fileName) => {
  try {
    const folderPath = `/${replitName}`;
    // Upload the file to Cloudinary using the "Raw file" upload feature
    const uploadedFile = await cloudinary.uploader.upload(fileContent, {
      folder: folderPath, // Upload to dynamically created folder
      public_id: fileName,
      resource_type: "raw" // Specify resource type as "raw" for non-image files
    });

    return { fileName: uploadedFile.original_filename, url: uploadedFile.url };
  } catch (error) {
    console.error("Error uploading file to Cloudinary:", error);
    throw error;
  }
};


export { retrieveFilesFromCloudinary, uploadFileToCloudinary };
