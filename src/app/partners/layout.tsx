import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

/** 제조사용 화면 레이아웃 ("제조사용" 배지 + 제조사 전용 메뉴) */
export default function PartnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header variant="partner" />
      {children}
      <Footer />
    </>
  );
}
