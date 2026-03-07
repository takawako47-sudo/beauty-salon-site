import { google } from 'googleapis';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Gallery | BEAUTY SALON',
    description: '施術事例やサロンの雰囲気をご紹介します。',
};

import fs from 'fs';
import path from 'path';
import axios from 'axios';

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

        // 保存先ディレクトリの作成
        const publicDir = path.join(process.cwd(), 'public');
        const galleryDir = path.join(publicDir, 'gallery-images');
        if (!fs.existsSync(galleryDir)) {
            fs.mkdirSync(galleryDir, { recursive: true });
        }

        // フォルダ内の画像ファイルを取得
        const res = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, createdTime)',
            orderBy: 'createdTime desc',
            pageSize: 50,
        });

        const files = res.data.files;
        if (!files || files.length === 0) {
            return [];
        }

        const galleryItems: GalleryItem[] = [];

        for (const file of files) {
            if (!file.id) continue;

            const extension = file.name ? path.extname(file.name) : '.jpg';
            const fileName = `${file.id}${extension}`;
            const filePath = path.join(galleryDir, fileName);
            const publicPath = `/gallery-images/${fileName}`;

            // ファイルがまだ存在しない場合のみダウンロード（ビルド時間の短縮）
            if (!fs.existsSync(filePath)) {
                try {
                    console.log(`Downloading image: ${file.name} (${file.id})`);
                    // Google Drive APIで画像コンテンツを取得
                    // NOTE: API Keyでファイルのバイナリを取得するには、別のエンドポイントかオプションが必要な場合があるため
                    // 公開されている直URLからaxiosで取得する方式を試みます
                    const downloadUrl = `https://drive.google.com/uc?id=${file.id}&export=download`;
                    const response = await axios.get(downloadUrl, { responseType: 'arraybuffer' });
                    fs.writeFileSync(filePath, Buffer.from(response.data));
                } catch (dlError) {
                    console.error(`Failed to download ${file.id}:`, dlError);
                    continue; // 失敗した画像はスキップ
                }
            }

            // タイトル抽出
            const rawTitle = file.name ? file.name.replace(/\.[^/.]+$/, '') : '名称未設定';
            const parts = rawTitle.split('_');
            const title = parts.length > 1 ? parts[parts.length - 1] : rawTitle;

            // 作成日時のフォーマット
            const dateObj = new Date(file.createdTime || Date.now());
            const formattedDate = dateObj.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });

            galleryItems.push({
                id: file.id,
                title: title,
                date: formattedDate,
                imageUrl: publicPath,
                description: `${title}の施術事例です。`,
            });
        }

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
