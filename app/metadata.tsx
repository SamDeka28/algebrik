import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    // const headersList = await headers();
    // const pathname = headersList.get("x-invoke-path") || "";
    const { slug } = await params;
    const pageData = await fetchPageData(slug);

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
        title: "Home Page",
        description: "Welcome to our site"
    };
}
