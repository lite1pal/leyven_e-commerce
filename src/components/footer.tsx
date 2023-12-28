import { wait } from "@/libs/utils";
import { Footer } from "flowbite-react";
import Link from "next/link";
import {
  BsFacebook,
  BsInstagram,
  BsTelegram,
  BsWhatsapp,
} from "react-icons/bs";

export default async function FooterComponent() {
  return (
    <Footer
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      }}
      container
    >
      <div className="w-full">
        <div className="grid w-full justify-between sm:flex sm:justify-between md:flex md:grid-cols-1">
          <div className="max-md:mr-6 max-md:p-4">
            <Link href="/">
              <Footer.Brand
                href="/"
                src="https://images.prom.ua/4809555867_w100_h50_leyven.jpg"
                alt="Flowbite Logo"
                name="LeyVen"
              />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <Footer.Title title="Про нас" />
              <Footer.LinkGroup col>
                <Link href="/about">Про компанію</Link>
                <Link href="/contacts">Контакти</Link>
                {/* <Footer.Link href="/about">Про компанію</Footer.Link>
                <Footer.Link href="/contacts">Контакти</Footer.Link> */}
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="Підпишись" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Facebook</Footer.Link>
                <Footer.Link href="#">Instagram</Footer.Link>
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
        <Footer.Divider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <Footer.Copyright by="LeyVen™" year={2023} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTelegram} />
            <Footer.Icon href="#" icon={BsWhatsapp} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
