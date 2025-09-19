import React, { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../../api/auth";
import { uploadImage } from "../../../api/upload";
import useToast from "../../../hook/useToast";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [uploading, setUploading] = useState(false);
  const toast = useToast();

  // Lấy profile
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await getProfile(token);
        setUser(res.data.user || res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

// Upload avatar
const handleUploadAvatar = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    setUploading(true);

    // gửi file tới backend
    const formData = new FormData();
    formData.append("file", file);

    const data = await uploadImage(formData); // gọi API /api/upload
    const avatarUrl = data.url; // backend trả về { url: "..." }

    const token = localStorage.getItem("token");
    const res = await updateProfile({ avatar: avatarUrl }, token);

    setUser(prev => ({ ...prev, ...res.data.user, avatar: avatarUrl }));

    toast.success("Cập nhật avatar thành công!");
  } catch (err) {
    console.error(err);
    toast.error("Upload avatar thất bại!");
  } finally {
    setUploading(false);
  }
};


  if (!user) {
    return <div className="text-gray-500 py-4">Loading profile...</div>;
  }

  return (
    <div className="border border-gray-300 relative rounded-lg p-6 bg-white shadow-sm w-full max-w-md mx-auto">
      {/* Avatar */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.avatar || "https://via.placeholder.com/100"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover border"
        />
        <label className="mt-2 text-sm cursor-pointer bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          {uploading ? "Uploading..." : "Upload Avatar"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadAvatar}
          />
        </label>
      </div>

      {/* Thông tin user */}
      <div className="space-y-2 text-center sm:text-left">
        <div>
          <span className="font-semibold">Name: </span>
          {user.name || "-"}
        </div>
        <div>
          <span className="font-semibold">Email: </span>
          {user.email || "-"}
        </div>
        <div>
          <span className="font-semibold">Phone: </span>
          {user.phone || "-"}
        </div>
        <div>
          <span className="font-semibold">Address: </span>
          {user.address || "-"}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
