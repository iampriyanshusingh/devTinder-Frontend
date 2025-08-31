import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FaUser,
  FaCode,
  FaBirthdayCake,
  FaVenusMars,
  FaComment,
} from "react-icons/fa";

const Connections = () => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/user/connections", {
        withCredentials: true,
      });
      if (response.data?.data) {
        setConnections(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching connections:", error);
      toast.error("Failed to load connections");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading connections...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Your Connections
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Developers you've successfully connected with
          </p>
        </div>

        {connections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4 opacity-30">🤝</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No connections yet
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Start swiping through developers to make your first connection!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {connections.map((connection, index) => (
              <motion.div
                key={connection._id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body text-center">
                  {/* Profile Image */}
                  <div className="mb-4">
                    {connection.photo ? (
                      <img
                        src={connection.photo}
                        alt={connection.firstName}
                        className="profile-image medium mx-auto"
                      />
                    ) : (
                      <div className="w-32 h-32 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto">
                        <FaUser className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* User Info */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {connection.firstName} {connection.lastName}
                  </h3>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <FaBirthdayCake className="w-4 h-4" />
                      <span>{connection.age} years old</span>
                    </div>

                    {connection.Gender && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FaVenusMars className="w-4 h-4" />
                        <span>{connection.Gender}</span>
                      </div>
                    )}
                  </div>

                                     {/* About Section */}
                   {connection.about && (
                     <div className="mb-4">
                       <h4 className="text-sm font-medium text-gray-700 mb-2">
                         About
                       </h4>
                       <p className="text-gray-600 text-sm leading-relaxed px-4">
                         {connection.about.length > 100 
                           ? `${connection.about.substring(0, 100)}...` 
                           : connection.about}
                       </p>
                     </div>
                   )}

                   {/* Skills */}
                   {connection.skills && connection.skills.length > 0 && (
                     <div className="mb-4">
                       <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-center gap-2">
                         <FaCode className="w-4 h-4" />
                         Skills
                       </h4>
                       <div className="flex flex-wrap gap-1 justify-center">
                         {connection.skills
                           .slice(0, 3)
                           .map((skill, skillIndex) => (
                             <span
                               key={skillIndex}
                               className="skill-tag text-xs"
                             >
                               {skill}
                             </span>
                           ))}
                         {connection.skills.length > 3 && (
                           <span className="text-xs text-gray-500">
                             +{connection.skills.length - 3} more
                           </span>
                         )}
                       </div>
                     </div>
                   )}

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="btn btn-primary btn-sm flex-1 flex items-center justify-center gap-2">
                      <FaComment className="w-4 h-4" />
                      Message
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Connections;
