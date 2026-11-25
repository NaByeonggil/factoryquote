export function AdminTitle({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <h1 className="m-0 text-2xl font-extrabold text-navy sm:text-[28px]">{title}</h1>
      <p className="m-0 text-[15px] text-muted">{description}</p>
    </div>
  );
}
