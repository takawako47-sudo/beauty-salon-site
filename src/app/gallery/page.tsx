import { Metadata } from 'next';
import BeholdWidget from './BeholdWidget';

export const metadata: Metadata = {
    title: 'Gallery | BEAUTY SALON',
    description: 'Instagramの最新投稿をご紹介します。',
};

export default function Gallery() {
    return (
        <div className="container section">
            <h1 className="section-title">GALLERY</h1>
            <p style={{ textAlign: 'center', marginBottom: '40px' }}>
                美容室スキップの公式Instagramの最新投稿をご紹介します。<br />
                <small style={{ color: '#888' }}>※Instagramの投稿が自動で反映されます。</small>
            </p>

            <div style={{ minHeight: '400px', width: '100%' }}>
                <BeholdWidget />
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <a
                    href="https://www.instagram.com/biyousitu_skip/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 30px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    Instagram公式アカウントをフォローする
                </a>
            </div>
        </div>
    );
}
