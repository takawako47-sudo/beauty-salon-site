const { google } = require('googleapis');

const apiKey = 'AIzaSyClK79MRAgeEAxvlMdsFbPcYacde6zroUI';
const folderId = '1r1AWR-fQyGQ7KM_hD6MhItLHwg4mSCes';

async function testDrive() {
    try {
        const drive = google.drive({ version: 'v3', auth: apiKey });
        console.log(`Testing access to folder: ${folderId}`);

        const res = await drive.files.list({
            q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
            fields: 'files(id, name, createdTime, webContentLink, thumbnailLink)',
            orderBy: 'createdTime desc',
            pageSize: 10,
        });

        const files = res.data.files;
        if (!files || files.length === 0) {
            console.log('No image files found in the folder.');
            return;
        }

        console.log(`Successfully found ${files.length} images:`);
        files.forEach(file => {
            console.log(`- Name: ${file.name}`);
            console.log(`  ID: ${file.id}`);
            console.log(`  Thumbnail: ${file.thumbnailLink}`);
        });
    } catch (error) {
        console.error('Google Drive API Error:', error.message);
        if (error.errors) {
            console.error('Details:', JSON.stringify(error.errors, null, 2));
        }
    }
}

testDrive();
