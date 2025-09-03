export interface Quote {
  text: string;
  author?: string;
}

export const quotes: Quote[] = [
  {
    text: "I don't just set a high bar for resilience, low-latency delivery, and debuggability at scale, I blaze the trail alongside the team. Great engineering isn't just about uptime and performance. It's about how systems respond when things go wrong.",
    author: "Alex Hardman"
  }
];
