import { Container } from "@/components/ui/container";

/** Skeleton shaped like the page bands, so the layout does not jump. */
export default function Loading() {
  return (
    <div data-theme="dark" className="bg-surface pt-[calc(var(--header-h)+4rem)]" aria-busy>
      <span className="sr-only">Loading</span>
      <Container>
        <div className="h-3 w-32 animate-pulse bg-surface-3" />
        <div className="mt-8 space-y-4">
          <div className="h-14 w-full max-w-3xl animate-pulse bg-surface-3" />
          <div className="h-14 w-full max-w-xl animate-pulse bg-surface-3" />
        </div>
        <div className="mt-8 h-5 w-full max-w-2xl animate-pulse bg-surface-2" />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="aspect-[16/11] animate-pulse bg-surface-2" />
          ))}
        </div>
      </Container>
    </div>
  );
}
