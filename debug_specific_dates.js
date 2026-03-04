const apiKey = 'AIzaSyClK79MRAgeEAxvlMdsFbPcYacde6zroUI';
const calendarId = 'takawako47@gmail.com';

const datesToCheck = ['2026-03-06', '2026-03-10', '2026-03-17'];

async function checkDate(dateStr) {
    const timeMin = `${dateStr}T00:00:00+09:00`;
    const timeMax = `${dateStr}T23:59:59+09:00`;
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&timeZone=Asia/Tokyo`;

    console.log(`\n--- Checking ${dateStr} ---`);
    const res = await fetch(url);
    const data = await res.json();

    if (data.items) {
        data.items.forEach(item => {
            console.log(`Event: ${item.summary}`);
            console.log(`  Start: ${JSON.stringify(item.start)}`);
            console.log(`  End:   ${JSON.stringify(item.end)}`);
        });
    } else {
        console.log('No events found.');
    }
}

async function run() {
    for (const d of datesToCheck) {
        await checkDate(d);
    }
}

run();
