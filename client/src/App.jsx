import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicOnlyRoute from './components/PublicOnlyRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import CreateTest from './pages/CreateTest';
import TakeTest from './pages/TakeTest';
import MyResults from './pages/MyResults';
import TeacherTestResults from './pages/TeacherTestResults';
import Landing from './pages/Landing';
import About from './pages/About';
import TestAnalytics from './pages/TestAnalytics';

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout />
      </Router>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const location = useLocation();
  // Check if we are on the landing page for conditional styling
  const isLanding = location.pathname === '/';

  return (
    <>
      <Navbar />
      <div className={`min-h-screen bg-gray-50 text-gray-900 font-sans ${isLanding ? '' : 'pt-16'}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />

          {/* Routes accessible only when NOT logged in */}
          <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Teacher Routes */}
          <Route element={<ProtectedRoute allowedRoles={['teacher']} />}>
            <Route path="/teacher" element={<TeacherDashboard />} />
            <Route path="/teacher/create-test" element={<CreateTest />} />
            <Route path="/teacher/results/:testId" element={<TeacherTestResults />} />
          </Route>

          {/* Student Routes */}
          <Route element={<ProtectedRoute allowedRoles={['student']} />}>
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student/take-test/:testId" element={<TakeTest />} />
            <Route path="/student/results" element={<MyResults />} />
            <Route path="/student/analytics/:testId" element={<TestAnalytics />} />
          </Route>
        </Routes>
        <Toaster position="top-right" />
      </div>
      <Footer />
    </>
  );
};

export default App;
