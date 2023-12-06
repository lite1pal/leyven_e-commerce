import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavItem({
  link,
  title,
}: {
  link: string;
  title: string;
}) {
  const router = useRouter();
  return (
    <Link href={link}>
      <li
        onClick={() => router.push(link)}
        className="border-b-black w-16 text-sm sm:text-base min-w-5 duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default"
      >
        {title}
      </li>
    </Link>
  );
}
