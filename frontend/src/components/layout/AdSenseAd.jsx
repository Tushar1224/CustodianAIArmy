export default function AdSenseAd({ slot = '5335186375' }) {
  return (
    <div style={{ maxWidth: '100%', background: 'var(--bg2)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0.5rem 1rem' }}>
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-6476201805386001"
             data-ad-slot={slot}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script dangerouslySetInnerHTML={{
          __html: '(adsbygoogle = window.adsbygoogle || []).push({});'
        }} />
      </div>
    </div>
  );
}