export default function ReportLoading() {
  return (
    <div className="grid grid-cols-2">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="w-full p-5 flex flex-col animate-pulse">
          <div className="relative aspect-square rounded-md bg-neutral-400 "></div>
          <div className="flex items-center gap-2 py-2">
            <span className="w-8 h-4 rounded-sm bg-neutral-400" />
            <div className="w-3/4 h-4 bg-neutral-400 rounded-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-3/4 h-3 pb-2 bg-neutral-400 rounded-sm" />
            <div className="w-3/4 h-3 bg-neutral-400 rounded-sm" />
            <div className="w-3/4 h-3 bg-neutral-400 rounded-sm" />
          </div>
        </div>
      ))}
    </div>
  );
}
