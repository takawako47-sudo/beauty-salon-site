import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'BEAUTY SALON | 美容・エステサロン',
  description: '最新の美容技術とリラックス空間を提供するエステサロンです。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main style={{ minHeight: 'calc(100vh - 300px)', paddingTop: 'var(--header-height)' }}>
          {children}
        </main>
        <Footer />

        {/* SKIP AI Lab：アンチグラビティ2.0 監視エージェント */}
        <Script id="anti-gravity-monitor" strategy="afterInteractive">
          {`
            (function() {
                const WEBHOOK_URL = 'https://n8n.srv952808.hstgr.cloud/webhook/site-error-monitor';

                function sendErrorToHammer(errorType, message, sourceUrl) {
                    const errorData = {
                        site: window.location.hostname,
                        type: errorType,
                        message: message,
                        url: sourceUrl,
                        time: new Date().toISOString()
                    };
                    fetch(WEBHOOK_URL, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(errorData)
                    }).catch(e => console.error("監視エージェント通信エラー"));
                }

                // ① JavaScriptの重大なエラーを検知
                window.addEventListener('error', function(event) {
                    sendErrorToHammer('JS_ERROR', event.message, event.filename);
                });

                // ② 画像やiframe（カレンダー等）のリンク切れ・読み込み失敗を検知
                document.addEventListener('error', function(event) {
                    var target = event.target;
                    if (target.tagName && (target.tagName.toLowerCase() === 'img' || target.tagName.toLowerCase() === 'iframe' || target.tagName.toLowerCase() === 'script')) {
                        sendErrorToHammer('LOAD_ERROR (404等)', 'コンポーネントの読み込みに失敗しました', target.src || target.href);
                    }
                }, true);
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
