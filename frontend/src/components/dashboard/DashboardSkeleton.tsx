export default function DashboardSkeleton() {
  return (
    <div className="flex h-screen animate-pulse">
      <div className="w-64 p-5">
        <div className="mt-28 space-y-2">
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
          <div className="w-full h-10 rounded-xl bg-neutral-300"></div>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div className="w-full flex items-center justify-between p-4">
          <div className="w-36 h-7 bg-neutral-300 rounded-xl ml-8"></div>
          <div className="w-44 h-12 bg-neutral-300 rounded-xl"></div>
        </div>
        <div className="p-6 space-y-6">
          <div className="w-full flex justify-center">
            <div className="w-96 h-10 rounded-xl bg-neutral-300"></div>
          </div>
          <div className="h-[449.6px] rounded-xl bg-neutral-300"></div>
          <div className="grid grid-cols-3 gap-6">
            <div className="h-20 rounded-xl bg-neutral-300"></div>
            <div className="h-20 rounded-xl bg-neutral-300"></div>
            <div className="h-20 rounded-xl bg-neutral-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
