import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | BEAUTY SALON',
    description: 'ご予約・お問い合わせはこちらから。',
};

export default function Contact() {
    return (
        <div className="container section">
            <div className={styles.contactContainer}>
                <h1 className="section-title">CONTACT</h1>

                <div className={styles.intro}>
                    <p>
                        ご予約、メニューに関するご質問、その他のお問い合わせは下記のフォームよりお願いいたします。<br />
                        通常2〜3営業日以内に担当者よりご返信させていただきます。
                    </p>
                    <p style={{ marginTop: '20px', fontSize: '0.9rem', color: '#666' }}>
                        ※ お急ぎの場合はお電話 (03-0000-0000) にてご連絡ください。
                    </p>
                </div>

                <div className={styles.formWrapper}>
                    {/* ダミーのGoogle Form iframe（実際のURLに差し替える想定） */}
                    <iframe
                        src="https://docs.google.com/forms/d/e/1FAIpQLSeDummyFormUrlHere/viewform?embedded=true"
                        className={styles.iframeContainer}
                        title="お問い合わせフォーム"
                    >
                        読み込み中…
                    </iframe>
                </div>
            </div>
        </div>
    );
}
