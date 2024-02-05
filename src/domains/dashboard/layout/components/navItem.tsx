import Link from "next/link";

interface IProps {
  name: string;
  href: string;
}

export default function NavItem({ nav }: any) {
  return (
    <Link href={nav.href}>
      <li className="p-1 transition hover:text-gray-900">{nav.name}</li>
    </Link>
  );
}
