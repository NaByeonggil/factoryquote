import type { Metadata } from "next";
import { Suspense } from "react";
import { PageTitle } from "@/components/SectionHeading";
import { MyPage } from "./MyPage";

export const metadata: Metadata = { title: "내 설계서 · 견적 비교", robots: { index: false } };

// TODO(API): 로그인 사용자만 접근. 미로그인 시 /login?next=/mypage 로 이동
export default function MyPageRoute() {
  return (
    <div className="bg-ground">
      <main className="container-page flex flex-col gap-8 pt-10 pb-16 sm:pt-14 sm:pb-24">
        <PageTitle
          eyebrow="마이페이지"
          title="내 설계서 · 견적 비교"
          description="설계서 버전을 관리하고, 같은 사양으로 받은 제조사 견적을 나란히 비교하세요."
        />
        <Suspense>
          <MyPage />
        </Suspense>
      </main>
    </div>
  );
}
