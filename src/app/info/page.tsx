import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Store Info | BEAUTY SALON',
    description: '美容・エステサロンの店舗情報です。',
};

export default function Info() {
    return (
        <div className="container section">
            <h1 className="section-title">STORE INFO</h1>

            <div className={styles.infoGrid}>
                <div className={styles.details}>
                    <dl className={styles.dl}>
                        <dt>店名</dt>
                        <dd>BEAUTY SALON (ビューティーサロン)</dd>

                        <dt>住所</dt>
                        <dd>〒000-0000<br />東京都渋谷区美容エステ町1-2-3</dd>

                        <dt>アクセス</dt>
                        <dd>渋谷駅〇〇口から徒歩5分<br />お車でお越しの場合は近隣のコインパーキングをご利用ください。</dd>

                        <dt>電話番号</dt>
                        <dd>03-0000-0000</dd>

                        <dt>営業時間</dt>
                        <dd>10:00 - 20:00 (最終受付 18:30)<br />定休日：火曜日</dd>

                        <dt>支払い方法</dt>
                        <dd>現金、各種クレジットカード、一部電子マネー、QRコード決済に対応</dd>
                    </dl>
                </div>

                <div className={styles.mapWrapper}>
                    <div className={styles.mapPlaceholder}>
                        Google Map 埋め込みエリア
                        {/* 実際にMapを埋め込む場合はiframeを配置 */}
                    </div>
                </div>
            </div>
        </div>
    );
}
