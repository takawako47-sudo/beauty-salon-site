/**
 * Google Calendar API v3 Events
 */
export interface CalendarEvent {
    id: string;
    summary: string;
    start: {
        dateTime?: string;
        date?: string;
    };
    end: {
        dateTime?: string;
        date?: string;
    };
}

/**
 * Google Calendar APIから本日のイベントを取得する
 */
export async function getCalendarEvents(): Promise<CalendarEvent[]> {
    // 【重要】GitHub Secretsが読み込まれない問題を回避するため、一時的に直書きします
    const apiKey = 'AIzaSyClK79MRAgeEAxvlMdsFbPcYacde6zroUI';
    const calendarId = 'takawako47@gmail.com';

    // 本日から20日分を取得（余裕を持たせる）
    const now = new Date();
    // UTCからJST(+9h)を明示的に作成
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const year = jstNow.getUTCFullYear();
    const month = String(jstNow.getUTCMonth() + 1).padStart(2, '0');
    const date = String(jstNow.getUTCDate()).padStart(2, '0');

    const timeMin = `${year}-${month}-${date}T00:00:00+09:00`;

    const futureDate = new Date(jstNow.getTime() + 20 * 24 * 60 * 60 * 1000);
    const fYear = futureDate.getUTCFullYear();
    const fMonth = String(futureDate.getUTCMonth() + 1).padStart(2, '0');
    const fDate = String(futureDate.getUTCDate()).padStart(2, '0');
    const timeMax = `${fYear}-${fMonth}-${fDate}T23:59:59+09:00`;

    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&timeZone=Asia/Tokyo`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 300 } // 反映を早めるため5分キャッシュ
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Google Calendar API Error:', error);
            return [];
        }

        const data = await response.json();
        return data.items || [];
    } catch (error) {
        console.error('Fetch error:', error);
        return [];
    }
}

/**
 * 予約スロットの型
 */
export interface AvailabilitySlot {
    time: string; // "09:00"
    status: 'holiday' | 'full' | 'available' | 'unrecorded';
    label: string; // "🗓 定休日", "🔴 満席", "🟢 空き", "ー"
}

/**
 * 取得したイベントから30分単位の空き状況スロットを生成する
 */
export function getAvailabilitySlots(events: CalendarEvent[], targetDate: Date): AvailabilitySlot[] {
    const slots: AvailabilitySlot[] = [];

    // 営業時間: 09:00 - 18:30 (30分刻み)
    const startHour = 9;
    const endHour = 18;
    const endMinute = 30;

    // 実行環境（GitHub Actions=UTC / ブラウザ=JST等）に依存しないよう、
    // DateオブジェクトからJSTの年月日文字列を抽出する
    const parts = new Intl.DateTimeFormat('ja-JP', {
        timeZone: 'Asia/Tokyo',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    }).formatToParts(targetDate);

    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const datePrefix = `${year}-${month}-${day}`;

    // 1. 当日の判定範囲（JST 00:00 〜 23:59）
    const dayStart = new Date(`${datePrefix}T00:00:00+09:00`).getTime();
    const dayEnd = new Date(`${datePrefix}T23:59:59+09:00`).getTime();

    const isHoliday = events.some(event => {
        const eStartStr = event.start.dateTime || (event.start.date ? `${event.start.date}T00:00:00+09:00` : null);
        const eEndStr = event.end.dateTime || (event.end.date ? `${event.end.date}T23:59:59+09:00` : null);
        if (!eStartStr || !eEndStr) return false;

        const eventStart = new Date(eStartStr).getTime();
        const eventEnd = new Date(eEndStr).getTime();

        const overlapsWithDay = eventStart < dayEnd && eventEnd > dayStart;
        return overlapsWithDay && event.summary && (event.summary.includes('定休日') || event.summary.includes('店休日'));
    });

    for (let h = startHour; h <= endHour; h++) {
        for (let m of [0, 30]) {
            if (h === endHour && m > endMinute) break;

            const timeLabel = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

            // JST明示的な文字列から比較用のタイムスタンプを作成
            const slotStart = new Date(`${datePrefix}T${timeLabel}:00+09:00`).getTime();
            const slotEnd = slotStart + 30 * 60 * 1000;

            let status: 'holiday' | 'full' | 'available' | 'unrecorded' = 'unrecorded';
            let label = 'ー';

            if (isHoliday) {
                status = 'holiday';
                label = '🗓 定休日';
            } else {
                const overlappingEvents = events.filter(event => {
                    const eStartStr = event.start.dateTime || (event.start.date ? `${event.start.date}T00:00:00+09:00` : null);
                    const eEndStr = event.end.dateTime || (event.end.date ? `${event.end.date}T23:59:59+09:00` : null);
                    if (!eStartStr || !eEndStr) return false;

                    const eventStart = new Date(eStartStr).getTime();
                    const eventEnd = new Date(eEndStr).getTime();

                    return slotStart < eventEnd && eventStart < slotEnd;
                });

                // 優先順位 1: 満席 (Summaryの中に「満席」または「🈵」がある場合)
                if (overlappingEvents.some(e => e.summary && (e.summary.includes('満席') || e.summary.includes('🈵')))) {
                    status = 'full';
                    label = '🔴 満席';
                }
                // 優先順位 2: 空き (Summaryの中に「空き」または「空きあり」がある場合)
                else if (overlappingEvents.some(e => e.summary && (e.summary.includes('空き') || e.summary.includes('空きあり')))) {
                    status = 'available';
                    label = '🟢 空き';
                }
            }

            slots.push({ time: timeLabel, status, label });
        }
    }

    return slots;
}

// v2026-03-04-FINAL
