import { collectibleAvatars } from "@/data/avatars";
import { Card, CardContent } from "@/components/ui/card";
import { LegoAvatar } from "@/components/ui/lego-avatar";

export function AvatarCardsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
      {collectibleAvatars.map((avatar, index) => (
        <Card
          key={index}
          className="border-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 hover:rotate-1"
        >
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <LegoAvatar
                src={avatar.src}
                alt={avatar.alt}
                size="xl"
                className="mx-auto"
              />
            </div>
            <h3 className="text-lg font-bold mb-3">
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
