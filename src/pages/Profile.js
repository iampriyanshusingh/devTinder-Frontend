import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";
import { FaEdit, FaSave, FaTimes, FaCamera, FaTrash } from "react-icons/fa";

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
    gender: user?.Gender || "",
    photo: null,
    about: user?.about || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(user?.photo || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert("Please select an image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
    }));
    setPhotoPreview(null);
    // Clear photo input
    const fileInput = document.getElementById('profile-photo');
    if (fileInput) fileInput.value = '';
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await updateProfile(formData);
      if (result.success) {
        setIsEditing(false);
        // Update local photo preview if photo was changed
        if (formData.photo) {
          setPhotoPreview(formData.photo);
        }
      }
    } catch (error) {
      console.error("Profile update error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      age: user?.age || "",
      gender: user?.Gender || "",
      photo: null,
      about: user?.about || "",
    });
    setPhotoPreview(user?.photo || null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card"
        >
          <div className="card-header flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-sm"
              >
                <FaEdit className="w-4 h-4 mr-2" />
                Edit
              </button>
            )}
          </div>

          <div className="card-body space-y-4">
            {/* Profile Photo Section */}
            <div className="flex flex-col items-center space-y-4 pb-6 border-b border-gray-200">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Profile"
                    className="photo-preview"
                  />
                ) : (
                  <div className="photo-placeholder">
                    <FaCamera className="text-4xl" />
                  </div>
                )}
              </div>
              
              {isEditing && (
                <div className="flex items-center space-x-3">
                  <label className="btn btn-secondary btn-sm cursor-pointer">
                    <FaCamera className="w-4 h-4 mr-2" />
                    Change Photo
                    <input
                      type="file"
                      id="profile-photo"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                    />
                  </label>
                  {formData.photo && (
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="btn btn-secondary btn-sm"
                    >
                      <FaTrash className="w-4 h-4 mr-2" />
                      Remove
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  First Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p className="text-gray-900 dark:text-white">{user?.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p className="text-gray-900">
                    {user?.lastName || "Not specified"}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    name="age"
                    min="18"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                  />
                ) : (
                  <p className="text-gray-900">{user?.age} years old</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                {isEditing ? (
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p className="text-gray-900">
                    {user?.Gender || "Not specified"}
                  </p>
                )}
              </div>
            </div>

            {/* About Section */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                About Me
              </label>
              {isEditing ? (
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  rows="4"
                />
              ) : (
                <p className="text-gray-900 dark:text-white">
                  {user?.about || "No description provided"}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className="btn btn-primary"
                >
                  <FaSave className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save"}
                </button>
                <button onClick={handleCancel} className="btn btn-secondary">
                  <FaTimes className="w-4 h-4 mr-2" />
                  Cancel
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
