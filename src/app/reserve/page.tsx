import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function ReservePage() {
  return (
    <>
      <Header />
      <main style={{ padding: "40px", textAlign: "center", minHeight: "80vh" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>予約状況（空き時間）</h1>
        <p style={{ marginBottom: "30px" }}>
          このカレンダーは空き時間だけを表示しています。個人情報は一切含まれていません。
        </p>
        <iframe
          src="https://calendar.google.com/calendar/embed?src=takawako47%40gmail.com&ctz=Asia%2FTokyo"
          style={{ border: 0 }}
          width="100%"
          height="600"
          loading="lazy"
          title="予約状況カレンダー"
        ></iframe>
      </main>
      <Footer />
    </>
  );
}