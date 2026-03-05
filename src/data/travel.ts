export interface StayOption {
  name: string;
  note: string;
  guests: number;
  image: string;
}

export const gettingThere: string[] = [
  "Fly into Cape Town International Airport (CPT).",
  "Nibbana Farm, Boontjiesrivier Rd Wolseley is about 1 hour 45 minutes by car from the airport.",
  "For flexibility across the weekend, we recommend hiring a car.",
  "Uber / ride share from Cape Town to Nibbana Farm, Boontjiesrivier Rd Wolseley is about 1.5 hours and typically costs around R1,600-R1,900 depending on demand and time of day.",
  "Local Uber availability may be limited late at night, so we recommend planning return trips in advance.",
];

export const stayOptions: StayOption[] = [
  {
    name: "Steenbok Farm",
    note: "A peaceful farm stay with wide valley views and spacious grounds.",
    guests: 24,
    image: "/images/wedding/steenbok.jpeg",
  },
  {
    name: "Usingizi",
    note: "Hillside accommodation with a relaxed atmosphere and pool area.",
    guests: 6,
    image: "/images/wedding/usingizi.webp",
  },
  {
    name: "Fynbos Guest Farm",
    note: "Quiet cottage-style lodging surrounded by fynbos and mountain air.",
    guests: 6,
    image: "/images/wedding/fynbos.jpg",
  },
  {
    name: "Mountain Haven",
    note: "Classic guesthouse option close to town and wedding routes.",
    guests: 11,
    image: "/images/wedding/mountainhaven.jpg",
  },
  {
    name: "Big Sky Cottages",
    note: "Great for larger friend groups wanting scenic cottage stays.",
    guests: 34,
    image: "/images/wedding/bluesky.webp",
  },
  {
    name: "Die Boord",
    note: "Comfortable accommodation with tranquil water and mountain views.",
    guests: 8,
    image: "/images/wedding/dieboord.jpg",
  },
  {
    name: "Bergsicht",
    note: "A countryside stay with vineyard edges and mountain backdrops.",
    guests: 15,
    image: "/images/wedding/bergsicht.jpg",
  },
  {
    name: "Witzenberg",
    note: "A spacious valley option for bigger groups and family clusters.",
    guests: 46,
    image: "/images/wedding/witzenberg.jpeg",
  },
];

export const thingsToDo: string[] = [
  "Wine tasting in the valley",
  "Olive farm dinner stops",
  "Scenic mountain drives and viewpoints",
  "Local bakeries and coffee in town",
  "Morning walks among vineyards",
];

export const registryLinks = [
  {
    label: "Yuppiechef",
    href: "https://www.yuppiechef.com/",
  },
  {
    label: "@home",
    href: "https://www.athome.co.za/",
  },
  {
    label: "Woolworths",
    href: "https://www.woolworths.co.za/",
  },
  {
    label: "Volpes",
    href: "https://bash.com/volpes?redirect=www.volpes.co.za",
  },
  {
    label: "Le Creuset",
    href: "https://www.lecreuset.co.za/",
  },
  {
    label: "Cori Craft",
    href: "https://coricraft.co.za/",
  },
];
