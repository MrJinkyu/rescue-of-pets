export default function TopBar() {
  return (
    <div className="fixed top-0 w-full max-w-screen-sm mx-auto flex items-center gap-4  px-5 py-3 z-20 border-neutral-200 border-b bg-white">
      <h1 className="font-semibold text-xl text-mainColor">meetAgain</h1>
      <p className="text-xs text-neutral-400 animate-pulse">
        소중한 친구가 여러분을 기다립니다.
      </p>
    </div>
  );
}
