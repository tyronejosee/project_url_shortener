export default function LoginLoading() {
  return (
    <div className="mx-auto animate-pulse p-4">
      <div className="max-w-lg mx-auto p-6 space-y-6">
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-neutral-300 rounded-xl mx-auto"></div>
          <div className="h-4 w-2/3 bg-neutral-300 rounded-xl mx-auto mb-12"></div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="h-4 w-1/4 bg-neutral-300 rounded-xl"></div>
            <div className="h-10 w-full bg-neutral-300 rounded-xl"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-1/4 bg-neutral-300 rounded-xl"></div>
            <div className="h-10 w-full bg-neutral-300 rounded-xl"></div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="h-4 w-1/3 bg-neutral-300 rounded-xl"></div>
          <div className="h-12 w-full bg-neutral-300 rounded-xl"></div>
        </div>

        <div className="space-y-8">
          <div className="h-4 w-1/2 bg-neutral-300 rounded-xl mx-auto"></div>
          <div className="h-4 w-1/2 bg-neutral-300 rounded-xl mx-auto"></div>
        </div>

        <div className="space-y-2">
          <div className="h-12 w-full bg-neutral-300 rounded-xl"></div>
          <div className="h-12 w-full bg-neutral-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
}
