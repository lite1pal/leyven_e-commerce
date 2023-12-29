import { Card } from "flowbite-react";
import Link from "next/link";
import { ReactNode } from "react";

const navigation = [
  { name: "Замовлення", href: "/orders" },
  { name: "Управління товарами", href: "/managing" },
];

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="m-4 flex flex-col gap-3 lg:flex-row">
      <Card className="flex h-fit w-3/12 flex-col gap-3">
        <ul>
          {navigation.map((nav, i) => {
            return (
              <Link key={i} href={nav.href}>
                <li className="cursor-pointer border-2 border-blue-600 border-opacity-0 p-2.5 transition hover:border-opacity-100">
                  {nav.name}
                </li>
              </Link>
            );
          })}
        </ul>
      </Card>

      <div className="w-9/12">{children}</div>
    </div>
  );
}
