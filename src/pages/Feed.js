import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { incrementPendingCount } from "../store/requestSlice";
import {
  FaHeart,
  FaTimes,
  FaStar,
  FaUser,
  FaCode,
  FaBirthdayCake,
  FaVenusMars,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

const Feed = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    gender: "",
    minAge: "",
    maxAge: "",
    skills: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/feed?page=${page}&limit=10`, {
          withCredentials: true,
        });
        if (response.data && response.data.length > 0) {
          if (page === 1) {
            setUsers(response.data);
          } else {
            setUsers((prev) => [...prev, ...response.data]);
          }
          setHasMore(response.data.length === 10);
        } else {
          setHasMore(false);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  const handleAction = async (action, userId) => {
    try {
      const status = action === "like" ? "interested" : "ignored";
      await axios.post(
        `/api/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );

      toast.success(action === "like" ? "Interest sent!" : "User ignored");

      // Increment pending count if interest was sent
      if (action === "like") {
        dispatch(incrementPendingCount());
      }

      // Remove current user from feed and move to next
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setCurrentIndex((prev) => Math.min(prev, users.length - 2));

      // If we're running low on users, fetch more
      if (users.length <= 3) {
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Error sending request:", error);
      toast.error("Failed to send request");
    }
  };

  const handleSuperLike = async (userId) => {
    try {
      await axios.post(
        `/api/request/send/interested/${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success("Super like sent! 🚀");

      // Increment pending count for super like
      dispatch(incrementPendingCount());

      // Remove current user from feed
      setUsers((prev) => prev.filter((user) => user._id !== userId));
      setCurrentIndex((prev) => Math.min(prev, users.length - 2));
    } catch (error) {
      console.error("Error sending super like:", error);
      toast.error("Failed to send super like");
    }
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.skills?.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesGender = !filters.gender || user.Gender === filters.gender;

    const matchesAge =
      (!filters.minAge || user.age >= parseInt(filters.minAge)) &&
      (!filters.maxAge || user.age <= parseInt(filters.maxAge));

    const matchesSkills =
      filters.skills.length === 0 ||
      filters.skills.some((filterSkill) =>
        user.skills?.some((userSkill) =>
          userSkill.toLowerCase().includes(filterSkill.toLowerCase())
        )
      );

    return matchesSearch && matchesGender && matchesAge && matchesSkills;
  });

  const currentUser = filteredUsers[currentIndex];

  const nextUser = () => {
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const previousUser = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const resetFilters = () => {
    setFilters({
      gender: "",
      minAge: "",
      maxAge: "",
      skills: [],
    });
    setSearchTerm("");
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
                     <p className="text-gray-600 dark:text-gray-300">Loading developers...</p>
        </div>
      </div>
    );
  }

  if (filteredUsers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 opacity-30">👥</div>
                     <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
             No developers found
           </h2>
           <p className="text-gray-600 dark:text-gray-300 mb-4">
            {searchTerm || Object.values(filters).some((f) => f)
              ? "Try adjusting your search or filters"
              : "Check back later for new developers"}
          </p>
          {(searchTerm || Object.values(filters).some((f) => f)) && (
            <button onClick={resetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Developers
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Swipe through amazing developers and make meaningful connections
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="search-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Filter Toggle */}
          <div className="flex justify-center">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary flex items-center gap-2"
            >
              <FaFilter className="w-4 h-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-medium border border-gray-200 dark:border-gray-700"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Gender
                    </label>
                    <select
                      value={filters.gender}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      className="form-select"
                    >
                      <option value="">Any</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Min Age
                    </label>
                    <input
                      type="number"
                      min="18"
                      value={filters.minAge}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          minAge: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="18"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Max Age
                    </label>
                    <input
                      type="number"
                      min="18"
                      value={filters.maxAge}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          maxAge: e.target.value,
                        }))
                      }
                      className="form-input"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={resetFilters}
                    className="btn btn-secondary btn-sm"
                  >
                    Reset Filters
                  </button>
                                     <span className="text-sm text-gray-500 dark:text-gray-400">
                     {filteredUsers.length} developer
                     {filteredUsers.length !== 1 ? "s" : ""} found
                   </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* User Card */}
        <div className="relative">
          {/* Navigation Arrows */}
          {filteredUsers.length > 1 && (
            <>
              <button
                onClick={previousUser}
                disabled={currentIndex === 0}
                                 className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FaArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextUser}
                disabled={currentIndex === filteredUsers.length - 1}
                                 className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <FaArrowRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Current User Card */}
          <motion.div
            key={currentUser?._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <div className="card overflow-hidden">
              {/* User Image */}
              <div className="relative h-96 bg-gradient-to-br from-primary-100 to-secondary-100">
                {currentUser?.photo ? (
                  <img
                    src={currentUser.photo}
                    alt={currentUser.firstName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FaUser className="w-24 h-24 text-gray-400" />
                  </div>
                )}

                {/* User Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold mb-1">
                        {currentUser?.firstName} {currentUser?.lastName}
                      </h2>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <FaBirthdayCake className="w-4 h-4" />
                          {currentUser?.age} years
                        </span>
                        {currentUser?.Gender && (
                          <span className="flex items-center gap-1">
                            <FaVenusMars className="w-4 h-4" />
                            {currentUser.Gender}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="p-6">
                {/* About Section */}
                {currentUser?.about && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      About
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {currentUser.about}
                    </p>
                  </div>
                )}

                {/* Skills */}
                {currentUser?.skills && currentUser.skills.length > 0 && (
                  <div className="mb-4">
                                         <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200 mb-2 flex items-center gap-2">
                       <FaCode className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                       Skills & Technologies
                     </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentUser.skills.map((skill, index) => (
                        <span key={index} className="skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="action-buttons">
                  <button
                    onClick={() => handleAction("dislike", currentUser._id)}
                    className="action-btn dislike"
                    title="Not Interested"
                  >
                    <FaTimes />
                  </button>

                  <button
                    onClick={() => handleSuperLike(currentUser._id)}
                    className="action-btn super"
                    title="Super Like"
                  >
                    <FaStar />
                  </button>

                  <button
                    onClick={() => handleAction("like", currentUser._id)}
                    className="action-btn like"
                    title="Interested"
                  >
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <div className="mt-6 text-center">
            <div className="flex justify-center gap-2">
              {filteredUsers.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? "bg-primary-600 w-6"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
               {currentIndex + 1} of {filteredUsers.length}
             </p>
          </div>
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="btn btn-secondary"
            >
              Load More Developers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
