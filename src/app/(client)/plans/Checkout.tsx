"use client";

import { useState } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { Button } from "@/components/Button";
import { PlanCard } from "@/components/PlanCard";
import { ConsentDetails } from "@/components/ConsentDetails";
import { DEDUCTION_RATE, DEFAULT_PLAN, PLANS, RETENTION, type PlanId } from "@/config/site";

const THIRD_PARTY_CONSENT_ROWS = [
  { term: "제공받는 자", detail: "견적 요청 시 이용자가 선택하거나 조건에 맞춰 추천된 건강기능식품 제조사 (최대 3곳)" },
  { term: "이용 목적", detail: "발주 설계서 기반 견적 산출 및 생산 상담" },
  { term: "제공 항목", detail: "발주 설계서, 이름, 휴대전화 번호, 이메일, 회사명(있는 경우)" },
  { term: "보유 기간", detail: RETENTION.thirdPartyQuote },
  {
    term: "거부 권리",
    detail:
      "동의를 거부할 수 있으며, 거부해도 설계서 구매는 가능합니다. 다만 제조사 비교 견적 서비스는 동의 후에만 진행됩니다.",
  },
];

const SAMPLE_ROWS = [
  ["밀크씨슬 추출물", "[함량]", "건기식 공전", "주원료"],
  ["[부원료]", "[함량]", "[근거]", "[비고]"],
  ["[부원료]", "[함량]", "[근거]", "[비고]"],
];

export function Checkout() {
  const [plan, setPlan] = useState<PlanId>(DEFAULT_PLAN);
  const [consent, setConsent] = useState(false);
  const selected = PLANS[plan];
  const needsConsentNotice = plan === "premium" && PLANS.premium.requiresThirdPartyConsent && !consent;

  function pay() {
    // TODO(API): 결제 모듈(PG) 호출 → 성공 시 주문 생성 { plan, thirdPartyConsent: consent, consentAt }
  }

  return (
    <>
      <fieldset className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6 border-0 p-0">
        <legend className="sr-only">설계서 상품 선택</legend>
        <PlanCard
          groupName="plan"
          value="basic"
          checked={plan === "basic"}
          onSelect={() => setPlan("basic")}
          name={PLANS.basic.name}
          price={PLANS.basic.price}
          meta={PLANS.basic.leadTime}
          features={PLANS.basic.features}
        />
        <PlanCard
          groupName="plan"
          value="premium"
          checked={plan === "premium"}
          onSelect={() => setPlan("premium")}
          name={PLANS.premium.name}
          price={PLANS.premium.price}
          badge={PLANS.premium.badge}
          features={PLANS.premium.features}
        />
      </fieldset>

      <div className="flex flex-wrap items-start gap-6">
        <section
          aria-label="샘플 설계서"
          className="flex min-w-0 flex-[1_1_560px] flex-col gap-5 rounded-card border border-line bg-ground p-5 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="m-0 text-xl font-extrabold text-navy">샘플 설계서 미리보기</h2>
            {/* TODO: 샘플 PDF 파일 경로 연결 */}
            <a href="#sample" className="link text-[15px]">
              PDF 전체 보기
            </a>
          </div>
          <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 shadow-doc sm:p-7">
            <div className="flex flex-wrap justify-between gap-2 border-b-2 border-navy pb-3">
              <p className="m-0 text-base font-extrabold text-navy">발주 설계서 · [제품명]</p>
              <p className="m-0 text-[13px] text-muted">검수 약사 [이름] · v1</p>
            </div>
            <div className="relative overflow-x-auto" tabIndex={0} role="region" aria-label="샘플 원료 표 (가로 스크롤)">
              <table className="w-full min-w-[440px] border-collapse text-sm">
                <thead>
                  <tr className="text-left text-muted">
                    {["원료", "1일 함량", "근거", "비고"].map((h) => (
                      <th key={h} scope="col" className="px-2 py-2.5 font-bold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_ROWS.map((row, i) => (
                    <tr key={i} className="border-t border-line">
                      {row.map((c, j) => (
                        <td key={j} className={`px-2 py-2.5 ${j === 0 ? "font-medium" : ""}`}>
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3">
              {[
                ["제형", "정제"],
                ["권장 MOQ", "[수량]"],
                ["상한 검토", "[결과]"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-lg bg-ground p-3">
                  <dt className="text-xs text-muted">{k}</dt>
                  <dd className="m-0 mt-1 text-[15px] font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <aside
          aria-label="결제"
          className="flex min-w-0 flex-[1_1_340px] flex-col gap-5 rounded-card border border-line p-5 sm:p-8 lg:sticky lg:top-6"
        >
          <h2 className="m-0 text-xl font-extrabold text-navy">주문 요약</h2>
          <dl className="m-0 flex flex-col gap-3 text-[15px]" aria-live="polite">
            <div className="flex justify-between gap-3">
              <dt className="text-muted">선택 상품</dt>
              <dd className="m-0 font-bold">{selected.name}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted">결제 금액</dt>
              <dd className="m-0 font-bold">{selected.price}</dd>
            </div>
          </dl>
          <p className="m-0 rounded-control bg-primary-tint px-4 py-3.5 text-sm leading-relaxed text-primary-deep">
            생산 계약 시 설계비의 {DEDUCTION_RATE}를 생산 대금에서 차감합니다.
          </p>

          <div className="flex flex-col gap-2.5">
            <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-[1.55] text-body">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-describedby={needsConsentNotice ? "consent-notice" : undefined}
                className="mt-px size-5 flex-none accent-primary"
              />
              <span>
                <strong className="font-bold text-ink">[선택]</strong> 견적 요청을 위해 설계서와 연락처를 제조사에
                제공하는 데 동의합니다
              </span>
            </label>
            <ConsentDetails rows={THIRD_PARTY_CONSENT_ROWS} summary="제3자 제공 내용 자세히 보기" />
          </div>

          {needsConsentNotice && (
            <p
              id="consent-notice"
              className="m-0 flex gap-2 rounded-control border border-[#FCD34D] bg-[#FFFBEB] px-3.5 py-3 text-[13px] leading-relaxed text-[#78350F]"
            >
              <Info size={16} className="mt-0.5 flex-none" aria-hidden />
              <span>
                프리미엄의 <strong>제조사 3곳 비교 견적</strong>은 제3자 제공에 동의해야 진행됩니다. 지금 동의하지
                않아도 결제할 수 있으며, 설계서를 받은 뒤 마이페이지에서 동의하고 견적을 요청할 수 있습니다.
              </span>
            </p>
          )}

          <Button className="w-full" onClick={pay}>
            결제하고 설계 시작
          </Button>
          <p className="m-0 text-[13px] leading-relaxed text-muted">
            결제 전{" "}
            <Link href="/legal/refund" className="link font-medium underline">
              환불 정책
            </Link>
            과{" "}
            <Link href="/legal/terms" className="link font-medium underline">
              이용약관
            </Link>
            을 확인해 주세요. 설계서의 기능성 검토는 참고 의견이며, 최종 표시는 품목제조 신고와 사전심의 결과를
            따릅니다.
          </p>
        </aside>
      </div>
    </>
  );
}
