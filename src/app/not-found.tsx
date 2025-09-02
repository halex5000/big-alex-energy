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
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjZjNmNGY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE1MCIgcj0iNDAiIGZpbGw9IiNmZmQ3MDAiLz4KPHJlY3QgeD0iMTUwIiB5PSIyMDAiIHdpZHRoPSIxMDAiIGhlaWdodD0iODAiIGZpbGw9IiNlZjQ0NDQiLz4KPHJlY3QgeD0iMTgwIiB5PSIyODAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI2MCIgZmlsbD0iIzMzMzMzMyIvPgo8dGV4dCB4PSIyMDAiIHk9IjM1MCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DaGVmIEFsZXg8L3RleHQ+Cjwvc3ZnPg=="
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
                  "You broke it. But at least the steak's still medium rare."
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
