export default function MainLoading() {
  return (
    <div className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8 animate-pulse">
      <div className="mx-auto max-w-2xl text-center">
        <div className="h-12 w-full bg-neutral-300 rounded-xl"></div>
        <div className="h-8 w-full bg-neutral-300 rounded-xl mt-6"></div>
      </div>
    </div>
  );
}
