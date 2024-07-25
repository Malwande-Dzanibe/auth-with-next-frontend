"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";
import context from "../context/userContextWrapper";

const NavBar = () => {
  const pathname = usePathname();

  const usingContext = useContext(context) as ContextType;

  const { user, signout } = usingContext;

  return (
    <nav>
      <div>
        <Link className="logo-wrapper" href={"/"}>
          <p>Dzanibe </p>
          <p>Media</p>
        </Link>
      </div>
      {user ? (
        <div className="links-wrapper">
          <div className={pathname == "/" ? "link2" : "link"}>
            <Link href={"/"}>Home</Link>
            {pathname == "/" ? <div className="underline"></div> : null}
          </div>
          <div>
            <p
              style={{
                marginLeft: "30px",
              }}
            >
              {user.name}
            </p>
          </div>
          <div className={pathname == "/sign-up" ? "link2" : "siggn"}>
            <Link href={"/log-in"} onClick={() => signout()}>
              <p className="on-nav"> Log Out</p>
            </Link>
            {pathname == "/sign-up" ? <div className="underline"></div> : null}
          </div>
        </div>
      ) : (
        <div className="links-wrapper">
          <div className={pathname == "/" ? "link2" : "link"}>
            <Link href={"/"}>
              <p className="on-nav">Home</p>
            </Link>
            {pathname == "/" ? <div className="underline"></div> : null}
          </div>
          <div className={pathname == "/log-in" ? "link2" : "link"}>
            <Link href={"/log-in"}>
              <p className="on-nav">Log In</p>
            </Link>
            {pathname == "/log-in" ? <div className="underline"></div> : null}
          </div>
          <div className={pathname == "/sign-up" ? "link2" : "siggn"}>
            <Link href={"/sign-up"}>
              <p className="on-nav">Create Account</p>
            </Link>
            {pathname == "/sign-up" ? <div className="underline"></div> : null}
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
