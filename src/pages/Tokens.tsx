export default function Tokens() {
  return (
    <div className="space-y-12 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Design Tokens</h1>
        <p className="text-muted-foreground">
          Semantic color variables, typography scales, and structural tokens used across the UI
          Factory.
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-6">Colors</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {[
            { name: 'background', var: '--background', class: 'bg-background', border: true },
            {
              name: 'foreground',
              var: '--foreground',
              class: 'bg-foreground text-background',
              border: false,
            },
            {
              name: 'primary',
              var: '--primary',
              class: 'bg-primary text-primary-foreground',
              border: false,
            },
            {
              name: 'secondary',
              var: '--secondary',
              class: 'bg-secondary text-secondary-foreground',
              border: true,
            },
            {
              name: 'muted',
              var: '--muted',
              class: 'bg-muted text-muted-foreground',
              border: true,
            },
            {
              name: 'accent',
              var: '--accent',
              class: 'bg-accent text-accent-foreground',
              border: true,
            },
            {
              name: 'destructive',
              var: '--destructive',
              class: 'bg-destructive text-destructive-foreground',
              border: false,
            },
            { name: 'border', var: '--border', class: 'bg-border text-foreground', border: false },
          ].map((token) => (
            <div key={token.name} className="flex flex-col gap-2">
              <div
                className={`h-24 rounded-lg w-full ${token.class} ${token.border ? 'border shadow-sm' : 'shadow-md'} flex items-center justify-center text-xs font-medium`}
              >
                Aa
              </div>
              <div>
                <div className="text-sm font-medium capitalize">{token.name}</div>
                <div className="text-xs text-muted-foreground font-mono">var({token.var})</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-6">Typography</h2>
        <div className="space-y-8 rounded-lg border bg-card p-8">
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
            <span className="text-muted-foreground font-mono text-xs w-24 shrink-0">
              text-4xl
              <br />
              font-bold
            </span>
            <h1 className="text-4xl font-bold tracking-tight">Heading 1</h1>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
            <span className="text-muted-foreground font-mono text-xs w-24 shrink-0">
              text-3xl
              <br />
              font-semibold
            </span>
            <h2 className="text-3xl font-semibold tracking-tight">Heading 2</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
            <span className="text-muted-foreground font-mono text-xs w-24 shrink-0">
              text-xl
              <br />
              font-medium
            </span>
            <h3 className="text-xl font-medium tracking-tight">Heading 3</h3>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-12">
            <span className="text-muted-foreground font-mono text-xs w-24 shrink-0 mt-1">
              text-base
              <br />
              leading-7
            </span>
            <p className="text-base leading-7 max-w-[600px]">
              Body regular. The quick brown fox jumps over the lazy dog. This text is meant to show
              standard paragraph styling and line-height.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
            <span className="text-muted-foreground font-mono text-xs w-24 shrink-0">
              text-sm
              <br />
              text-muted
            </span>
            <p className="text-sm text-muted-foreground">
              Small helper text. Often used for descriptions or captions.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-12">
            <span className="text-muted-foreground font-mono text-xs w-24 shrink-0">
              font-mono
              <br />
              text-sm
            </span>
            <code className="text-sm font-mono bg-muted px-1.5 py-0.5 rounded">
              const technical = "developer_aesthetic";
            </code>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold border-b pb-2 mb-6">Radius & Shadows</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <div className="h-24 bg-card border rounded-none flex items-center justify-center text-xs font-mono text-muted-foreground">
              rounded-none
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-card border rounded-sm flex items-center justify-center text-xs font-mono text-muted-foreground shadow-sm">
              rounded-sm + shadow-sm
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-card border rounded-md flex items-center justify-center text-xs font-mono text-muted-foreground shadow">
              rounded-md + shadow
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-24 bg-card border rounded-lg flex items-center justify-center text-xs font-mono text-muted-foreground shadow-md">
              rounded-lg + shadow-md
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
