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
      <li className="min-w-5 duration-400 cursor-default border-b-2 border-b-blue-600 border-opacity-0 transition hover:border-opacity-100 hover:text-blue-600">
        {title}
      </li>
    </Link>
  );
}
