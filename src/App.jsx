import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Camera, ZoomIn, ZoomOut, Maximize2, Filter, RefreshCw, Play, BookOpen, ClipboardCheck, ChevronDown, ChevronUp, Eye, EyeOff, Undo, Redo, MousePointer, Ruler, Circle, Square, BarChart3, TrendingUp, Layers, LogOut, Users, Award, Download, Settings, Globe, Menu, X, FileText, CheckCircle, AlertCircle } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// GOOGLE SHEETS INTEGRATION - Email Collection
// ═══════════════════════════════════════════════════════════════════════════════
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxwRrzrrLy65OHTmp51Zy0cZn1YaUWfSfznP-_Vit_9x520ZFW4zlsZ9eJayF0W3vH/exec";

// Send email to Google Sheets (non-blocking background operation)
const sendEmailToGoogleSheet = (email, source = 'app') => {
  try {
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        source: source,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {
      // Silently ignore - non-blocking
    });
  } catch (err) {
    // Non-blocking
  }
};

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

// Language Context
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
    wrongType: "Wrong type"
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
    wrongType: "Tipo errato"
  }
};

// Auth Context
const AuthContext = createContext();

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
    } catch (err) {
      console.log('No active session');
    }
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
        
        // 📊 GOOGLE SHEETS: Send email on successful login
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
      
      // 📊 GOOGLE SHEETS: Send email on successful registration
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

const useAuth = () => useContext(AuthContext);
const useLanguage = () => useContext(LanguageContext);

// Login Component
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
    if (!result.success) {
      setError(result.error);
    }
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
      try {
        const existing = await storage.get('users_db');
        if (!existing) {
          const demoUsers = [
            { id: '1', email: 'admin@rt.com', password: 'admin123', username: 'Admin', role: 'admin', createdAt: new Date().toISOString(), exams: [] },
            { id: '2', email: 'trainer@rt.com', password: 'trainer123', username: 'Trainer', role: 'trainer', createdAt: new Date().toISOString(), exams: [] },
            { id: '3', email: 'student@rt.com', password: 'student123', username: 'Student', role: 'student', createdAt: new Date().toISOString(), exams: [] }
          ];
          await storage.set('users_db', JSON.stringify(demoUsers));
        }
      } catch (err) {
        console.error('Init error:', err);
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
                  <option value="admin">{t.admin}</option>
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
          <div className="text-xs text-gray-400 space-y-1">
            <p>Admin: admin@rt.com / admin123</p>
            <p>Trainer: trainer@rt.com / trainer123</p>
            <p>Student: student@rt.com / student123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard
const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ totalUsers: 0, totalExams: 0, avgScore: 0, activeUsers: 0 });
  const { t } = useLanguage();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
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
    } catch (err) {
      console.error('Load error:', err);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">{t.admin} {t.dashboard}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-300 text-sm">{t.users}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalUsers}</p>
            </div>
            <Users className="w-12 h-12 text-blue-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-300 text-sm">{t.totalExams}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.totalExams}</p>
            </div>
            <ClipboardCheck className="w-12 h-12 text-green-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm">{t.avgScore}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.avgScore}%</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-400 opacity-50" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 p-6 rounded-lg border border-yellow-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-300 text-sm">{t.activeUsers}</p>
              <p className="text-3xl font-bold text-white mt-2">{stats.activeUsers}</p>
            </div>
            <TrendingUp className="w-12 h-12 text-yellow-400 opacity-50" />
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white">Statistiche {t.users}</h3>
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
                  <tr key={user.id} className="hover:bg-gray-750">
                    <td className="px-4 py-3 text-sm text-white">{user.username}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{user.email}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        user.role === 'admin' ? 'bg-red-900 text-red-200' :
                        user.role === 'trainer' ? 'bg-blue-900 text-blue-200' :
                        'bg-green-900 text-green-200'
                      }`}>
                        {user.role}
                      </span>
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

// Defect Type Selector Modal
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

// Simulator Component
const XRaySimulator = ({ onExamComplete }) => {
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const { t } = useLanguage();
  const { user } = useAuth();
  
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
        
        // Show defect type label
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
    
    // Calculate correct coordinates considering canvas scaling
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
    
    // Find if click is near a real defect
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

  const startExam = () => {
    setExamStarted(true);
    setMarkedDefects([]);
    setScore(null);
    generateDefects();
  };

  const generateCertificate = async (user, exam) => {
    const certText = `
═══════════════════════════════════════════════════════
          CERTIFICATO DI COMPLETAMENTO
           Programma Training RT NAS 410
═══════════════════════════════════════════════════════

Si certifica che

              ${user.username}
              
ha completato con successo l'esame di Radiografia
Digitale (RT) Non-Distruttiva secondo lo standard
NAS 410.

Data Esame: ${new Date(exam.date).toLocaleDateString()}
Punteggio Finale: ${exam.score}%

Materiale Testato: ${exam.material}
Spessore: ${exam.thickness}mm
Parametri: ${exam.kV}kV, ${exam.mA}mA

Difetti identificati: ${exam.detected}/${exam.total}
Precisione classificazione: ${exam.classificationAccuracy}%

Questo certificato dimostra competenza in:
• Interpretazione immagini radiografiche digitali
• Riconoscimento e classificazione difetti
• Valutazione qualità IQI
• Procedure conformi NAS 410

Autorizzato da: Sistema Training RT
ID Certificato: ${user.id}-${exam.date}

