export default function HomeLoading() {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        return (
          <div
            key={index}
            className="w-full h-40 px-5 flex items-center animate-pulse"
          >
            <div className="relative size-32 bg-neutral-400 rounded-md"></div>
            <div className="flex flex-col px-2 gap-1">
              <div className="flex items-center gap-2">
                <div className="p-1 w-8 h-5 rounded-md bg-neutral-400" />
                <div className="p-1 w-6 h-5 rounded-md bg-neutral-400" />
              </div>
              <div className="w-24 h-5 bg-neutral-400 rounded-md" />
              <div className="w-24 h-5 bg-neutral-400 rounded-md" />
              <div className="w-24 h-5 bg-neutral-400 rounded-md" />
              <div className="w-24 h-5 bg-neutral-400 rounded-md" />
            </div>
          </div>
        );
      })}
    </>
  );
}
