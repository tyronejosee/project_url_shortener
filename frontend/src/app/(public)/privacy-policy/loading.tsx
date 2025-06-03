export default function PrivacyPolicyLoading() {
  return (
    <main className="flex-1max-w-screen-lg mx-auto p-6 animate-pulse">
      <section className="mx-auto p-8 rounded-lg border border-neutral-300 space-y-6">
        <div className="h-10 w-1/3 bg-neutral-300 rounded-xl mx-auto"></div>
        <div className="h-4 w-2/3 bg-neutral-200 rounded-lg mx-auto mb-4"></div>

        <div className="space-y-6">
          {[...Array(7)].map((_, i) => (
            <div key={i}>
              <div className="h-6 w-1/4 bg-neutral-300 rounded-lg mb-2"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-neutral-200 rounded-lg"></div>
                <div className="h-3 w-5/6 bg-neutral-200 rounded-lg"></div>
                <div className="h-3 w-2/3 bg-neutral-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-4 w-2/3 bg-neutral-200 rounded-lg mx-auto mt-12"></div>
        <div className="h-3 w-1/3 bg-neutral-200 rounded-lg mx-auto"></div>
      </section>
    </main>
  );
}
