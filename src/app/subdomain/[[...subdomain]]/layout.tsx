import { Metadata } from "next";
import React from "react";

// Generate metadata based on subdomain params
export async function generateMetadata({
  params,
}: {
  params: { subdomain?: string[] };
}): Promise<Metadata> {
  // No need to await params; it's already resolved
  const { subdomain } = params;
  const siteName = subdomain?.[0];
  const pageName = subdomain?.[1];
  const pathname = `${siteName}${pageName ? ` - ${pageName}` : ""}`;

  return {
    title: pathname || "Default Title",
    description: "Default description",
  };
}

// Define the Layout component
interface LayoutProps {
  children: React.ReactNode;
  params: { subdomain?: string[] };
}

function Layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}

export default Layout;
