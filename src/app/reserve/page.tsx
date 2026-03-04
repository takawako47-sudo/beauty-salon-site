import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { getCalendarEvents } from "@/lib/calendar";
import ReservationSystem from "./ReservationSystem";

// 静的エクスポート時はビルド時にのみ実行される（GitHub Actionsで定期更新）
export default async function ReservePage() {
  // サーバー側（ビルド時）にイベントを取得
  const events = await getCalendarEvents();

  return (
    <>
      <Header />
      <main style={{ padding: "40px 20px", textAlign: "center", minHeight: "80vh", backgroundColor: "#f9f9f9" }}>
        {/* クライアントコンポーネントにデータを渡す */}
        <ReservationSystem initialEvents={events} />
      </main>
      <Footer />
    </>
  );
}