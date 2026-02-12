import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Camera, ZoomIn, ZoomOut, Maximize2, Filter, RefreshCw, Play, BookOpen, ClipboardCheck, ChevronDown, ChevronUp, Eye, EyeOff, Undo, Redo, MousePointer, Ruler, Circle, Square, BarChart3, TrendingUp, Layers, LogOut, Users, Award, Download, Settings, Globe, Menu, X, FileText, CheckCircle, AlertCircle, Star, Lock, Clock, Shield, Mail } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// RT TRAINING BETA 2.1.0 - Email Gate Version
// ═══════════════════════════════════════════════════════════════════════════════

const APP_VERSION = "2.1.0-beta";
const CONTACT_EMAIL = "rtsymulationtrainingfeedback@gmail.com";

// ═══════════════════════════════════════════════════════════════════════════════
// BETA CONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════════
const IS_BETA_LIMITED = true;
const BETA_LIMITS = {
  maxExams: 5,                    // Max 5 exams
  sessionDuration: 60 * 60,       // 1 hour in seconds
  allowedMaterials: ['aluminum', 'titanium'],
  allowInconel: false             // Inconel is Premium only
};

// Google Apps Script URL for email collection
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxwRrzrrLy65OHTmp51Zy0cZn1YaUWfSfznP-_Vit_9x520ZFW4zlsZ9eJayF0W3vH/exec";

const PREMIUM_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Richiesta%20Abbonamento%20Premium%20RT%20Training&body=Buongiorno%2C%0A%0ASono%20interessato%20all'abbonamento%20Premium%20di%20RT%20Training.%0A%0ANome%3A%20%0AAzienda%3A%20%0AEmail%3A%20%0A%0AGrazie`;

// Storage Helper
const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { key, value } : null;
    } catch (err) {
      console.error('Storage get error:', err);
      return null;
    }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (err) {
      console.error('Storage set error:', err);
      return null;
    }
  },
  async delete(key) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true };
    } catch (err) {
      console.error('Storage delete error:', err);
      return null;
    }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════════
