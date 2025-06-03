"use client";

// import Image from "next/image";
// import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
// import { CldImage } from "next-cloudinary";
import CardMedia from '@mui/material/CardMedia';


import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { transformationTypes } from "@/constants";
// import { IImage } from "@/lib/database/models/image.model";
import { formUrlQuery } from "@/lib/utils";
import { Button } from "../ui/button";
import { Search } from "./Search";
import { HttpClient } from "@/lib/services/http-client";
import { useEffect, useState } from "react";

export const Collection = ({
  // hasSearch = false,
  // images,
  totalPages = 1,
  page,
}: {
  // images: string;
  totalPages?: number;
  page?: number;
  // hasSearch?: boolean;
}) => {

  const http = new HttpClient();
  // const searchQuery = (searchParams?.query as string) || '';
  const [datasource, setDatasource] = useState<any[]>([]);
  const [totalPage, setTotalPage] = useState<any[]>([]);

  const getImages = async () => {
    const res = await http.get(`image`);
    
    setDatasource(res);
    setTotalPage(res.length);
  }
  // const images = await getAllImages({ page, searchQuery})

  useEffect(() => {
    getImages();
  }, []);

  const router = useRouter();

  const searchParams = useSearchParams();

  // PAGINATION HANDLER
  const onPageChange = (action: string) => {
    const pageValue = action === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      searchParams: searchParams.toString(),
      key: "page",
      value: pageValue,
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <div className="collection-heading">
        <h2 className="h2-bold text-dark-600">Recent Edits</h2>
        {/* Recent Edit and Search */}
        {/* {hasSearch} */}
        {/* {hasSearch && <Search />} */}
      </div>

      {datasource.length > 0 ? (
        <ul className="collection-list">
          {datasource.map((image, index) => (
            <>
              <CardMedia 
                component="img"
                // key={index}
                sx={{
                  width: 200,
                  height: '100%',
                  borderRadius: '10px',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  cursor: 'pointer'
                }}
                image={
                  image.images
                  
                }
                // alt={room?.place?.name}
              />
            </>
          ))}
        </ul>
      ) : (
        <div className="collection-empty">
          <p className="p-20-semibold">Empty List</p>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="flex w-full">
            <Button
              disabled={Number(page) <= 1}
              className="collection-btn"
              onClick={() => onPageChange("prev")}
            >
              <PaginationPrevious className="hover:bg-transparent hover:text-white" />
            </Button>

            <p className="flex-center p-16-medium w-fit flex-1">
              {page} / {totalPages}
            </p>

            <Button
              className="button w-32 bg-purple-gradient bg-cover text-white"
              onClick={() => onPageChange("next")}
              disabled={Number(page) >= totalPages}
            >
              <PaginationNext className="hover:bg-transparent hover:text-white" />
            </Button>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

// const Card = ({ image }: { image: IImage }) => {
//   return (
//     <li>
//       <Link href={`/transformations/${image._id}`} className="collection-card">
//         <CldImage
//           src={image.publicId}
//           alt={image.title}
//           width={image.width}
//           height={image.height}
//           // {...image.config}
//           loading="lazy"
//           className="h-52 w-full rounded-[10px] object-cover"
//           sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
//         />
//         <div className="flex-between">
//           <p className="p-20-semibold mr-3 line-clamp-1 text-dark-600">
//             {image.title}
//           </p>
//           <Image
//             src={`/assets/icons/${transformationTypes[
//                 image.transformationType as TransformationTypeKey
//               ].icon
//               }`}
//             alt={image.title}
//             width={24}
//             height={24}
//           />
//         </div>
//       </Link>
//     </li>
//   );
// };