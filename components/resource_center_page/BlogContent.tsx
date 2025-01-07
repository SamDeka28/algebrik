import Image from "next/image";
import { blogContent } from "../constant/blogs";

const BlogPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-4">
      {blogContent.map((blog, index) => (
        <div key={index} className="mb-12">

          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{blog.blogTitle}</h1>
            <p className="text-gray-600 mt-2">{blog.blogSubtitle}</p>
          </div>


          <div className="flex items-center space-x-4 mb-6">
            <Image
              src={blog.authorImage}
              alt={blog.authorName}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div>
              <p className="font-semibold text-gray-800">{blog.authorName}</p>
              <p className="text-sm text-gray-600">
                {blog.publication} - {blog.publishedDate} - {blog.readTime}
              </p>
            </div>
          </div>


          <div className="mb-6">
            <Image
              src={blog.blogImage}
              alt={blog.blogTitle}
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>


          <div className="space-y-8">
            {blog.blogBody.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">{section.heading}</h2>
                {section.body.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                    {paragraph.text}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPage;