import { Card, CardContent } from "@/components/ui/card";
import { LegoAvatar } from "@/components/ui/lego-avatar";

const collectibleAvatars = [
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

export function AvatarCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
      {collectibleAvatars.map((avatar, index) => (
        <Card
          key={index}
          className="group cursor-pointer border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:rotate-1"
        >
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <LegoAvatar
                src={avatar.src}
                alt={avatar.alt}
                size="lg"
                className="mx-auto group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors duration-300">
              {avatar.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {avatar.tagline}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