const LanguageContext = createContext();
const translations = {
  en: {
    title: "Digital Radiography RT Simulator",
    subtitle: "NAS 410 Training System - Level 1 & 2",
    login: "Login",
    logout: "Logout",
    email: "Email",
    password: "Password",
    username: "Username",
    role: "Role",
    admin: "Administrator",
    trainer: "Trainer",
    student: "Student",
    dashboard: "Dashboard",
    simulator: "Simulator",
    certificates: "Certificates",
    statistics: "Statistics",
    training: "Training Mode",
    exam: "Exam Mode",
    start: "Start",
    evaluate: "Evaluate",
    generate: "Generate",
    download: "Download",
    material: "Material",
    thickness: "Thickness",
    voltage: "Voltage (kV)",
    current: "Current (mA)",
    defects: "Defects",
    detected: "Detected",
    falsePositives: "False Positives",
    score: "Score",
    passed: "PASSED",
    failed: "FAILED",
    users: "Users",
    exams: "Exams",
    avgScore: "Average Score",
    activeUsers: "Active Users",
    totalExams: "Total Exams",
    examHistory: "Exam History",
    date: "Date",
    result: "Result",
    aluminium: "Aluminium (Al)",
    titanium: "Titanium (Ti)",
    inconel: "Inconel (Ni-Cr)",
    newComponent: "New Component",
    showHints: "Show Defect Indicators",
    clickToMark: "Click to mark defects. Marked:",
    crack: "Crack",
    porosity: "Porosity",
    cluster: "Cluster",
    inclusion: "Inclusion",
    selectDefectType: "Select defect type:",
    confirm: "Confirm",
    cancel: "Cancel",
    defectMarked: "Defect marked",
    correctType: "Correct type",
    wrongType: "Wrong type",
    // Beta Limited translations
    betaLimited: "BETA LIMITED",
    betaWelcome: "Welcome to RT Training Beta",
    betaEmailGate: "Enter your email to access the free Beta version",
    betaAccessButton: "Access Beta",
    betaNoSave: "Progress will NOT be saved between sessions",
    betaLimitations: "Beta Limitations",
    betaMaxExams: "Maximum 5 exams per session",
    betaNoInconel: "Inconel material not available",
    betaSessionTime: "1 hour session limit",
    betaExamsRemaining: "Exams remaining",
    betaExamsUsed: "exams used",
    betaLimitReached: "Exam Limit Reached",
    betaLimitMessage: "You have used all 5 exams available in Beta. Subscribe to Premium for unlimited access!",
    premiumFeature: "Premium Feature",
    premiumInconelMessage: "Inconel is a Premium material. Subscribe to train on all aerospace materials!",
    contactForPremium: "Contact for Premium",
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    sessionExpired: "Session Expired",
    sessionExpiredMessage: "Your 1-hour Beta session has expired.",
    startNewSession: "Start New Session",
    hours: "h",
    minutes: "m",
    seconds: "s"
  },
  it: {
    title: "Simulatore Radiografia Digitale RT",
    subtitle: "Sistema Training NAS 410 - Livello 1 & 2",
    login: "Accedi",
    logout: "Esci",
    email: "Email",
    password: "Password",
    username: "Nome utente",
    role: "Ruolo",
    admin: "Amministratore",
    trainer: "Formatore",
    student: "Studente",
    dashboard: "Pannello",
    simulator: "Simulatore",
    certificates: "Certificati",
    statistics: "Statistiche",
    training: "Modalità Apprendimento",
    exam: "Modalità Esame",
    start: "Inizia",
    evaluate: "Valuta",
    generate: "Genera",
    download: "Scarica",
    material: "Materiale",
    thickness: "Spessore",
    voltage: "Tensione (kV)",
    current: "Corrente (mA)",
    defects: "Difetti",
    detected: "Rilevati",
    falsePositives: "Falsi Positivi",
    score: "Punteggio",
    passed: "SUPERATO",
    failed: "NON SUPERATO",
    users: "Utenti",
    exams: "Esami",
    avgScore: "Punteggio Medio",
    activeUsers: "Utenti Attivi",
    totalExams: "Esami Totali",
    examHistory: "Storico Esami",
    date: "Data",
    result: "Risultato",
    aluminium: "Alluminio (Al)",
    titanium: "Titanio (Ti)",
    inconel: "Inconel (Ni-Cr)",
    newComponent: "Nuovo Componente",
    showHints: "Mostra Indicatori Difetti",
    clickToMark: "Clicca per marcare difetti. Marcati:",
    crack: "Cricca",
    porosity: "Porosità",
    cluster: "Cluster",
    inclusion: "Inclusione",
    selectDefectType: "Seleziona tipo difetto:",
    confirm: "Conferma",
    cancel: "Annulla",
    defectMarked: "Difetto marcato",
    correctType: "Tipo corretto",
    wrongType: "Tipo errato",
    // Beta Limited translations
    betaLimited: "BETA LIMITATA",
    betaWelcome: "Benvenuto in RT Training Beta",
    betaEmailGate: "Inserisci la tua email per accedere alla versione Beta gratuita",
    betaAccessButton: "Accedi alla Beta",
    betaNoSave: "I progressi NON verranno salvati tra le sessioni",
    betaLimitations: "Limitazioni Beta",
    betaMaxExams: "Massimo 5 esami per sessione",
    betaNoInconel: "Materiale Inconel non disponibile",
    betaSessionTime: "Sessione limitata a 1 ora",
    betaExamsRemaining: "Esami rimanenti",
    betaExamsUsed: "esami effettuati",
    betaLimitReached: "Limite Esami Raggiunto",
    betaLimitMessage: "Hai utilizzato tutti i 5 esami disponibili nella Beta. Abbonati a Premium per accesso illimitato!",
    premiumFeature: "Funzione Premium",
    premiumInconelMessage: "Inconel è un materiale Premium. Abbonati per allenarti su tutti i materiali aerospaziali!",
    contactForPremium: "Contatta per Premium",
    emailRequired: "Email obbligatoria",
    emailInvalid: "Inserisci un indirizzo email valido",
    sessionExpired: "Sessione Scaduta",
    sessionExpiredMessage: "La tua sessione Beta di 1 ora è scaduta.",
    startNewSession: "Avvia Nuova Sessione",
    hours: "h",
    minutes: "m",
    seconds: "s"
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH CONTEXT - BETA EMAIL GATE
// ═══════════════════════════════════════════════════════════════════════════════
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [betaSession, setBetaSession] = useState(null);

  useEffect(() => {
    checkBetaSession();
  }, []);

  // Check for existing Beta session
  const checkBetaSession = async () => {
    try {
      const result = await storage.get('beta_session');
      if (result && result.value) {
        const session = JSON.parse(result.value);
        const now = Date.now();
        const sessionAge = now - session.startTime;
        
        // Check if session is still valid (1 hour)
        if (sessionAge < BETA_LIMITS.sessionDuration * 1000) {
          setBetaSession(session);
          setUser({
            id: 'beta_' + session.startTime,
            email: session.email,
            username: 'Utente Beta',
            role: 'student',
            isBetaLimited: true,
            examsUsed: session.examsUsed || 0,
            sessionStartTime: session.startTime,
            exams: []
          });
        } else {
          // Session expired - clear it
          await storage.delete('beta_session');
        }
      }
    } catch (err) {
      console.log('No beta session found');
    }
    setLoading(false);
  };

  // Send email to Google Apps Script (non-blocking background operation)
  const sendEmailToGoogleScript = async (email) => {
    try {
      // Use fetch with no-cors to send to Google Script (fire and forget)
      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          source: 'rt-training-beta',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent.substring(0, 200)
        })
      }).catch(() => {
        // Silently ignore errors - we don't want to block user access
      });
    } catch (err) {
      // Non-blocking - ignore errors
      console.log('Email send (non-blocking)');
    }
  };

  // Start Beta session with email only
  const startBetaSession = async (email) => {
    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email.trim())) {
        return { success: false, error: 'emailInvalid' };
      }

      const cleanEmail = email.trim().toLowerCase();
      const now = Date.now();
      
      const session = {
        email: cleanEmail,
        startTime: now,
        expirationTime: now + (BETA_LIMITS.sessionDuration * 1000),
        examsUsed: 0
      };

      // Save session locally
      await storage.set('beta_session', JSON.stringify(session));
      
      // Send email to Google Script in background (non-blocking)
      sendEmailToGoogleScript(cleanEmail);

      setBetaSession(session);
      setUser({
        id: 'beta_' + now,
        email: cleanEmail,
        username: 'Utente Beta',
        role: 'student',
        isBetaLimited: true,
        examsUsed: 0,
        sessionStartTime: now,
        exams: []
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Increment exam count
  const incrementExamCount = async () => {
    if (!betaSession) return 0;
    
    const newCount = (betaSession.examsUsed || 0) + 1;
    const updatedSession = { ...betaSession, examsUsed: newCount };
    
    await storage.set('beta_session', JSON.stringify(updatedSession));
    setBetaSession(updatedSession);
    
    if (user) {
      setUser({ ...user, examsUsed: newCount });
    }
    
    return newCount;
  };

  // Get remaining exams
  const getRemainingExams = () => {
    const used = betaSession?.examsUsed || user?.examsUsed || 0;
    return Math.max(0, BETA_LIMITS.maxExams - used);
  };

  // Check if can take exam
  const canTakeExam = () => {
    return getRemainingExams() > 0;
  };

  // Get session remaining time in seconds
  const getSessionRemainingTime = () => {
    if (!betaSession) return null;
    const now = Date.now();
    const elapsed = now - betaSession.startTime;
    const remaining = Math.max(0, BETA_LIMITS.sessionDuration - Math.floor(elapsed / 1000));
    return remaining;
  };

  // Check if session is active
  const isSessionActive = () => {
    const remaining = getSessionRemainingTime();
    return remaining !== null && remaining > 0;
  };

  // Logout / End session
  const logout = async () => {
    await storage.delete('beta_session');
    setBetaSession(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      logout,
      startBetaSession,
      betaSession,
      incrementExamCount,
      getRemainingExams,
      canTakeExam,
      getSessionRemainingTime,
      isSessionActive
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);
const useLanguage = () => useContext(LanguageContext);

// ═══════════════════════════════════════════════════════════════════════════════
// SESSION TIMER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const SessionTimer = () => {
  const { getSessionRemainingTime } = useAuth();
  const { t } = useLanguage();
  const [remaining, setRemaining] = useState(getSessionRemainingTime() || 0);

  useEffect(() => {
    const interval = setInterval(() => {
      const time = getSessionRemainingTime();
      if (time !== null) {
        setRemaining(time);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [getSessionRemainingTime]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}${t.hours} ${m.toString().padStart(2, '0')}${t.minutes}`;
  };

  const isLow = remaining < 600; // Less than 10 minutes

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded text-sm ${
      isLow ? 'bg-red-900 text-red-200' : 'bg-gray-700 text-gray-300'
    }`}>
      <Clock className="w-4 h-4" />
      <span>{formatTime(remaining)}</span>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// EXAM LIMIT MODAL
// ═══════════════════════════════════════════════════════════════════════════════
const ExamLimitModal = ({ onClose, t }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-800 rounded-xl max-w-md w-full border border-red-600">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-t-xl">
        <div className="flex items-center gap-3">
          <AlertCircle className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white">{t.betaLimitReached}</h2>
            <p className="text-red-100 text-sm">5/5 {t.betaExamsUsed}</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-6">{t.betaLimitMessage}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
          >
            {t.cancel}
          </button>
          <a
            href={PREMIUM_MAILTO}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg text-white font-semibold text-center transition"
          >
            {t.contactForPremium}
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// PREMIUM MODAL (for Inconel)
// ═══════════════════════════════════════════════════════════════════════════════
const PremiumModal = ({ onClose, t }) => (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
    <div className="bg-gray-800 rounded-xl max-w-md w-full border border-yellow-600">
      <div className="bg-gradient-to-r from-yellow-600 to-orange-600 p-4 rounded-t-xl">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-xl font-bold text-white">{t.premiumFeature}</h2>
            <p className="text-yellow-100 text-sm">Inconel (Ni-Cr)</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <p className="text-gray-300 mb-6">{t.premiumInconelMessage}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition"
          >
            {t.cancel}
          </button>
          <a
            href={PREMIUM_MAILTO}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg text-white font-semibold text-center transition"
          >
            {t.contactForPremium}
          </a>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN - EMAIL GATE (No Password!)
// ═══════════════════════════════════════════════════════════════════════════════
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { startBetaSession } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!email.trim()) {
      setError(t.emailRequired);
      setIsLoading(false);
      return;
    }

    const result = await startBetaSession(email);
    if (!result.success) {
      setError(t[result.error] || result.error);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      {/* Language Switcher */}
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} 
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700"
        >
          <Globe className="w-4 h-4" />
          {language.toUpperCase()}
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
        {/* Header */}
        <div className="text-center mb-8">
          <Camera className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400 text-sm mb-4">{t.subtitle}</p>
          
          {/* Beta Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-black px-4 py-1 rounded-full text-sm font-bold">
            <Star className="w-4 h-4" />
            {t.betaLimited}
          </div>
        </div>

        {/* Welcome Message */}
        <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-semibold text-blue-300 mb-2">{t.betaWelcome}</h2>
          <p className="text-gray-300 text-sm">{t.betaEmailGate}</p>
        </div>

        {/* Email Form - ONLY EMAIL, NO PASSWORD */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Mail className="w-4 h-4 inline mr-2" />
              {t.email}
            </label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              placeholder="nome@azienda.com"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="bg-red-900/30 border border-red-600 rounded-lg p-3">
              <p className="text-red-400 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold py-3 px-6 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                {t.betaAccessButton}
              </>
            )}
          </button>
        </form>

        {/* Warning: No Save */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-3 mb-6">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            <p className="text-yellow-200 text-sm">{t.betaNoSave}</p>
          </div>
        </div>

        {/* Beta Limitations */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-400" />
            {t.betaLimitations}
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
              {t.betaMaxExams}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
              {t.betaSessionTime}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              {t.betaNoInconel}
            </li>
          </ul>
        </div>

        {/* Premium CTA */}
        <div className="mt-6 text-center">
          <a 
            href={PREMIUM_MAILTO}
            className="text-cyan-400 hover:text-cyan-300 text-sm font-medium transition"
          >
            {t.contactForPremium} →
          </a>
        </div>

        {/* Version */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-xs">v{APP_VERSION}</p>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEFECT TYPE SELECTOR MODAL
// ═══════════════════════════════════════════════════════════════════════════════
const DefectTypeModal = ({ onConfirm, onCancel, t }) => {
  const [selectedType, setSelectedType] = useState('crack');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-w-md w-full mx-4">
        <h3 className="text-xl font-bold text-white mb-4">{t.selectDefectType}</h3>
        
        <div className="space-y-3 mb-6">
          {['crack', 'porosity', 'cluster', 'inclusion'].map(type => (
            <label key={type} className="flex items-center gap-3 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition">
              <input
                type="radio"
                name="defectType"
                value={type}
                checked={selectedType === type}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-5 h-5"
              />
              <span className="text-white font-medium">{t[type]}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onConfirm(selectedType)}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {t.confirm}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg transition"
          >
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// X-RAY SIMULATOR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const XRaySimulator = ({ onExamComplete }) => {
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const { t } = useLanguage();
  const { user, getRemainingExams, canTakeExam, incrementExamCount } = useAuth();
  
  const [mode, setMode] = useState('training');
  const [material, setMaterial] = useState('aluminum');
  const [thickness, setThickness] = useState(10);
  const [kV, setKV] = useState(150);
  const [mA, setMA] = useState(5);
  const [defects, setDefects] = useState([]);
  const [examStarted, setExamStarted] = useState(false);
  const [markedDefects, setMarkedDefects] = useState([]);
  const [score, setScore] = useState(null);
  const [showHints, setShowHints] = useState(true);
  const [pendingClick, setPendingClick] = useState(null);
  const [showDefectModal, setShowDefectModal] = useState(false);
  const [showExamLimitModal, setShowExamLimitModal] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  
  const attenuationCoefficients = {
    aluminum: { density: 2.7, coeff: (kv) => 0.4 - (kv - 100) * 0.002 },
    titanium: { density: 4.5, coeff: (kv) => 0.8 - (kv - 100) * 0.003 },
    inconel: { density: 8.2, coeff: (kv) => 1.5 - (kv - 100) * 0.005 }
  };

  const generateDefects = () => {
    const numDefects = Math.floor(Math.random() * 4) + 2;
    const newDefects = [];
    const types = ['crack', 'porosity', 'cluster', 'inclusion'];
    
    for (let i = 0; i < numDefects; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      newDefects.push({
        id: i, type,
        x: Math.random() * 0.7 + 0.15,
        y: Math.random() * 0.7 + 0.15,
        size: Math.random() * 0.03 + 0.01,
        severity: Math.random() * 0.5 + 0.3,
        angle: Math.random() * Math.PI
      });
    }
    setDefects(newDefects);
  };

  useEffect(() => {
    generateDefects();
  }, [material, thickness]);

  const calculateIntensity = (baseIntensity, localThickness, defectFactor = 1) => {
    const matData = attenuationCoefficients[material];
    const mu = matData.coeff(kV) * matData.density;
    const effectiveThickness = localThickness * defectFactor;
    const intensity = baseIntensity * Math.exp(-mu * effectiveThickness) * Math.pow(mA / 5, 0.5);
    return Math.max(0, Math.min(255, intensity));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    if (!canvas || !overlayCanvas) return;
    
    const ctx = canvas.getContext('2d');
    const octx = overlayCanvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, width, height);
    octx.clearRect(0, 0, width, height);
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const baseIntensity = 200;
    const noiseLevel = 8;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const nx = x / width;
        const ny = y / height;
        
        const edgeFactor = 1 + 0.3 * Math.pow(Math.abs(nx - 0.5) * 2, 2);
        let localThickness = thickness * edgeFactor;
        
        let defectFactor = 1;
        defects.forEach(defect => {
          const dx = nx - defect.x;
          const dy = ny - defect.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < defect.size) {
            switch(defect.type) {
              case 'crack':
                const alongCrack = Math.abs(Math.cos(defect.angle) * dx + Math.sin(defect.angle) * dy);
                const perpCrack = Math.abs(-Math.sin(defect.angle) * dx + Math.cos(defect.angle) * dy);
                if (alongCrack < defect.size && perpCrack < defect.size * 0.1) {
                  defectFactor *= (1 - defect.severity * 0.8);
                }
                break;
              case 'porosity':
                defectFactor *= (1 - defect.severity * (1 - dist / defect.size) * 0.9);
                break;
              case 'cluster':
                if (Math.sin(dx * 150) * Math.cos(dy * 150) > 0.5) {
                  defectFactor *= (1 - defect.severity * 0.6);
                }
                break;
              case 'inclusion':
                defectFactor *= (1 + defect.severity * (1 - dist / defect.size) * 0.7);
                break;
            }
          }
        });
        
        let intensity = calculateIntensity(baseIntensity, localThickness, defectFactor);
        const noise = (Math.random() + Math.random() + Math.random() + Math.random() - 2) * noiseLevel * (1 - intensity / 255);
        intensity += noise;
        intensity = Math.max(0, Math.min(255, intensity));
        
        data[idx] = (255 - intensity) * 0.75;
        data[idx + 1] = (255 - intensity) * 0.95;
        data[idx + 2] = (255 - intensity) * 0.85;
        data[idx + 3] = 255;
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    if (mode === 'training' && showHints) {
      defects.forEach(defect => {
        octx.strokeStyle = 'rgba(255, 80, 80, 0.7)';
        octx.lineWidth = 2;
        octx.setLineDash([5, 5]);
        octx.beginPath();
        
        if (defect.type === 'crack') {
          const length = defect.size * width * 2;
          const dx = Math.cos(defect.angle) * length;
          const dy = Math.sin(defect.angle) * length;
          octx.moveTo(defect.x * width - dx/2, defect.y * height - dy/2);
          octx.lineTo(defect.x * width + dx/2, defect.y * height + dy/2);
        } else {
          octx.arc(defect.x * width, defect.y * height, defect.size * width, 0, Math.PI * 2);
        }
        octx.stroke();
        octx.setLineDash([]);
        
        octx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        octx.font = 'bold 11px monospace';
        const typeMap = { crack: 'CRICCA', porosity: 'POROSITÀ', cluster: 'CLUSTER', inclusion: 'INCLUSIONE' };
        octx.fillText(typeMap[defect.type], defect.x * width + 15, defect.y * height - 10);
      });
    }
    
    if (mode === 'exam' && examStarted) {
      markedDefects.forEach((mark, idx) => {
        const color = mark.isCorrectType ? 'rgba(0, 255, 100, 0.9)' : 'rgba(255, 200, 0, 0.9)';
        octx.strokeStyle = color;
        octx.lineWidth = 2;
        octx.beginPath();
        octx.arc(mark.canvasX, mark.canvasY, 20, 0, Math.PI * 2);
        octx.stroke();
        octx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        octx.font = 'bold 16px monospace';
        octx.fillText((idx + 1).toString(), mark.canvasX - 6, mark.canvasY + 6);
        
        octx.font = 'bold 10px monospace';
        octx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        const typeLabel = t[mark.identifiedType];
        octx.fillText(typeLabel, mark.canvasX + 25, mark.canvasY);
      });
    }
    
  }, [material, thickness, kV, mA, defects, mode, showHints, markedDefects, examStarted, t]);

  const handleCanvasClick = (e) => {
    if (mode !== 'exam' || !examStarted || showDefectModal) return;
    
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const clickX = (e.clientX - rect.left) * scaleX;
    const clickY = (e.clientY - rect.top) * scaleY;
    
    setPendingClick({ x: clickX, y: clickY });
    setShowDefectModal(true);
  };

  const handleDefectTypeConfirm = (identifiedType) => {
    if (!pendingClick) return;
    
    const canvas = canvasRef.current;
    const normalizedX = pendingClick.x / canvas.width;
    const normalizedY = pendingClick.y / canvas.height;
    
    let matchedDefect = null;
    let isCorrectType = false;
    
    defects.forEach(defect => {
      const dx = normalizedX - defect.x;
      const dy = normalizedY - defect.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < defect.size * 2) {
        matchedDefect = defect;
        isCorrectType = identifiedType === defect.type;
      }
    });
    
    const newMark = {
      canvasX: pendingClick.x,
      canvasY: pendingClick.y,
      normalizedX,
      normalizedY,
      identifiedType,
      matchedDefect,
      isCorrectType
    };
    
    setMarkedDefects([...markedDefects, newMark]);
    setShowDefectModal(false);
    setPendingClick(null);
  };

  const handleDefectTypeCancel = () => {
    setShowDefectModal(false);
    setPendingClick(null);
  };

  const startExam = async () => {
    // Check if user can take exam (Beta limit)
    if (IS_BETA_LIMITED && !canTakeExam()) {
      setShowExamLimitModal(true);
      return;
    }
    
    setExamStarted(true);
    setMarkedDefects([]);
    setScore(null);
    generateDefects();
    
    // Increment exam count for Beta
    if (IS_BETA_LIMITED) {
      await incrementExamCount();
    }
  };

  const evaluateExam = async () => {
    let correctPosition = 0;
    let correctType = 0;
    let totalMarked = markedDefects.length;
    
    markedDefects.forEach(mark => {
      if (mark.matchedDefect) {
        correctPosition++;
        if (mark.isCorrectType) {
          correctType++;
        }
      }
    });
    
    const totalDefects = defects.length;
    const detectionRate = totalDefects > 0 ? (correctPosition / totalDefects) * 100 : 0;
    const classificationAccuracy = totalMarked > 0 ? (correctType / totalMarked) * 100 : 0;
    const falsePositives = totalMarked - correctPosition;
    
    const positionScore = detectionRate * 0.5;
    const classificationScore = classificationAccuracy * 0.3;
    const falsePositivesPenalty = Math.max(0, 20 - (falsePositives * 5));
    
    const finalScore = positionScore + classificationScore + falsePositivesPenalty;
    
    const examResult = {
      date: new Date().toISOString(),
      score: finalScore.toFixed(1),
      detected: correctPosition,
      total: totalDefects,
      correctType,
      falsePositives,
      classificationAccuracy: classificationAccuracy.toFixed(1),
      material,
      thickness,
      kV,
      mA
    };
    
    setScore(examResult);
    
    if (onExamComplete) {
      onExamComplete(examResult);
    }
  };

  // Handle material change with Beta restriction
  const handleMaterialChange = (newMaterial) => {
    if (IS_BETA_LIMITED && newMaterial === 'inconel') {
      setShowPremiumModal(true);
      return;
    }
    setMaterial(newMaterial);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-950">
      {showDefectModal && (
        <DefectTypeModal
          onConfirm={handleDefectTypeConfirm}
          onCancel={handleDefectTypeCancel}
          t={t}
        />
      )}
      
      {showExamLimitModal && (
        <ExamLimitModal
          onClose={() => setShowExamLimitModal(false)}
          t={t}
        />
      )}
      
      {showPremiumModal && (
        <PremiumModal
          onClose={() => setShowPremiumModal(false)}
          t={t}
        />
      )}
      
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center gap-4 flex-wrap">
        <div className="flex gap-2">
          <button onClick={() => { setMode('training'); setExamStarted(false); setScore(null); }} className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition ${mode === 'training' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            <BookOpen className="w-4 h-4" />
            {t.training}
          </button>
          <button onClick={() => { setMode('exam'); setExamStarted(false); setScore(null); }} className={`flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition ${mode === 'exam' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            <ClipboardCheck className="w-4 h-4" />
            {t.exam}
          </button>
        </div>

        {/* Beta exam counter */}
        {IS_BETA_LIMITED && (
          <div className="flex items-center gap-2 px-3 py-1 bg-yellow-900/50 border border-yellow-600/50 rounded text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-200">{t.betaExamsRemaining}: <strong>{getRemainingExams()}/{BETA_LIMITS.maxExams}</strong></span>
          </div>
        )}

        {mode === 'exam' && (
          <div className="ml-auto flex gap-2">
            {!examStarted ? (
              <button 
                onClick={startExam} 
                disabled={IS_BETA_LIMITED && !canTakeExam()}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-4 h-4" />
                {t.start}
              </button>
            ) : !score && (
              <button onClick={evaluateExam} className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded font-semibold">
                {t.evaluate}
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">{t.material}</label>
            <select 
              value={material} 
              onChange={(e) => handleMaterialChange(e.target.value)} 
              className="w-full bg-gray-800 rounded px-3 py-2 text-white border border-gray-700" 
              disabled={examStarted}
            >
              <option value="aluminum">{t.aluminium}</option>
              <option value="titanium">{t.titanium}</option>
              {/* Inconel always shown but triggers Premium modal if Beta */}
              <option value="inconel" className={IS_BETA_LIMITED ? 'text-gray-500' : ''}>
                {t.inconel} {IS_BETA_LIMITED ? '🔒' : ''}
              </option>
            </select>
            {IS_BETA_LIMITED && (
              <p className="text-xs text-orange-400 mt-1 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Inconel: Premium
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.thickness}: {thickness} mm</label>
            <input type="range" min="5" max="50" step="1" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))} className="w-full" disabled={examStarted} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.voltage}: {kV}</label>
            <input type="range" min="50" max="300" step="10" value={kV} onChange={(e) => setKV(parseFloat(e.target.value))} className="w-full" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.current}: {mA}</label>
            <input type="range" min="1" max="20" step="0.5" value={mA} onChange={(e) => setMA(parseFloat(e.target.value))} className="w-full" />
          </div>

          <button onClick={generateDefects} disabled={examStarted} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition disabled:opacity-50">
            <RefreshCw className="w-4 h-4" />
            {t.newComponent}
          </button>

          {mode === 'training' && (
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={showHints} onChange={(e) => setShowHints(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm">{t.showHints}</span>
            </label>
          )}
          
          {mode === 'exam' && examStarted && markedDefects.length > 0 && (
            <div className="bg-gray-800 rounded p-3 border border-gray-700">
              <p className="text-sm font-semibold mb-2">{t.defectMarked}:</p>
              <div className="space-y-1 text-xs">
                {markedDefects.map((mark, idx) => (
                  <div key={idx} className={`p-2 rounded ${mark.matchedDefect ? (mark.isCorrectType ? 'bg-green-900' : 'bg-yellow-900') : 'bg-red-900'}`}>
                    <span className="font-bold">#{idx + 1}</span> - {t[mark.identifiedType]}
                    {mark.matchedDefect && (
                      <span className="ml-2 text-xs">
                        {mark.isCorrectType ? `✓ ${t.correctType}` : `✗ ${t.wrongType}`}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col bg-black relative">
          <div className="flex-1 relative">
            <canvas ref={canvasRef} width={800} height={600} className="absolute inset-0 w-full h-full object-contain" />
            <canvas ref={overlayCanvasRef} width={800} height={600} className="absolute inset-0 w-full h-full object-contain cursor-crosshair" onClick={handleCanvasClick} />
          </div>
          
          {mode === 'exam' && examStarted && !score && (
            <div className="bg-blue-900 border-t border-blue-700 px-4 py-2">
              <p className="text-sm text-blue-200">{t.clickToMark} {markedDefects.length}</p>
            </div>
          )}
          
          {mode === 'exam' && score && (
            <div className="bg-gradient-to-r from-green-900 to-blue-900 border-t border-green-700 px-4 py-3">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-300">{t.detected}: <span className="font-bold text-white">{score.detected}/{score.total}</span></p>
                  <p className="text-sm text-gray-300">Tipo corretto: <span className="font-bold text-white">{score.correctType}/{score.detected + score.falsePositives}</span></p>
                  <p className="text-sm text-gray-300">{t.falsePositives}: <span className="font-bold text-white">{score.falsePositives}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-400">{score.score}%</p>
                  <p className="text-sm text-gray-300">{parseFloat(score.score) >= 80 ? t.passed : t.failed}</p>
                  <p className="text-xs text-gray-400 mt-1">Classificazione: {score.classificationAccuracy}%</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const StudentDashboard = () => {
  const { user, getRemainingExams } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">{t.dashboard}</h2>

      {/* Beta Info Banner */}
      {IS_BETA_LIMITED && (
        <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600/50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-400" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-300">{t.betaLimited}</h3>
                <p className="text-sm text-gray-400">{t.betaNoSave}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">{getRemainingExams()}/{BETA_LIMITS.maxExams}</div>
              <div className="text-xs text-gray-400">{t.betaExamsRemaining}</div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <p className="text-blue-300 text-sm">{t.email}</p>
          <p className="text-xl font-bold text-white mt-2 truncate">{user?.email}</p>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <p className="text-green-300 text-sm">{t.betaExamsRemaining}</p>
          <p className="text-3xl font-bold text-white mt-2">{getRemainingExams()}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700">
          <p className="text-purple-300 text-sm">Sessione</p>
          <p className="text-xl font-bold text-white mt-2">Beta</p>
        </div>
      </div>

      {/* Premium CTA */}
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 text-center">
        <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-white mb-2">Vuoi di più?</h3>
        <p className="text-gray-400 mb-4">Passa a Premium per esami illimitati, tutti i materiali e certificati!</p>
        <a 
          href={PREMIUM_MAILTO}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 rounded-lg font-semibold transition"
        >
          <Mail className="w-5 h-5" />
          {t.contactForPremium}
        </a>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP CONTENT
// ═══════════════════════════════════════════════════════════════════════════════
const AppContent = () => {
  const [view, setView] = useState('simulator');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showSessionExpired, setShowSessionExpired] = useState(false);
  const { user, logout, getRemainingExams, isSessionActive } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  // Check session expiration
  useEffect(() => {
    const interval = setInterval(() => {
      if (IS_BETA_LIMITED && user && !isSessionActive()) {
        setShowSessionExpired(true);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [user, isSessionActive]);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Session Expired Modal */}
      {showSessionExpired && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl max-w-md w-full p-6 text-center border border-red-600">
            <Clock className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white mb-2">{t.sessionExpired}</h2>
            <p className="text-gray-400 mb-6">{t.sessionExpiredMessage}</p>
            <button
              onClick={() => { logout(); setShowSessionExpired(false); }}
              className="w-full bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
            >
              {t.startNewSession}
            </button>
          </div>
        </div>
      )}

      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-700 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold">RT Training</h1>
              <p className="text-xs text-gray-400">NAS 410</p>
            </div>
          </div>
          
          {/* Beta Badge */}
          {IS_BETA_LIMITED && (
            <div className="mt-2 inline-flex items-center gap-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-black px-2 py-0.5 rounded text-xs font-bold">
              <Star className="w-3 h-3" />
              BETA
            </div>
          )}
          
          <div className="mt-4 p-3 bg-gray-800 rounded">
            <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
            <p className="text-xs text-gray-400">Utente Beta</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <BarChart3 className="w-5 h-5" />
            <span>{t.dashboard}</span>
          </button>

          <button onClick={() => setView('simulator')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'simulator' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Camera className="w-5 h-5" />
            <span>{t.simulator}</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
          {/* Session Timer */}
          {IS_BETA_LIMITED && (
            <div className="mb-3">
              <SessionTimer />
            </div>
          )}
          
          <button onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} className="w-full flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-800 text-gray-300 mb-2">
            <Globe className="w-5 h-5" />
            <span>{language === 'en' ? 'Italiano' : 'English'}</span>
          </button>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2 rounded bg-red-900 hover:bg-red-800 text-red-200">
            <LogOut className="w-5 h-5" />
            <span>{t.logout}</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h2 className="text-lg font-semibold">
            {view === 'simulator' && t.simulator}
            {view === 'dashboard' && t.dashboard}
          </h2>
          
          {/* Exam counter in header */}
          {IS_BETA_LIMITED && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-400">{t.betaExamsRemaining}:</span>
              <span className="font-bold text-yellow-400">{getRemainingExams()}/{BETA_LIMITS.maxExams}</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {view === 'simulator' && <XRaySimulator onExamComplete={() => {}} />}
          {view === 'dashboard' && <StudentDashboard />}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const Root = () => {
  const { user, loading } = useAuth();
  const [language, setLanguage] = useState('it');
  const t = translations[language];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-white text-center">
          <Camera className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-pulse" />
          <p>Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <LanguageContext.Provider value={{ t, language, setLanguage }}>
      {user ? <AppContent /> : <LoginScreen />}
    </LanguageContext.Provider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// APP EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default () => (
  <AuthProvider>
    <Root />
  </AuthProvider>
);
