import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import ReservationSystem from "./ReservationSystem";

export default function ReservePage() {
  return (
    <>
      <Header />
      <main style={{ padding: "40px 20px", textAlign: "center", minHeight: "80vh", backgroundColor: "#f9f9f9" }}>
        <ReservationSystem />
      </main>
      <Footer />
    </>
  );
}