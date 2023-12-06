import Link from "next/link";

export default function NavItem({
  link,
  title,
}: {
  link: string;
  title: string;
}) {
  return (
    <Link href={link}>
      <li className="border-b-black w-16 text-sm sm:text-base min-w-5 duration-400 border-b-2 border-opacity-0 hover:border-opacity-100 transition cursor-default">
        {title}
      </li>
    </Link>
  );
}
