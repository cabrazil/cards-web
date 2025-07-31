import React from 'react';
import { CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { getThemeClasses } from '../shared/theme/theme';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center font-roboto" style={{ backgroundColor: '#011627' }}>
      <div className="text-center px-6 max-w-4xl mx-auto">
        {/* Welcome Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="text-gray-100 text-h4 font-medium"> 
            Bem-vindo(a) ao
          </p>
        </motion.div>

        {/* Logo and App Name */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl">
                <CreditCard className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-h4 md:text-h5 font-bold text-gray-100 mb-8">
            O Cartão Ideal
          </h1>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-h3 md:text-h1 font-bold text-gray-200 mb-6">
            O cartão de crédito ideal para seu perfil
          </h2>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <p className="text-gray-200 text-h6 md:text-h5 leading-relaxed max-w-3xl mx-auto">
            Sua renda, hábitos e sonhos, sua realidade define o que é ideal para você.<br />
            Por outro lado, se olharmos para: <span className="text-blue-300 font-semibold italic">grupos de pessoas com realidades semelhantes </span> 
            podemos encontrar ótimas opções.<br />
            Quer saber como e achar o cartão que combina com sua vida?
          </p> 
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <button 
            onClick={() => {
              window.history.pushState({}, '', '/app');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className={`${getThemeClasses.button.primary} font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto`}
          >
            Vamos começar
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home; 