export default function LoadingOverlay({ visible = false, text = 'Processing...' }) {
  if (!visible) return null;
  return (
    <div className="loading-overlay" id="loading-overlay" style={{ display: 'flex' }}>
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p style={{ color: 'var(--text-secondary)' }}>{text}</p>
      </div>
    </div>
  );
}