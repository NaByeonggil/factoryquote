import type { Metadata } from "next";
import { Download } from "lucide-react";
import { InquiryShare } from "@/components/InquiryShare";
import { StatTile } from "@/components/StatTile";
import { STATS } from "@/config/site";
import { INQUIRIES, INQUIRY_STATUSES } from "@/data/mock";
import { AdminTitle } from "../AdminTitle";

export const metadata: Metadata = { title: "리포트" };

// TODO(API): 월 선택, 원료별 비중, 제조사별 견적 응답률 집계 추가
export default function AdminReportsPage() {
  const byStatus = INQUIRY_STATUSES.map((s) => ({ s, n: INQUIRIES.filter((i) => i.status === s).length }));
  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <AdminTitle title="문의 통계 리포트" description="멤버십 제조사에 보내는 월간 리포트의 원본 데이터입니다." />
        {/* TODO(API): 리포트 PDF 생성 후 멤버십 제조사에 발송 */}
        <a
          href="#report-pdf"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-control border border-line-strong bg-white px-4 text-sm font-bold text-navy no-underline hover:border-navy"
        >
          <Download size={16} aria-hidden /> 리포트 내려받기
        </a>
      </div>

      <section aria-label="요약" className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
        <StatTile value={STATS.monthlyInquiries} label="이번 달 제조 문의" />
        <StatTile value={STATS.monthlyBlueprints} label="설계서 발급" />
        <StatTile value={STATS.partnerCount} label="등록 제조사" />
      </section>

      <div className="flex flex-wrap items-start gap-6">
        <section className="flex min-w-0 flex-[1_1_420px] flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
          <h2 className="m-0 text-base font-extrabold text-navy">제형별 문의 비중</h2>
          <InquiryShare />
        </section>
        <section className="flex min-w-0 flex-[1_1_320px] flex-col gap-4 rounded-card border border-line bg-white p-5 sm:p-6">
          <h2 className="m-0 text-base font-extrabold text-navy">처리 상태</h2>
          <dl className="m-0 flex flex-col">
            {byStatus.map(({ s, n }) => (
              <div key={s} className="flex justify-between border-b border-line py-3 text-[15px] last:border-0">
                <dt className="text-body">{s}</dt>
                <dd className="m-0 font-bold">{n}건</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </>
  );
}
