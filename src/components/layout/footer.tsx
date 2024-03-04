import { BsFacebook, BsInstagram, BsTiktok } from "react-icons/bs";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="rounded-lg bg-white py-10">
      <div className="w-full pl-6 sm:pl-0">
        <div className="grid w-full justify-between sm:flex sm:justify-evenly md:flex md:grid-cols-1">
          <div className="mb-10 flex flex-col max-md:mr-6 max-md:p-4 sm:mb-0 sm:gap-3">
            <Link href="/">
              <div className="py-4 text-2xl font-medium">Leyven</div>
            </Link>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <IconLink
                href="https://www.facebook.com/profile.php?id=61550696317144"
                icon={<BsFacebook />}
              />
              <IconLink
                href="https://www.instagram.com/zoo.leyven?igsh=MWpzZTlhbWZxempqYg=="
                icon={<BsInstagram />}
              />
              <IconLink
                href="https://www.tiktok.com/@zoo.leyven?_t=8j8FrDinT9B&_r=1"
                icon={<BsTiktok />}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <FooterSection title="Про нас">
              <FooterLink href="/about">Про компанію</FooterLink>
              <FooterLink href="/contacts">Контакти</FooterLink>
            </FooterSection>
            <FooterSection title="Підпишись">
              <FooterLink href="https://www.facebook.com/profile.php?id=61550696317144">
                Facebook
              </FooterLink>
              <FooterLink href="https://www.instagram.com/zoo.leyven?igsh=MWpzZTlhbWZxempqYg==">
                Instagram
              </FooterLink>
            </FooterSection>
            <FooterSection title="Legal">
              <FooterLink href="#">Privacy Policy</FooterLink>
              <FooterLink href="#">Terms &amp; Conditions</FooterLink>
            </FooterSection>
          </div>
        </div>
        <div className="w-full pt-16 sm:flex sm:items-center sm:justify-center">
          <Copyright by="LeyVen™" year={2023} />
        </div>
      </div>
    </div>
  );
}

const IconLink = ({ href, icon }: any) => (
  <a href={href} className="text-gray-600 hover:text-gray-800">
    {icon}
  </a>
);

const FooterSection = ({ title, children }: any) => (
  <div className="flex flex-col gap-3">
    <div className="font-semibold text-slate-700">{title}</div>
    <div className="mt-2 flex flex-col space-y-2">{children}</div>
  </div>
);

const FooterLink = ({ href, children }: any) => (
  <Link className="text-gray-600 hover:text-gray-800" href={href}>
    {children}
  </Link>
);

const Copyright = ({ by, year }: any) => (
  <div className="text-gray-600">
    &copy; {year} {by}
  </div>
);
