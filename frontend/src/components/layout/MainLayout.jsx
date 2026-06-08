import Sidebar from './Sidebar';
import Header from './Header';
import AdSenseAd from './AdSenseAd';

export default function MainLayout({ children, showSubHeader, subHeaderContent, showAd = true, sidebarProps = {} }) {
  return (
    <div className="app-container">
      <Sidebar {...sidebarProps} />
      <Header showSubHeader={showSubHeader} subHeaderContent={subHeaderContent} />
      {showAd && <AdSenseAd />}
      <div className="content-area" style={{ paddingTop: showSubHeader ? '96px' : '60px' }}>
        {children}
      </div>
    </div>
  );
}