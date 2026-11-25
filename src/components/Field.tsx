import type { ComponentProps } from "react";

export const inputClass =
  "min-h-12 w-full rounded-control border border-line-strong bg-white px-3.5 text-[15px] text-ink " +
  "placeholder:text-[#64748B] user-invalid:border-[#B91C1C]";

type FieldShell = { id: string; label: string; required?: boolean; className?: string };

function Label({ id, label, required }: FieldShell) {
  return (
    <label htmlFor={id} className="text-sm font-bold text-ink">
      {label}
      {required && (
        <span className="ml-1 text-[13px] font-medium text-muted">(필수)</span>
      )}
    </label>
  );
}

export function TextField({
  id,
  label,
  required,
  className = "",
  ...rest
}: FieldShell & Omit<ComponentProps<"input">, "id" | "className">) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label id={id} label={label} required={required} />
      <input id={id} name={id} required={required} className={inputClass} {...rest} />
    </div>
  );
}

export function SelectField({
  id,
  label,
  options,
  required,
  className = "",
  ...rest
}: FieldShell & { options: readonly string[] } & Omit<ComponentProps<"select">, "id" | "className">) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label id={id} label={label} required={required} />
      <select id={id} name={id} required={required} className={inputClass} {...rest}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
