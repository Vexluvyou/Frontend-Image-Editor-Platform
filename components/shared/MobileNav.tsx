"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "../ui/button"
import { AppKey } from "@/lib/services/key"
import { navLinks } from "@/constants"

const MobileNav = () => {
  const pathname = usePathname()
  const [hasToken, setHasToken] = useState(false)
  const [showLogoutDialog, setShowLogoutDialog] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem(AppKey.accessToken)
    setHasToken(!!token)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem(AppKey.accessToken)
    localStorage.removeItem(AppKey.refreshToken)
    localStorage.removeItem(AppKey.userId)
    localStorage.removeItem(AppKey.username)
    localStorage.removeItem(AppKey.email)
    window.location.href = "/"
  }

  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.png"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <div>
          {hasToken ? (
            <Button
              onClick={() => setShowLogoutDialog(true)}
              className="button w-full bg-red-500 bg-cover text-white"
            >
              Logout
            </Button>
          ) : (
            <Button asChild className="button bg-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          )}
        </div>

        <Sheet>
          <SheetTrigger>
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-64">
            <Image
              src="/assets/images/logo-text.png"
              alt="logo"
              width={152}
              height={23}
            />
            <ul className="header-nav_elements">
              {navLinks.map((link) => {
                const isActive = link.route === pathname
                return (
                  <li
                    key={link.route}
                    className={`${isActive && "gradient-text"} p-18 flex whitespace-nowrap text-dark-700`}
                  >
                    <Link className="sidebar-link cursor-pointer" href={link.route}>
                      <Image src={link.icon} alt={link.label} width={24} height={24} />
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            <div className="mt-4">
              {hasToken ? (
                <Button
                  onClick={() => setShowLogoutDialog(true)}
                  className="button w-full bg-red-500 bg-cover text-white"
                >
                  Logout
                </Button>
              ) : (
                <Button asChild className="button bg-gradient bg-cover">
                  <Link href="/sign-in">Login</Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </nav>

      {/* Dialog Logout Confirmation Logout Model */}
      {showLogoutDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Confirm Logout</h3>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-200 hover:bg-gray-300 font-bold text-gray-800 px-4 py-2 rounded-md"
                onClick={() => setShowLogoutDialog(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 font-semibold text-white px-4 py-2 rounded-md"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default MobileNav
