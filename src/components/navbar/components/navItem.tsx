import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NavItem({
  link,
  title,
}: {
  link: string;
  title: string;
}) {
  return (
    <Link href={link}>
      <li className="text-sm sm:text-base min-w-5 duration-400 border-b-2 border-b-blue-600 border-opacity-0 hover:text-blue-600 hover:border-opacity-100 transition cursor-default">
        {title}
      </li>
    </Link>
  );
}
