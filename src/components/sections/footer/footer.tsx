import { Footer } from "flowbite-react";
import Link from "next/link";
import {
  BsFacebook,
  BsInstagram,
  BsTiktok,
  BsTelegram,
  BsWhatsapp,
} from "react-icons/bs";

export default async function FooterComponent() {
  return (
    <div
      className="bg-slate-50 py-10"
      // style={{
      //   boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      // }}
      // container
    >
      <div className="w-full pl-6 sm:pl-0">
        <div className="grid w-full justify-between sm:flex sm:justify-evenly md:flex md:grid-cols-1">
          <div className="mb-10 flex flex-col max-md:mr-6 max-md:p-4 sm:mb-0 sm:gap-3">
            <Link href="/">
              <div className="py-4 text-2xl font-medium">LeyVen</div>
            </Link>
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon
                href="https://www.facebook.com/profile.php?id=61550696317144"
                icon={BsFacebook}
              />
              <Footer.Icon
                href="https://www.instagram.com/zoo.leyven?igsh=MWpzZTlhbWZxempqYg=="
                icon={BsInstagram}
              />
              <Footer.Icon
                href="https://www.tiktok.com/@zoo.leyven?_t=8j8FrDinT9B&_r=1"
                icon={BsTiktok}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Про нас" />
              <Footer.LinkGroup col>
                <Link href="/about">Про компанію</Link>
                <Link href="/contacts">Контакти</Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Підпишись" />
              <Footer.LinkGroup col>
                <Footer.Link href="https://www.facebook.com/profile.php?id=61550696317144">
                  Facebook
                </Footer.Link>
                <Footer.Link href="https://www.instagram.com/zoo.leyven?igsh=MWpzZTlhbWZxempqYg==">
                  Instagram
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Legal" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms &amp; Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <div className="w-full pt-16 sm:flex sm:items-center sm:justify-center">
          <Footer.Copyright by="LeyVen™" year={2023} />
        </div>
      </div>
    </div>
  );
}
