import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCode, 
  FaUsers, 
  FaRocket, 
  FaHeart, 
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaArrowRight
} from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: FaCode,
      title: 'Developer Focused',
      description: 'Connect with developers who share your passion for coding and technology.'
    },
    {
      icon: FaUsers,
      title: 'Build Networks',
      description: 'Expand your professional network and find collaborators for your next project.'
    },
    {
      icon: FaRocket,
      title: 'Career Growth',
      description: 'Discover opportunities and mentors to accelerate your career in tech.'
    },
    {
      icon: FaHeart,
      title: 'Meaningful Connections',
      description: 'Find developers who match your skills, interests, and career goals.'
    }
  ];

  const stats = [
    { number: '1000+', label: 'Developers' },
    { number: '500+', label: 'Connections Made' },
    { number: '50+', label: 'Technologies' },
    { number: '24/7', label: 'Active Community' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/10 to-secondary-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl shadow-2xl mb-6">
                <FaCode className="text-white text-3xl" />
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
                Welcome to{' '}
                <span className="text-gradient">DevTinder</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                The ultimate platform for developers to connect, collaborate, and grow together. 
                Swipe right on amazing opportunities and build your dream tech network.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                to="/signup"
                className="btn btn-primary btn-lg group"
              >
                Get Started Free
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary btn-lg"
              >
                Already have an account?
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-success-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </section>

             {/* Features Section */}
       <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
                         <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
               Why Choose DevTinder?
             </h2>
             <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
               We've built the perfect platform for developers to connect and grow together
             </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="text-white text-2xl" />
                  </div>
                                     <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                     {feature.title}
                   </h3>
                   <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                     {feature.description}
                   </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-primary-100 text-lg">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

             {/* CTA Section */}
       <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
                         <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
               Ready to Start Your Developer Journey?
             </h2>
             <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
               Join thousands of developers who are already building amazing connections and advancing their careers.
             </p>
            <Link
              to="/signup"
              className="btn btn-primary btn-lg"
            >
              Create Your Profile Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
                <FaCode className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold">DevTinder</span>
            </div>
            
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                <FaTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; 2024 DevTinder. All rights reserved. Built with ❤️ for developers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
