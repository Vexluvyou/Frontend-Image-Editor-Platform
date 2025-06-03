"use client"

import { Collection } from "@/components/shared/Collection"
import { Search } from "@/components/shared/Search"
import { Button } from "@/components/ui/button"
import { navLinks } from "@/constants"
import { HttpClient } from "@/lib/services/http-client"
import { Item } from "@radix-ui/react-select"
// import { getAllImages } from "@/lib/actions/image.actions"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { useEffect, useState } from "react"

const Home = () => {

  const router = useRouter();


  const handleNavigate = (path: string) => {
    router.push(path);
  };

  // const searchParams = useSearchParams();

  // const page = Number(searchParams?.page) || 1;
  // const searchQuery = (searchParams?.query as string) || '';


  return (
    <>
      <section className="home" >

        {/* <div className="fixed top-4 right-4 flex gap-4 z-50"> */}
        <div className="w-full flex justify-end gap-[8px]">

          <button
            type="button"
            onClick={() => handleNavigate("/subscriptions")}
            className="flex items-center gap-2 bg-white rounded-xl px-6 py-2 font-semibold shadow-xl"
          >
            <Image
              src="/assets/icons/crown.png"
              alt="upgradePlans"
              width={16}
              height={16}
            />
            Upgrade your plan
          </button>

          <button
            type="button"
            onClick={() => handleNavigate("/settings")}
            className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 font-semibold shadow-xl"
          >
            ?
          </button>

          {/* <button
            type="submit"
            className=" bg-white rounded-xl px-8 py-2 p-16-semibold">
            Noti </button> */}

        </div>

        {/* Search Bar */}
        <Search />

        {/* Title Home Page */}
        <h1 className="home-heading mt-2">
          What will you edit with us today?
        </h1>

        {/* Edit Style Page */}
        {/* <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 6).map((link, index) => {
            const bgColors = ['bg-orange-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
            const iconBg = bgColors[index % bgColors.length];

            return (
              <Link
                key={link.route}
                href={link.route}
                className="flex-center flex-col gap-2"
              >
                <li className={`flex-center w-fit rounded-full p-4 ${iconBg}`}>
                  <Image
                    src={link.icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className="brightness-200" // ⬅ darken icon
                  />
                </li>

                <p className="p-14-medium text-center text-white">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </ul> */}

        {/* Original */}
        {/* <ul className="flex-center w-full gap-20" >
          {navLinks.slice(1, 6).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2" >

                <li className="flex-center w-fit rounded-full bg-white p-4">
                  <Image src={link.icon} alt="image" width={24} height={24} />
                </li>

                <p className="p-14-medium text-center text-white">
                  {link.label}
                </p>

              </Link>
          ))}
        </ul> */}

        {/* Make Background Icon Difference Color */}
        {/* <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 6).map((link, index) => {
            const bgColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
            const iconBg = bgColors[index % bgColors.length];

            return (
              <Link
                key={link.route}
                href={link.route}
                // className="flex-center flex-col gap-2"
                className="brightness-200" // Make Icon White
              >
                <li className={`flex-center w-fit rounded-full p-4 ${iconBg}`}>
                  <Image src={link.icon} alt="image" width={24} height={24} />
                </li>

                <p className="p-14-medium text-center text-white">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </ul> */}

      </section>

      <section className="sm:mt-6">
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 6).map((link, index) => {
            const bgColors = [
              'bg-orange-500',
              'bg-blue-500',
              'bg-green-500',
              'bg-yellow-500',
              'bg-purple-500'
            ];
            const iconBg = bgColors[index % bgColors.length];

            return (
              <Link
                key={link.route}
                href={link.route}
                className="flex-center flex-col gap-2"
              >
                <li className={`flex-center w-fit rounded-full p-4 ${iconBg}`}>
                  <Image
                    src={link.icon}
                    alt="icon"
                    width={24}
                    height={24}
                    className="brightness-200"
                  />
                </li>

                <p className="p-14-medium text-center text-gray-500">
                  {link.label}
                </p>
              </Link>
            );
          })}
        </ul>
      </section>

      <section className="sm:mt-12">

        <Collection
        // hasSearch={true}
        // key={index}
        // images={item.images}
        // totalPages={totalPage}
        // page={page}
        />

      </section>

    </>
  );
};

export default Home;
