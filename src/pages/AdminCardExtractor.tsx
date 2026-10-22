import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Save,
  Sliders,
  Shield,
  Award,
  CreditCard as CardIcon,
  Plane,
  Globe,
  Search,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ExtractedData {
  card: {
    name: string;
    slug: string;
    status?: 'ACTIVE' | 'INACTIVE' | 'DISCONTINUED';
    segment: 'ALTA_RENDA' | 'INTERMEDIARIO' | 'ENTRADA';
    category: string;
    annualFee: number;
    spreadRate: number;
    pointsExpire: boolean;
    rankPoints: number;
    rankBenefits: number;
    rankAnnuity: number;
    rankMilesProgram: number;
    rankVipLounges: number;
    vipLoungeApp?: string;
    obsSummary: string[];
    issuerName: string;
    brandName: string;
    brandVariant: string;
  };
  zeroFees: Array<{
    expenses?: string;
    investments?: string;
    feeDiscount: number;
    conditions: string[];
  }>;
  rewards: Array<{
    expenses: string;
    pointsPerDollar: number;
    pointsPerReal?: number;
    rules?: string;
    expiration: boolean;
    notes?: string;
  }>;
  lounges: Array<{
    name: string;
    accessLimit: string;
    conditions?: string;
    isPaid: boolean;
  }>;
  criterionScores: Record<string, number>;
}

const CRITERIA_LABELS: Record<string, { label: string; desc: string }> = {
  income_level: { label: 'Nível de Renda', desc: 'Exigência de renda mínima ou convite' },
  monthly_spending: { label: 'Volume de Gastos', desc: 'Metas mensais de fatura para benefícios' },
  investment_level: { label: 'Investimentos', desc: 'Exigência de patrimônio investido' },
  prefers_miles: { label: 'Acúmulo de Milhas', desc: 'Força de pontuação aérea por dólar' },
  prefers_cashback: { label: 'Cashback', desc: 'Retorno direto em dinheiro na fatura' },
  prefers_points: { label: 'Programa de Pontos', desc: 'Livelo, Esfera, Átomos, Itaú Pontos' },
  prefers_low_fee: { label: 'Isenção de Anuidade', desc: 'Facilidade para anuidade zero/baixa' },
  travel_domestic: { label: 'Viagens Nacionais', desc: 'Vantagens para voos dentro do Brasil' },
  travel_international: { label: 'Viagens Internacionais', desc: 'Benefícios e coberturas no exterior' },
  values_lounge: { label: 'Salas VIP / Lounges', desc: 'Acessos a lounges e convidados' },
  low_score_friendly: { label: 'Acessível Score Baixo', desc: 'Aprovação para quem tem score menor' },
  no_income_proof: { label: 'Sem Comprovante Renda', desc: 'Dispensa comprovação formal de renda' },
  beginner_friendly: { label: 'Amigável a Iniciantes', desc: 'Fácil de usar e gerenciar' },
  digital_first: { label: 'Banco 100% Digital', desc: 'Nubank, C6, Inter e fintechs' },
  traditional_bank: { label: 'Banco Tradicional', desc: 'Itaú, Bradesco, Santander, BB, Caixa' },
  international_purchase: { label: 'Compras no Exterior', desc: 'Uso em moeda estrangeira' },
  spread_rate_quality: { label: 'Spread Cambial Baixo', desc: 'Taxa competitiva sobre o dólar' },
  insurance_coverage: { label: 'Cobertura de Seguros', desc: 'Seguro viagem, compra protegida, auto' },
  additional_cards: { label: 'Cartões Adicionais', desc: 'Cartões extras gratuitos para família' },
};

