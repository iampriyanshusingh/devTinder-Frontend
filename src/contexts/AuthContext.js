import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if there's a token in cookies
      const response = await axios.get('/api/profile/view', { withCredentials: true });
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      // User is not authenticated
      console.log('User not authenticated');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
      
      if (response.data) {
        setUser(response.data);
        toast.success('Login successful!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data || 'Login failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/signup', userData);
      
      if (response.status === 200) {
        toast.success('Account created successfully! Please login.');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data || 'Signup failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if the API call fails, clear the local user state
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.patch('/api/profile/edit', profileData, { withCredentials: true });
      if (response.data?.data) {
        setUser(response.data.data);
        toast.success('Profile updated successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data || 'Profile update failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      const response = await axios.patch('/api/profile/password', { password: newPassword }, { withCredentials: true });
      if (response.data?.data) {
        setUser(response.data.data);
        toast.success('Password updated successfully!');
        return { success: true };
      }
    } catch (error) {
      const message = error.response?.data || 'Password update failed. Please try again.';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    updatePassword,
    checkAuthStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
