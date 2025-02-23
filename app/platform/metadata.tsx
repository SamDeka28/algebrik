import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pageData = await fetchPageData(params.slug);


  console.log({slug:params.slug})
  if (!pageData) {
    return {
      title: "Page Not Found",
      description: "This page does not exist.",
    };
  }

  return {
    title: pageData.title,
    description: pageData.description,
  };
}

async function fetchPageData(slug: string) {
  const mockDatabase = {
    home: { title: "Home Page", description: "Welcome to our site!", image: "/home.jpg" },
    about: { title: "About Us", description: "Learn more about us.", image: "/about.jpg" },
  };

  return {
    title:"Home Page",
    description:"Welcome to our site"
  };
}
