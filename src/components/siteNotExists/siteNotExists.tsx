import { LandingPageIcon, SiteNotExistIcon } from "@/icons/common";
import React from "react";

function SiteNotExists({ subdomain }: { subdomain: string }) {
  return (
    <div className="flex items-center justify-center mt-44">
      <div className="text-center flex flex-col gap-6 justify-center items-center">
        <SiteNotExistIcon />
        <h1 className="text-2xl font-semibold">The site does not exist</h1>
        <div className="text-sm space-x-1">
          <span className="font-semibold">{subdomain}.vixx.site</span>
          <span className="text-muted-foreground">is still available</span>
        </div>
        <div
          className="flex flex-col gap-3 items-center justify-center p-3 px-6 border w-56 rounded-md group hover:bg-muted cursor-pointer"
          onClick={() => {
            window.open(
              "https://builder.vixx.site/",
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          <div className="bg-muted h-10 w-10 flex items-center rounded-md justify-center group-hover:bg-primary">
            <LandingPageIcon />
          </div>

          <span className="text-muted-foreground text-sm">
            Create a landing page for my business idea
          </span>
        </div>
      </div>
    </div>
  );
}

export default SiteNotExists;
