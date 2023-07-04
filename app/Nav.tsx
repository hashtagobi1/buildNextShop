import Link from "next/link";
import React from "react";

type Props = {};

const Nav = (props: Props) => {
  return (
    <header className="border-b sticky top-0 bg-white z-20">
      <div className="flex items-center justify-between max-w-6xl pt-4 pb-2 px-4 mx-auto lg:max-w-screen-xl">
        <Link
          href={"/"}
          passHref
          className="cursor-pointer text-lg pt-2 pb-2 font-bold"
        >
          <span>Jewels &rsquo;R Us</span>
        </Link>

        <Link
          passHref
          href={"/"}
          className="cursor-pointer text-lg pt-2 pb-2 font-bold"
        >
          <span>Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Nav;
