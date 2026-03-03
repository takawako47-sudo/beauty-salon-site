import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getCalendarEvents, getAvailabilitySlots } from "@/lib/calendar";

// 静的エクスポート時はビルド時にのみ実行される（GitHub Actionsで定期更新）
export default async function ReservePage() {
  // 1. サーバー側でイベントを取得
  const events = await getCalendarEvents();

  // 2. 「本日」の日付を JST（日本時間）基準で取得
  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(now.getTime() + jstOffset);

  // 判定ロジックに渡す
  const slots = getAvailabilitySlots(events, jstDate);

  // 日付表示用のフォーマット (YYYY年MM月DD日)
  const year = jstDate.getUTCFullYear();
  const month = jstDate.getUTCMonth() + 1;
  const day = jstDate.getUTCDate();
  const dateString = `${year}年${month}月${day}日`;

  return (
    <>
      <Header />
      <main style={{ padding: "40px 20px", textAlign: "center", minHeight: "80vh", backgroundColor: "#f9f9f9" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", backgroundColor: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h1 style={{ fontSize: "1.8rem", marginBottom: "10px", color: "#333" }}>予約状況（空き状況）</h1>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "20px", color: "#d4a373" }}>
            {dateString}
          </p>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "30px" }}>
            ※本日の空き状況のみを表示しています。<br />
            最新の情報をご確認ください。
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {slots.map((slot) => (
              <div
                key={slot.time}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 20px",
                  borderRadius: "8px",
                  border: "1px solid #eee",
                  backgroundColor: slot.status === 'available' ? "#f0fff4" : (slot.status === 'holiday' ? "#fffaf0" : "#fff5f5")
                }}
              >
                <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#444" }}>{slot.time}</span>
                <span style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  color: slot.status === 'available' ? "#2f855a" : (slot.status === 'holiday' ? "#c05621" : "#c53030")
                }}>
                  {slot.label}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "40px", borderTop: "1px solid #eee", paddingTop: "20px" }}>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              ご予約・お問合せはお電話にて承っております。
            </p>
            <a
              href="tel:080-4474-5569"
              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "12px 25px",
                backgroundColor: "#d4a373",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "30px",
                fontWeight: "bold"
              }}
            >
              080-4474-5569 に電話する
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}