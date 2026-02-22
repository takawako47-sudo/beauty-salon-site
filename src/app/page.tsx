import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroBg2}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>RELAX & BEAUTY</h1>
          <p className={styles.heroSubtitle}>あなただけの特別な癒やし時間を体験しませんか。</p>
        </div>
      </section>

      <section className={`section ${styles.features}`}>
        <div className="container">
          <h2 className="section-title">FEATURES</h2>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>✨</div>
              <h3 className={styles.featureTitle}>最新の美容機器</h3>
              <p className={styles.featureDesc}>
                効果を実感しやすい最新鋭の美容マシンを導入しています。お客様の理想を安全かつスピーディに叶えます。
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>🌿</div>
              <h3 className={styles.featureTitle}>自然派コスメ</h3>
              <p className={styles.featureDesc}>
                お肌に優しいオーガニック成分を配合したプロダクトを厳選。敏感肌の方も安心して施術を受けていただけます。
              </p>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>👑</div>
              <h3 className={styles.featureTitle}>プライベート空間</h3>
              <p className={styles.featureDesc}>
                完全個室のリラックスできる空間で、周りの目を気にせずゆったりとした優雅なひとときをお過ごしください。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`section ${styles.links}`}>
        <div className="container">
          <h2 className="section-title" auto-textcolor="false" style={{ color: 'white' }}>MENU & INFO</h2>
          <div className={styles.linksGrid}>
            <Link href="/services" className={styles.linkCard}>
              <h3 className={styles.linkTitle}>SERVICE</h3>
              <p className={styles.linkDesc}>施術メニューのご案内</p>
            </Link>
            <Link href="/pricing" className={styles.linkCard}>
              <h3 className={styles.linkTitle}>PRICING</h3>
              <p className={styles.linkDesc}>料金表はこちら</p>
            </Link>
            <Link href="/gallery" className={styles.linkCard}>
              <h3 className={styles.linkTitle}>GALLERY</h3>
              <p className={styles.linkDesc}>施術事例・ビフォーアフター</p>
            </Link>
            <Link href="/info" className={styles.linkCard}>
              <h3 className={styles.linkTitle}>STORE INFO</h3>
              <p className={styles.linkDesc}>アクセス・営業時間</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
