export async function generateMetadata({
  params,
}: {
  params: { subdomain?: string[] };
}): Promise<Metadata> {
  const { subdomain } = await params;
  const siteName = subdomain?.[0];
  const pageName = subdomain?.[1];
  const pathname = `${siteName} ${pageName ? `- ${pageName}`:""}`;
  console.log(pageName, "pageName");

  console.log(pathname, "Generated pathname");

  return {
    title: pathname || "Default Title",
    description: "Default description",
  };
}

import { Metadata } from "next";
import React from "react";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

export default Layout;
