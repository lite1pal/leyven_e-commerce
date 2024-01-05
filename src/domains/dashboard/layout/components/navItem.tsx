import Link from "next/link";

interface IProps {
  name: string;
  href: string;
}

export default function NavItem({ nav }: any) {
  return (
    <Link href={nav.href}>
      <li className="cursor-pointer p-1 transition hover:text-white">
        {nav.name}
      </li>
    </Link>
  );
}
