export const navLinks = [
  {
    label: "Home",
    route: "/",
    icon: "/assets/icons/home.svg",
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: "/assets/icons/camera.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "/assets/icons/scan.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: "/assets/icons/filter.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "/assets/icons/stars.svg",
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "/assets/icons/image.svg",
  },
  // {
  //   label: "Convert 2D to 3D",
  //   route: "/",
  //   icon: "/assets/icons/bag.svg",
  // },
  {
    label: "Subscription",
    route: "/subscriptions",
    icon: "/assets/icons/bag.svg",
  },
  {
    label: "Profile",
    route: "/profile",
    icon: "/assets/icons/profile.svg",
  },
];

export const plans = [
  {
    _id: 1,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 5,
    inclusions: [
      {
        label: "5 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      // {
      //   label: "Priority Customer Support",
      //   isIncluded: false,
      // },
      // {
      //   label: "Priority Updates",
      //   isIncluded: false,
      // },
    ],
  },
  {
    _id: 2,
    name: "Premium Package",
    // icon: "/assets/icons/free-plan.svg",
    icon: "/assets/icons/premium.png",
    price: 9.99,
    plans: "Monthly Package",
    // credits: 120,
    priceId: "pri_01jtj6jwabrw5ssbevmrzza6p8",
    inclusions: [
      {
        label: "Monthly",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      // {
      //   label: "Priority Customer Support",
      //   isIncluded: true,
      // },
      // {
      //   label: "Priority Updates",
      //   isIncluded: false,
      // },
    ],
  },
  {
    _id: 3,
    name: "Premium Package",
    // icon: "/assets/icons/free-plan.svg",
    icon: "/assets/icons/crown.png",
    price: 99.99,
    // credits: 2000,
    plans: "Yearly Package",
    priceId: "pri_01jtj6mgp64mb0s4fntzsp3nh1",
    inclusions: [
      {
        label: "Yearly",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      // {
      //   label: "Priority Customer Support",
      //   isIncluded: true,
      // },
      // {
      //   label: "Priority Updates",
      //   isIncluded: true,
      // },
    ],
  },
];

export const transformationTypes = {
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "camera.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "scan.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "filter.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "stars.svg",
  },
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "image.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const creditFee = -1;