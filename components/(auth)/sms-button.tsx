import Link from "next/link";

export default function SmsButton() {
  return (
    <Link
      href="/sms"
      className="border-blue-500 border-2 w-3/4 text-center text-blue-500 font-semibold rounded-md p-2"
    >
      간편 SMS 로그인
    </Link>
  );
}
