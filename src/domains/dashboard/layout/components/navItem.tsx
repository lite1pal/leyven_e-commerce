import Link from "next/link";

export default function NavItem({ nav }: any) {
  return (
    <Link prefetch={false} href={nav.href}>
      <li className="p-1 transition hover:text-slate-700">{nav.name}</li>
    </Link>
  );
}
