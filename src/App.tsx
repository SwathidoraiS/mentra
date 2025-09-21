import React, { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { useApp } from './contexts/AppContext';
import Layout from './components/Layout';
import LoginForm from './components/Auth/LoginForm';
import SignupForm from './components/Auth/SignupForm';
import Dashboard from './components/Dashboard/Dashboard';
import Journal from './components/Journal/Journal';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar';
import PeerSupport from './components/PeerSupport/PeerSupport';
import VoiceAI from './components/VoiceAI/VoiceAI';
import MoodMusic from './components/MoodMusic/MoodMusic';
import AIStorytelling from './components/AIStorytelling/AIStorytelling';
import Analytics from './components/Analytics/Analytics';
import Settings from './components/Settings/Settings';

function App() {
  const { user, isLoading } = useAuth();
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [activeTab, setActiveTab] = useState('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading your wellness journey...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        {authMode === 'login' ? (
          <LoginForm onToggleMode={() => setAuthMode('signup')} />
        ) : (
          <SignupForm onToggleMode={() => setAuthMode('login')} />
        )}
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'journal':
        return <Journal />;
      case 'chat':
        return <Chat />;
      case 'peer':
        return <PeerSupport />;
      case 'voice':
        return <VoiceAI />;
      case 'music':
        return <MoodMusic />;
      case 'story':
        return <AIStorytelling />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <Layout>
          {renderContent()}
        </Layout>
    </div>
  );
}


export default App;