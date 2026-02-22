import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Service | BEAUTY SALON',
    description: '当サロンで提供している美容・エステメニューをご紹介します。',
};

export default function Services() {
    return (
        <div className="container section">
            <h1 className="section-title">SERVICE</h1>
            <p style={{ textAlign: 'center', marginBottom: '50px' }}>
                お客様のお悩みやご希望に合わせた、最適なメニューをご用意しております。
            </p>

            <div className={styles.serviceGrid}>
                <div className={styles.serviceCard}>
                    <div className={styles.imgPlaceholder}>💆‍♀️</div>
                    <div className={styles.serviceContent}>
                        <h2 className={styles.serviceTitle}>フェイシャルエステ</h2>
                        <p className={styles.serviceDesc}>
                            お肌のターンオーバーを促し、透明感のある素肌へと導きます。保湿、アンチエイジング、毛穴ケアなど、ご希望に応じた専用コースもございます。
                        </p>
                        <div className={styles.servicePrice}>¥8,800〜</div>
                    </div>
                </div>

                <div className={styles.serviceCard}>
                    <div className={styles.imgPlaceholder}>🧖‍♀️</div>
                    <div className={styles.serviceContent}>
                        <h2 className={styles.serviceTitle}>アロマリンパマッサージ</h2>
                        <p className={styles.serviceDesc}>
                            天然のエッセンシャルオイルを使用し、全身のリンパをしっかりと流します。疲労回復、むくみ解消に高い効果が期待できます。
                        </p>
                        <div className={styles.servicePrice}>¥12,000〜</div>
                    </div>
                </div>

                <div className={styles.serviceCard}>
                    <div className={styles.imgPlaceholder}>✨</div>
                    <div className={styles.serviceContent}>
                        <h2 className={styles.serviceTitle}>最新ハイフ (HIFU)</h2>
                        <p className={styles.serviceDesc}>
                            切らないリフトアップとして話題のハイフを導入しています。顔のたるみ改善や、小顔効果が期待でき、施術直後から効果を実感しやすくなっています。
                        </p>
                        <div className={styles.servicePrice}>¥15,000〜</div>
                    </div>
                </div>

                <div className={styles.serviceCard}>
                    <div className={styles.imgPlaceholder}>💅</div>
                    <div className={styles.serviceContent}>
                        <h2 className={styles.serviceTitle}>ブライダルコース</h2>
                        <p className={styles.serviceDesc}>
                            特別な日を最高の笑顔で迎えられるよう、挙式までの期間に合わせて集中的なケアを行います。お背中やデコルテのケアも含まれます。
                        </p>
                        <div className={styles.servicePrice}>要相談</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
