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
      <div className="logo-wrapper">
        <Link href={"/"}>
          <h1>Logo</h1>
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
              Log Out
            </Link>
            {pathname == "/sign-up" ? <div className="underline"></div> : null}
          </div>
        </div>
      ) : (
        <div className="links-wrapper">
          <div className={pathname == "/" ? "link2" : "link"}>
            <Link href={"/"}>Home</Link>
            {pathname == "/" ? <div className="underline"></div> : null}
          </div>
          <div className={pathname == "/log-in" ? "link2" : "link"}>
            <Link href={"/log-in"}>Log In</Link>
            {pathname == "/log-in" ? <div className="underline"></div> : null}
          </div>
          <div className={pathname == "/sign-up" ? "link2" : "siggn"}>
            <Link href={"/sign-up"}>Create Account</Link>
            {pathname == "/sign-up" ? <div className="underline"></div> : null}
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavBar;
