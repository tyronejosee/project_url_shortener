export default function PricesLoading() {
  return (
    <div className="max-w-screen-lg mx-auto animate-pulse p-4 space-y-6">
      <div className="space-y-4 py-4">
        <div className="h-10 w-1/4 bg-neutral-300 rounded-xl mx-auto"></div>
        <div className="h-3 w-2/4 bg-neutral-300 rounded-xl mx-auto mb-12"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="h-[550px] w-full bg-neutral-300 rounded-xl"></div>
        <div className="h-[550px] w-full bg-neutral-300 rounded-xl"></div>
        <div className="h-[550px] w-full bg-neutral-300 rounded-xl"></div>
      </div>
    </div>
  );
}
