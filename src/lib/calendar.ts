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
    const apiKey = process.env.GOOGLE_API_KEY;
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (!apiKey || !calendarId) {
        console.error('Environment variables GOOGLE_API_KEY or GOOGLE_CALENDAR_ID are missing.');
        return [];
    }

    // 本日から14日分を取得（JST +09:00 を明記）
    const now = new Date();
    const jstNow = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const year = jstNow.getUTCFullYear();
    const month = String(jstNow.getUTCMonth() + 1).padStart(2, '0');
    const date = String(jstNow.getUTCDate()).padStart(2, '0');

    const timeMin = `${year}-${month}-${date}T00:00:00+09:00`;

    // 14日後を計算
    const futureDate = new Date(jstNow.getTime() + 14 * 24 * 60 * 60 * 1000);
    const fYear = futureDate.getUTCFullYear();
    const fMonth = String(futureDate.getUTCMonth() + 1).padStart(2, '0');
    const fDate = String(futureDate.getUTCDate()).padStart(2, '0');
    const timeMax = `${fYear}-${fMonth}-${fDate}T23:59:59+09:00`;

    // timeZone=Asia/Tokyo を追加
    const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&orderBy=startTime&timeZone=Asia/Tokyo`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 3600 } // 1時間キャッシュ（静的エクスポート時はビルド時のみ）
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
 * 取得したイベントから30分単位の空き状況スロットを生成する（純粋関数）
 */
export function getAvailabilitySlots(events: CalendarEvent[], targetDate: Date): AvailabilitySlot[] {
    const slots: AvailabilitySlot[] = [];

    // 営業時間: 09:00 - 18:30 (30分刻み)
    const startHour = 9;
    const endHour = 18;
    const endMinute = 30;

    // 1. 当日のいずれかのイベントに「定休日」が含まれるか判定
    const isHoliday = events.some(event => event.summary.includes('定休日'));

    for (let h = startHour; h <= endHour; h++) {
        for (let m of [0, 30]) {
            // 18:30 までループを回す
            if (h === endHour && m > endMinute) break;

            const timeLabel = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

            // スロットの開始・終了日時オブジェクトを作成 (判定用)
            const slotStart = new Date(targetDate);
            slotStart.setHours(h, m, 0, 0);
            const slotEnd = new Date(slotStart);
            slotEnd.setMinutes(slotStart.getMinutes() + 30);

            let status: 'holiday' | 'full' | 'available' | 'unrecorded' = 'full';
            let label = '🔴 満席';

            if (isHoliday) {
                status = 'holiday';
                label = '🗓 定休日';
            } else {
                // 2 & 3. 時間が重複しているイベントを抽出
                const overlappingEvents = events.filter(event => {
                    const eStartStr = event.start.dateTime || (event.start.date ? `${event.start.date}T00:00:00+09:00` : null);
                    const eEndStr = event.end.dateTime || (event.end.date ? `${event.end.date}T23:59:59+09:00` : null);

                    if (!eStartStr || !eEndStr) return false;

                    const eStart = new Date(eStartStr);
                    const eEnd = new Date(eEndStr);

                    // 重複判定: s < E_e && E_s < e
                    // Dateオブジェクトの比較で行う
                    return slotStart.getTime() < eEnd.getTime() && eStart.getTime() < slotEnd.getTime();
                });

                // 優先順位 2: 「満席」が含まれるか
                if (overlappingEvents.some(e => e.summary && e.summary.includes('満席'))) {
                    status = 'full';
                    label = '🔴 満席';
                }
                // 優先順位 3: 「空き」または「空きあり」が含まれるか
                else if (overlappingEvents.some(e => e.summary && (e.summary.includes('空き') || e.summary.includes('空きあり')))) {
                    status = 'available';
                    label = '🟢 空き';
                }
                // 優先順位 4: それ以外は「未記入」
                else {
                    status = 'unrecorded';
                    label = 'ー';
                }
            }

            slots.push({ time: timeLabel, status, label });
        }
    }

    return slots;
}
