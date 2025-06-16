import React from "react";
import LocaleSwitcher from "./LocaleSwitch";
import { ModeToggle } from "./ModeToggle";
import Image from "next/image";

const Header = () => {
  return (
    <header className="w-full absolute top-0 p-4">
      <nav className="flex w-full justify-between">
        <Image src={"/logo.png"} priority alt="Logo" width={80} height={80} />
        <div className="flex gap-4">
          <ModeToggle />
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
};

export default Header;
