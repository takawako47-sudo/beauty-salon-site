const apiKey = 'AIzaSyClK79MRAgeEAxvlMdsFbPcYacde6zroUI';
const calendarId = 'takawako47@gmail.com';

const datesToCheck = ['2026-03-06', '2026-03-10', '2026-03-17'];

async function getRawData(dateStr) {
    const timeMin = `${dateStr}T00:00:00+09:00`;
    const timeMax = `${dateStr}T23:59:59+09:00`;
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&timeZone=Asia/Tokyo`;

    const res = await fetch(url);
    const data = await res.json();
    return data.items || [];
}

async function run() {
    const results = {};
    for (const d of datesToCheck) {
        results[d] = await getRawData(d);
    }
    console.log(JSON.stringify(results, null, 2));
}

run();
