export interface Avatar {
  src: string;
  alt: string;
  title: string;
  tagline: string;
}

export const collectibleAvatars: Avatar[] = [
  {
    src: "/images/avatars/steak-alex.jpeg",
    alt: "Chef Alex",
    title: "🥩 Chef Alex",
    tagline: "Slow is smooth.\nSmooth is fast."
  },
  {
    src: "/images/avatars/office-alex.jpeg", 
    alt: "Office Alex",
    title: "👨‍💻 Office Alex",
    tagline: "Lead with clarity.\nBuild with care.\nEmpower without ego."
  },
  {
    src: "/images/avatars/bartender-alex.png",
    alt: "Mixologist Alex", 
    title: "🍸 Mixologist Alex",
    tagline: "Shaking cocktails and debugging prod.\n(Not in that order.)"
  }
];
