export const uploadImageToCloudinary = async (file: File): Promise<string> => {
  const CLOUD_NAME = "dhwndo5ta";
  const UPLOAD_PRESET = "umc_week7";
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  const data = await response.json();
  return data.secure_url;
};
