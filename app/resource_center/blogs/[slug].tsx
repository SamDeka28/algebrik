import { useRouter } from "next/router";
import { blogContent } from "@/components/constant/blogs";
// import Image from "next/image";

const BlogPage = () => {
  const router = useRouter();
  const { slug } = router.query;

  if (!slug) {
    return <div>Loading...</div>;
  }

  const blog = blogContent.find(
    (item) => item.blogTitle.toLowerCase().replace(/ /g, "-") === slug
  );

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-gray-900">Blog Not Found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Blog content */}
    </div>
  );
};

export default BlogPage;
