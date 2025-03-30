import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

function PageNotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center text-center justify-center mt-44">
      <div className="max-w-screen-sm space-y-4">
        <h1 className="text-8xl font-semibold">404</h1>
        <p className="text-muted-foreground text-xl">
          The page you were looking for doesn’t exist. You may have mistyped the
          address or the page may have moved.
        </p>
        <Button
          size="lg"
          onClick={() => {
            router.push(`/`);
          }}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
