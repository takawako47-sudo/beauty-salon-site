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
                        <dd>美容室skip</dd>

                        <dt>住所</dt>
                        <dd>熊本県上天草市大矢野町登立534-38</dd>

                        <dt>アクセス</dt>
                        <dd>詳細はお電話にてお問い合わせください。</dd>

                        <dt>電話番号</dt>
                        <dd>080-4474-5569</dd>

                        <dt>営業時間</dt>
                        <dd>AM 9:00 - PM 6:00<br />※ 早朝・遅出は別料金にて対応可能</dd>

                        <dt>支払い方法</dt>
                        <dd>現金、スマホ決済（楽天ペイ）、PAYPAYに対応</dd>
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
