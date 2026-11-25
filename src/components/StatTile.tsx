type StatTileProps = {
  value: string;
  label: string;
  /** dark: 네이비 배경 위 반투명 타일 */
  tone?: "light" | "dark";
};

export function StatTile({ value, label, tone = "light" }: StatTileProps) {
  if (tone === "dark") {
    return (
      <div className="rounded-[14px] border border-white/15 bg-white/5 p-5 sm:p-6">
        <p className="m-0 text-[26px] font-extrabold text-white sm:text-[30px]">{value}</p>
        <p className="mt-1.5 mb-0 text-sm text-on-dark-muted">{label}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-1">
      <p className="m-0 text-[28px] font-extrabold text-navy sm:text-[32px]">{value}</p>
      <p className="m-0 text-[15px] text-muted">{label}</p>
    </div>
  );
}
