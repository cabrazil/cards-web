import React, { useState, useEffect } from 'react';
import { Download, Share, PlusSquare, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [showIosModal, setShowIosModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Verificar se já está rodando como PWA instalado
    const isStandaloneMode = 
      window.matchMedia('(display-mode: standalone)').matches || 
      (window.navigator as any).standalone === true;
    
    setIsStandalone(isStandaloneMode);

    // Detectar iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Capturar evento de instalação do Chrome/Android/Edge
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else if (isIos) {
      setShowIosModal(true);
    }
  };

  // Se já estiver instalado ou o usuário dispensou o banner, não mostra
  if (isStandalone || dismissed) {
    return null;
  }

  // Só exibe se houver o prompt do Android/Desktop ou se for iOS
  if (!deferredPrompt && !isIos) {
    return null;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-96 z-50"
      >
        <div className="bg-slate-900/95 backdrop-blur-md border border-blue-500/30 rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
              <Download className="w-5 h-5 animate-bounce" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-100">Instalar aplicativo</p>
              <p className="text-xs text-gray-400">Acesse direto da sua tela inicial</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleInstallClick}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors shadow-md shrink-0"
            >
              Instalar
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-gray-400 hover:text-gray-200 p-1"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal de instruções para iPhone / iPad */}
      <AnimatePresence>
        {showIosModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg text-gray-100">Como instalar no iPhone</h3>
                <button 
                  onClick={() => setShowIosModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-gray-300">
                <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                    <Share className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">1. Toque em Compartilhar</span>
                    <p className="text-xs text-gray-400 mt-0.5">Na barra inferior do Safari, clique no botão de compartilhamento.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
                    <PlusSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-white">2. Adicionar à Tela de Início</span>
                    <p className="text-xs text-gray-400 mt-0.5">Role as opções e toque em "Adicionar à Tela de Início".</p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIosModal(false)}
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
              >
                Entendi
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
