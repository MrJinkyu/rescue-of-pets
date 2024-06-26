export default function EmptyText({ text }: { text: string }) {
  return (
    <div className="text-center absolute bottom-1/2 left-0 right-0 mx-auto translate-y-1/2 text-neutral-400">
      {text}
    </div>
  );
}
