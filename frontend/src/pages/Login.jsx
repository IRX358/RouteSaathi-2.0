import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api';
import { Bus, Shield, UserCircle, ArrowRight } from 'lucide-react';
import logo from '../assets/RouteSaathi_logo.png';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const demoUsers = [
    { email: 'admin@bmtc.gov.in', password: 'admin123', label: 'Coordinator', icon: Shield, desc: 'Fleet Management' },
    { email: 'ganesh@bmtc.gov.in', password: 'conductor123', label: 'Conductor', icon: Bus, desc: 'Bus Operations' },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    await performLogin(email, password);
  };

  const performLogin = async (loginEmail, loginPassword) => {
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(loginEmail, loginPassword);
      if (response.data.success) {
        login(response.data.user);
        const role = response.data.user.role;
        navigate(role === 'coordinator' ? '/coordinator' : role === 'conductor' ? '/conductor' : '/passenger');
      }
    } catch (err) {
      setError(err.response?.data?.detail || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePassengerAccess = async () => {
    // Auto-login as passenger for easy access
    await performLogin('user@gmail.com', 'user123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002147] via-[#003366] to-[#002147] flex items-center justify-center p-6">
      <div className="w-full max-w-md animate-fadeIn">
        {/* Logo and Branding */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-2xl shadow-lg mb-6 p-2">
            <img src={logo} alt="RouteSaathi Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight mb-2">RouteSaathi</h1>
          <p className="text-blue-200 text-lg font-medium">BMTC Fleet Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Welcome Back</h2>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-medium text-center">
                {error}
              </div>
            )}

            <button type="submit" disabled={loading} className="btn btn-primary w-full py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Passenger Access Button */}
          <div className="mt-6">
            <button 
              onClick={handlePassengerAccess}
              disabled={loading}
              className="w-full bg-blue-50 hover:bg-blue-100 text-[#002147] border-2 border-[#002147]/10 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all group"
            >
              <UserCircle className="w-6 h-6" />
              Use as Passenger
              <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          {/* Demo Logins */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Staff Demo Access</p>
            <div className="space-y-3">
              {demoUsers.map((user, idx) => (
                <button
                  key={idx}
                  onClick={() => performLogin(user.email, user.password)}
                  disabled={loading}
                  className="w-full flex items-center gap-4 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition group border border-transparent hover:border-gray-200"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-sm ${
                    idx === 0 ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    <user.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="font-bold text-gray-900 text-sm">{user.label}</p>
                    <p className="text-xs text-gray-500 font-medium">{user.desc}</p>
                  </div>
                  <span className="text-gray-300 group-hover:text-gray-600 text-sm">Login →</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300/80 text-sm mt-8 font-medium">
          © 2025  Bengaluru Metropolitan Transport Corporation 
        </p>
      </div>
    </div>
  );
}

export default Login;
