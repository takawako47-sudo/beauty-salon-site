import { google } from 'googleapis';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery | BEAUTY SALON',
    description: '施術事例やサロンの雰囲気をご紹介します。',
};

// Next.js (App Router) の静的エクスポートでビルド時に処理する
// Revalidate を設定しても 'output: export' の場合は静的生成となります。

type GalleryItem = {
    id: string;
    title: string;
    date: string;
    imageUrl: string;
    description: string;
};

async function getGalleryImages(): Promise<GalleryItem[]> {
    try {
        const apiKey = 'AIzaSyClK79MRAgeEAxvlMdsFbPcYacde6zroUI';
        const folderId = '1r1AWR-fQyGQ7KM_hD6MhItLHwg4mSCes';

        const drive = google.drive({ version: 'v3', auth: apiKey });

        // フォルダ内の画像ファイルを取得
        const res = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, createdTime, webContentLink, thumbnailLink)',
            orderBy: 'createdTime desc',
            pageSize: 50,
        });

        const files = res.data.files;
        if (!files || files.length === 0) {
            return [];
        }

        const galleryItems: GalleryItem[] = files.map((file) => {
            // ファイル名から拡張子を削除してタイトル抽出
            // 例: "20240101_ハイフ.jpg" -> "20240101_ハイフ" -> 後半を取るなど自由ですが、ここでは拡張子除去をベースにします。
            const rawTitle = file.name ? file.name.replace(/\.[^/.]+$/, '') : '名称未設定';
            // "_" などの区切りがあれば後半を名前にするというロジック（自由設定）
            const parts = rawTitle.split('_');
            const title = parts.length > 1 ? parts[parts.length - 1] : rawTitle;

            // 作成日時のフォーマット
            const dateObj = new Date(file.createdTime || Date.now());
            const formattedDate = dateObj.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            // thumbnailLinkはセッション期限があり、静的エクスポートでは数時間でリンク切れになります。
            // 永続的な表示のためには、共有済みのファイルIDを使って直接URLを生成します。
            const imageUrl = `https://drive.google.com/uc?id=${file.id}`;

            return {
                id: file.id || Math.random().toString(),
                title: title,
                date: formattedDate,
                imageUrl: imageUrl,
                description: `${title}の施術事例です。`,
            };
        });

        return galleryItems;
    } catch (error) {
        console.error('Google Drive API fetching error:', error);
        return [];
    }
}

export default async function Gallery() {
    const items = await getGalleryImages();

    return (
        <div className="container section">
            <h1 className="section-title">GALLERY</h1>
            <p style={{ textAlign: 'center', marginBottom: '40px' }}>
                サロンの雰囲気や、施術の事例（ビフォーアフター等）をご紹介します。<br />
                <small style={{ color: '#888' }}>※画像は定期的に更新されます。</small>
            </p>

            <div className={styles.galleryGrid}>
                {items.length > 0 ? (
                    items.map((item) => (
                        <div key={item.id} className={styles.galleryCard}>
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
                                <p className={styles.cardDesc}>{item.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyMessage}>
                        現在表示できる画像がありません。
                        <br />
                        （連携設定が未完了、または画像がアップロードされていません）
                    </div>
                )}
            </div>
        </div>
    );
}
