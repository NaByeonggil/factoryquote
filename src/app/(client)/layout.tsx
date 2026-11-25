import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** 의뢰자용 화면 공통 레이아웃 */
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header variant="client" />
      {children}
      <Footer />
    </>
  );
}
