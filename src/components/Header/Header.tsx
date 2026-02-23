"use client";

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <Link href="/" className={styles.logo} onClick={closeMenu}>
                    BEAUTY SALON
                </Link>

                <div className={`${styles.hamburger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                    <ul>
                        <li><Link href="/" onClick={closeMenu}>Home</Link></li>
                        <li><Link href="/services" onClick={closeMenu}>Service</Link></li>
                        <li><Link href="/pricing" onClick={closeMenu}>Pricing</Link></li>
                        <li><Link href="/gallery" onClick={closeMenu}>Gallery</Link></li>
                        <li><Link href="/reserve" onClick={closeMenu}>Reserve</Link></li>
                        <li><Link href="/info" onClick={closeMenu}>Info</Link></li>
                        <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
