/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * RT TRAINING SYSTEM - Digital Radiography Simulator
 * NAS 410 / ISO 9712 / EN 4179 Training Platform
 * Version: 2.1.1-premium
 * ═══════════════════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Camera, ZoomIn, ZoomOut, RefreshCw, Play, BookOpen, ClipboardCheck, ChevronLeft, ChevronRight, Eye, EyeOff, BarChart3, TrendingUp, LogOut, Users, Award, Download, Globe, Menu, X, CheckCircle, AlertCircle, Settings } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURATION & CONSTANTS
// ═══════════════════════════════════════════════════════════════════════════════
const APP_VERSION = "2.1.1-premium";
const COPYRIGHT_OWNER = "Stefano Battisti - RT Training";
const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} ${COPYRIGHT_OWNER}. All rights reserved.`;
const CONTACT_EMAIL = "rtsymulationtrainingfeedback@gmail.com";

// Google Sheets Integration
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxwRrzrrLy65OHTmp51Zy0cZn1YaUWfSfznP-_Vit_9x520ZFW4zlsZ9eJayF0W3vH/exec";

const sendEmailToGoogleSheet = (email, source = 'app') => {
  try {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, timestamp: new Date().toISOString() })
    }).catch(() => {});
  } catch (err) {}
};

// Storage Helper
const storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? { key, value } : null;
    } catch (err) { return null; }
  },
  async set(key, value) {
    try {
      localStorage.setItem(key, value);
      return { key, value };
    } catch (err) { return null; }
  },
  async delete(key) {
    try {
      localStorage.removeItem(key);
      return { key, deleted: true };
    } catch (err) { return null; }
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS
// ═══════════════════════════════════════════════════════════════════════════════
const translations = {
  en: {
    title: "Digital Radiography RT Simulator",
    subtitle: "NAS 410 / ISO 9712 / EN 4179 Training System",
    login: "Login", logout: "Logout", email: "Email", password: "Password",
    username: "Username", role: "Role", admin: "Administrator", trainer: "Trainer", 
    student: "Student", dashboard: "Dashboard", simulator: "Simulator",
    certificates: "Certificates", statistics: "Statistics",
    teaching: "Teaching", learning: "Learning", exam: "Exam",
    teachingDesc: "Guided mode with highlighted defects and ideal parameters",
    learningDesc: "Practice mode with immediate feedback",
    examDesc: "Test mode without assistance",
    start: "Start", evaluate: "Evaluate", generate: "Generate", download: "Download",
    newComponent: "New Component", next: "Next", previous: "Previous", finish: "Finish",
    material: "Material", aluminium: "Aluminium (Al)", titanium: "Titanium (Ti)", inconel: "Inconel (Ni-Cr)",
    thickness: "Thickness", voltage: "Voltage (kV)", current: "Current (mA)",
    detectorType: "Detector Type", detectorCR: "CR (Computed Radiography)",
    detectorDDA: "DDA (Digital Detector Array)", crSystem: "CR System", ddaSystem: "DDA System",
    iqiType: "IQI Type", iqiNone: "None", iqiISO: "ISO 19232-1 (Wire)",
    iqiASTM: "ASTM E1025 (Hole)", iqiDuplex: "ISO 19232-5 (Duplex)", iqiAll: "All (Teaching)",
    specimenType: "Specimen Type", flatPlate: "Flat Plate", weldedJoint: "Welded Joint",
    weldZone: "Weld Zone", heatAffectedZone: "HAZ",
    imageProcessing: "Image Processing", brightness: "Brightness", contrast: "Contrast",
    ddaCalibration: "DDA Calibration", offsetCorrection: "Offset Correction",
    gainCorrection: "Gain Correction", badPixelCorrection: "Bad Pixel Correction", autoCalibrate: "Auto Calibrate",
    defects: "Defects", crack: "Crack", porosity: "Porosity", cluster: "Cluster",
    inclusion: "Inclusion", cavity: "Cavity", lackOfFusion: "Lack of Fusion",
    undercut: "Undercut", underfill: "Underfill", alignedPorosity: "Aligned Porosity", slagInclusion: "Slag Inclusion",
    detected: "Detected", falsePositives: "False Positives", score: "Score",
    passed: "PASSED", failed: "FAILED",
    showHints: "Show Hints", hideHints: "Hide Hints", showIdealParams: "Show Ideal Parameters",
    dragToMark: "Drag to mark defect area. Marked:", selectDefectType: "Select defect type:",
    confirm: "Confirm", cancel: "Cancel", defectMarked: "Defects Marked",
    correctType: "Correct type", wrongType: "Wrong type",
    users: "Users", exams: "Exams", avgScore: "Average Score", activeUsers: "Active Users",
    totalExams: "Total Exams", examHistory: "Exam History", date: "Date", result: "Result",
    quality: "Image Quality", optimal: "Optimal", acceptable: "Acceptable",
    suboptimal: "Suboptimal", overexposed: "Overexposed", underexposed: "Underexposed",
    imageOf: "Image", of: "of", noDefects: "No defects in this image",
    alreadyMarked: "This defect area was already marked",
    mouseHint: "Ctrl+Scroll: Zoom | Right-click drag: Brightness/Contrast"
  },
  it: {
    title: "Simulatore Radiografia Digitale RT",
    subtitle: "Sistema Training NAS 410 / ISO 9712 / EN 4179",
    login: "Accedi", logout: "Esci", email: "Email", password: "Password",
    username: "Nome utente", role: "Ruolo", admin: "Amministratore", trainer: "Formatore",
    student: "Studente", dashboard: "Pannello", simulator: "Simulatore",
    certificates: "Certificati", statistics: "Statistiche",
    teaching: "Insegnamento", learning: "Apprendimento", exam: "Esame",
    teachingDesc: "Modalità guidata con difetti evidenziati e parametri ideali",
    learningDesc: "Modalità pratica con feedback immediato",
    examDesc: "Modalità test senza assistenza",
    start: "Inizia", evaluate: "Valuta", generate: "Genera", download: "Scarica",
    newComponent: "Nuovo Componente", next: "Avanti", previous: "Indietro", finish: "Termina",
    material: "Materiale", aluminium: "Alluminio (Al)", titanium: "Titanio (Ti)", inconel: "Inconel (Ni-Cr)",
    thickness: "Spessore", voltage: "Tensione (kV)", current: "Corrente (mA)",
    detectorType: "Tipo Rivelatore", detectorCR: "CR (Radiografia Computerizzata)",
    detectorDDA: "DDA (Rivelatore Digitale)", crSystem: "Sistema CR", ddaSystem: "Sistema DDA",
    iqiType: "Tipo IQI", iqiNone: "Nessuno", iqiISO: "ISO 19232-1 (Fili)",
    iqiASTM: "ASTM E1025 (Fori)", iqiDuplex: "ISO 19232-5 (Duplex)", iqiAll: "Tutti (Insegnamento)",
    specimenType: "Tipo Campione", flatPlate: "Piastra Piana", weldedJoint: "Giunto Saldato",
    weldZone: "Zona Saldatura", heatAffectedZone: "ZTA",
    imageProcessing: "Elaborazione Immagine", brightness: "Luminosità", contrast: "Contrasto",
    ddaCalibration: "Calibrazione DDA", offsetCorrection: "Correzione Offset",
    gainCorrection: "Correzione Guadagno", badPixelCorrection: "Correzione Pixel Difettosi", autoCalibrate: "Auto Calibra",
    defects: "Difetti", crack: "Cricca", porosity: "Porosità", cluster: "Cluster",
    inclusion: "Inclusione", cavity: "Cavità", lackOfFusion: "Mancata Fusione",
    undercut: "Undercut", underfill: "Mancato Riempimento", alignedPorosity: "Porosità Allineata", slagInclusion: "Inclusione di Scoria",
    detected: "Rilevati", falsePositives: "Falsi Positivi", score: "Punteggio",
    passed: "SUPERATO", failed: "NON SUPERATO",
    showHints: "Mostra Indicatori", hideHints: "Nascondi Indicatori", showIdealParams: "Mostra Parametri Ideali",
    dragToMark: "Trascina per selezionare difetto. Selezionati:", selectDefectType: "Seleziona tipo difetto:",
    confirm: "Conferma", cancel: "Annulla", defectMarked: "Difetti Marcati",
    correctType: "Tipo corretto", wrongType: "Tipo errato",
    users: "Utenti", exams: "Esami", avgScore: "Punteggio Medio", activeUsers: "Utenti Attivi",
    totalExams: "Esami Totali", examHistory: "Storico Esami", date: "Data", result: "Risultato",
    quality: "Qualità Immagine", optimal: "Ottimale", acceptable: "Accettabile",
    suboptimal: "Subottimale", overexposed: "Sovraesposta", underexposed: "Sottoesposta",
    imageOf: "Immagine", of: "di", noDefects: "Nessun difetto in questa immagine",
    alreadyMarked: "Quest'area difetto è già stata marcata",
    mouseHint: "Ctrl+Scroll: Zoom | Click destro + trascina: Luminosità/Contrasto"
  }
};

// ═══════════════════════════════════════════════════════════════════════════════
// IQI DATA
// ═══════════════════════════════════════════════════════════════════════════════
const isoWires = {
  1: 3.20, 2: 2.50, 3: 2.00, 4: 1.60, 5: 1.25, 6: 1.00,
  7: 0.80, 8: 0.63, 9: 0.50, 10: 0.40, 11: 0.32, 12: 0.25,
  13: 0.20, 14: 0.16, 15: 0.125, 16: 0.100, 17: 0.080, 18: 0.063, 19: 0.050
};

const isoWireSets = {
  setA: { wires: [1, 2, 3, 4, 5, 6, 7], range: "3.2-0.8mm" },
  setB: { wires: [6, 7, 8, 9, 10, 11, 12], range: "1.0-0.25mm" },
  setC: { wires: [10, 11, 12, 13, 14, 15, 16], range: "0.4-0.1mm" },
  setD: { wires: [13, 14, 15, 16, 17, 18, 19], range: "0.2-0.05mm" }
};

const astmHoles = [
  { id: '1T', factor: 1 },
  { id: '2T', factor: 2 },
  { id: '4T', factor: 4 }
];

const duplexElements = [
  { id: 'D1', diameter: 0.80, srb: 0.80 },
  { id: 'D2', diameter: 0.63, srb: 0.63 },
  { id: 'D3', diameter: 0.50, srb: 0.50 },
  { id: 'D4', diameter: 0.40, srb: 0.40 },
  { id: 'D5', diameter: 0.32, srb: 0.32 },
  { id: 'D6', diameter: 0.25, srb: 0.25 },
  { id: 'D7', diameter: 0.20, srb: 0.20 },
  { id: 'D8', diameter: 0.16, srb: 0.16 },
  { id: 'D9', diameter: 0.13, srb: 0.13 },
  { id: 'D10', diameter: 0.10, srb: 0.10 },
  { id: 'D11', diameter: 0.08, srb: 0.08 },
  { id: 'D12', diameter: 0.063, srb: 0.063 },
  { id: 'D13', diameter: 0.05, srb: 0.05 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// CONTEXTS
// ═══════════════════════════════════════════════════════════════════════════════
const LanguageContext = createContext();
const AuthContext = createContext();
const useLanguage = () => useContext(LanguageContext);
const useAuth = () => useContext(AuthContext);

// ═══════════════════════════════════════════════════════════════════════════════
// AUTH PROVIDER
// ═══════════════════════════════════════════════════════════════════════════════
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await storage.get('current_user');
      if (result && result.value) {
        setUser(JSON.parse(result.value));
      }
    } catch (err) {}
    setLoading(false);
  };

  const login = async (email, password) => {
    try {
      const usersResult = await storage.get('users_db');
      const users = usersResult ? JSON.parse(usersResult.value) : [];
      const foundUser = users.find(u => u.email === email && u.password === password);
      if (foundUser) {
        const userSession = { ...foundUser, lastLogin: new Date().toISOString() };
        delete userSession.password;
        await storage.set('current_user', JSON.stringify(userSession));
        setUser(userSession);
        sendEmailToGoogleSheet(email, 'login');
        return { success: true };
      }
      return { success: false, error: 'Credenziali non valide' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    await storage.delete('current_user');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const usersResult = await storage.get('users_db');
      const users = usersResult ? JSON.parse(usersResult.value) : [];
      if (users.find(u => u.email === userData.email)) {
        return { success: false, error: 'Email già esistente' };
      }
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
        exams: []
      };
      users.push(newUser);
      await storage.set('users_db', JSON.stringify(users));
      sendEmailToGoogleSheet(userData.email, 'register');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// LOGIN SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('student');
  const { login, register } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (!result.success) setError(result.error);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const result = await register({ email, password, username, role });
    if (result.success) {
      setIsRegistering(false);
      setError('Registrazione completata! Ora puoi accedere.');
    } else {
      setError(result.error);
    }
  };

  useEffect(() => {
    const initDemoUsers = async () => {
      const existing = await storage.get('users_db');
      if (!existing) {
        const demoUsers = [
          { id: '1', email: 'admin@rt.com', password: 'admin123', username: 'Admin', role: 'admin', createdAt: new Date().toISOString(), exams: [] },
          { id: '2', email: 'trainer@rt.com', password: 'trainer123', username: 'Trainer', role: 'trainer', createdAt: new Date().toISOString(), exams: [] },
          { id: '3', email: 'student@rt.com', password: 'student123', username: 'Student', role: 'student', createdAt: new Date().toISOString(), exams: [] }
        ];
        await storage.set('users_db', JSON.stringify(demoUsers));
      }
    };
    initDemoUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-4 right-4">
        <button onClick={() => setLanguage(language === 'en' ? 'it' : 'en')} className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-lg text-white hover:bg-gray-700">
          <Globe className="w-4 h-4" />
          {language.toUpperCase()}
        </button>
      </div>
      
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md border border-gray-700">
        <div className="text-center mb-8">
          <Camera className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">{t.title}</h1>
          <p className="text-gray-400 text-sm">{t.subtitle}</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
          {isRegistering && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.username}</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">{t.role}</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white">
                  <option value="student">{t.student}</option>
                  <option value="trainer">{t.trainer}</option>
                </select>
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.email}</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">{t.password}</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded text-white" required />
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition">
            {isRegistering ? 'Registrati' : t.login}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button onClick={() => setIsRegistering(!isRegistering)} className="text-blue-400 hover:text-blue-300 text-sm">
            {isRegistering ? 'Hai già un account? Accedi' : 'Serve un account? Registrati'}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500 text-center mb-2">Account Demo:</p>
          <div className="text-xs text-gray-400 space-y-1 text-center">
            <p>Admin: admin@rt.com / admin123</p>
            <p>Trainer: trainer@rt.com / trainer123</p>
            <p>Student: student@rt.com / student123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// ADMIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalExams: 0, avgScore: 0, activeUsers: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const usersResult = await storage.get('users_db');
    if (usersResult) {
      const usersData = JSON.parse(usersResult.value);
      setUsers(usersData);
      const totalExams = usersData.reduce((sum, u) => sum + (u.exams?.length || 0), 0);
      const allScores = usersData.flatMap(u => u.exams?.map(e => parseFloat(e.score)) || []);
      const avgScore = allScores.length > 0 ? allScores.reduce((a, b) => a + b, 0) / allScores.length : 0;
      setStats({
        totalUsers: usersData.length,
        totalExams,
        avgScore: avgScore.toFixed(1),
        activeUsers: usersData.filter(u => u.exams?.length > 0).length
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">{t.admin} {t.dashboard}</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <p className="text-blue-300 text-sm">{t.users}</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
        </div>
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <p className="text-green-300 text-sm">{t.totalExams}</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.totalExams}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700">
          <p className="text-purple-300 text-sm">{t.avgScore}</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.avgScore}%</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 p-6 rounded-lg border border-yellow-700">
          <p className="text-yellow-300 text-sm">{t.activeUsers}</p>
          <p className="text-3xl font-bold text-white mt-2">{stats.activeUsers}</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">{t.users}</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.username}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.email}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.role}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.exams}</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">{t.avgScore}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map(user => {
                const userScores = user.exams?.map(e => parseFloat(e.score)) || [];
                const userAvg = userScores.length > 0 ? (userScores.reduce((a, b) => a + b, 0) / userScores.length).toFixed(1) : '-';
                return (
                  <tr key={user.id}>
                    <td className="px-4 py-3 text-sm text-white">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-red-900 text-red-200' :
                        user.role === 'trainer' ? 'bg-blue-900 text-blue-200' :
                        'bg-green-900 text-green-200'
                      }`}>{user.role}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-300">{user.exams?.length || 0}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{userAvg}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// STUDENT DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════
