import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getCalendarEvents, getAvailabilitySlots } from "@/lib/calendar";

export const dynamic = 'force-dynamic';

export default async function ReservePage() {
  const events = await getCalendarEvents();

  const now = new Date();
  const jstOffset = 9 * 60 * 60 * 1000;
  const jstDate = new Date(now.getTime() + jstOffset);

  const slots = getAvailabilitySlots(events, jstDate);

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
                  backgroundColor:
                    slot.status === "available"
                      ? "#f0fff4"
                      : slot.status === "holiday"
                        ? "#fffaf0"
                        : "#fff5f5"
                }}
              >
                <span style={{ fontSize: "1.1rem", fontWeight: "600", color: "#444" }}>
                  {slot.time}
                </span>

                <span
                  style={{
                    fontSize: "1rem",
                    fontWeight: "bold",
                    color:
                      slot.status === "available"
                        ? "#2f855a"
                        : slot.status === "holiday"
                          ? "#c05621"
                          : "#c53030"
                  }}
                >
                  {slot.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}