import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Link href="/" className={styles.logo}>
                        BEAUTY SALON
                    </Link>
                    <div className={styles.address}>
                        <p>〒000-0000</p>
                        <p>東京都渋谷区美容エステ町1-2-3</p>
                        <p>TEL: 03-0000-0000</p>
                        <p>営業時間: 10:00 - 20:00 (火曜定休)</p>
                    </div>
                </div>

                <div className={styles.links}>
                    <div className={styles.col}>
                        <h3>Menu</h3>
                        <ul>
                            <li><Link href="/services">Service</Link></li>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h3>Information</h3>
                        <ul>
                            <li><Link href="/info">Store Info</Link></li>
                            <li><Link href="/contact">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} BEAUTY SALON. All Rights Reserved.
            </div>
        </footer>
    );
}
