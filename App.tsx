
import React, { useState, PropsWithChildren } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider, useContent } from './context/ContentContext';
import PublicLayout from './components/PublicLayout';
import AdminLayout from './components/AdminLayout';
import { Home, Services, Portfolio, Contact, About, News } from './pages/PublicPages';
import { AdminDashboard, AdminProjects, AdminServices, AdminSettings, AdminBlog, AdminTestimonials, AdminJournal } from './pages/AdminPages';

// Auth Guard Component
const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isAuthLoading } = useContent();

  if (isAuthLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
            <p className="text-gray-500 text-sm animate-pulse">Initializing Secure Session...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const Login = () => {
  const { login, signup, isAuthenticated } = useContent();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  if (isAuthenticated) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    
    // Trim whitespace to avoid errors
    const cleanEmail = email.trim();
    const cleanPass = pass.trim();

    if (isSignUp) {
        const result = await signup(cleanEmail, cleanPass);
        if (!result.success) {
            setErrorMessage(result.error || 'Signup failed.');
        } else {
            setSuccessMessage('Account created! You may need to verify your email, or simply log in if verification is disabled.');
            setIsSignUp(false); // Switch back to login
        }
    } else {
        const result = await login(cleanEmail, cleanPass);
        if (!result.success) {
            setErrorMessage(result.error || 'Invalid credentials.');
        }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
           <h1 className="text-2xl font-serif font-bold text-gold-600">HanifGold CMS</h1>
           <p className="text-gray-500 text-sm">Authorized Personnel Only</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 p-3 rounded focus:border-gold-500 focus:outline-none"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@hanifgold.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-3 rounded focus:border-gold-500 focus:outline-none"
              value={pass}
              onChange={e => setPass(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
          {errorMessage && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3">
                <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}
          {successMessage && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3">
                <p className="text-green-700 text-sm">{successMessage}</p>
            </div>
          )}
          <button type="submit" disabled={loading} className="w-full bg-gold-600 text-white font-bold py-3 rounded hover:bg-gold-700 transition-colors disabled:opacity-50">
            {loading ? (isSignUp ? 'Creating Account...' : 'Authenticating...') : (isSignUp ? 'Create Admin Account' : 'Login')}
          </button>
        </form>
        
        <div className="mt-6 text-center space-y-4">
            <button 
                onClick={() => {
                    setIsSignUp(!isSignUp);
                    setErrorMessage('');
                    setSuccessMessage('');
                }} 
                className="text-sm text-gold-600 hover:text-gold-800 font-semibold"
            >
                {isSignUp ? 'Already have an account? Login' : 'First time here? Create Admin Account'}
            </button>
            <div className="block">
                <a href="/" className="text-sm text-gray-400 hover:text-gray-600">Return to Website</a>
            </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <ContentProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
          <Route path="/services" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/portfolio" element={<PublicLayout><Portfolio /></PublicLayout>} />
          <Route path="/news" element={<PublicLayout><News /></PublicLayout>} />
          <Route path="/contact" element={<PublicLayout><Contact /></PublicLayout>} />
          
          {/* Admin Auth */}
          <Route path="/login" element={<Login />} />

          {/* Admin Protected Routes */}
          <Route path="/admin" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/journal" element={<ProtectedRoute><AdminLayout><AdminJournal /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/projects" element={<ProtectedRoute><AdminLayout><AdminProjects /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><AdminServices /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/blog" element={<ProtectedRoute><AdminLayout><AdminBlog /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/testimonials" element={<ProtectedRoute><AdminLayout><AdminTestimonials /></AdminLayout></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute><AdminLayout><AdminSettings /></AdminLayout></ProtectedRoute>} />
          {/* Fallback for other admin routes to Dashboard or 404 in real app */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Router>
    </ContentProvider>
  );
};

export default App;
