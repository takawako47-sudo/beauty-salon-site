import styles from './page.module.css';
import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

export const metadata: Metadata = {
    title: 'Gallery | BEAUTY SALON',
    description: 'Instagramの最新投稿をご紹介します。',
};

type GalleryItem = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
    permalink: string;
};

// Instagram API Response Types
interface InstagramMedia {
    id: string;
    caption?: string;
    media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    media_url: string;
    permalink: string;
    thumbnail_url?: string;
    timestamp: string;
}

async function getInstagramImages(): Promise<GalleryItem[]> {
    try {
        const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;

        if (!accessToken) {
            console.error('[Gallery] INSTAGRAM_ACCESS_TOKEN is not set');
            return [];
        }

        // Instagram Basic Display API endpoint
        const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${accessToken}`;

        const response = await axios.get(url);
        const mediaList: InstagramMedia[] = response.data.data;

        if (!mediaList || mediaList.length === 0) {
            return [];
        }

        // 保存先ディレクトリの作成
        const publicDir = path.join(process.cwd(), 'public');
        const galleryDir = path.join(publicDir, 'gallery-images');
        if (!fs.existsSync(galleryDir)) {
            fs.mkdirSync(galleryDir, { recursive: true });
        }

        const galleryItems: GalleryItem[] = [];

        // 最新の投稿から順に処理（最大20件程度）
        for (const media of mediaList) {
            // 画像またはカルーセルのみ表示
            if (media.media_type === 'VIDEO' && !media.thumbnail_url) continue;

            const imageUrl = media.media_type === 'VIDEO' ? media.thumbnail_url! : media.media_url;
            const extension = '.jpg'; // Instagramの画像は基本的にjpgとして保存
            const fileName = `ig_${media.id}${extension}`;
            const filePath = path.join(galleryDir, fileName);

            // GitHub Pages のサブパスを考慮したパス生成
            const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
            const publicPath = `${basePath}/gallery-images/${fileName}`;

            // ローカル保存（URLの有効期限対策）
            if (!fs.existsSync(filePath)) {
                try {
                    const imgRes = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                    fs.writeFileSync(filePath, Buffer.from(imgRes.data));
                    console.log(`[Gallery] Saved Instagram image: ${fileName}`);
                } catch (err: any) {
                    console.error(`[Gallery] Failed to save image ${media.id}:`, err.message);
                    continue;
                }
            }

            // 日付フォーマット
            const dateObj = new Date(media.timestamp);
            const formattedDate = dateObj.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            galleryItems.push({
                id: media.id,
                title: media.caption ? media.caption.split('\n')[0].substring(0, 30) : 'Instagram Post',
                date: formattedDate,
                imageUrl: publicPath,
                description: media.caption || '',
                permalink: media.permalink,
            });

            if (galleryItems.length >= 20) break; // 表示件数制限
        }

        return galleryItems;
    } catch (error: any) {
        console.error('[Gallery] Instagram API fetching error:', error.message);
        return [];
    }
}

export default async function Gallery() {
    const items = await getInstagramImages();

    return (
        <div className="container section">
            <h1 className="section-title">GALLERY</h1>
            <p style={{ textAlign: 'center', marginBottom: '40px' }}>
                美容室スキップの公式Instagramの最新投稿をご紹介します。<br />
                <small style={{ color: '#888' }}>※画像は定期的に更新されます。</small>
            </p>

            <div className={styles.galleryGrid}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <a
                            key={item.id}
                            href={item.permalink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.galleryCard}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className={styles.imageWrapper}>
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className={styles.image}
                                    loading="lazy"
                                />
                            </div>
                            <div className={styles.cardContent}>
                                <h2 className={styles.cardTitle}>{item.title}</h2>
                                <div className={styles.cardDate}>{item.date}</div>
                                <p className={styles.cardDesc} style={{
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
                                    WebkitBoxOrient: 'vertical',
                                    overflow: 'hidden',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.5'
                                }}>
                                    {item.description}
                                </p>
                                <div style={{
                                    marginTop: '10px',
                                    fontSize: '0.8rem',
                                    color: '#d4a373',
                                    fontWeight: 'bold'
                                }}>
                                    Instagramで見る ❯
                                </div>
                            </div>
                        </a>
                    ))
                ) : (
                    <div className={styles.emptyMessage}>
                        現在表示できる画像がありません。
                        <br />
                        <small style={{ color: '#999' }}>
                            （Instagram連携設定を準備中です。完了までしばらくお待ちください）
                        </small>
                    </div>
                )}
            </div>

            <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <a
                    href="https://www.instagram.com/biyousitu_skip/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                    style={{
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: '#fff',
                        border: 'none',
                        padding: '12px 30px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}
                >
                    Instagram公式アカウントをフォローする
                </a>
            </div>
        </div>
    );
}
