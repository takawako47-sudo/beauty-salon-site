import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pricing | BEAUTY SALON',
    description: '美容・エステサロンの料金表です。',
};

export default function Pricing() {
    return (
        <div className="container section">
            <h1 className="section-title">PRICING</h1>
            <p style={{ textAlign: 'center', marginBottom: '50px' }}>
                分かりやすくシンプルな料金体系を心がけております。※価格はすべて税込です。
            </p>

            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>カット・カラー</h2>
            <table className={styles.pricingTable}>
                <tbody>
                    <tr>
                        <td>カット<span className={styles.subText}>ブロー込</span></td>
                        <td className={styles.priceCol}>¥2,420</td>
                    </tr>
                    <tr>
                        <td>前髪カット</td>
                        <td className={styles.priceCol}>¥880</td>
                    </tr>
                    <tr>
                        <td>カラー<span className={styles.subText}>シャンプー・ブロー込 / ショート</span></td>
                        <td className={styles.priceCol}>¥3,630</td>
                    </tr>
                    <tr>
                        <td>カラー<span className={styles.subText}>シャンプー・ブロー込 / ミディアム・ロング</span></td>
                        <td className={styles.priceCol}>¥5,980〜</td>
                    </tr>
                </tbody>
            </table>

            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>パーマ・縮毛矯正</h2>
            <table className={styles.pricingTable}>
                <tbody>
                    <tr>
                        <td>パーマ<span className={styles.subText}>シャンプー・カット・ブロー込（ノーマル）</span></td>
                        <td className={styles.priceCol}>¥8,550</td>
                    </tr>
                    <tr>
                        <td>パーマ<span className={styles.subText}>シャンプー・カット・ブロー込（クリニック）</span></td>
                        <td className={styles.priceCol}>¥9,480</td>
                    </tr>
                    <tr>
                        <td>縮毛矯正<span className={styles.subText}>シャンプー・カット・ブロー込 / ショート</span></td>
                        <td className={styles.priceCol}>¥8,980</td>
                    </tr>
                    <tr>
                        <td>縮毛矯正<span className={styles.subText}>シャンプー・カット・ブロー込 / ミディアム・ロング</span></td>
                        <td className={styles.priceCol}>¥9,980〜</td>
                    </tr>
                </tbody>
            </table>

            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '30px' }}>
                ※ 各種クレジットカード・QRコード決済に対応しております。
            </p>
        </div>
    );
}
