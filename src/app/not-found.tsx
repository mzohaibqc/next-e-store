import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex-1 w-full flex justify-center items-center">
      <div>
        <Image src="/not-found.png" alt="404" width={400} height={400} />
        <p className="text-2xl">Sorry! This page does not exists.</p>
        <Link href="/" className="text-2xl text-blue-800 hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
