import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AndroidStatusBar } from './components/common/AndroidStatusBar';
import { TopHeader } from './components/common/TopHeader';
import { BottomNavigation } from './components/common/BottomNavigation';
import { PolicyModal } from './components/common/PolicyModal';
import { ReportModal } from './components/common/ReportModal';
import { SearchModal } from './components/search/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { HomeFeed } from './components/home/HomeFeed';
import { ExploreView } from './components/explore/ExploreView';
import { ContestList } from './components/contest/ContestList';
import { ContestDetailModal } from './components/contest/ContestDetailModal';
import { UploadStudio } from './components/upload/UploadStudio';
import { LeaderboardView } from './components/leaderboard/LeaderboardView';
import { WalletView } from './components/wallet/WalletView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { MessagesView } from './components/messages/MessagesView';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsSupportView } from './components/settings/SettingsSupportView';
import { AdminDashboard } from './components/admin/AdminDashboard';

const AppContent: React.FC = () => {
  const { 
    activeTab, 
    isOwnerPortalOpen, 
    isDeviceFrame, 
    activeContestModal, 
    setActiveContestModal 
  } = useApp();

  // If in Private Owner Admin Portal Mode, render full-screen Owner Dashboard
  if (isOwnerPortalOpen) {
    return (
      <div className="w-full h-screen bg-[#060A18] text-slate-100 flex flex-col overflow-hidden">
        <AdminDashboard />
      </div>
    );
  }

  const renderActiveScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeFeed />;
      case 'explore':
        return <ExploreView />;
      case 'contest':
        return <ContestList />;
      case 'upload':
        return <UploadStudio />;
      case 'leaderboard':
        return <LeaderboardView />;
      case 'wallet':
        return <WalletView />;
      case 'notifications':
        return <NotificationsView />;
      case 'messages':
        return <MessagesView />;
      case 'profile':
        return <ProfileView />;
      case 'settings':
        return <SettingsSupportView />;
      default:
        return <HomeFeed />;
    }
  };

  // If Device Frame Mockup is enabled
  if (isDeviceFrame) {
    return (
      <div className="min-h-screen w-full bg-[#030712] flex flex-col items-center justify-center p-2 sm:p-6 overflow-y-auto">
        {/* Android Flagship Phone Bezel Frame */}
        <div className="relative w-full max-w-[414px] h-[860px] bg-black rounded-[50px] p-3 shadow-[0_0_70px_-10px_rgba(99,102,241,0.3)] border-[4px] border-[#1E2D5A] flex flex-col overflow-hidden">
          {/* Inner Screen Shell */}
          <div className="relative w-full h-full bg-[#060A18] rounded-[42px] overflow-hidden flex flex-col">
            <AndroidStatusBar />
            <TopHeader />
            <main className="relative flex-1 flex flex-col overflow-hidden bg-[#060A18]">
              {renderActiveScreen()}
            </main>
            <BottomNavigation />
          </div>
        </div>

        {/* Global Modals & Sheets */}
        {activeContestModal && (
          <ContestDetailModal
            competition={activeContestModal}
            onClose={() => setActiveContestModal(null)}
          />
        )}
        <AuthModal />
        <SearchModal />
        <PolicyModal />
        <ReportModal />
      </div>
    );
  }

  // Responsive Full-Screen / Mobile-First View
  return (
    <div className="min-h-screen w-full bg-[#030712] text-slate-100 flex flex-col items-center justify-start overflow-hidden">
      <div className="w-full flex-1 flex flex-col h-screen max-w-md mx-auto shadow-2xl bg-[#060A18] border-x border-[#1E2D5A]/50">
        {/* Android Status Bar */}
        <AndroidStatusBar />

        {/* Top Header */}
        <TopHeader />

        {/* Main View Area */}
        <main className="relative flex-1 flex flex-col overflow-hidden bg-[#060A18]">
          {renderActiveScreen()}
        </main>

        {/* Bottom Navigation */}
        <BottomNavigation />
      </div>

      {/* Global Modals & Sheets */}
      {activeContestModal && (
        <ContestDetailModal
          competition={activeContestModal}
          onClose={() => setActiveContestModal(null)}
        />
      )}
      <AuthModal />
      <SearchModal />
      <PolicyModal />
      <ReportModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
