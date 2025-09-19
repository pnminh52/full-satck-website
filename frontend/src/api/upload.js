import axios from "axios";

export const uploadImage = async (formData) => {
  const res = await axios.post("http://localhost:3000/api/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data; 
};
