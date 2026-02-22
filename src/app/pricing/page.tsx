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

            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>フェイシャル</h2>
            <table className={styles.pricingTable}>
                <tbody>
                    <tr>
                        <td>ベーシックケア<span className={styles.subText}>クレンジング・マッサージ・パック (45分)</span></td>
                        <td className={styles.priceCol}>¥8,800</td>
                    </tr>
                    <tr>
                        <td>エイジングケア<span className={styles.subText}>最新機器使用・リフトアップ (60分)</span></td>
                        <td className={styles.priceCol}>¥13,200</td>
                    </tr>
                    <tr>
                        <td>毛穴洗浄コース<span className={styles.subText}>超音波洗浄・ビタミンC導入 (60分)</span></td>
                        <td className={styles.priceCol}>¥11,000</td>
                    </tr>
                </tbody>
            </table>

            <h2 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'var(--accent-color)' }}>ボディ</h2>
            <table className={styles.pricingTable}>
                <tbody>
                    <tr>
                        <td>アロマリンパマッサージ<span className={styles.subText}>全身 (60分)</span></td>
                        <td className={styles.priceCol}>¥12,000</td>
                    </tr>
                    <tr>
                        <td>アロマリンパマッサージ<span className={styles.subText}>全身＋ヘッドスパ (90分)</span></td>
                        <td className={styles.priceCol}>¥16,500</td>
                    </tr>
                    <tr>
                        <td>最新ハイフ (HIFU)<span className={styles.subText}>気になる部位 집중 (45分)</span></td>
                        <td className={styles.priceCol}>¥15,000</td>
                    </tr>
                </tbody>
            </table>

            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '30px' }}>
                ※ 初回のお客様は全メニュー20%OFFでご利用いただけます。<br />
                ※ 各種クレジットカード・QRコード決済に対応しております。
            </p>
        </div>
    );
}
