import { LegoAvatar } from "@/components/ui/lego-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <Card className="border-2">
          <CardContent className="p-12">
            <div className="space-y-8">
              {/* Chef Alex Avatar */}
              <div className="flex justify-center">
                <LegoAvatar
                  src="/images/avatars/steak-alex.jpeg"
                  alt="Chef Alex - Error Handler"
                  size="lg"
                  className="border-4 border-destructive/20"
                />
              </div>
              
              {/* Error Message */}
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold text-destructive">
                  404
                </h1>
                <h2 className="text-2xl md:text-3xl font-semibold">
                  Page Not Found
                </h2>
                <p className="text-lg text-muted-foreground italic">
                  &ldquo;You broke it. But at least the steak&apos;s still medium rare.&rdquo;
                </p>
                <p className="text-sm text-muted-foreground">
                  — Chef Alex, Error Handler
                </p>
              </div>
              
              {/* Action Button */}
              <div className="pt-4">
                <Button asChild size="lg">
                  <Link href="/">
                    Back to Home
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
