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

    // 実行環境に依存しないJST年月日を取得
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

    // 当日の判定範囲
    const dayJstStart = new Date(`${datePrefix}T00:00:00+09:00`).getTime();
    const dayJstEnd = new Date(`${datePrefix}T23:59:59+09:00`).getTime();

    // 当日のイベントを抽出
    const dayEvents = events.filter(event => {
        const eStartStr = event.start.dateTime || (event.start.date ? `${event.start.date}T00:00:00+09:00` : null);
        const eEndStr = event.end.dateTime || (event.end.date ? `${event.end.date}T23:59:59+09:00` : null);
        if (!eStartStr || !eEndStr) return false;
        const eStart = new Date(eStartStr).getTime();
        const eEnd = new Date(eEndStr).getTime();
        return eStart < dayJstEnd && eEnd > dayJstStart;
    });

    for (let h = startHour; h <= endHour; h++) {
        for (let m of [0, 30]) {
            if (h === endHour && m > endMinute) break;

            const timeLabel = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
            const slotStart = new Date(`${datePrefix}T${timeLabel}:00+09:00`).getTime();
            const slotEnd = slotStart + 30 * 60 * 1000;

            // このスロットに重なっているイベントを抽出
            const overlappingEvents = dayEvents.filter(event => {
                const eStartStr = event.start.dateTime || (event.start.date ? `${event.start.date}T00:00:00+09:00` : null);
                const eEndStr = event.end.dateTime || (event.end.date ? `${event.end.date}T23:59:59+09:00` : null);
                const eStart = new Date(eStartStr!).getTime();
                const eEnd = new Date(eEndStr!).getTime();

                // 厳密な判定: 予定の開始・終了時刻と、30分枠が「完全に一致」または「枠が予定に含まれる」場合のみ抽出
                return eStart <= slotStart && slotEnd <= eEnd;
            });

            // キーワード判定
            const summaries = overlappingEvents.map(e => e.summary || "");
            const hasAvailable = summaries.some(s => s.includes("空き") || s.includes("あり") || s.includes("○"));
            const hasFull = summaries.some(s => s.includes("満席") || s.includes("🈵") || s.includes("×"));
            const hasClosed = summaries.some(s => s.includes("定休日") || s.includes("店休"));

            let status: 'holiday' | 'full' | 'available' | 'unrecorded' = 'unrecorded';
            let label = 'ー';

            // 優先順位 1: 「空き」があれば最優先
            if (hasAvailable) {
                status = 'available';
                label = '🟢 空き';
            }
            // 優先順位 2: 「満席」があれば赤色
            else if (hasFull) {
                status = 'full';
                label = '🔴 満席';
            }
            // 優先順位 3: 「定休日」があれば定休日
            else if (hasClosed) {
                status = 'holiday';
                label = '🗓 定休日';
            }

            slots.push({ time: timeLabel, status, label });
        }
    }

    return slots;
}

// v2026-03-05-KEYWORD_PRIORITY

// v2026-03-04-FINAL
