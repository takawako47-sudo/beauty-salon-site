const apiKey = 'AIzaSyClK79MRAgeEAxvlMdsFbPcYacde6zroUI';
const calendarId = 'takawako47@gmail.com';

const now = new Date();
const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
const year = jstNow.getUTCFullYear();
const month = String(jstNow.getUTCMonth() + 1).padStart(2, '0');
const date = String(jstNow.getUTCDate()).padStart(2, '0');

const timeMin = `${year}-${month}-${date}T00:00:00+09:00`;

const futureDate = new Date(jstNow.getTime() + 14 * 24 * 60 * 60 * 1000);
const fYear = futureDate.getUTCFullYear();
const fMonth = String(futureDate.getUTCMonth() + 1).padStart(2, '0');
const fDate = String(futureDate.getUTCDate()).padStart(2, '0');
const timeMax = `${fYear}-${fMonth}-${fDate}T23:59:59+09:00`;

const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&timeZone=Asia/Tokyo`;

console.log('Testing URL:', url);

fetch(url)
    .then(res => {
        console.log('Response Status:', res.status);
        return res.json();
    })
    .then(data => {
        if (data.error) {
            console.error('API Error:', JSON.stringify(data.error, null, 2));
        } else {
            console.log('Success! Found events:', data.items?.length || 0);
            if (data.items && data.items.length > 0) {
                data.items.slice(0, 10).forEach(item => {
                    console.log(`- ${item.summary} (${item.start.dateTime || item.start.date})`);
                });
            } else {
                console.log('No events found in the given range.');
            }
        }
    })
    .catch(err => console.error('Fetch Error:', err));
