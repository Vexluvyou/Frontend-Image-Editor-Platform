"use client"

import { title } from "process"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { aspectRatioOptions, creditFee, defaultValues, transformationTypes } from "@/constants"
import { CustomField } from "./CustomField"
import { useEffect, useState, useTransition } from "react"
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils"
import { getCldImageUrl } from "next-cloudinary"
import { addImage, updateImage } from "@/lib/actions/image.actions"
import { useRouter } from "next/navigation"

import MediaUploader from "./MediaUploader"
import ButtonMediaUploader from "./ButtonMediaUploader"
import TransformedImage from "./TransformedImage"
import { HttpClient } from "@/lib/services/http-client"
import { UserBoxProps } from "@/lib/services/my-app"
import { AppKey } from "@/lib/services/key"

export const formSchema = z.object({
  title: z.string(),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string(),
});

interface PaymentData {
  id: string;
  user_id: string;
  customer_id: string;
  price_name: string;
  subscription_id: string;
  first_billed_at: string;
  next_billed_at: string;
  billing_interval: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

const TransformationForm = ({ action, data = null, userId, type, creditBalance, config = null }: TransformationFormProps) => {

  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data)
  const [newTransformation, setNewTransformation] = useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config)
  const [isPending, startTransition] = useTransition();

  const http = new HttpClient();

  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [user, setUser] = useState<UserBoxProps>();
  const [userPayment, setUserPayment] = useState<PaymentData | null>(null);
  const router = useRouter();
  const transformKey = `transformCount_${userId}`;
  const [transformCount, setTransformCount] = useState<number>(0);

  const maxFreeTransforms = 2;

  useEffect(() => {
    if (user?.userId && typeof window !== 'undefined') {
      const transformKey = `transformCount_${user.userId}`;
      const stored = localStorage.getItem(transformKey);
      setTransformCount(stored ? parseInt(stored, 10) : 0);
    }
  }, [user]);

  // Assume `userPayment` is a boolean you already have
  const hasSubscription = !!userPayment;

  const initalValue = data && action === 'Update' ? {
    title: data?.title,
    aspectRatio: data?.aspectRatio,
    color: data?.color,
    prompt: data?.prompt,
    publicId: data?.publicId,
  } : defaultValues

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initalValue,
  })

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await http.get(`payment`);
        setPayments(res || []);
      } catch (error) {
        console.error("Failed to fetch payments:", error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const username = localStorage.getItem(AppKey.username);
    const email = localStorage.getItem(AppKey.email);
    const userId = localStorage.getItem(AppKey.userId);

    if (!userId) {
      router.replace("/sign-in");
    }

    setUser({
      username: username || "Guest0001",
      email: email || "guest@example.com",
      userId: userId || "",
    });
  }, [router]);

  useEffect(() => {
    if (user && payments.length > 0) {
      const match = payments.find(p => p.user_id === user.userId);
      setUserPayment(match || null);
    }
  }, [user, payments]);

  // 2. Define a submit handler.
  // Save Image 
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig
      })

      // From Index.d.ts
      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationURL: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
      }

      if (action === 'Add') {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: '/'
          })

          if (newImage) {
            form.reset()
            setImage(data)
            router.push(`/transformations/${newImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === 'Update') {
        try {

          const updatedImage = await updateImage({
            image: {
              ...imageData,
              _id: data._id
            },
            userId,
            path: `/transformations/${data._id}`
          })

          if (updatedImage) {
            router.push(`/transformations/${updatedImage._id}`)
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false)
  }

  // Generative Fill select Aspect Ratio to apply transformation
  const onSelectFieldHandler = (value: string, onChangeField: (value: string) => void) => {
    const imageSize = aspectRatioOptions[value as AspectRatioKey]

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }))

    setNewTransformation(transformationType.config);

    return onChangeField(value)
  }

  // Object Remove fill form ot apply transformation
  const onInputChangeHandler = (fieldName: string, value: string, type: string, onChangeField: (value: string) => void) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === 'prompt' ? 'prompt' : 'to']: value
        }
      }))
    }, 1000)();

    return onChangeField(value)
  }

  // Return to updateCredit
  const onTransformHandler = async () => {
    if (!hasSubscription && transformCount >= maxFreeTransforms) {
      alert("You’ve reached your free limit of 2 transformations. Please subscribe to unlock unlimited access.");
      return;
    }

    setIsTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);

    startTransition(async () => {
      if (!hasSubscription && user?.userId) {
        const newCount = transformCount + 1;
        setTransformCount(newCount);
        const transformKey = `transformCount_${user.userId}`;
        localStorage.setItem(transformKey, newCount.toString());
      }
    });
  };

  // Restore Image and Remove Background
  useEffect(() => {
    if (image && (type === 'restore' || type === 'removeBackground')) {
      setNewTransformation(transformationType.config)
    }
  }, [image, transformationType.config, type])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {creditBalance < Math.abs(creditFee)}
        <CustomField
          control={form.control}
          name="title"
          formLabel="Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        {/* Generative Fill Image Form */}
        {type === 'fill' && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) => onSelectFieldHandler(value, field.onChange)}
                value={field.value}
              >
                <SelectTrigger className="select-field">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>

                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem key={key} value={key} className="select-item">
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>

              </Select>
            )}
          />
        )}

        {/* Object Remove and Recolor Form */}
        {/* Object Remove */}
        {(type === 'remove' || type === 'recolor') && (
          <div className="prompt-field">

            <CustomField
              control={form.control}
              name="prompt"
              formLabel={
                type === 'remove' ? 'Object to remove' : 'Object to recolor'
              }
              className="w-full"
              render={({ field }) => (
                <Input
                  value={field.value}
                  className="input-field"
                  onChange={(e) => onInputChangeHandler(
                    'prompt',
                    e.target.value,
                    type,
                    field.onChange
                  )}
                />
              )}
            />

            {/* Object Recolor */}
            {/* Form for Replace Color */}
            {type === 'recolor' && (
              <CustomField
                control={form.control}
                name="color"
                formLabel="Replacement Color"
                className="w-full"
                render={({ field }) => (
                  <Input
                    value={field.value}
                    className="input-field"
                    onChange={(e) => onInputChangeHandler(
                      'color',
                      e.target.value,
                      'recolor',
                      field.onChange
                    )}
                  />
                )}
              />
            )}

          </div>
        )}

        {/* Upload Image */}
        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (

              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />

            )}
          />

          {/* Image Transformed */}
          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        {/* Transformations Limit When Not Subscription */}

        {/* {!hasSubscription && (
          <p className="text-sm text-gray-500 text-right font-semibold">
            Transformations used: {transformCount}/{maxFreeTransforms}
          </p>
        )} */}

        {/* Transformations Limit and Upload Button */}
        <div className="flex items-center justify-between w-full">
          {!hasSubscription ? (
            <p className="text-sm text-gray-500 font-semibold">
              Transformations used: {transformCount}/{maxFreeTransforms}
            </p>
          ) : (
            <div /> // empty div to keep spacing
          )}
          
          {/* <button className="px-4 py-2 text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition">
            Upload Image
          </button> */}

          {/* Upload Image Button */}
          <div className="flex flex-col gap-4items-end">
            <CustomField
              control={form.control}
              name="publicId"
              className="flex size-full flex-col"
              render={({ field }) => (
                <ButtonMediaUploader
                  onValueChange={field.onChange}
                  setImage={setImage}
                  publicId={field.value}
                  image={image}
                  type={type}
                />
              )}
            />
          </div>
        </div>

        {/* Button to Apply Transformation and Save Image */}
        <div className="flex flex-col gap-4 ">
          <Button
            type="button"
            className="save-button capitalize"
            disabled={
              isTransforming ||
              newTransformation === null ||
              (!hasSubscription && transformCount >= maxFreeTransforms)
            }
            onClick={onTransformHandler}
          >
            {isTransforming ? 'Transforming...' : 'Apply Generate'}

            {/* Show Transformations Use Limit or Unlimited */}
            {/* {isTransforming
              ? 'Transforming...'
              : !hasSubscription && transformCount >= maxFreeTransforms
                ? 'Limit Reached'
                : `Apply Generate (${!hasSubscription ? `${transformCount}/${maxFreeTransforms}` : 'Unlimited'})`
            } */}

          </Button>

          {/* Button to Save Image Transformation */}
          <Button
            type="submit"
            className="save-button capitalize"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Save Image'}
          </Button>
        </div>

      </form>
    </Form>
  )
}

export default TransformationForm