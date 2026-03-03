export interface TimelineEvent {
  date: string;
  title: string;
  summary: string;
  images: string[];
}

export const timelineEvents: TimelineEvent[] = [
  {
    date: "The Start",
    title: "Where it began",
    summary:
      "The first stretch of our story: long tables, easy laughter, and a quiet sense that something was beginning.",
    images: [
      "/images/our-story/start-1.png",
      "/images/our-story/start-2.png",
      "/images/our-story/start-3.png",
      "/images/our-story/start-4.jpg",
    ],
  },
  {
    date: "2019",
    title: "Back to what feels like home",
    summary:
      "A grounding year. We came back, settled in, and made space for a life that felt steady and real.",
    images: [
      "/images/our-story/2019-1.png",
      "/images/our-story/2019-2.png",
      "/images/our-story/2019-5.png",
    ],
  },
  {
    date: "The Adventure Years",
    title: "Collecting the miles",
    summary:
      "Weekends away, spontaneous trips, and the kind of adventures that become shared language.",
    images: [
      "/images/our-story/Adventure1.jpg",
      "/images/our-story/Adventure2.jpg",
      "/images/our-story/Adventure3.jpg",
      "/images/our-story/adventure-4.png",
    ],
  },
  {
    date: "2025",
    title: "The year it all lined up",
    summary:
      "A year of big decisions, happy yeses, and the start of our next chapter together.",
    images: [
      "/images/our-story/2025-1.jpg",
      "/images/our-story/2025-2.png",
      "/images/our-story/2025-3.jpg",
      "/images/our-story/2025-4.jpg",
    ],
  },
];
