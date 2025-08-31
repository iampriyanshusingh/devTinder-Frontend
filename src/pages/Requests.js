import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';
import { decrementPendingCount } from '../store/requestSlice';
import { FaBell, FaUser, FaCode, FaBirthdayCake, FaVenusMars, FaCheck, FaTimes } from 'react-icons/fa';

const Requests = () => {
  const dispatch = useDispatch();
  const { pendingCount } = useSelector((state) => state.requests);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/user/requests/received', { withCredentials: true });
      if (response.data?.data) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAction = async (requestId, action) => {
    try {
      const status = action === 'accept' ? 'accepted' : 'rejected';
      await axios.post(`/api/request/review/${status}/${requestId}`, {}, { withCredentials: true });
      
      toast.success(`Request ${action === 'accept' ? 'accepted' : 'rejected'} successfully!`);
      
      // Remove the request from the list
      setRequests(prev => prev.filter(req => req._id !== requestId));
      
      // Update Redux count
      dispatch(decrementPendingCount());
    } catch (error) {
      console.error('Error handling request:', error);
      toast.error(`Failed to ${action} request`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading requests...</p>
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
            Connection Requests
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Review and respond to incoming connection requests
          </p>
        </div>

        {requests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="text-6xl mb-4 opacity-30">📬</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No pending requests</h2>
            <p className="text-gray-600 dark:text-gray-300">
              You're all caught up! Check back later for new requests.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-300"
              >
                <div className="card-body text-center">
                  {/* Profile Image */}
                  <div className="mb-4">
                    {request.fromUserId?.photo ? (
                      <img
                        src={request.fromUserId.photo}
                        alt={request.fromUserId.firstName}
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
                    {request.fromUserId?.firstName} {request.fromUserId?.lastName}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-center gap-2 text-gray-600">
                      <FaBirthdayCake className="w-4 h-4" />
                      <span>{request.fromUserId?.age} years old</span>
                    </div>
                    
                    {request.fromUserId?.Gender && (
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <FaVenusMars className="w-4 h-4" />
                        <span>{request.fromUserId.Gender}</span>
                      </div>
                    )}
                  </div>

                                     {/* About Section */}
                   {request.fromUserId?.about && (
                     <div className="mb-4">
                       <h4 className="text-sm font-medium text-gray-700 mb-2">
                         About
                       </h4>
                       <p className="text-gray-600 text-sm leading-relaxed px-4">
                         {request.fromUserId.about.length > 100 
                           ? `${request.fromUserId.about.substring(0, 100)}...` 
                           : request.fromUserId.about}
                       </p>
                     </div>
                   )}

                   {/* Skills */}
                   {request.fromUserId?.skills && request.fromUserId.skills.length > 0 && (
                     <div className="mb-4">
                       <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center justify-center gap-2">
                         <FaCode className="w-4 h-4" />
                         Skills
                       </h4>
                       <div className="flex flex-wrap gap-1 justify-center">
                         {request.fromUserId.skills.slice(0, 3).map((skill, skillIndex) => (
                           <span
                             key={skillIndex}
                             className="skill-tag text-xs"
                           >
                             {skill}
                           </span>
                         ))}
                         {request.fromUserId.skills.length > 3 && (
                           <span className="text-xs text-gray-500">
                             +{request.fromUserId.skills.length - 3} more
                           </span>
                         )}
                       </div>
                     </div>
                   )}

                  {/* Request Status */}
                  <div className="mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
                      <FaBell className="w-3 h-3 mr-1" />
                      Pending Review
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleRequestAction(request._id, 'accept')}
                      className="btn btn-success btn-sm flex-1 flex items-center justify-center gap-2"
                    >
                      <FaCheck className="w-4 h-4" />
                      Accept
                    </button>
                    <button
                      onClick={() => handleRequestAction(request._id, 'reject')}
                      className="btn btn-danger btn-sm flex-1 flex items-center justify-center gap-2"
                    >
                      <FaTimes className="w-4 h-4" />
                      Reject
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

export default Requests;
