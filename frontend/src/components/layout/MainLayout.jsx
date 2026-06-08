import { useState, useCallback } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import AdSenseAd from './AdSenseAd';
import ProfileModals from '../modals/ProfileModals';

export default function MainLayout({ children, showSubHeader, subHeaderContent, showAd = true, sidebarProps = {} }) {
  const [showProfile, setShowProfile] = useState(false);

  const handleCloseProfile = useCallback(() => setShowProfile(false), []);
  const handleOpenProfile = useCallback(() => setShowProfile(true), []);

  return (
    <div className="app-container">
      <Sidebar {...sidebarProps} />
      <Header
        showSubHeader={showSubHeader}
        subHeaderContent={subHeaderContent}
        onOpenProfile={handleOpenProfile}
      />
      {showAd && <AdSenseAd />}
      <div className="content-area" style={{ paddingTop: showSubHeader ? '96px' : '60px' }}>
        {children}
      </div>
      <ProfileModals
        show={showProfile}
        onClose={handleCloseProfile}
      />
    </div>
  );
}
