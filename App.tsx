import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import LessonDetail from './LessonDetail';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>('');
  const [isPremium, setIsPremium] = useState<boolean>(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentRoute(hash);
    };
    handleHashChange();
    
    // Check local storage for persistent premium state
    const savedPremium = localStorage.getItem('lumiere_premium');
    if (savedPremium === 'true') {
        setIsPremium(true);
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (path: string) => {
    window.location.hash = path;
  };

  const handleUnlock = () => {
      setIsPremium(true);
      localStorage.setItem('lumiere_premium', 'true');
      alert("✨ Félicitations! Premium Unlocked.");
  };

  const renderContent = () => {
    if (currentRoute.startsWith('/lesson/')) {
      const parts = currentRoute.split('/lesson/');
      if (parts.length > 1) {
          const lessonId = parts[1].split('/')[0];
          return <LessonDetail lessonId={lessonId} onBack={() => navigateTo('/')} />;
      }
    }
    return <Dashboard 
        onLessonSelect={(id) => navigateTo(`/lesson/${id}`)} 
        isPremium={isPremium}
        onUnlock={handleUnlock}
    />;
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#F3F0FF] text-slate-900 font-sans antialiased overflow-hidden">
        {renderContent()}
    </div>
  );
};

export default App;