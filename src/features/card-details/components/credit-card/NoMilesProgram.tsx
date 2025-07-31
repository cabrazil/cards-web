import React from 'react';
import { Plane } from 'lucide-react';
import { motion } from 'framer-motion';

export const NoMilesProgram: React.FC = () => {
  return (
    <div className="rounded-lg border overflow-hidden shadow-md w-full min-w-[600px] max-w-[700px]" style={{ backgroundColor: '#163D57', borderColor: '#FF9F1C' }}>
      {/* Header com título e ícone */}
      <div className="bg-slate-800 px-4 py-3 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Plane className="text-white w-5 h-5" />
            <h3 className="text-white font-semibold text-base">Programa de Milhas</h3>
          </div>
        </div>
      </div>

      {/* Conteúdo do card */}
      <div className="p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-6"
        >
          <p className="text-white text-sm font-medium text-center">
            Este cartão não possui programa de milhas
          </p>
          <p className="text-gray-300 text-xs text-center mt-1">
            Explore outros benefícios disponíveis
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default NoMilesProgram;