═══════════════════════════════════════════════════════
        Valido solo per scopi formativi
     Non valido per certificazione ufficiale
═══════════════════════════════════════════════════════
  `;

    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificato_RT_${user.username}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const evaluateExam = async () => {
    let correctPosition = 0;
    let correctType = 0;
    let totalMarked = markedDefects.length;
    
    // Check each marked defect
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
    
    // Scoring: 50% position, 30% classification, 20% false positives penalty
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
    
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const users = JSON.parse(usersResult.value);
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
          if (!users[userIndex].exams) {
            users[userIndex].exams = [];
          }
          users[userIndex].exams.push(examResult);
          await storage.set('users_db', JSON.stringify(users));
        }
      }
    } catch (err) {
      console.error('Save exam error:', err);
    }
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

        {mode === 'exam' && (
          <div className="ml-auto flex gap-2">
            {!examStarted ? (
              <button onClick={startExam} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold">
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
                {parseFloat(score.score) >= 80 && (
                  <button onClick={() => generateCertificate(user, score)} className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded">
                    <Download className="w-4 h-4" />
                    {t.download}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Student Dashboard
const StudentDashboard = () => {
  const [examHistory, setExamHistory] = useState([]);
  const { user } = useAuth();
  const { t } = useLanguage();

  useEffect(() => {
    loadExamHistory();
  }, []);

  const loadExamHistory = async () => {
    try {
      const usersResult = await storage.get('users_db');
      if (usersResult) {
        const users = JSON.parse(usersResult.value);
        const currentUser = users.find(u => u.id === user.id);
        if (currentUser && currentUser.exams) {
          setExamHistory(currentUser.exams);
        }
      }
    } catch (err) {
      console.error('Load history error:', err);
    }
  };

  const avgScore = examHistory.length > 0 
    ? (examHistory.reduce((sum, e) => sum + parseFloat(e.score), 0) / examHistory.length).toFixed(1)
    : 0;

  const generateCertificate = async (exam) => {
    const certText = `
═══════════════════════════════════════════════════════
          CERTIFICATO DI COMPLETAMENTO
           Programma Training RT NAS 410
═══════════════════════════════════════════════════════

Si certifica che

              ${user.username}
              
ha completato con successo l'esame di Radiografia
Digitale (RT) Non-Distruttiva secondo lo standard
NAS 410.

Data Esame: ${new Date(exam.date).toLocaleDateString()}
Punteggio Finale: ${exam.score}%

Materiale Testato: ${exam.material}
Spessore: ${exam.thickness}mm
Parametri: ${exam.kV}kV, ${exam.mA}mA

Difetti identificati: ${exam.detected}/${exam.total}
Precisione classificazione: ${exam.classificationAccuracy || 'N/A'}%

Questo certificato dimostra competenza in:
• Interpretazione immagini radiografiche digitali
• Riconoscimento e classificazione difetti
• Valutazione qualità IQI
• Procedure conformi NAS 410

Autorizzato da: Sistema Training RT
ID Certificato: ${user.id}-${exam.date}

═══════════════════════════════════════════════════════
        Valido solo per scopi formativi
     Non valido per certificazione ufficiale
═══════════════════════════════════════════════════════
  `;

    const blob = new Blob([certText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Certificato_RT_${user.username}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

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
            <p className="text-gray-400 text-center py-8">Nessun esame ancora</p>
          ) : (
            examHistory.slice().reverse().map((exam, idx) => (
              <div key={idx} className="bg-gray-900 p-4 rounded flex items-center justify-between flex-wrap gap-3">
                <div>
                  <p className="text-white font-semibold">Esame #{examHistory.length - idx}</p>
                  <p className="text-sm text-gray-400">{new Date(exam.date).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-1">{exam.material} • {exam.thickness}mm • {exam.kV}kV</p>
                  {exam.classificationAccuracy && (
                    <p className="text-xs text-gray-500">Classificazione: {exam.classificationAccuracy}%</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{exam.score}%</p>
                  <p className={`text-sm ${parseFloat(exam.score) >= 80 ? 'text-green-400' : 'text-red-400'}`}>
                    {parseFloat(exam.score) >= 80 ? t.passed : t.failed}
                  </p>
                </div>
                {parseFloat(exam.score) >= 80 && (
                  <button onClick={() => generateCertificate(exam)} className="px-3 py-1 bg-purple-600 hover:bg-purple-700 rounded text-sm flex items-center gap-1">
                    <Download className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// Main App
const AppContent = () => {
  const [view, setView] = useState('simulator');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, logout } = useAuth();
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} bg-gray-900 border-r border-gray-700 transition-all duration-300 overflow-hidden`}>
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="w-8 h-8 text-blue-400" />
            <div>
              <h1 className="text-lg font-bold">RT Training</h1>
              <p className="text-xs text-gray-400">NAS 410</p>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-800 rounded">
            <p className="text-sm font-semibold text-white">{user.username}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
            <span className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
              user.role === 'admin' ? 'bg-red-900 text-red-200' :
              user.role === 'trainer' ? 'bg-blue-900 text-blue-200' :
              'bg-green-900 text-green-200'
            }`}>
              {t[user.role]}
            </span>
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
          {view === 'simulator' && <XRaySimulator onExamComplete={() => setView('dashboard')} />}
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
      </div>
    </div>
  );
};

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

export default () => (
  <AuthProvider>
    <Root />
  </AuthProvider>
);
