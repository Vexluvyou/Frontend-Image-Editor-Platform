"use client";

import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { AppKey } from "@/lib/services/key";
// import { UserButton } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
// import router from "next/router";

const Sidebar = () => {
  const pathname = usePathname();
  const [hasToken, setHasToken] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  // const [user, setUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem(AppKey.accessToken);
    // const username = localStorage.getItem(AppKey.username);

    setHasToken(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AppKey.accessToken);
    localStorage.removeItem(AppKey.refreshToken);
    localStorage.removeItem(AppKey.userId);
    localStorage.removeItem(AppKey.username);
    localStorage.removeItem(AppKey.email);

    window.location.href = "/";

    // Make Confirm Logout
    // const confirmLogout = window.confirm("Are you sure you want to logout?");
    // if (confirmLogout) {
    //   localStorage.clear(); // or remove specific keys like AppKey.userId, etc.
    //   router.push("/sign-in");
    // }
  };


  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.png"
            alt="logo"
            width={220}
            height={30}
          // width={180}
          // height={28}
          />
        </Link>

        <nav className="sidebar-nav">
          <ul className="sidebar-nav_elements">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                    }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    <Image
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && "brightness-200"}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <ul className="sidebar-nav_elements">
            {navLinks.slice(7).map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${isActive ? "bg-purple-gradient text-white" : "text-gray-700"
                    }`}
                >
                  <Link className="sidebar-link" href={link.route}>
                    <Image
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && "brightness-200"}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}

            {/* <li className="flex-center cursor-pointer gap-2 p-4">
              <p>{username}</p>
            </li> */}
          </ul>

          {/* Button SignIn and SignOut */}
          <div className="mt-4">
            {hasToken ? (
              <Button
                onClick={() => setShowLogoutDialog(true)}
                className="button w-full bg-red-500 bg-cover text-white"
              >
                Logout
              </Button>
            ) : (
              <Button
                asChild
                className="button bg-gradient bg-cover">
                <Link href="/sign-in">Login</Link>
              </Button>
            )}
          </div>

          {/* Button SignIn and SignOut */}
          {/* <div className="mt-4">
            {hasToken ? (
              <Button
                onClick={handleLogout}
                className="button w-full bg-red-500 bg-cover text-white">Logout</Button>
            ) : (
              <Button
                asChild
                className="button bg-gradient bg-cover">
                <Link href="/sign-in">Login</Link>
              </Button>
            )}
          </div> */}

        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 font-semibold text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowLogoutDialog(false)}
              >
                Close
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
                // onClick={() => {
                //   // handleLogout
                //   localStorage.removeItem(AppKey.accessToken);
                //   localStorage.removeItem(AppKey.refreshToken);
                //   localStorage.removeItem(AppKey.userId);
                //   localStorage.removeItem(AppKey.username);
                //   localStorage.removeItem(AppKey.email);
                //   window.location.href = "/";
                // }}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>

  );
};

export default Sidebar;