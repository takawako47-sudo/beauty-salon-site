import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.inner}>
                <div className={styles.brand}>
                    <Link href="/info" className={styles.logo}>
                        美容室SKIP
                    </Link>
                    <div className={styles.address}>
                        <p>〒869-3601</p>
                        <p>熊本県上天草市大矢野町登立534-38</p>
                        <p>TEL: 080-4474-5569</p>
                        <p>営業時間: 9:00 - 18:00 (月曜、第一日曜定休)</p>
                    </div>
                </div>

                <div className={styles.links}>
                    <div className={styles.col}>
                        <h3>Menu</h3>
                        <ul>
                            <li><Link href="/pricing">Pricing</Link></li>
                            <li><Link href="/gallery">Gallery</Link></li>
                            <li><Link href="/reserve">Reserve</Link></li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h3>Information</h3>
                        <ul>
                            <li><Link href="/info">Store Info</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} 美容室SKIP. All Rights Reserved.
            </div>
        </footer>
    );
}
