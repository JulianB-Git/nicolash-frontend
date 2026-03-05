export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "How far is Tulbagh from Cape Town?",
    answer: "Approximately 120 km or 1.5-2 hours' drive.",
  },
  {
    question: "Will there be a bar?",
    answer: "Yes - a cash bar will be available.",
  },
  {
    question: "How do I get around Cape Town?",
    answer:
      "Uber is the easiest option within the city. For exploring beyond Cape Town or travelling to the wedding, we strongly recommend hiring a car.",
  },
  {
    question: "How do I get to and from the wedding?",
    answer:
      "Uber (see estimated fares above) or Avis car rental from Cape Town International Airport.",
  },
  {
    question: "Avis Contact Details:",
    answer:
      "Website: www.avis.co.za\nPhone: +27 (0)21 935 8600",
  },
];
