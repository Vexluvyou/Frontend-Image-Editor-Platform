// "use client"

// import { useToast } from "@/components/ui/use-toast"
// import { dataUrl, getImageSize } from "@/lib/utils"
// import { CldImage, CldUploadWidget } from "next-cloudinary"
// import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"
// import Image from "next/image"

// type Props = {
//   onValueChange: (value: string) => void
//   setImage: React.Dispatch<any>
//   image: any
//   publicId: string
//   type: string
// }

// const ButtonMediaUploader = ({ onValueChange, setImage, image, publicId, type }: Props) => {
//   const { toast } = useToast()

//   const handleUploadSuccess = (result: any) => {
//     const info = result?.info
//     if (!info) return

//     const newImage = {
//       publicId: info.public_id,
//       width: info.width,
//       height: info.height,
//       secureURL: info.secure_url,
//     }

//     setImage(newImage)
//     onValueChange(info.public_id)

//     toast({
//       title: "Image uploaded successfully",
//       duration: 4000,
//       className: "success-toast",
//     })
//   }

//   const handleUploadError = () => {
//     toast({
//       title: "Upload failed",
//       description: "Please try again",
//       duration: 4000,
//       className: "error-toast",
//     })
//   }

//   return (
//     <CldUploadWidget
//       uploadPreset="Image_Editor_Platform"
//       options={{ multiple: false, resourceType: "image" }}
//       onSuccess={handleUploadSuccess}
//       onError={handleUploadError}
//     >
//       {({ open }) => (
//         <div className="flex flex-col gap-4">
//           <button
//             type="button"
//             onClick={() => open()}
//             className="flex items-center gap-2 px-4 py-2 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition w-fit"
//           // className="px-4 py-2 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition w-fit"
//           >
//             <Image
//               src="/assets/icons/upload.png"
//               alt="Add Image"
//               width={24}
//               height={24}
//             />
//             Upload Image
//           </button>

//           {/* Show uploaded image preview below the button */}

//           {/* {publicId && (
//             <div className="overflow-hidden rounded-[10px]">
//               <CldImage
//                 width={getImageSize(type, image, "width")}
//                 height={getImageSize(type, image, "height")}
//                 src={publicId}
//                 alt="Uploaded"
//                 sizes="(max-width: 767px) 100vw, 50vw"
//                 placeholder={dataUrl as PlaceholderValue}
//                 className="media-uploader_cldImage"
//               />
//             </div>
//           )} */}
//         </div>
//       )}
//     </CldUploadWidget>
//   )
// }

// export default ButtonMediaUploader

