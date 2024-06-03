export default function LoginPrompt() {
  return (
    <section className="w-full max-w-screen-sm h-full z-30 fixed top-0 left-0 right-0 mx-auto bg-neutral-950/50">
      <article className="fixed bottom-0 flex flex-col items-center w-full max-w-screen-sm h-[200px] bg-white text-black animate-fadeInUp">
        <header className="w-full text-center p-2 text-neutral-500 border-neutral-400 border-b">
          휴대폰 번호로 로그인 후 사용할 수 있습니다.
        </header>
        <form className="flex items-center gap-6 w-full p-8 border-neutral-400 border-b">
          <input
            type="text"
            placeholder="휴대폰 번호 입력('-'제외)"
            className="text-lg py-2 px-4 ring-2 ring-neutral-400 border-none outline-none focus:ring-blue-600 flex-1 rounded-sm"
          />
          <button className="text-lg font-semibold border-blue-500 border-2 rounded-md p-2 text-blue-600">
            인증요청
          </button>
        </form>
        <div className="text-neutral-500 font-semibold text-lg flex flex-1 items-center">
          취소
        </div>
      </article>
    </section>
  );
}
