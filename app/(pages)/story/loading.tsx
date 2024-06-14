export default function StoryLoading() {
  return (
    <>
      {[...Array(5)].map((_, index) => {
        return (
          <div
            key={index}
            className="w-full h-72 flex flex-col justify-center animate-pulse"
          >
            <div className="w-full px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="bg-neutral-400 rounded-full flex justify-center items-end size-8" />
                <span className="bg-neutral-400 rounded-md w-8 h-4" />
              </div>
              <div className="bg-neutral-400 rounded-md w-8 h-4" />
            </div>
            <main className="w-full px-4 pb-3">
              <div className="w-full flex justify-between pb-2 gap-2">
                <div className="flex flex-col w-full">
                  <h3 className="bg-neutral-400 w-2/3 h-5 mb-2 rounded-sm" />
                  <div className="bg-neutral-400 w-11/12 h-10 rounded-sm" />
                </div>
                <div className="flex-shrink-0 size-28 bg-neutral-400 rounded-sm" />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 size-6 bg-neutral-400 rounded-sm"></div>
                <div className="flex items-center gap-1 size-6 bg-neutral-400 rounded-sm" />
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
}
