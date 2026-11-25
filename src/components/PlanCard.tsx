import { Check } from "lucide-react";

type PlanCardProps = {
  name: string;
  groupName: string;
  value: string;
  checked: boolean;
  onSelect: (value: string) => void;
  price: string;
  meta?: string;
  badge?: string;
  features: readonly string[];
};

/**
 * 선택형 상품 카드 — 라디오 버튼 + label 구조.
 * 화살표 키로 카드 사이를 이동할 수 있고, 스크린리더에는 "라디오 버튼, n개 중 1"로 읽힙니다.
 */
export function PlanCard({ name, groupName, value, checked, onSelect, price, meta, badge, features }: PlanCardProps) {
  const id = `${groupName}-${value}`;
  return (
    <label
      htmlFor={id}
      className={
        "relative flex cursor-pointer flex-col gap-[18px] rounded-card bg-white p-6 text-ink transition-shadow sm:p-8 " +
        "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-primary " +
        (checked ? "border-2 border-primary shadow-plan" : "border border-line hover:border-line-strong")
      }
    >
      <input
        type="radio"
        id={id}
        name={groupName}
        value={value}
        checked={checked}
        onChange={() => onSelect(value)}
        aria-labelledby={`${id}-name ${id}-price`}
        aria-describedby={`${id}-features`}
        className="sr-only"
      />
      <span className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2.5">
          <span
            aria-hidden
            className={
              "inline-flex size-5 items-center justify-center rounded-full border-2 " +
              (checked ? "border-primary" : "border-line-strong")
            }
          >
            {checked && <span className="size-2.5 rounded-full bg-primary" />}
          </span>
          <span id={`${id}-name`} className="text-xl font-extrabold text-navy">{name}</span>
        </span>
        {badge ? (
          <span className="rounded-full bg-navy px-2.5 py-1 text-[13px] font-bold text-white">{badge}</span>
        ) : (
          meta && <span className="text-[13px] text-muted">{meta}</span>
        )}
      </span>
      <span id={`${id}-price`} className="text-[28px] font-extrabold text-ink sm:text-[32px]">
        {price}
        <span className="text-[15px] font-medium text-muted"> / 1제품</span>
      </span>
      <span id={`${id}-features`} className="flex flex-col gap-2.5 border-t border-line pt-[18px]">
        {features.map((f) => (
          <span key={f} className="flex items-start gap-2.5 text-[15px] leading-[1.55] text-body">
            <Check size={18} strokeWidth={2.5} className="mt-[3px] flex-none text-primary" aria-hidden />
            {f}
          </span>
        ))}
      </span>
    </label>
  );
}