const StudentDashboard = () => {
  const [examHistory, setExamHistory] = useState([]);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    loadExamHistory();
  }, []);

  const loadExamHistory = async () => {
    const usersResult = await storage.get('users_db');
    if (usersResult) {
      const users = JSON.parse(usersResult.value);
      const currentUser = users.find(u => u.id === user.id);
      if (currentUser?.exams) setExamHistory(currentUser.exams);
    }
  };

  const avgScore = examHistory.length > 0 
    ? (examHistory.reduce((sum, e) => sum + parseFloat(e.score), 0) / examHistory.length).toFixed(1) : 0;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-white">{t.dashboard}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <p className="text-blue-300 text-sm">{t.totalExams}</p>
          <p className="text-3xl font-bold text-white mt-2">{examHistory.length}</p>
        </div>
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <p className="text-green-300 text-sm">{t.avgScore}</p>
          <p className="text-3xl font-bold text-white mt-2">{avgScore}%</p>
        </div>
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700">
          <p className="text-purple-300 text-sm">{t.passed}</p>
          <p className="text-3xl font-bold text-white mt-2">{examHistory.filter(e => parseFloat(e.score) >= 80).length}</p>
        </div>
      </div>
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-4">
        <h3 className="text-lg font-semibold text-white mb-4">{t.examHistory}</h3>
        <div className="space-y-2">
          {examHistory.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Nessun esame completato</p>
          ) : (
            examHistory.slice().reverse().map((exam, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-white font-semibold">Esame #{examHistory.length - idx}</p>
                  <p className="text-sm text-gray-400">{new Date(exam.date).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{exam.material} • {exam.thickness}mm</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{exam.score}%</p>
                  <p className={`text-sm ${parseFloat(exam.score) >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(exam.score) >= 80 ? t.passed : t.failed}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// DEFECT TYPE MODAL
// ═══════════════════════════════════════════════════════════════════════════════
const DefectTypeModal = ({ specimenType, onConfirm, onCancel, t }) => {
  const [selectedType, setSelectedType] = useState('crack');
  
  const baseDefects = ['crack', 'porosity', 'inclusion'];
  const plateDefects = ['cluster', 'cavity'];
  const weldDefects = ['lackOfFusion', 'undercut', 'underfill', 'alignedPorosity', 'slagInclusion'];
  
  const availableDefects = specimenType === 'weld' 
    ? [...baseDefects, ...weldDefects]
    : [...baseDefects, ...plateDefects];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-white mb-4">{t.selectDefectType}</h3>
        <div className="space-y-2 mb-6">
          {availableDefects.map(type => (
            <label key={type} className="flex items-center gap-3 p-3 bg-gray-700 rounded cursor-pointer hover:bg-gray-600 transition">
              <input type="radio" name="defectType" value={type} checked={selectedType === type} onChange={(e) => setSelectedType(e.target.value)} className="w-5 h-5" />
              <span className="text-white font-medium">{t[type]}</span>
            </label>
          ))}
        </div>
        <div className="flex gap-3">
          <button onClick={() => onConfirm(selectedType)} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg">{t.confirm}</button>
          <button onClick={onCancel} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 rounded-lg">{t.cancel}</button>
        </div>
      </div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// X-RAY SIMULATOR - Main Component with all features
// ═══════════════════════════════════════════════════════════════════════════════
const XRaySimulator = ({ onExamComplete }) => {
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const { t } = useLanguage();
  const { user } = useAuth();
  
  // Mode
  const [mode, setMode] = useState('teaching');
  const [material, setMaterial] = useState('aluminum');
  const [thickness, setThickness] = useState(10);
  const [kV, setKV] = useState(150);
  const [mA, setMA] = useState(5);
  const [examStarted, setExamStarted] = useState(false);
  const [score, setScore] = useState(null);
  const [isReviewMode, setIsReviewMode] = useState(false); // Review exam results
  const [showHints, setShowHints] = useState(true); // Toggle per teaching mode
  
  // Multi-image exam (5 images)
  const [examImages, setExamImages] = useState([]); // Array of {defects, hasDefects}
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allMarkedDefects, setAllMarkedDefects] = useState([]); // Array per ogni immagine
  const [defects, setDefects] = useState([]);
  const [markedDefects, setMarkedDefects] = useState([]);
  
  // Selection state
  const [isDrawing, setIsDrawing] = useState(false);
  const [selectionStart, setSelectionStart] = useState(null);
  const [selectionEnd, setSelectionEnd] = useState(null);
  const [pendingSelection, setPendingSelection] = useState(null);
  const [showDefectModal, setShowDefectModal] = useState(false);
  
  // Zoom and pan
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  
  // Right-click brightness/contrast
  const [isRightDragging, setIsRightDragging] = useState(false);
  const [rightDragStart, setRightDragStart] = useState(null);
  const [initialBrightness, setInitialBrightness] = useState(0);
  const [initialContrast, setInitialContrast] = useState(0);
  
  // Image processing
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  
  // DDA Calibration
  const [offsetCorrection, setOffsetCorrection] = useState(0);
  const [gainCorrection, setGainCorrection] = useState(1.0);
  const [badPixelCorrection, setBadPixelCorrection] = useState(false);
  
  // Detector & IQI
  const [detectorType, setDetectorType] = useState('dda');
  const [iqiType, setIqiType] = useState('iso');
  const [showIQI, setShowIQI] = useState(true);
  
  // Specimen type
  const [specimenType, setSpecimenType] = useState('plate');
  
  // Noise seed and bad pixels map
  const [noiseSeed, setNoiseSeed] = useState(Date.now());
  const [badPixelsMap, setBadPixelsMap] = useState([]);
  
  // Material coefficients
  const attenuationCoefficients = {
    aluminum: { density: 2.7, baseCoeff: 0.4, kvFactor: 0.002 },
    titanium: { density: 4.5, baseCoeff: 0.8, kvFactor: 0.003 },
    inconel: { density: 8.2, baseCoeff: 1.5, kvFactor: 0.005 }
  };

  // Generate bad pixels map for DDA (called once on mount and when detector changes)
  useEffect(() => {
    if (detectorType === 'dda') {
      const pixels = [];
      const numBadPixels = Math.floor(Math.random() * 20) + 10; // 10-30 bad pixels
      for (let i = 0; i < numBadPixels; i++) {
        pixels.push({
          x: Math.floor(Math.random() * 800),
          y: Math.floor(Math.random() * 600),
          type: Math.random() > 0.5 ? 'hot' : 'dead', // hot = bright, dead = dark
          cluster: Math.random() > 0.8 // 20% chance of being a cluster
        });
      }
      setBadPixelsMap(pixels);
    }
  }, [detectorType, noiseSeed]);

  // Calculate ideal parameters
  const calculateIdealParams = () => {
    const materialParams = {
      aluminum: { baseKV: 80, kvPerMm: 2, basemA: 4 },
      titanium: { baseKV: 100, kvPerMm: 3, basemA: 5 },
      inconel: { baseKV: 140, kvPerMm: 4, basemA: 6 }
    };
    const params = materialParams[material];
    const detectorFactor = detectorType === 'cr' ? 1.2 : 1.0;
    const idealKV = Math.min(300, Math.max(50, params.baseKV + params.kvPerMm * thickness));
    const idealMA = Math.min(20, Math.max(1, params.basemA * detectorFactor * (thickness / 10)));
    return { idealKV: Math.round(idealKV), idealMA: idealMA.toFixed(1) };
  };

  // Evaluate image quality
  const evaluateImageQuality = () => {
    const ideal = calculateIdealParams();
    const kvDiff = Math.abs(kV - ideal.idealKV);
    const maDiff = Math.abs(mA - parseFloat(ideal.idealMA));
    if (kvDiff < 20 && maDiff < 1) return 'optimal';
    if (kvDiff < 40 && maDiff < 2) return 'acceptable';
    if (kV > ideal.idealKV + 50) return 'overexposed';
    if (kV < ideal.idealKV - 40) return 'underexposed';
    return 'suboptimal';
  };

  // Get IQI set
  const getIQISet = () => {
    if (thickness <= 10) return 'setD';
    if (thickness <= 20) return 'setC';
    if (thickness <= 35) return 'setB';
    return 'setA';
  };

  // Calculate SRb
  const calculateSRb = () => {
    const quality = evaluateImageQuality();
    let baseVisibility;
    if (detectorType === 'dda') {
      baseVisibility = quality === 'optimal' ? 11 : quality === 'acceptable' ? 10 : 8;
    } else {
      baseVisibility = quality === 'optimal' ? 9 : quality === 'acceptable' ? 8 : 6;
    }
    const contrastBonus = Math.floor(contrast / 40);
    const visibleElement = Math.min(13, Math.max(1, baseVisibility + contrastBonus));
    const element = duplexElements[visibleElement - 1];
    return {
      visibleCount: visibleElement,
      srbValue: element ? element.srb.toFixed(2) : '0.10',
      elementId: element ? element.id : 'D10'
    };
  };

  // Generate defects for a single image
  const generateDefectsForImage = (canHaveNoDefects = false) => {
    // Possibility of no defects (for exam)
    if (canHaveNoDefects && Math.random() < 0.2) {
      return { defects: [], hasDefects: false };
    }
    
    const newDefects = [];
    const numDefects = Math.floor(Math.random() * 2) + 3; // 3-4 defects
    
    const baseTypes = ['crack', 'porosity', 'inclusion'];
    const plateTypes = ['cluster', 'cavity'];
    const weldTypes = ['lackOfFusion', 'undercut', 'underfill', 'alignedPorosity', 'slagInclusion'];
    const availableTypes = specimenType === 'weld' ? [...baseTypes, ...weldTypes] : [...baseTypes, ...plateTypes];
    
    for (let i = 0; i < numDefects; i++) {
      const type = availableTypes[Math.floor(Math.random() * availableTypes.length)];
      
      let baseX, baseY;
      if (specimenType === 'weld') {
        if (Math.random() < 0.7) {
          baseX = 0.4 + Math.random() * 0.2;
        } else {
          baseX = Math.random() < 0.5 ? 0.25 + Math.random() * 0.15 : 0.6 + Math.random() * 0.15;
        }
        baseY = 0.15 + Math.random() * 0.7;
      } else {
        baseX = 0.15 + Math.random() * 0.7;
        baseY = 0.15 + Math.random() * 0.7;
      }
      
      switch(type) {
        case 'crack':
          const crackLength = Math.random() * 0.08 + 0.04;
          const crackAngle = Math.random() * Math.PI;
          const crackPoints = [];
          const numSegments = Math.floor(Math.random() * 4) + 3;
          let cx = baseX, cy = baseY;
          crackPoints.push({ x: cx, y: cy });
          for (let j = 0; j < numSegments; j++) {
            const segLen = crackLength / numSegments;
            const deviation = (Math.random() - 0.5) * 0.3;
            cx += Math.cos(crackAngle + deviation) * segLen;
            cy += Math.sin(crackAngle + deviation) * segLen;
            crackPoints.push({ x: cx, y: cy });
          }
          newDefects.push({
            id: i, type: 'crack', x: baseX, y: baseY,
            points: crackPoints, width: Math.random() * 0.003 + 0.001,
            severity: Math.random() * 0.4 + 0.5,
            branches: Math.random() > 0.6 ? [{
              startIdx: Math.floor(Math.random() * (numSegments - 1)) + 1,
              angle: crackAngle + (Math.random() - 0.5) * Math.PI/2,
              length: crackLength * 0.3
            }] : []
          });
          break;
        case 'porosity':
          newDefects.push({
            id: i, type: 'porosity', x: baseX, y: baseY,
            size: Math.random() * 0.015 + 0.005,
            irregularity: Math.random() * 0.3,
            severity: Math.random() * 0.3 + 0.4
          });
          break;
        case 'cluster':
          const pores = [];
          const numPores = Math.floor(Math.random() * 8) + 5;
          const clusterRadius = Math.random() * 0.03 + 0.02;
          for (let p = 0; p < numPores; p++) {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * clusterRadius;
            pores.push({ dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist, size: Math.random() * 0.004 + 0.002, severity: Math.random() * 0.3 + 0.3 });
          }
          newDefects.push({ id: i, type: 'cluster', x: baseX, y: baseY, pores, size: clusterRadius, severity: Math.random() * 0.3 + 0.4 });
          break;
        case 'inclusion':
          newDefects.push({
            id: i, type: 'inclusion', x: baseX, y: baseY,
            size: Math.random() * 0.008 + 0.003,
            elongation: Math.random() * 0.5 + 0.5,
            angle: Math.random() * Math.PI,
            severity: Math.random() * 0.4 + 0.4
          });
          break;
        case 'cavity':
          const cavityPoints = [];
          const numCavityPoints = Math.floor(Math.random() * 4) + 5;
          const cavitySize = Math.random() * 0.02 + 0.01;
          for (let c = 0; c < numCavityPoints; c++) {
            const angle = (c / numCavityPoints) * Math.PI * 2;
            const radius = cavitySize * (0.7 + Math.random() * 0.6);
            cavityPoints.push({ dx: Math.cos(angle) * radius, dy: Math.sin(angle) * radius });
          }
          newDefects.push({ id: i, type: 'cavity', x: baseX, y: baseY, points: cavityPoints, size: cavitySize, severity: Math.random() * 0.4 + 0.5 });
          break;
        case 'lackOfFusion':
          newDefects.push({
            id: i, type: 'lackOfFusion', x: baseX, y: baseY,
            length: Math.random() * 0.06 + 0.03, width: Math.random() * 0.004 + 0.002,
            angle: Math.PI/2 + (Math.random() - 0.5) * 0.3, severity: Math.random() * 0.3 + 0.5
          });
          break;
        case 'undercut':
          newDefects.push({
            id: i, type: 'undercut', x: Math.random() < 0.5 ? 0.35 : 0.65, y: baseY,
            length: Math.random() * 0.08 + 0.04, depth: Math.random() * 0.005 + 0.002, severity: Math.random() * 0.3 + 0.4
          });
          break;
        case 'underfill':
          newDefects.push({
            id: i, type: 'underfill', x: 0.5, y: baseY,
            length: Math.random() * 0.1 + 0.05, depth: Math.random() * 0.006 + 0.003, severity: Math.random() * 0.3 + 0.4
          });
          break;
        case 'alignedPorosity':
          const alignedPores = [];
          const numAligned = Math.floor(Math.random() * 5) + 3;
          const spacing = Math.random() * 0.015 + 0.01;
          for (let a = 0; a < numAligned; a++) {
            alignedPores.push({ offset: a * spacing, size: Math.random() * 0.005 + 0.003, severity: Math.random() * 0.2 + 0.4 });
          }
          newDefects.push({ id: i, type: 'alignedPorosity', x: baseX, y: baseY, pores: alignedPores, angle: Math.random() * Math.PI, severity: Math.random() * 0.3 + 0.4 });
          break;
        case 'slagInclusion':
          newDefects.push({
            id: i, type: 'slagInclusion', x: baseX, y: baseY,
            length: Math.random() * 0.04 + 0.02, width: Math.random() * 0.008 + 0.004,
            angle: Math.random() * Math.PI, irregularity: Math.random() * 0.4, severity: Math.random() * 0.3 + 0.5
          });
          break;
        default:
          newDefects.push({ id: i, type, x: baseX, y: baseY, size: Math.random() * 0.02 + 0.01, severity: Math.random() * 0.3 + 0.4 });
      }
    }
    return { defects: newDefects, hasDefects: true };
  };

  // Generate single image defects (for teaching/learning)
  const generateDefects = () => {
    const result = generateDefectsForImage(false);
    setDefects(result.defects);
    setNoiseSeed(Date.now());
  };

  // Generate 5 exam images
  const generateExamImages = () => {
    const images = [];
    for (let i = 0; i < 5; i++) {
      // 20% chance of no defects for some images
      images.push(generateDefectsForImage(true));
    }
    // Ensure at least one has no defects and at least 3 have defects
    const hasNoDefects = images.filter(img => !img.hasDefects).length;
    if (hasNoDefects === 0) {
      const randomIdx = Math.floor(Math.random() * 5);
      images[randomIdx] = { defects: [], hasDefects: false };
    }
    setExamImages(images);
    setAllMarkedDefects(images.map(() => []));
    setCurrentImageIndex(0);
    setDefects(images[0].defects);
    setMarkedDefects([]);
  };

  // Auto calibration
  const autoCalibrate = () => {
    const materialOffsets = { aluminum: 5, titanium: 8, inconel: 12 };
    const materialGains = { aluminum: 1.05, titanium: 1.1, inconel: 1.15 };
    setOffsetCorrection(materialOffsets[material] || 5);
    setGainCorrection(materialGains[material] || 1.0);
    if (detectorType === 'dda') setBadPixelCorrection(true);
  };

  // Initialize
  useEffect(() => {
    generateDefects();
  }, [material, thickness, specimenType]);

  // Auto-update ideal params in teaching mode
  useEffect(() => {
    if (mode === 'teaching') {
      const ideal = calculateIdealParams();
      setKV(ideal.idealKV);
      setMA(parseFloat(ideal.idealMA));
    }
  }, [material, thickness, detectorType, mode]);


  // ═══════════════════════════════════════════════════════════════════════════
  // CANVAS RENDERING with Quantum Noise (CR) and Bad Pixels (DDA)
  // ═══════════════════════════════════════════════════════════════════════════
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
    
    // Seeded random generator
    const seededRandom = (seed) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    // Poisson noise generator for quantum noise (CR)
    const poissonNoise = (lambda, seed) => {
      const L = Math.exp(-lambda);
      let k = 0;
      let p = 1;
      let seedVal = seed;
      do {
        k++;
        seedVal = seedVal * 1.1 + 0.7;
        p *= seededRandom(seedVal);
      } while (p > L && k < 20);
      return k - 1;
    };
    
    const matData = attenuationCoefficients[material];
    const mu = (matData.baseCoeff - (kV - 100) * matData.kvFactor) * matData.density;
    const baseIntensity = 200;
    
    // CR has more quantum noise, DDA has less but has bad pixels
    const crQuantumNoiseFactor = 4; // Moderate quantum noise for CR (realistic)
    const ddaBaseNoise = 3; // Lower base noise for DDA
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        const nx = x / width;
        const ny = y / height;
        
        // Edge attenuation
        const edgeFactor = 1 + 0.2 * Math.pow(Math.abs(nx - 0.5) * 2, 2);
        let localThickness = thickness * edgeFactor;
        
        // Weld visualization
        if (specimenType === 'weld') {
          const weldCenter = 0.5;
          const weldWidth = 0.08;
          const hazWidth = 0.12;
          const distFromCenter = Math.abs(nx - weldCenter);
          if (distFromCenter < weldWidth) {
            localThickness *= 1 + 0.15 * (1 - distFromCenter / weldWidth);
          } else if (distFromCenter < hazWidth) {
            localThickness *= 1 + 0.05 * Math.sin(ny * 50 + nx * 30);
          }
        }
        
        // Defect factor calculation
        let defectFactor = 1;
        defects.forEach(defect => {
          const dx = nx - defect.x;
          const dy = ny - defect.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          switch(defect.type) {
            case 'crack':
              if (defect.points) {
                defect.points.forEach((pt, i) => {
                  if (i < defect.points.length - 1) {
                    const nextPt = defect.points[i + 1];
                    const px = nx - pt.x;
                    const py = ny - pt.y;
                    const lx = nextPt.x - pt.x;
                    const ly = nextPt.y - pt.y;
                    const len = Math.sqrt(lx * lx + ly * ly);
                    if (len > 0) {
                      const t = Math.max(0, Math.min(1, (px * lx + py * ly) / (len * len)));
                      const projX = pt.x + t * lx;
                      const projY = pt.y + t * ly;
                      const perpDist = Math.sqrt((nx - projX) ** 2 + (ny - projY) ** 2);
                      if (perpDist < (defect.width || 0.002)) {
                        const intensity = 1 - perpDist / (defect.width || 0.002);
                        defectFactor *= (1 - defect.severity * intensity * 0.9);
                      }
                    }
                  }
                });
              }
              break;
            case 'porosity':
              if (dist < defect.size) {
                const intensity = 1 - dist / defect.size;
                defectFactor *= (1 - defect.severity * intensity * 0.85);
              }
              break;
            case 'cluster':
              if (defect.pores) {
                defect.pores.forEach(pore => {
                  const poreDist = Math.sqrt((dx - pore.dx) ** 2 + (dy - pore.dy) ** 2);
                  if (poreDist < pore.size) {
                    defectFactor *= (1 - pore.severity * (1 - poreDist / pore.size) * 0.8);
                  }
                });
              }
              break;
            case 'inclusion':
              if (defect.elongation) {
                const rotX = dx * Math.cos(-defect.angle) - dy * Math.sin(-defect.angle);
                const rotY = dx * Math.sin(-defect.angle) + dy * Math.cos(-defect.angle);
                const ellipseDist = Math.sqrt((rotX / defect.size) ** 2 + (rotY / (defect.size * defect.elongation)) ** 2);
                if (ellipseDist < 1) {
                  defectFactor *= (1 + defect.severity * (1 - ellipseDist) * 1.5);
                }
              }
              break;
            case 'cavity':
              if (defect.points && defect.points.length > 2) {
                let inside = false;
                const pts = defect.points;
                for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
                  const xi = defect.x + pts[i].dx, yi = defect.y + pts[i].dy;
                  const xj = defect.x + pts[j].dx, yj = defect.y + pts[j].dy;
                  if (((yi > ny) !== (yj > ny)) && (nx < (xj - xi) * (ny - yi) / (yj - yi) + xi)) inside = !inside;
                }
                if (inside) defectFactor *= (1 - defect.severity * 0.9);
              }
              break;
            case 'lackOfFusion':
              const lofRotX = dx * Math.cos(-defect.angle) - dy * Math.sin(-defect.angle);
              const lofRotY = dx * Math.sin(-defect.angle) + dy * Math.cos(-defect.angle);
              if (Math.abs(lofRotX) < defect.width && Math.abs(lofRotY) < defect.length / 2) {
                const intensity = (1 - Math.abs(lofRotX) / defect.width) * (1 - Math.abs(lofRotY) / (defect.length / 2));
                defectFactor *= (1 - defect.severity * intensity * 0.85);
              }
              break;
            case 'undercut':
              if (Math.abs(dy) < defect.length / 2 && Math.abs(dx) < defect.depth) {
                defectFactor *= (1 - defect.severity * (1 - Math.abs(dx) / defect.depth) * 0.7);
              }
              break;
            case 'underfill':
              if (Math.abs(dy) < defect.length / 2 && Math.abs(dx) < 0.05) {
                defectFactor *= (1 - defect.severity * (1 - Math.abs(dx) / 0.05) * defect.depth * 100 * 0.5);
              }
              break;
            case 'alignedPorosity':
              if (defect.pores) {
                defect.pores.forEach(pore => {
                  const poreX = defect.x + Math.cos(defect.angle) * pore.offset;
                  const poreY = defect.y + Math.sin(defect.angle) * pore.offset;
                  const poreDist = Math.sqrt((nx - poreX) ** 2 + (ny - poreY) ** 2);
                  if (poreDist < pore.size) {
                    defectFactor *= (1 - pore.severity * (1 - poreDist / pore.size) * 0.8);
                  }
                });
              }
              break;
            case 'slagInclusion':
              const slagRotX = dx * Math.cos(-defect.angle) - dy * Math.sin(-defect.angle);
              const slagRotY = dx * Math.sin(-defect.angle) + dy * Math.cos(-defect.angle);
              const slagDist = Math.sqrt((slagRotX / (defect.length/2)) ** 2 + (slagRotY / (defect.width/2)) ** 2);
              if (slagDist < 1) {
                const irregularity = 1 + Math.sin(slagRotX * 50 + slagRotY * 30) * defect.irregularity;
                if (slagDist * irregularity < 1) {
                  defectFactor *= (1 + defect.severity * (1 - slagDist) * 1.2);
                }
              }
              break;
          }
        });
        
        // Beer-Lambert
        const effectiveThickness = localThickness * defectFactor;
        let intensity = baseIntensity * Math.exp(-mu * effectiveThickness / 50) * Math.pow(mA / 5, 0.5);
        
        // Apply calibration
        intensity = (intensity - offsetCorrection) * gainCorrection;
        
        // Add noise based on detector type
        const noiseSeedVal = noiseSeed + y * width + x;
        
        if (detectorType === 'cr') {
          // CR: Moderate quantum noise + subtle granular noise from phosphor plate
          const quantumNoise = (poissonNoise(Math.max(1, intensity / 25), noiseSeedVal) - intensity / 25) * crQuantumNoiseFactor;
          const granularNoise = (seededRandom(noiseSeedVal * 1.3) * 2 - 1) * 3;
          const structureNoise = Math.sin(x * 0.3 + seededRandom(noiseSeedVal) * 5) * 0.8; // Subtle plate structure
          intensity += quantumNoise + granularNoise + structureNoise;
        } else {
          // DDA: Lower uniform noise
          const ddaNoise = (seededRandom(noiseSeedVal) * 2 - 1) * ddaBaseNoise;
          intensity += ddaNoise;
        }
        
        // Apply brightness and contrast
        intensity += brightness * 2.55;
        const contrastFactor = (100 + contrast) / 100;
        intensity = ((intensity - 128) * contrastFactor) + 128;
        
        // Clamp
        intensity = Math.max(0, Math.min(255, intensity));
        
        // Color based on detector
        if (detectorType === 'cr') {
          data[idx] = (255 - intensity) * 0.8;
          data[idx + 1] = (255 - intensity) * 0.95;
          data[idx + 2] = (255 - intensity) * 0.9;
        } else {
          data[idx] = (255 - intensity) * 0.75;
          data[idx + 1] = (255 - intensity) * 0.95;
          data[idx + 2] = (255 - intensity) * 0.85;
        }
        data[idx + 3] = 255;
      }
    }
    
    // Apply DDA bad pixels (if not corrected)
    if (detectorType === 'dda' && !badPixelCorrection) {
      badPixelsMap.forEach(pixel => {
        const idx = (pixel.y * width + pixel.x) * 4;
        if (idx >= 0 && idx < data.length - 3) {
          if (pixel.type === 'hot') {
            // Hot pixel - very bright
            data[idx] = 255;
            data[idx + 1] = 255;
            data[idx + 2] = 255;
            // Cluster effect
            if (pixel.cluster) {
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const cidx = ((pixel.y + dy) * width + (pixel.x + dx)) * 4;
                  if (cidx >= 0 && cidx < data.length - 3) {
                    data[cidx] = Math.min(255, data[cidx] + 100);
                    data[cidx + 1] = Math.min(255, data[cidx + 1] + 100);
                    data[cidx + 2] = Math.min(255, data[cidx + 2] + 100);
                  }
                }
              }
            }
          } else {
            // Dead pixel - completely dark
            data[idx] = 0;
            data[idx + 1] = 0;
            data[idx + 2] = 0;
            if (pixel.cluster) {
              for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {
                  const cidx = ((pixel.y + dy) * width + (pixel.x + dx)) * 4;
                  if (cidx >= 0 && cidx < data.length - 3) {
                    data[cidx] = Math.max(0, data[cidx] - 80);
                    data[cidx + 1] = Math.max(0, data[cidx + 1] - 80);
                    data[cidx + 2] = Math.max(0, data[cidx + 2] - 80);
                  }
                }
              }
            }
          }
        }
      });
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Draw weld overlay
    if (specimenType === 'weld') {
      ctx.strokeStyle = 'rgba(100, 100, 100, 0.3)';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(width * 0.42, 0); ctx.lineTo(width * 0.42, height);
      ctx.moveTo(width * 0.58, 0); ctx.lineTo(width * 0.58, height);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(80, 80, 80, 0.2)';
      ctx.beginPath();
      ctx.moveTo(width * 0.38, 0); ctx.lineTo(width * 0.38, height);
      ctx.moveTo(width * 0.62, 0); ctx.lineTo(width * 0.62, height);
      ctx.stroke();
      ctx.setLineDash([]);
    }
    
    // Draw IQI based on selected type
    if (showIQI && iqiType !== 'none') {
      const quality = evaluateImageQuality();
      const currentSetKey = getIQISet();
      const currentSet = isoWireSets[currentSetKey];
      
      // ISO 19232-1 Wire IQI
      if (iqiType === 'iso' || iqiType === 'all') {
        const iqiX = width - 100;
        const iqiY = 20;
        ctx.fillStyle = 'rgba(50, 50, 50, 0.9)';
        ctx.fillRect(iqiX - 5, iqiY - 5, 90, 85);
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
        ctx.strokeRect(iqiX - 5, iqiY - 5, 90, 85);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('ISO 19232-1', iqiX, iqiY + 5);
        ctx.fillText(currentSet.range, iqiX, iqiY + 15);
        
        currentSet.wires.forEach((wireId, idx) => {
          const wireDiameter = isoWires[wireId];
          const wireY = iqiY + 25 + idx * 8;
          const wireThickness = Math.max(1, wireDiameter * 2);
          const isVisible = quality === 'optimal' || (quality === 'acceptable' && idx < 5);
          ctx.strokeStyle = isVisible ? 'rgba(220, 220, 220, 0.9)' : 'rgba(150, 150, 150, 0.5)';
          ctx.lineWidth = wireThickness;
          ctx.beginPath();
          ctx.moveTo(iqiX + 5, wireY);
          ctx.lineTo(iqiX + 50, wireY);
          ctx.stroke();
          ctx.fillStyle = isVisible ? 'rgba(200, 200, 200, 0.9)' : 'rgba(120, 120, 120, 0.5)';
          ctx.font = '7px monospace';
          ctx.fillText(`W${wireId}`, iqiX + 55, wireY + 3);
        });
      }
      
      // ASTM E1025 Hole IQI
      if (iqiType === 'astm' || iqiType === 'all') {
        const holeIqiX = iqiType === 'all' ? width - 100 : width - 100;
        const holeIqiY = iqiType === 'all' ? 115 : 20;
        ctx.fillStyle = 'rgba(60, 60, 60, 0.9)';
        ctx.fillRect(holeIqiX - 5, holeIqiY - 5, 90, 55);
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
        ctx.strokeRect(holeIqiX - 5, holeIqiY - 5, 90, 55);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 8px monospace';
        ctx.fillText('ASTM E1025', holeIqiX, holeIqiY + 5);
        
        astmHoles.forEach((hole, idx) => {
          const holeDiameter = hole.factor * (thickness * 0.01) * 8;
          const holeY = holeIqiY + 20 + idx * 12;
          const radius = Math.max(2, Math.min(6, holeDiameter));
          ctx.fillStyle = 'rgba(30, 30, 30, 0.9)';
          ctx.beginPath();
          ctx.arc(holeIqiX + 15, holeY, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(200, 200, 200, 0.9)';
          ctx.font = '8px monospace';
          ctx.fillText(hole.id, holeIqiX + 30, holeY + 3);
        });
      }
      
      // ISO 19232-5 Duplex IQI
      if (iqiType === 'duplex' || iqiType === 'all') {
        const srbInfo = calculateSRb();
        const duplexX = iqiType === 'all' ? 20 : width - 100;
        const duplexY = 20;
        ctx.fillStyle = 'rgba(50, 50, 50, 0.9)';
        ctx.fillRect(duplexX - 5, duplexY - 5, 80, 100);
        ctx.strokeStyle = 'rgba(150, 150, 150, 0.8)';
        ctx.strokeRect(duplexX - 5, duplexY - 5, 80, 100);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.font = 'bold 7px monospace';
        ctx.fillText('ISO 19232-5', duplexX, duplexY + 5);
        ctx.fillStyle = 'rgba(100, 255, 100, 0.9)';
        ctx.fillText(`SRb=${srbInfo.srbValue}`, duplexX, duplexY + 15);
        
        duplexElements.slice(0, 8).forEach((element, idx) => {
          const elementY = duplexY + 25 + idx * 9;
          const wireThickness = Math.max(1, element.diameter * 3);
          const isVisible = idx < srbInfo.visibleCount;
          ctx.strokeStyle = isVisible ? 'rgba(220, 220, 220, 0.9)' : 'rgba(100, 100, 100, 0.4)';
          ctx.lineWidth = wireThickness;
          ctx.beginPath();
          ctx.moveTo(duplexX + 5, elementY - wireThickness);
          ctx.lineTo(duplexX + 40, elementY - wireThickness);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(duplexX + 5, elementY + wireThickness);
          ctx.lineTo(duplexX + 40, elementY + wireThickness);
          ctx.stroke();
          ctx.fillStyle = isVisible ? 'rgba(180, 180, 180, 0.9)' : 'rgba(100, 100, 100, 0.4)';
          ctx.font = '6px monospace';
          ctx.fillText(element.id, duplexX + 50, elementY + 2);
        });
      }
    }
    
    // Draw teaching mode hints (only if showHints is true) OR review mode (show real defects)
    if ((mode === 'teaching' && showHints) || isReviewMode) {
      defects.forEach(defect => {
        // In review mode, use cyan color to distinguish from user marks
        const hintColor = isReviewMode ? 'rgba(0, 255, 255, 0.9)' : 'rgba(255, 220, 0, 0.9)';
        octx.strokeStyle = hintColor;
        octx.lineWidth = 3;
        octx.setLineDash([8, 4]);
        octx.beginPath();
        
        if (defect.type === 'crack' && defect.points) {
          octx.moveTo(defect.points[0].x * width, defect.points[0].y * height);
          defect.points.forEach((pt, i) => { if (i > 0) octx.lineTo(pt.x * width, pt.y * height); });
        } else {
          const radius = (defect.size || defect.length || 0.02) * width;
          octx.arc(defect.x * width, defect.y * height, radius, 0, Math.PI * 2);
        }
        octx.stroke();
        octx.setLineDash([]);
        
        // Label
        const typeMap = {
          crack: 'CRICCA', porosity: 'POROSITÀ', cluster: 'CLUSTER', 
          inclusion: 'INCLUSIONE', cavity: 'CAVITÀ', lackOfFusion: 'MANCATA FUSIONE',
          undercut: 'UNDERCUT', underfill: 'UNDERFILL', 
          alignedPorosity: 'POROSITÀ ALLINEATA', slagInclusion: 'SCORIA'
        };
        const label = typeMap[defect.type] || defect.type.toUpperCase();
        const labelX = defect.x * width + 15;
        const labelY = defect.y * height - 15;
        octx.fillStyle = hintColor;
        octx.fillRect(labelX - 2, labelY - 10, label.length * 6 + 4, 14);
        octx.fillStyle = 'rgba(0, 0, 0, 0.9)';
        octx.font = 'bold 9px monospace';
        octx.fillText(label, labelX, labelY);
      });
    }
    
    // Draw marked defects
    if ((mode === 'learning' || mode === 'exam') && examStarted) {
      markedDefects.forEach((mark, idx) => {
        let strokeColor, fillColor;
        if (mode === 'learning') {
          if (mark.matchedDefect) {
            strokeColor = mark.isCorrectType ? 'rgba(0, 255, 100, 0.9)' : 'rgba(255, 80, 80, 0.9)';
            fillColor = mark.isCorrectType ? 'rgba(0, 255, 100, 0.2)' : 'rgba(255, 80, 80, 0.2)';
          } else {
            strokeColor = 'rgba(255, 80, 80, 0.9)';
            fillColor = 'rgba(255, 80, 80, 0.2)';
          }
        } else {
          if (!score) {
            strokeColor = 'rgba(100, 150, 255, 0.9)';
            fillColor = 'rgba(100, 150, 255, 0.15)';
          } else {
            if (mark.matchedDefect) {
              strokeColor = mark.isCorrectType ? 'rgba(0, 255, 100, 0.9)' : 'rgba(255, 200, 0, 0.9)';
              fillColor = mark.isCorrectType ? 'rgba(0, 255, 100, 0.15)' : 'rgba(255, 200, 0, 0.15)';
            } else {
              strokeColor = 'rgba(255, 80, 80, 0.9)';
              fillColor = 'rgba(255, 80, 80, 0.15)';
            }
          }
        }
        
        octx.fillStyle = fillColor;
        octx.fillRect(mark.rectX, mark.rectY, mark.rectWidth, mark.rectHeight);
        octx.strokeStyle = strokeColor;
        octx.lineWidth = 2;
        octx.strokeRect(mark.rectX, mark.rectY, mark.rectWidth, mark.rectHeight);
        
        // Number label
        octx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        octx.fillRect(mark.rectX, mark.rectY - 18, 20, 16);
        octx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        octx.font = 'bold 12px monospace';
        octx.fillText((idx + 1).toString(), mark.rectX + 4, mark.rectY - 5);
      });
    }
    
    // Draw selection rectangle
    if (isDrawing && selectionStart && selectionEnd) {
      const minX = Math.min(selectionStart.x, selectionEnd.x);
      const minY = Math.min(selectionStart.y, selectionEnd.y);
      const selWidth = Math.abs(selectionEnd.x - selectionStart.x);
      const selHeight = Math.abs(selectionEnd.y - selectionStart.y);
      octx.fillStyle = 'rgba(100, 150, 255, 0.2)';
      octx.fillRect(minX, minY, selWidth, selHeight);
      octx.strokeStyle = 'rgba(100, 150, 255, 0.9)';
      octx.lineWidth = 2;
      octx.setLineDash([5, 5]);
      octx.strokeRect(minX, minY, selWidth, selHeight);
      octx.setLineDash([]);
    }
    
  }, [material, thickness, kV, mA, defects, mode, showHints, markedDefects, examStarted, 
      brightness, contrast, offsetCorrection, gainCorrection, badPixelCorrection, badPixelsMap,
      noiseSeed, detectorType, iqiType, showIQI, specimenType, isDrawing, selectionStart, selectionEnd, score, isReviewMode]);


  // ═══════════════════════════════════════════════════════════════════════════
  // MOUSE HANDLERS - Zoom, Right-click B/C, Selection with duplicate prevention
  // ═══════════════════════════════════════════════════════════════════════════
  
  const getCanvasCoords = (e) => {
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  // Zoom with mouse wheel - only when cursor is over canvas
  const handleWheel = (e) => {
    // Only zoom if Ctrl key is pressed OR if canvas is focused
    // This allows normal page scrolling while still enabling zoom
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
    }
    // Without Ctrl, allow normal scroll behavior
  };

  // Right-click drag for brightness/contrast
  const handleContextMenu = (e) => {
    e.preventDefault(); // Prevent context menu
  };

  const handleMouseDown = (e) => {
    if (e.button === 2) {
      // Right mouse button - brightness/contrast
      e.preventDefault();
      setIsRightDragging(true);
      setRightDragStart({ x: e.clientX, y: e.clientY });
      setInitialBrightness(brightness);
      setInitialContrast(contrast);
      return;
    }
    
    // Left click - selection (only in exam/learning mode)
    if ((mode !== 'exam' && mode !== 'learning') || !examStarted || showDefectModal) return;
    if (e.button !== 0) return;
    
    const coords = getCanvasCoords(e);
    setIsDrawing(true);
    setSelectionStart(coords);
    setSelectionEnd(coords);
  };

  const handleMouseMove = (e) => {
    if (isRightDragging && rightDragStart) {
      // Right drag: horizontal = contrast, vertical = brightness
      const deltaX = e.clientX - rightDragStart.x;
      const deltaY = e.clientY - rightDragStart.y;
      setContrast(Math.max(-100, Math.min(100, initialContrast + deltaX * 0.5)));
      setBrightness(Math.max(-100, Math.min(100, initialBrightness - deltaY * 0.5)));
      return;
    }
    
    if (!isDrawing) return;
    const coords = getCanvasCoords(e);
    setSelectionEnd(coords);
  };

  const handleMouseUp = (e) => {
    if (isRightDragging) {
      setIsRightDragging(false);
      setRightDragStart(null);
      return;
    }
    
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const coords = getCanvasCoords(e);
    const minX = Math.min(selectionStart.x, coords.x);
    const minY = Math.min(selectionStart.y, coords.y);
    const selWidth = Math.abs(coords.x - selectionStart.x);
    const selHeight = Math.abs(coords.y - selectionStart.y);
    
    if (selWidth > 10 && selHeight > 10) {
      const centerX = (minX + selWidth/2) / canvasRef.current.width;
      const centerY = (minY + selHeight/2) / canvasRef.current.height;
      
      // Check if this area overlaps with an already marked defect - PREVENT DUPLICATES
      const alreadyMarked = markedDefects.some(mark => {
        // Check if the center of new selection is inside existing mark
        const markCenterX = (mark.rectX + mark.rectWidth/2) / canvasRef.current.width;
        const markCenterY = (mark.rectY + mark.rectHeight/2) / canvasRef.current.height;
        const dist = Math.sqrt((centerX - markCenterX) ** 2 + (centerY - markCenterY) ** 2);
        return dist < 0.05; // Too close to existing mark
      });
      
      // Also check if we're marking the same defect again
      const targetDefect = defects.find(d => {
        const dx = centerX - d.x;
        const dy = centerY - d.y;
        return Math.sqrt(dx*dx + dy*dy) < (d.size || d.length || 0.03) * 1.5;
      });
      
      const defectAlreadyIdentified = targetDefect && markedDefects.some(m => m.matchedDefectId === targetDefect.id);
      
      if (alreadyMarked || defectAlreadyIdentified) {
        // Show warning - already marked
        alert(t.alreadyMarked);
        setSelectionStart(null);
        setSelectionEnd(null);
        return;
      }
      
      setPendingSelection({
        rectX: minX, rectY: minY, rectWidth: selWidth, rectHeight: selHeight,
        normalizedX: centerX, normalizedY: centerY
      });
      setShowDefectModal(true);
    }
    
    setSelectionStart(null);
    setSelectionEnd(null);
  };

  const handleDefectTypeConfirm = (identifiedType) => {
    if (!pendingSelection) return;
    
    const centerX = pendingSelection.normalizedX;
    const centerY = pendingSelection.normalizedY;
    
    // Find matching defect
    let matchedDefect = null;
    let isCorrectType = false;
    
    defects.forEach(defect => {
      const dx = centerX - defect.x;
      const dy = centerY - defect.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = (defect.size || defect.length || 0.03) * 1.5;
      if (dist < threshold) {
        matchedDefect = defect;
        isCorrectType = identifiedType === defect.type;
      }
    });
    
    const newMark = {
      ...pendingSelection,
      identifiedType,
      matchedDefect,
      matchedDefectId: matchedDefect ? matchedDefect.id : null,
      isCorrectType
    };
    
    setMarkedDefects([...markedDefects, newMark]);
    setShowDefectModal(false);
    setPendingSelection(null);
  };

  const handleDefectTypeCancel = () => {
    setShowDefectModal(false);
    setPendingSelection(null);
  };

  // Mode change handler
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setExamStarted(false);
    setScore(null);
    setIsReviewMode(false);
    setMarkedDefects([]);
    setExamImages([]);
    setCurrentImageIndex(0);
    setAllMarkedDefects([]);
    setZoom(1);
    setBrightness(0);
    setContrast(0);
    
    if (newMode === 'teaching') {
      const ideal = calculateIdealParams();
      setKV(ideal.idealKV);
      setMA(parseFloat(ideal.idealMA));
      setIqiType('all');
      setShowIQI(true);
      setShowHints(true);
      generateDefects();
    } else if (newMode === 'learning') {
      setIqiType('iso');
      generateDefects();
    } else if (newMode === 'exam') {
      setIqiType('none');
    }
  };

  // Start session
  const startSession = () => {
    setExamStarted(true);
    setMarkedDefects([]);
    setScore(null);
    setIsReviewMode(false);
    setZoom(1);
    setBrightness(0);
    setContrast(0);
    
    if (mode === 'exam') {
      generateExamImages();
    } else {
      generateDefects();
    }
  };

  // Navigate exam images
  const goToNextImage = () => {
    if (currentImageIndex < examImages.length - 1) {
      // Save current marks
      const newAllMarked = [...allMarkedDefects];
      newAllMarked[currentImageIndex] = markedDefects;
      setAllMarkedDefects(newAllMarked);
      
      // Move to next
      const nextIdx = currentImageIndex + 1;
      setCurrentImageIndex(nextIdx);
      setDefects(examImages[nextIdx].defects);
      setMarkedDefects(newAllMarked[nextIdx] || []);
      setNoiseSeed(Date.now());
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      // Save current marks
      const newAllMarked = [...allMarkedDefects];
      newAllMarked[currentImageIndex] = markedDefects;
      setAllMarkedDefects(newAllMarked);
      
      // Move to prev
      const prevIdx = currentImageIndex - 1;
      setCurrentImageIndex(prevIdx);
      setDefects(examImages[prevIdx].defects);
      setMarkedDefects(newAllMarked[prevIdx] || []);
      setNoiseSeed(Date.now());
    }
  };

  // Evaluate full exam (all 5 images)
  const evaluateExam = async () => {
    // Save current image marks first
    const finalAllMarked = [...allMarkedDefects];
    finalAllMarked[currentImageIndex] = markedDefects;
    setAllMarkedDefects(finalAllMarked); // Save for review mode
    
    let totalDefects = 0;
    let totalCorrectPosition = 0;
    let totalCorrectType = 0;
    let totalFalsePositives = 0;
    
    examImages.forEach((img, imgIdx) => {
      const imgDefects = img.defects;
      const imgMarks = finalAllMarked[imgIdx] || [];
      
      totalDefects += imgDefects.length;
      
      imgMarks.forEach(mark => {
        if (mark.matchedDefect) {
          totalCorrectPosition++;
          if (mark.isCorrectType) totalCorrectType++;
        } else {
          totalFalsePositives++;
        }
      });
    });
    
    const detectionRate = totalDefects > 0 ? (totalCorrectPosition / totalDefects) * 100 : 100;
    const classificationAccuracy = totalCorrectPosition > 0 ? (totalCorrectType / totalCorrectPosition) * 100 : 0;
    
    // Scoring: 50% detection, 30% classification, 20% false positives penalty
    const positionScore = detectionRate * 0.5;
    const classificationScore = classificationAccuracy * 0.3;
    const falsePositivesPenalty = Math.max(0, 20 - (totalFalsePositives * 4));
    const finalScore = Math.min(100, positionScore + classificationScore + falsePositivesPenalty);
    
    const examResult = {
      date: new Date().toISOString(),
      score: finalScore.toFixed(1),
      detected: totalCorrectPosition,
      total: totalDefects,
      correctType: totalCorrectType,
      falsePositives: totalFalsePositives,
      classificationAccuracy: classificationAccuracy.toFixed(1),
      material, thickness, specimenType, detectorType, kV, mA,
      numImages: 5
    };
    
    setScore(examResult);
    setIsReviewMode(true); // Enable review mode
    setCurrentImageIndex(0); // Start review from first image
    setDefects(examImages[0].defects);
    setMarkedDefects(finalAllMarked[0] || []);
    
    if (onExamComplete) onExamComplete(examResult);
    
    // Save to storage
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const users = JSON.parse(usersResult.value);
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          if (!users[userIndex].exams) users[userIndex].exams = [];
          users[userIndex].exams.push(examResult);
          await storage.set('users_db', JSON.stringify(users));
        }
      }
    } catch (err) {}
  };

  // Navigate review images (after exam is finished)
  const goToReviewImage = (idx) => {
    if (idx >= 0 && idx < examImages.length) {
      setCurrentImageIndex(idx);
      setDefects(examImages[idx].defects);
      setMarkedDefects(allMarkedDefects[idx] || []);
      setNoiseSeed(Date.now());
    }
  };


  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  const ideal = calculateIdealParams();
  const quality = evaluateImageQuality();

  return (
    <div className="flex-1 flex flex-col bg-gray-950 h-full overflow-hidden">
      {showDefectModal && (
        <DefectTypeModal specimenType={specimenType} onConfirm={handleDefectTypeConfirm} onCancel={handleDefectTypeCancel} t={t} />
      )}
      
      {/* Mode selector bar */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center gap-4 flex-wrap">
        <div className="flex gap-1">
          <button onClick={() => handleModeChange('teaching')} className={`flex items-center gap-2 px-3 py-2 rounded-l text-sm font-semibold transition ${mode === 'teaching' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">{t.teaching}</span>
          </button>
          <button onClick={() => handleModeChange('learning')} className={`flex items-center gap-2 px-3 py-2 text-sm font-semibold transition ${mode === 'learning' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">{t.learning}</span>
          </button>
          <button onClick={() => handleModeChange('exam')} className={`flex items-center gap-2 px-3 py-2 rounded-r text-sm font-semibold transition ${mode === 'exam' ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
            <ClipboardCheck className="w-4 h-4" />
            <span className="hidden sm:inline">{t.exam}</span>
          </button>
        </div>
        
        <span className="text-xs text-gray-400 hidden lg:inline">
          {mode === 'teaching' && t.teachingDesc}
          {mode === 'learning' && t.learningDesc}
          {mode === 'exam' && t.examDesc}
        </span>

        {/* Teaching mode: toggle hints */}
        {mode === 'teaching' && (
          <button onClick={() => setShowHints(!showHints)} className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-semibold transition ${showHints ? 'bg-yellow-600 text-white' : 'bg-gray-700 text-gray-300'}`}>
            {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span className="hidden sm:inline">{showHints ? t.hideHints : t.showHints}</span>
          </button>
        )}

        {/* Exam/Learning controls */}
        {(mode === 'exam' || mode === 'learning') && (
          <div className="ml-auto flex gap-2 items-center">
            {!examStarted ? (
              <button onClick={startSession} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold">
                <Play className="w-4 h-4" />
                {t.start}
              </button>
            ) : mode === 'exam' && !score && (
              <>
                {/* Image navigation for exam */}
                <div className="flex items-center gap-2 bg-gray-800 rounded px-3 py-1">
                  <button onClick={goToPrevImage} disabled={currentImageIndex === 0} className="p-1 hover:bg-gray-700 rounded disabled:opacity-30">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm font-medium">{t.imageOf} {currentImageIndex + 1} {t.of} 5</span>
                  <button onClick={goToNextImage} disabled={currentImageIndex === examImages.length - 1} className="p-1 hover:bg-gray-700 rounded disabled:opacity-30">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                <button onClick={evaluateExam} className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded font-semibold">
                  {t.finish}
                </button>
              </>
            )}
            {/* Review mode navigation - after exam is finished */}
            {mode === 'exam' && score && isReviewMode && (
              <div className="flex items-center gap-2 bg-cyan-900 rounded px-3 py-1 border border-cyan-600">
                <span className="text-xs text-cyan-300 mr-2">Revisione:</span>
                <button onClick={() => goToReviewImage(currentImageIndex - 1)} disabled={currentImageIndex === 0} className="p-1 hover:bg-cyan-800 rounded disabled:opacity-30">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">{t.imageOf} {currentImageIndex + 1} {t.of} 5</span>
                <button onClick={() => goToReviewImage(currentImageIndex + 1)} disabled={currentImageIndex === examImages.length - 1} className="p-1 hover:bg-cyan-800 rounded disabled:opacity-30">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Sidebar */}
        <div className="w-72 bg-gray-900 border-r border-gray-700 overflow-y-auto p-4 space-y-4 flex-shrink-0">
          
          {/* Detector Type */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <label className="block text-sm font-bold text-cyan-400 mb-2">{t.detectorType}</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="detectorType" value="dda" checked={detectorType === 'dda'} onChange={(e) => setDetectorType(e.target.value)} className="w-4 h-4 accent-cyan-500" disabled={examStarted} />
                <span className="text-sm">{t.ddaSystem}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="detectorType" value="cr" checked={detectorType === 'cr'} onChange={(e) => setDetectorType(e.target.value)} className="w-4 h-4 accent-cyan-500" disabled={examStarted} />
                <span className="text-sm">{t.crSystem}</span>
              </label>
            </div>
          </div>

          {/* Specimen Type */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <label className="block text-sm font-bold text-orange-400 mb-2">{t.specimenType}</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="specimenType" value="plate" checked={specimenType === 'plate'} onChange={(e) => { setSpecimenType(e.target.value); generateDefects(); }} className="w-4 h-4 accent-orange-500" disabled={examStarted} />
                <span className="text-sm">{t.flatPlate}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="specimenType" value="weld" checked={specimenType === 'weld'} onChange={(e) => { setSpecimenType(e.target.value); generateDefects(); }} className="w-4 h-4 accent-orange-500" disabled={examStarted} />
                <span className="text-sm">{t.weldedJoint}</span>
              </label>
            </div>
          </div>

          {/* IQI Type Selection */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <label className="block text-sm font-bold text-green-400 mb-2">{t.iqiType}</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="iqiType" value="none" checked={iqiType === 'none'} onChange={(e) => setIqiType(e.target.value)} className="w-4 h-4 accent-green-500" disabled={mode === 'teaching'} />
                <span className="text-sm">{t.iqiNone}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="iqiType" value="iso" checked={iqiType === 'iso'} onChange={(e) => setIqiType(e.target.value)} className="w-4 h-4 accent-green-500" disabled={mode === 'teaching'} />
                <span className="text-sm">{t.iqiISO}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="iqiType" value="astm" checked={iqiType === 'astm'} onChange={(e) => setIqiType(e.target.value)} className="w-4 h-4 accent-green-500" disabled={mode === 'teaching'} />
                <span className="text-sm">{t.iqiASTM}</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="iqiType" value="duplex" checked={iqiType === 'duplex'} onChange={(e) => setIqiType(e.target.value)} className="w-4 h-4 accent-green-500" disabled={mode === 'teaching'} />
                <span className="text-sm">{t.iqiDuplex}</span>
              </label>
              {mode === 'teaching' && (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="iqiType" value="all" checked={iqiType === 'all'} onChange={(e) => setIqiType(e.target.value)} className="w-4 h-4 accent-green-500" />
                  <span className="text-sm">{t.iqiAll}</span>
                </label>
              )}
            </div>
          </div>

          {/* Material & Thickness */}
          <div className="border-t border-gray-700 pt-4">
            <label className="block text-sm font-medium mb-2">{t.material}</label>
            <select value={material} onChange={(e) => setMaterial(e.target.value)} className="w-full bg-gray-800 rounded px-3 py-2 text-white border border-gray-700" disabled={examStarted}>
              <option value="aluminum">{t.aluminium}</option>
              <option value="titanium">{t.titanium}</option>
              <option value="inconel">{t.inconel}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.thickness}: {thickness} mm</label>
            <input type="range" min="5" max="50" step="1" value={thickness} onChange={(e) => setThickness(parseFloat(e.target.value))} className="w-full" disabled={examStarted} />
          </div>

          {/* kV and mA - hidden in teaching mode */}
          {mode !== 'teaching' && (
            <>
              <div>
                <label className="block text-sm font-medium mb-2">{t.voltage}: {kV}</label>
                <input type="range" min="50" max="300" step="10" value={kV} onChange={(e) => setKV(parseFloat(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">{t.current}: {mA}</label>
                <input type="range" min="1" max="20" step="0.5" value={mA} onChange={(e) => setMA(parseFloat(e.target.value))} className="w-full" />
              </div>
            </>
          )}
          
          {/* Teaching mode info */}
          {mode === 'teaching' && (
            <div className="bg-purple-900/30 border border-purple-600/50 rounded-lg p-3">
              <h3 className="text-sm font-bold text-purple-400 mb-2">Parametri Ideali</h3>
              <div className="text-sm space-y-1">
                <p><span className="text-gray-400">kV:</span> <span className="text-white font-medium">{kV}</span></p>
                <p><span className="text-gray-400">mA:</span> <span className="text-white font-medium">{mA}</span></p>
              </div>
            </div>
          )}

          {/* Image quality */}
          <div className={`p-3 rounded-lg border ${
            quality === 'optimal' ? 'bg-green-900/30 border-green-600/50' :
            quality === 'acceptable' ? 'bg-yellow-900/30 border-yellow-600/50' :
            'bg-red-900/30 border-red-600/50'
          }`}>
            <p className="text-sm font-medium">{t.quality}: <span className="font-bold">{t[quality]}</span></p>
          </div>

          {/* New component button */}
          <button onClick={generateDefects} disabled={examStarted} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition disabled:opacity-50">
            <RefreshCw className="w-4 h-4" />
            {t.newComponent}
          </button>

          {/* Zoom indicator */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Zoom: {(zoom * 100).toFixed(0)}%</span>
              <div className="flex gap-1">
                <button onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} className="p-1 bg-gray-700 rounded hover:bg-gray-600"><ZoomOut className="w-4 h-4" /></button>
                <button onClick={() => setZoom(z => Math.min(3, z + 0.1))} className="p-1 bg-gray-700 rounded hover:bg-gray-600"><ZoomIn className="w-4 h-4" /></button>
                <button onClick={() => setZoom(1)} className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 text-xs">Reset</button>
              </div>
            </div>
          </div>

          {/* Image Processing */}
          <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
            <h3 className="text-sm font-bold text-blue-400 mb-3">{t.imageProcessing}</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.brightness}: {brightness}</label>
                <input type="range" min="-100" max="100" value={brightness} onChange={(e) => setBrightness(parseInt(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">{t.contrast}: {contrast}</label>
                <input type="range" min="-100" max="100" value={contrast} onChange={(e) => setContrast(parseInt(e.target.value))} className="w-full" />
              </div>
              <button onClick={() => { setBrightness(0); setContrast(0); }} className="w-full px-2 py-1 bg-gray-700 rounded text-xs hover:bg-gray-600">Reset B/C</button>
            </div>
          </div>

          {/* DDA Calibration */}
          {detectorType === 'dda' && (
            <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
              <h3 className="text-sm font-bold text-yellow-400 mb-3">{t.ddaCalibration}</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1">{t.offsetCorrection}: {offsetCorrection}</label>
                  <input type="range" min="0" max="30" value={offsetCorrection} onChange={(e) => setOffsetCorrection(parseInt(e.target.value))} className="w-full" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">{t.gainCorrection}: {gainCorrection.toFixed(2)}</label>
                  <input type="range" min="0.8" max="1.5" step="0.05" value={gainCorrection} onChange={(e) => setGainCorrection(parseFloat(e.target.value))} className="w-full" />
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={badPixelCorrection} onChange={(e) => setBadPixelCorrection(e.target.checked)} className="w-4 h-4" />
                  <span className="text-xs">{t.badPixelCorrection}</span>
                </label>
                <button onClick={autoCalibrate} className="w-full bg-yellow-600 hover:bg-yellow-700 px-3 py-1 rounded text-sm font-medium">{t.autoCalibrate}</button>
              </div>
            </div>
          )}

          {/* Marked defects list */}
          {(mode === 'exam' || mode === 'learning') && examStarted && markedDefects.length > 0 && (
            <div className="bg-gray-800 rounded p-3 border border-gray-700">
              <p className="text-sm font-semibold mb-2">{t.defectMarked}: {markedDefects.length}</p>
              <div className="space-y-1 text-xs max-h-32 overflow-y-auto">
                {markedDefects.map((mark, idx) => (
                  <div key={idx} className={`p-2 rounded ${
                    mode === 'learning' 
                      ? (mark.matchedDefect ? (mark.isCorrectType ? 'bg-green-900' : 'bg-yellow-900') : 'bg-red-900')
                      : 'bg-blue-900'
                  }`}>
                    <span className="font-bold">#{idx + 1}</span> - {t[mark.identifiedType] || mark.identifiedType}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* No defects indicator for exam */}
          {mode === 'exam' && examStarted && !score && examImages[currentImageIndex] && !examImages[currentImageIndex].hasDefects && (
            <div className="bg-gray-800 rounded p-3 border border-yellow-600">
              <p className="text-sm text-yellow-400 font-medium text-center">{t.noDefects}</p>
            </div>
          )}
        </div>

        {/* Main canvas area */}
        <div className="flex-1 flex flex-col bg-black relative min-w-0">
          <div ref={containerRef} className="flex-1 relative overflow-auto flex items-center justify-center" style={{ minHeight: 0 }}>
            <div className="relative m-auto p-4" style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}>
              <canvas ref={canvasRef} width={800} height={600} className="border border-gray-700 rounded shadow-lg" />
              <canvas 
                ref={overlayCanvasRef} 
                width={800} 
                height={600} 
                className="absolute top-0 left-0 border border-transparent rounded cursor-crosshair"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => { if (isDrawing) setIsDrawing(false); if (isRightDragging) setIsRightDragging(false); }}
                onWheel={handleWheel}
                onContextMenu={handleContextMenu}
              />
            </div>
          </div>
          
          {/* Mouse hint */}
          <div className="bg-gray-900 border-t border-gray-700 px-4 py-1">
            <p className="text-xs text-gray-500">{t.mouseHint}</p>
          </div>
          
          {/* Status bar */}
          {mode === 'teaching' && (
            <div className="bg-purple-900 border-t border-purple-700 px-4 py-2">
              <p className="text-sm text-purple-200">
                <span className="font-semibold">Modalità Insegnamento</span> — {showHints ? 'Difetti evidenziati' : 'Indicazioni nascoste'}, parametri ottimali
              </p>
            </div>
          )}
          
          {(mode === 'learning' || mode === 'exam') && examStarted && !score && (
            <div className={`${mode === 'learning' ? 'bg-blue-900 border-blue-700' : 'bg-green-900 border-green-700'} border-t px-4 py-2`}>
              <p className="text-sm">
                <span className="font-semibold">{t.dragToMark}</span> {markedDefects.length}
                {mode === 'exam' && ` | ${t.imageOf} ${currentImageIndex + 1}/${examImages.length}`}
              </p>
            </div>
          )}
          
          {/* Score display */}
          {score && (
            <div className="bg-gradient-to-r from-green-900 to-blue-900 border-t border-green-700 px-4 py-3">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-gray-300">{t.detected}: <span className="font-bold text-white">{score.detected}/{score.total}</span></p>
                  <p className="text-sm text-gray-300">{t.correctType}: <span className="font-bold text-white">{score.correctType}</span></p>
                  <p className="text-sm text-gray-300">{t.falsePositives}: <span className="font-bold text-white">{score.falsePositives}</span></p>
                  {mode === 'exam' && isReviewMode && (
                    <p className="text-xs text-cyan-400 mt-2 flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      Revisione immagine {currentImageIndex + 1}/5 — Difetti reali in ciano, tue selezioni colorate
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-green-400">{score.score}%</p>
                  <p className={`text-sm ${parseFloat(score.score) >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(score.score) >= 80 ? t.passed : t.failed}
                  </p>
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
// MAIN APP CONTENT
// ═══════════════════════════════════════════════════════════════════════════════
const AppContent = () => {
  const [view, setView] = useState('simulator');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-700 transition-all duration-300 overflow-hidden flex-shrink-0`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold">RT Training</h1>
              <p className="text-xs text-gray-400">v{APP_VERSION}</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded">
            <p className="text-sm font-semibold text-white">{user.username}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
              user.role === 'admin' ? 'bg-red-900 text-red-200' :
              user.role === 'trainer' ? 'bg-blue-900 text-blue-200' :
              'bg-green-900 text-green-200'
            }`}>{t[user.role]}</span>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {user.role === 'admin' && (
            <button onClick={() => setView('admin')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'admin' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
              <Users className="w-5 h-5" />
              <span>{t.admin}</span>
            </button>
          )}
          
          {(user.role === 'student' || user.role === 'trainer') && (
            <button onClick={() => setView('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
              <BarChart3 className="w-5 h-5" />
              <span>{t.dashboard}</span>
            </button>
          )}

          <button onClick={() => setView('simulator')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'simulator' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Camera className="w-5 h-5" />
            <span>{t.simulator}</span>
          </button>

          <button onClick={() => setView('certificates')} className={`w-full flex items-center gap-3 px-4 py-3 rounded transition ${view === 'certificates' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800 text-gray-300'}`}>
            <Award className="w-5 h-5" />
            <span>{t.certificates}</span>
          </button>
        </nav>

        <div className="absolute bottom-0 w-64 p-4 border-t border-gray-700">
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

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="bg-gray-900 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded">
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <h2 className="text-lg font-semibold">
            {view === 'simulator' && t.simulator}
            {view === 'dashboard' && t.dashboard}
            {view === 'admin' && `${t.admin} ${t.dashboard}`}
            {view === 'certificates' && t.certificates}
          </h2>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-auto">
          {view === 'simulator' && <XRaySimulator onExamComplete={() => {}} />}
          {view === 'dashboard' && <StudentDashboard />}
          {view === 'admin' && user.role === 'admin' && <AdminDashboard />}
          {view === 'certificates' && (
            <div className="p-6">
              <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
                <Award className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{t.certificates}</h3>
                <p className="text-gray-400 mb-6">Completa esami con punteggio ≥80% per ricevere certificati</p>
                <button onClick={() => setView('simulator')} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold">
                  Vai al {t.simulator}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-900 border-t border-gray-700 px-4 py-2 text-center">
          <p className="text-xs text-gray-500">{COPYRIGHT_TEXT}</p>
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
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
