import React, { useState, useEffect } from 'react';
import { CreditCard, Award, AlertCircle, ArrowLeft, ArrowRight, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Option {
  id: number;
  text: string;
  value: string;
  displayOrder: number;
}

interface Question {
  id: number;
  key: string;
  text: string;
  helpText: string | null;
  type: string;
  displayOrder: number;
  showWhenQuestionId?: number | null;
  showWhenOptionId?: number | null;
  options: Option[];
}

interface Section {
  id: number;
  key: string;
  title: string;
  description: string | null;
  displayOrder: number;
  iconName: string | null;
  questions: Question[];
}

interface Recommendation {
  id: number;
  name: string;
  slug: string;
  annualFee: number;
  category: string;
  pictureUrl: string | null;
  issuer: string;
  brand: string;
  compatScore: number;
  reasons: string[];
}

export const OnboardingPage: React.FC = () => {
  const [, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado do teste
  const [started, setStarted] = useState(false);
  const [flatQuestions, setFlatQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({}); // questionId -> optionId
  const [showResults, setShowResults] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  // 1. Carregar perguntas do Onboarding
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/onboarding/questions`);
        if (!res.ok) throw new Error('Não foi possível obter as perguntas.');
        
        const data: Section[] = await res.json();
        setSections(data);

        // Aplanar todas as perguntas em um array sequencial ordenado por seção e displayOrder
        const questions: Question[] = [];
        data.forEach((sec) => {
          sec.questions.forEach((q) => {
            questions.push(q);
          });
        });
        setFlatQuestions(questions);
      } catch (err: any) {
        setError(err.message || 'Erro de conexão com o backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [API_URL]);

  // Filtrar perguntas visíveis com base nas respostas condicionais
  const getVisibleQuestions = () => {
    return flatQuestions.filter((q) => {
      if (!q.showWhenQuestionId || !q.showWhenOptionId) {
        return true;
      }
      // Verificar se a resposta para o pai corresponde à opção esperada
      return answers[q.showWhenQuestionId] === q.showWhenOptionId;
    });
  };

  const visibleQuestions = getVisibleQuestions();

  const handleSelectOption = (questionId: number, optionId: number) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: optionId };
      
      // Limpar respostas de perguntas filhas caso a opção pai tenha mudado
      flatQuestions.forEach((q) => {
        if (q.showWhenQuestionId === questionId && q.showWhenOptionId !== optionId) {
          delete newAnswers[q.id];
        }
      });
      
      return newAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      setStarted(false);
    }
  };

  // 2. Enviar respostas e calcular recomendação
  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Enviar apenas as respostas das perguntas que estavam visíveis no fluxo
      const visibleIds = new Set(visibleQuestions.map((q) => q.id));
      const payload = Object.entries(answers)
        .filter(([qId]) => visibleIds.has(Number(qId)))
        .map(([qId, oId]) => ({
          questionId: Number(qId),
          optionId: oId,
        }));

      const res = await fetch(`${API_URL}/recommendations/simulate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers: payload }),
      });

      if (!res.ok) throw new Error('Falha ao calcular recomendação.');

      const data = await res.json();
      setRecommendations(data.recommendations);
      setShowResults(true);
    } catch (err: any) {
      alert(err.message || 'Erro ao processar.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
    setRecommendations([]);
    setStarted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-200" style={{ backgroundColor: '#011627' }}>
        <div className="text-center">
          <RefreshCw className="w-10 h-10 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-lg">Carregando perguntas do Onboarding...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-200" style={{ backgroundColor: '#011627' }}>
        <div className="text-center max-w-md p-6 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Erro de Conexão</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-sm text-yellow-300">Dica: Certifique-se de que o backend esteja rodando no terminal na porta 3333!</p>
        </div>
      </div>
    );
  }

  const currentQuestion = visibleQuestions[currentQuestionIndex];
  const progressPercent = Math.round((currentQuestionIndex / visibleQuestions.length) * 100);

  return (
    <div className="min-h-screen flex flex-col font-roboto text-gray-100" style={{ backgroundColor: '#011627' }}>
      {/* Header visível quando o quiz está ativo ou exibindo resultados */}
      {started && (
        <header className="border-b border-slate-800 bg-slate-900/60 py-4 px-6 sticky top-0 backdrop-blur-md z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20">
                <CreditCard className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold tracking-tight text-lg text-white">Assistente de Recomendação</span>
            </div>
            <button 
              onClick={() => {
                setStarted(false);
                setShowResults(false);
                setCurrentQuestionIndex(0);
              }}
              className="text-gray-400 hover:text-white transition text-sm font-medium flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Início
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            {!started ? (
              /* Tela de Apresentação Integrada da Home */
              <motion.div
                key="presentation"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="text-center px-4 max-w-2xl mx-auto py-6"
              >
                {/* Logo e Ícone Emblemático */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-6"
                >
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/20 ring-4 ring-slate-800">
                        <CreditCard className="w-12 h-12 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full border-2 border-[#011627] flex items-center justify-center shadow-md">
                        <div className="w-2.5 h-2.5 bg-white rounded-full" />
                      </div>
                    </div>
                  </div>
                  <span className="text-xs uppercase tracking-widest text-blue-400 font-bold bg-blue-500/10 px-3.5 py-1 rounded-full border border-blue-500/20">
                    O Cartão Ideal
                  </span>
                </motion.div>

                {/* Título Principal */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-5"
                >
                  <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-300 leading-tight">
                    O cartão de crédito ideal para seu perfil
                  </h1>
                </motion.div>

                {/* Descrição e Proposta de Valor */}
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="mb-8"
                >
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                    Sua renda, hábitos e sonhos: sua realidade define o que é ideal para você.
                    Responda ao nosso questionário rápido e descubra em <strong>menos de 1 minuto</strong> quais cartões combinam com a sua vida.
                  </p>
                </motion.div>

                {/* Botão de Iniciar Quiz com micro-animação */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col items-center gap-4"
                >
                  <button
                    onClick={() => setStarted(true)}
                    className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-lg shadow-xl shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                    <span>Iniciar Quiz</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {/* Link Admin Discreto */}
                  <div className="mt-8">
                    <button
                      onClick={() => {
                        window.history.pushState({}, '', '/admin');
                        window.dispatchEvent(new PopStateEvent('popstate'));
                      }}
                      className="text-xs text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
                    >
                      ⚙️ Painel Admin (Ingestão de Cartões)
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            ) : !showResults ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md"
              >
                {/* Progress bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-xs text-gray-400 mb-2 font-medium">
                    <span>PERGUNTA {currentQuestionIndex + 1} DE {visibleQuestions.length}</span>
                    <span>{progressPercent}% COMPLETO</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h2 className="text-xl md:text-2xl font-semibold mb-2 text-white">
                    {currentQuestion.text}
                  </h2>
                  {currentQuestion.helpText && (
                    <p className="text-sm text-gray-400 font-medium">
                      {currentQuestion.helpText}
                    </p>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-3 mb-8">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption(currentQuestion.id, opt.id)}
                        className={`w-full text-left p-4 rounded-xl border font-medium text-sm md:text-base flex items-center justify-between transition-all duration-200 ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/5'
                            : 'bg-slate-900/40 border-slate-800 text-gray-300 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <span>{opt.text}</span>
                        {isSelected && (
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between border-t border-slate-800/80 pt-6">
                  <button
                    onClick={handlePrev}
                    disabled={currentQuestionIndex === 0}
                    className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
                      currentQuestionIndex === 0
                        ? 'text-gray-600 cursor-not-allowed'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <ArrowLeft className="w-4 h-4" /> Anterior
                  </button>

                  <button
                    onClick={handleNext}
                    disabled={submitting || answers[currentQuestion.id] === undefined}
                    className={`flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition shadow-lg ${
                      answers[currentQuestion.id] === undefined
                        ? 'bg-slate-800 text-gray-500 cursor-not-allowed shadow-none'
                        : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/10'
                    }`}
                  >
                    {submitting ? (
                      <>Processando <RefreshCw className="w-4 h-4 animate-spin" /></>
                    ) : currentQuestionIndex === visibleQuestions.length - 1 ? (
                      <>Ver Recomendação <Award className="w-4 h-4" /></>
                    ) : (
                      <>Próxima <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md"
              >
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                    <Award className="w-8 h-8" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">Seus Cartões Ideais</h2>
                  <p className="text-sm md:text-base text-gray-400">
                    Baseado no cruzamento de dados do onboarding com nosso motor de pontuação.
                  </p>
                </div>

                {recommendations.length === 0 ? (
                  <div className="text-center p-8 bg-slate-800/40 rounded-xl border border-slate-800">
                    <p className="text-gray-400">Infelizmente, nenhum cartão pontuou o suficiente para o seu perfil.</p>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    {recommendations.map((rec, idx) => (
                      <div 
                        key={rec.id}
                        className="bg-slate-950/40 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition"
                      >
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <span className="inline-block px-2.5 py-0.5 bg-blue-500/10 text-blue-400 rounded text-xs font-semibold mb-2">
                              #{idx + 1} Melhor Match
                            </span>
                            <h3 className="text-lg font-bold text-white mb-0.5">{rec.name}</h3>
                            <p className="text-xs text-gray-400 font-medium">
                              Emissor: {rec.issuer} | Bandeira: {rec.brand}
                            </p>
                          </div>
                          
                          {/* Circle radial match score */}
                          <div className="text-right">
                            <span className="block text-2xl font-black text-blue-400">{rec.compatScore}%</span>
                            <span className="block text-[10px] text-gray-400 tracking-wider font-bold">MATCH</span>
                          </div>
                        </div>

                        {/* Reasons */}
                        <div className="bg-slate-900/50 rounded-lg p-3.5 border border-slate-900">
                          <span className="block text-xs font-bold text-gray-400 mb-2 tracking-wide">POR QUE É INDICADO PARA VOCÊ:</span>
                          <ul className="space-y-2">
                            {rec.reasons.map((r, rIdx) => (
                              <li key={rIdx} className="text-sm text-gray-300 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 shrink-0" />
                                <span>{r}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mt-4 flex items-center justify-between text-xs text-gray-400">
                          <span>Anuidade: {rec.annualFee === 0 ? 'Gratuita' : `R$ ${rec.annualFee.toFixed(2)}`}</span>
                          <span>Categoria: {rec.category}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handleRestart}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold transition shadow-lg shadow-blue-600/20 cursor-pointer w-full sm:w-fit justify-center"
                  >
                    <RefreshCw className="w-4 h-4" /> Responder Novamente
                  </button>
                  <button
                    onClick={() => {
                      setStarted(false);
                      setShowResults(false);
                      setCurrentQuestionIndex(0);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white rounded-xl text-sm font-semibold transition border border-slate-700 cursor-pointer w-full sm:w-fit justify-center"
                  >
                    <ArrowLeft className="w-4 h-4" /> Voltar ao Início
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};
