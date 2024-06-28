import LoadingSpinner from "@/components/common/loading-spinner";

export default function MyPageLoading() {
  return (
    <div className="fixed bottom-1/2 translate-y-1/2 left-0 right-0 mx-auto w-full max-w-screen-sm flex justify-center items-center">
      <LoadingSpinner size="md" />
    </div>
  );
}