export const AdminCardExtractor: React.FC = () => {
  const [rawText, setRawText] = useState('');
  const [useWebSearch, setUseWebSearch] = useState(false);
  const [model, setModel] = useState('google/gemini-2.5-flash');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [extracted, setExtracted] = useState<ExtractedData | null>(null);
  const [existingMatch, setExistingMatch] = useState<{ id: number; name: string; slug: string } | null>(null);
  const [saveMode, setSaveMode] = useState<'update' | 'new'>('new');

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3333';

  // Exemplo rápido para teste
  const sampleTheOne = `O Itaú Personnalité The One Mastercard Black é o cartão mais exclusivo do Itaú Personnalité.
- Anuidade: R$ 4.000,00 por ano (12x de R$ 333,33).
- Regras de isenção de anuidade:
  * Isenção de 100% para faturas a partir de R$ 60.000,00 no mês.
  * Desconto de 50% para faturas entre R$ 30.000,00 e R$ 59.999,00.
  * Isenção total para quem possui a partir de R$ 5 milhões investidos no Itaú Personnalité.
  * Isenção pelo programa Minhas Vantagens (Nível 5).
- Regras de Pontuação:
  * Fatura igual ou acima de R$ 4.000/mês: Mantém a pontuação padrão de 3,0 pontos por dólar nacional e 3,5 pontos internacional.
  * Fatura abaixo de R$ 4.000/mês: Pontuação reduzida para 2,0 pontos por dólar nacional e 3,0 pontos internacional.
  * Os pontos nunca expiram.
- Acesso a Salas VIP:
  * LoungeKey: Acesso gratuito e ilimitado para titular e adicionais, mais 12 convidados por ano.
  * Salas VIP Mastercard Black no Terminal 3 de Guarulhos (GRU) ilimitadas.
- Benefícios:
  * Concierge The Assistant 24h, parceria Fasano, seguros Mastercard Black.
- Emissor: Itaú Personnalité | Bandeira: Mastercard Black`;

  const handleExtract = async () => {
    const minLength = useWebSearch ? 3 : 20;
    if (!rawText.trim() || rawText.length < minLength) {
      setError(
        useWebSearch
          ? 'Por favor, digite o nome do cartão para buscar na web.'
          : 'Por favor, cole um texto com pelo menos 20 caracteres.'
      );
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccessMessage(null);

      const res = await fetch(`${API_URL}/admin/cards/extract`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: rawText, model, useWebSearch }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erro na extração.');

      setExtracted(json.data);
      const match = json.existingMatch || null;
      setExistingMatch(match);
      setSaveMode(match ? 'update' : 'new');
    } catch (err: any) {
      setError(err.message || 'Erro ao comunicar com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleScoreChange = (key: string, newScore: number) => {
    if (!extracted) return;
    setExtracted({
      ...extracted,
      criterionScores: {
        ...extracted.criterionScores,
        [key]: newScore,
      },
    });
  };

  const handleSaveToDatabase = async () => {
    if (!extracted) return;

    try {
      setSaving(true);
      setError(null);

      const res = await fetch(`${API_URL}/admin/cards/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: extracted,
          targetCardId: saveMode === 'update' && existingMatch ? existingMatch.id : null,
          forceNew: saveMode === 'new',
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erro ao salvar cartão.');

      setSuccessMessage(json.message || 'Cartão salvo com sucesso no PostgreSQL!');
      // Limpar a tela para o próximo cartão
      setExtracted(null);
      setExistingMatch(null);
      setSaveMode('new');
      setRawText('');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Erro ao persistir no banco de dados.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#011627] text-white p-6 md:p-12 font-roboto">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-100">Painel Admin — Ingestão de Cartões</h1>
                <p className="text-sm text-gray-400">Cole a matéria do cartão, visualize e valide antes de salvar no banco</p>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              window.history.pushState({}, '', '/');
              window.dispatchEvent(new PopStateEvent('popstate'));
            }}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg text-sm border border-slate-700 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o App
          </button>
        </div>

        {/* Feedback de Erro ou Sucesso */}
        {error && (
          <div className="p-4 bg-red-950/50 border border-red-500/40 rounded-xl text-red-200 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-4 bg-green-950/60 border border-green-500/40 rounded-xl text-green-200 flex items-center justify-between gap-3 text-sm shadow-lg shadow-green-950/40">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 text-green-400" />
              <div>
                <p className="font-semibold text-green-300">{successMessage}</p>
                <p className="text-xs text-green-400/80 mt-0.5">A tela foi limpa e está pronta para processar o próximo cartão.</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="text-xs text-green-300 hover:text-white px-3 py-1 rounded-lg bg-green-900/40 border border-green-500/30 transition-colors"
            >
              Dispensar
            </button>
          </div>
        )}

        {/* 1. Área de Entrada de Dados (Abas: Colar Texto ou Buscar na Web) */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setUseWebSearch(false)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  !useWebSearch
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Colar Texto / Artigo
              </button>

              <button
                type="button"
                onClick={() => {
                  setUseWebSearch(true);
                  setRawText('');
                }}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  useWebSearch
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-900/30'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-slate-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                Buscar Fontes na Web (IA em Tempo Real)
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-400">Modelo:</span>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
              >
                <option value="google/gemini-2.5-flash">Gemini 2.5 Flash (Recomendado c/ Web)</option>
                <option value="deepseek/deepseek-chat">DeepSeek Chat</option>
                <option value="openai/gpt-4o-mini">GPT-4o Mini</option>
              </select>
            </div>
          </div>

          {useWebSearch ? (
            /* Modo de Busca na Web */
            <div className="space-y-3">
              <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-xl text-blue-200 text-xs flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <strong>Busca Web Ativa:</strong> Digite apenas o nome do cartão. A IA pesquisará em tempo real portais especializados (Melhores Cartões, Passageiro de Primeira, Alta Renda Blog, etc.) para compilar anuidade, salas VIP e pontuações vigentes de 2026.
                </span>
              </div>

              <div className="relative">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder=""
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-sm text-gray-100 placeholder-transparent focus:outline-none focus:border-blue-500 font-medium"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleExtract();
                  }}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-gray-400">Sugestões rápidas:</span>
                {['BRB Visa Infinite DUX', 'Santander Unlimited Visa Infinite', 'Bradesco Aeternum Visa Infinite', 'C6 Carbon Mastercard Black'].map((name) => (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setRawText(name)}
                    className="text-xs px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-gray-300 rounded-lg border border-slate-700 transition-colors"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Modo Colar Texto Manual */
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-gray-300">
                  Cole o texto, matéria ou regulamento do cartão:
                </label>
                <button
                  type="button"
                  onClick={() => setRawText(sampleTheOne)}
                  className="text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Colar exemplo (Itaú The One)
                </button>
              </div>

              <textarea
                rows={7}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="Cole aqui a matéria ou artigo (ex: do Melhores Cartões, Passageiro de Primeira ou site oficial)..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              onClick={handleExtract}
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-lg shadow-blue-900/30 transition-all cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {useWebSearch ? 'Pesquisando na Web & Analisando...' : 'Processando com IA...'}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  {useWebSearch ? 'Pesquisar na Web e Extrair Dados' : 'Extrair Informações para Revisão'}
                </>
              )}
            </button>
          </div>
        </div>

        {/* 2. Visualizador e Validador (Antes de Salvar) */}
        {extracted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* 1. Alerta quando este mesmo cartão já existe na base */}
            {existingMatch ? (
              <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-2xl text-sm shadow-xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
                    <span className="font-semibold text-amber-300">
                      Este cartão já está cadastrado na base: "{existingMatch.name}" (ID {existingMatch.id})
                    </span>
                  </div>
                  <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded font-mono w-fit">
                    ID: {existingMatch.id}
                  </span>
                </div>

                <p className="text-xs text-gray-300">
                  Deseja atualizar os dados do registro existente ou cadastrá-lo como um novo cartão separado?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setSaveMode('update')}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      saveMode === 'update'
                        ? 'bg-amber-950/60 border-amber-500 text-white shadow-lg shadow-amber-950/50 ring-1 ring-amber-500'
                        : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      saveMode === 'update' ? 'border-amber-400 bg-amber-600' : 'border-gray-600'
                    }`}>
                      {saveMode === 'update' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                        Atualizar Cartão Existente (ID {existingMatch.id})
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        Atualiza as regras, taxas e pontuação mantendo o mesmo ID na base de dados.
                      </p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSaveMode('new')}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      saveMode === 'new'
                        ? 'bg-blue-950/60 border-blue-500 text-white shadow-lg shadow-blue-950/50 ring-1 ring-blue-500'
                        : 'bg-slate-950/60 border-slate-800 text-gray-400 hover:border-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      saveMode === 'new' ? 'border-blue-400 bg-blue-600' : 'border-gray-600'
                    }`}>
                      {saveMode === 'new' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                        Cadastrar como Novo Cartão
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                        Cria um novo registro independente na base (com slug único).
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3.5 bg-blue-950/40 border border-blue-500/30 rounded-xl text-blue-200 text-xs flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  <strong>Novo Cartão:</strong> Este cartão ainda não consta na base de dados e será cadastrado como um novo registro.
                </span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-gray-100 flex items-center gap-2">
                <CardIcon className="w-5 h-5 text-blue-400" />
                Ficha Técnica para Validação
              </h2>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setExtracted(null);
                    setExistingMatch(null);
                    setRawText('');
                  }}
                  className="text-xs text-gray-400 hover:text-red-400 border border-slate-700 hover:border-red-500/40 px-3 py-1 rounded-lg transition-colors"
                >
                  Descartar / Limpar
                </button>
                <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1 rounded-full">
                  Pronto para revisão
                </span>
              </div>
            </div>

            {/* Cabeçalho do Cartão */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-gray-400">Nome do Cartão</span>
                <p className="text-base font-semibold text-white mt-1 truncate" title={extracted.card.name}>
                  {extracted.card.name}
                </p>
                <span className="text-xs font-mono text-gray-500 mt-0.5 block truncate">{extracted.card.slug}</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-gray-400">Emissor & Bandeira</span>
                <p className="text-base font-semibold text-white mt-1 truncate">
                  {extracted.card.issuerName} • {extracted.card.brandName} {extracted.card.brandVariant}
                </p>
                <span className="text-xs text-blue-400 mt-0.5 block">Segmento: {extracted.card.segment}</span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                <span className="text-xs text-gray-400">Status no Motor</span>
                <div className="mt-1">
                  <select
                    value={extracted.card.status || 'ACTIVE'}
                    onChange={(e) =>
                      setExtracted({
                        ...extracted,
                        card: { ...extracted.card, status: e.target.value as any },
                      })
                    }
                    className={`w-full text-xs font-bold rounded-lg px-2.5 py-1.5 border focus:outline-none transition-colors ${
                      (extracted.card.status || 'ACTIVE') === 'ACTIVE'
                        ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                        : extracted.card.status === 'INACTIVE'
                        ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                        : 'bg-red-950/60 border-red-500/50 text-red-300'
                    }`}
                  >
                    <option value="ACTIVE" className="bg-slate-900 text-emerald-400">● ACTIVE (Ativo no Motor)</option>
                    <option value="INACTIVE" className="bg-slate-900 text-amber-400">○ INACTIVE (Pausado / Oculto)</option>
                    <option value="DISCONTINUED" className="bg-slate-900 text-red-400">✕ DISCONTINUED (Descontinuado)</option>
                  </select>
                </div>
                <span className="text-[11px] text-gray-400 mt-1 block">
                  {(extracted.card.status || 'ACTIVE') === 'ACTIVE'
                    ? 'Elegível para recomendações'
                    : 'Oculto das recomendações'}
                </span>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl">
                <span className="text-xs text-gray-400">Anuidade & Spread</span>
                <p className="text-base font-semibold text-white mt-1">
                  R$ {Number(extracted.card.annualFee).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </p>
                <span className="text-xs text-gray-400 mt-0.5 block">Spread: {extracted.card.spreadRate}%</span>
              </div>
            </div>

            {/* Regras de Pontuação (Rewards por faixa de fatura) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Regras de Pontuação (Suporte a Faixas de Gastos)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extracted.rewards.map((rw, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">{rw.expenses}</span>
                      <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-gray-300">
                        {rw.pointsPerDollar} pts / US$
                      </span>
                    </div>
                    <p className="text-sm text-gray-200">{rw.rules}</p>
                    <p className="text-xs text-gray-400">{rw.notes || (rw.expiration ? 'Pontos expiram' : 'Pontos nunca expiram')}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Isenção de Anuidade (ZeroFees) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Políticas de Isenção de Anuidade (Zero Fee)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extracted.zeroFees.map((zf, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-green-400">Desconto: {zf.feeDiscount}%</span>
                    </div>
                    {zf.expenses && <p className="text-sm text-gray-200">💳 {zf.expenses}</p>}
                    {zf.investments && <p className="text-sm text-gray-300">📈 {zf.investments}</p>}
                    {zf.conditions && zf.conditions.length > 0 && (
                      <p className="text-xs text-gray-400">Condições: {zf.conditions.join(', ')}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Salas VIP (Lounges) */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                <Plane className="w-4 h-4 text-blue-400" />
                Salas VIP & Aeroportos
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extracted.lounges.map((lg, idx) => (
                  <div key={idx} className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{lg.name}</span>
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">
                        {lg.accessLimit}
                      </span>
                    </div>
                    {lg.conditions && <p className="text-xs text-gray-300">{lg.conditions}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Scores dos Critérios (0 a 10) - Editáveis com Nomes em PT-BR! */}
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-400" />
                  Notas dos Critérios para o Motor de Recomendação (0 a 10)
                </h3>
                <span className="text-xs text-gray-400">
                  (Notas de 0 a 10 atribuídas pela IA — você pode ajustar qualquer uma)
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {Object.entries(extracted.criterionScores).map(([key, score]) => {
                  const meta = CRITERIA_LABELS[key] || { label: key, desc: '' };
                  const scoreColor =
                    score >= 8
                      ? 'text-emerald-400 border-emerald-500/50 bg-emerald-950/30'
                      : score >= 5
                      ? 'text-amber-400 border-amber-500/50 bg-amber-950/30'
                      : 'text-blue-400 border-slate-700 bg-slate-900';

                  return (
                    <div
                      key={key}
                      className="bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors p-3.5 rounded-xl flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-100 truncate">{meta.label}</p>
                        <p className="text-xs text-gray-400 truncate mt-0.5" title={meta.desc}>
                          {meta.desc || key}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <input
                          type="number"
                          min={0}
                          max={10}
                          step={1}
                          value={score}
                          onChange={(e) => handleScoreChange(key, Number(e.target.value))}
                          className={`w-14 border rounded-lg px-2 py-1 text-center text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 ${scoreColor}`}
                        />
                        <span className="text-xs text-gray-500 font-mono">/10</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Barra de Ação Final */}
            <div className={`p-4 bg-slate-900/95 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-4 shadow-2xl backdrop-blur-md transition-all ${
              saveMode === 'update' && existingMatch
                ? 'border border-amber-500/50 shadow-amber-950/30'
                : 'border border-blue-500/30 shadow-blue-950/30'
            }`}>
              <div>
                <p className="text-sm font-semibold text-gray-100 flex items-center gap-2">
                  <span>Pronto para salvar no PostgreSQL?</span>
                  {saveMode === 'update' && existingMatch ? (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      Atualizando ID {existingMatch.id}
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-green-500/20 text-green-300 border border-green-500/30">
                      Novo Cartão
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {saveMode === 'update' && existingMatch
                    ? `Sobrescreverá dados do cartão "${existingMatch.name}" mantendo o mesmo ID.`
                    : 'Será registrado um novo cartão independente na base de dados.'}
                </p>
              </div>

              <button
                onClick={handleSaveToDatabase}
                disabled={saving}
                className={`flex items-center gap-2 px-7 py-3 font-semibold rounded-xl text-sm transition-all w-full sm:w-fit justify-center disabled:opacity-50 cursor-pointer ${
                  saveMode === 'update' && existingMatch
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-900/40'
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/30'
                }`}
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Gravando no Banco...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {saveMode === 'update' && existingMatch
                      ? `Atualizar Cartão (ID ${existingMatch.id})`
                      : 'Salvar como Novo Cartão'}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
