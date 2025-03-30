import { Metadata } from "next";
import React from "react";
export async function generateMetadata({
  params,
}: {
  params: { subdomain?: string[] | undefined };
}): Promise<Metadata> {
  const { subdomain } = await params;
  const siteName = subdomain?.[0];
  const pageName = subdomain?.[1];
  const pathname = `${siteName} ${pageName ? `- ${pageName}` : ""}`;

  return {
    title: pathname || "Default Title",
    description: "Default description",
  };
}

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}

export default Layout;
