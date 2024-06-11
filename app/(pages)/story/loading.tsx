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
            <main className="px-4 pb-3">
              <h3 className="mb-3 w-1/3 h-5 bg-neutral-400 rounded-sm"></h3>
              <div className="w-2/3 h-4 bg-neutral-400 rounded-sm" />
              <div className="flex items-center">
                <div className="size-28 rounded-sm bg-neutral-400 my-3" />
              </div>
              <div className="flex items-center gap-2">
                <span className="w-10 h-5 rounded-sm bg-neutral-400" />
                <span className="w-10 h-5 rounded-sm bg-neutral-400" />
                <span className="w-10 h-5 rounded-sm bg-neutral-400" />
              </div>
            </main>
          </div>
        );
      })}
    </>
  );
}
