import type { Metadata } from "next";
import { ButtonLink } from "@/components/Button";
import { StatTile } from "@/components/StatTile";
import { SectionHeading } from "@/components/SectionHeading";
import { InquiryShare } from "@/components/InquiryShare";
import { PARTNER_PRODUCTS, PARTNER_REPLY_DAYS, STATS } from "@/config/site";
import { PartnerInquiryForm } from "./PartnerInquiryForm";

export const metadata: Metadata = { title: "제조사 입점 안내" };

const PRODUCTS = [
  {
    title: "견적 요청 멤버십",
    price: PARTNER_PRODUCTS.membershipPrice,
    body: "설비 조건에 맞는 설계서 기반 견적 요청 수신, 상세 프로필, 월간 문의 리포트",
    featured: true,
  },
  {
    title: "제조사 인터뷰 기사",
    price: PARTNER_PRODUCTS.interviewPrice,
    body: "설비·강점·생산 사례를 취재해 상세 페이지와 가이드에 게재",
  },
  {
    title: "비교 콘텐츠 소개",
    price: PARTNER_PRODUCTS.comparisonPrice,
    body: "“소량 MOQ 젤리 제조사” 같은 제형별 비교 글에 소개",
  },
  { title: "배너", price: "별도 문의", body: "제조사 찾기 · 가이드 페이지 노출" },
];

export default function PartnersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-navy">
        <div className="container-page flex flex-wrap items-center gap-12 py-16 sm:py-[88px]">
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[22px]">
            <p className="m-0 text-sm font-bold text-on-dark-accent">건강기능식품 제조사 입점 안내</p>
            <h1 className="m-0 text-[32px] leading-[1.28] font-extrabold tracking-[-0.02em] text-white sm:text-[44px]">
              사양이 정리된 견적 요청만
              <br className="hidden sm:inline" /> 받아보세요
            </h1>
            <p className="m-0 text-base leading-[1.7] text-on-dark-muted sm:text-[17px]">
              약사가 검수한 설계서에 원료·함량·제형·수량이 정해진 상태로 도착합니다. 등록과 거래 성사 수수료는
              없습니다.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="#apply" variant="light">
                입점 문의하기
              </ButtonLink>
            </div>
          </div>
          <div className="grid min-w-0 flex-[1_1_380px] grid-cols-2 gap-3 sm:gap-4">
            <StatTile tone="dark" value={STATS.monthlyInquiries} label="월 제조 문의" />
            <StatTile tone="dark" value={STATS.monthlyBlueprints} label="월 설계서 발급" />
            <StatTile tone="dark" value={STATS.successFee} label="성사 수수료" />
            <StatTile tone="dark" value={STATS.partnerCount} label="등록 제조사" />
          </div>
        </div>
      </section>

      {/* 문의 데이터 */}
      <section aria-label="문의 데이터">
        <div className="container-page flex flex-wrap items-start gap-12 py-16 sm:py-[88px]">
          <SectionHeading
            eyebrow="문의 데이터"
            title={
              <>
                어떤 제품 문의가
                <br className="hidden sm:inline" /> 들어오는지 공개합니다
              </>
            }
            description="멤버십 제조사에는 월간 제형별·원료별 문의 리포트를 드립니다."
            className="min-w-0 flex-[1_1_360px]"
          />
          <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-[18px] rounded-card border border-line p-5 sm:p-8">
            <h3 className="m-0 text-base font-bold">제형별 문의 비중</h3>
            <InquiryShare />
          </div>
        </div>
      </section>

      {/* 입점 상품 */}
      <section id="products" className="scroll-mt-4 bg-ground">
        <div className="container-page flex flex-col gap-10 py-16 sm:py-[88px]">
          <SectionHeading eyebrow="입점 상품" title="필요한 만큼만 선택하세요" />
          <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-5 p-0">
            {PRODUCTS.map((p) => (
              <li
                key={p.title}
                className={
                  "flex flex-col gap-3 rounded-card bg-white p-6 sm:p-7 " +
                  (p.featured ? "border-2 border-primary" : "border border-line")
                }
              >
                {p.featured && (
                  <span className="self-start rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white">
                    핵심
                  </span>
                )}
                <h3 className="m-0 text-[19px] font-extrabold text-navy">{p.title}</h3>
                <p className="m-0 text-2xl font-extrabold">{p.price}</p>
                <p className="m-0 text-[15px] leading-[1.65] text-muted">{p.body}</p>
              </li>
            ))}
          </ul>
          <p className="m-0 text-sm text-muted">
            유료 노출 콘텐츠에는 모두 &lsquo;광고&rsquo;가 표기되며, 일반 제조사 목록과 구분해 보여드립니다.
          </p>
        </div>
      </section>

      {/* 입점 문의 */}
      <section id="apply" className="scroll-mt-4">
        <div className="container-page flex flex-wrap items-start gap-12 py-16 sm:py-[88px]">
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-3">
            <h2 className="m-0 text-[26px] leading-[1.3] font-extrabold text-navy sm:text-[32px]">입점 문의</h2>
            <p className="m-0 text-base leading-[1.7] text-muted">
              담당자가 영업일 기준 {PARTNER_REPLY_DAYS}일 안에 연락드립니다.
            </p>
          </div>
          <PartnerInquiryForm />
        </div>
      </section>
    </main>
  );
}
