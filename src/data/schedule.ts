export interface ScheduleItem {
  title: string;
  day: string;
  time: string;
  place: string;
  details: string;
}

export const scheduleItems: ScheduleItem[] = [
  {
    title: "Ceremony",
    day: "Wednesday, 1 April 2026",
    time: "14:30",
    place: "Tulbagh, Witzenberg Valley",
    details: "Join us as we exchange our vows.",
  },
  {
    title: "Cocktail Hour",
    day: "Wednesday, 1 April 2026",
    time: "15:30",
    place: "Garden Terrace, Tulbagh",
    details: "Celebrate with drinks and canapes.",
  },
  {
    title: "Reception",
    day: "Wednesday, 1 April 2026",
    time: "17:00",
    place: "Cape Winelands",
    details: "Dinner, dancing, and celebration.",
  },
];
