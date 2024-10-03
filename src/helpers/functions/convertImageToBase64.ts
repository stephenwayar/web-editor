import { FileWithPath } from "@mantine/dropzone";

// Function to convert image file to base64
export function convertImageToBase64(file: FileWithPath): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader(); // Create a FileReader instance to read the file
    reader.readAsDataURL(file); // Read the file as a data URL (base64)

    // On successful read, resolve the promise with the base64 string
    reader.onload = () => resolve(reader.result as string);

    // On error during reading, reject the promise with the error
    reader.onerror = error => reject(error);
  });
}