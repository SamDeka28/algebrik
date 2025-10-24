import ReadyToGo from "@/components/about_page/ReadyToGo";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { StrapiAPI } from "@/lib/strapi";
import { getStrapiMediaUrl } from "@/lib/strapi/utils";
import { Metadata } from "next";
import DebugInfo from "@/components/DebugInfo";
import AnimatedBackground from "@/components/AnimatedBackground";

// Generate static params for all blog slugs
export async function generateStaticParams() {
  console.log('🔍 generateStaticParams: Starting...');
  
  // Fallback slugs for when Strapi is not available during build
  const fallbackSlugs = [
    'when-the-game-changes',
    'when-the-game-changes-1',
    'from-piggy-banks-to-product-hooks-why-credit-unions-need-a-feature-strategy',
    'year-one-at-algebrik',
    'credit-union-lessons-from-trendwatch-q2',
    'mastering-digital-onboarding',
    'cable-tv-lending-is-dead',
    'the-future-of-auto-lending',
    'automating-lending-decisions-with-unprecedented-precision',
    'building-digital-first-loyalty-for-credit-unions',
    'how-credit-unions-are-putting-agentic-ai-to-work',
    'the-silent-sabotage',
    'is-your-member-experience-broken',
    'a-product-peek-into-what-is-new-at-algebrik-this-month',
    'what-driving-the-shift-to-intelligent-lending',
    'innovations-reshaping-lending-workflows',
    'what-you-will-learn-in-our-intelligent-lending-roundtable',
    'credit-union-mergers-are-at-an-all-time-high',
    'how-digital-first-credit-unions-are-winning-member-loyalty',
    'beyond_decisioning',
    'redefining_borrower',
    'from_fragmentation_to_seamlessness',
    'out_of_the_lending_maze'
  ];
  
  try {
    const blogs = await StrapiAPI.find('blogs', { populate: "*" });

    if (blogs && blogs.length > 0) {
      return blogs.map((blog: any) => ({
        slug: blog.slug,
      }));
    }
  } catch (error) {
    console.error('❌ generateStaticParams: Error fetching from Strapi:', error);
  }
  
  // Use fallback slugs if Strapi is not available or returns no data
  return fallbackSlugs.map(slug => ({ slug }));
}

// Generate metadata for each blog
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    // Try to find blog with exact slug first
    let blogs = await StrapiAPI.find('blogs',{populate:"*"
        ,filters: {
          slug: slug,
        }
    });
    if (blogs && blogs.length > 0) {
      const blog = blogs[0] as unknown as BlogData;
      const featuredImageUrl = getStrapiMediaUrl(blog.featuredImage);
      
      return {
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.excerpt,
        openGraph: {
          title: blog.title,
          description: blog.excerpt,
          images: featuredImageUrl ? [featuredImageUrl] : [],
          type: 'article',
          publishedTime: blog.publishedDate,
          authors: [blog.author],
        },
      };
    }
    return {
      title: 'Blog Not Found',
      description: 'The blog you are looking for does not exist.',
        twitter: {
          card: 'summary_large_image',
          title: 'Blog Not Found',
          description: 'The blog you are looking for does not exist.',
        },
      };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Not Found',
      description: 'The blog you are looking for does not exist.',
    };
  }

  return {
    title: 'Blog Not Found',
    description: 'The blog you are looking for does not exist.',
  };
}

interface BlogData {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  readTime?: string;
  publication?: string;
  featuredImage?: any;
  authorImage?: any;
  featured: boolean;
  status: string;
  seoTitle?: string;
  seoDescription?: string;
}

export default async function DynamicBlog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  let blogData: BlogData | null = null;
  let otherBlogs: BlogData[] = [];
  let error: string | null = null;

  try {
    // Try to find blog with exact slug first
    let blogs = await StrapiAPI.find('blogs',{populate:"*",filters: { slug: slug }});
    // If not found and slug ends with -1, try without the suffix
    if ((!blogs || blogs.length === 0) && slug.endsWith('-1')) {
      const baseSlug = slug.replace(/-1$/, '');
      blogs = await StrapiAPI.find('blogs', {
        populate: ['featuredImage', 'authorImage'],
        filters: { 
          slug: baseSlug,
          status: 'published'
        }
      });
      console.log('🔍 DynamicBlog: Second fetch result:', blogs?.length || 0, 'blogs found');
    }

    if (blogs && blogs.length > 0) {
      blogData = blogs[0] as unknown as BlogData;
      
      // Fetch other blogs (excluding current one)
      try {
        const allBlogs = await StrapiAPI.find('blogs', {
          populate: "*",
        });
        
        // Filter out the current blog and get up to 3 other blogs
        const filteredBlogs = allBlogs.filter((blog: any) => blog.slug !== slug);
        otherBlogs = (filteredBlogs.slice(0, 3) as unknown as BlogData[]) || [];
      } catch (otherBlogsError) {
        console.log('⚠️ DynamicBlog: Could not fetch other blogs:', otherBlogsError);
        // Continue without other blogs
      }
    } else {
      // If blog not found in Strapi, show a message that it will be available after seeding
      error = 'Blog not found in CMS. Please seed the blog data first.';
    }
  } catch (err) {
    console.error('❌ DynamicBlog: Error fetching blog:', err);
    // If Strapi is not available, show a helpful message
    error = 'CMS not available. Please ensure Strapi is running and blog data is seeded.';
  }

  if (error || !blogData) {
    return (
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Available</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>For developers:</strong> Make sure Strapi is running and blog data is seeded using:
              <br />
              <code className="bg-yellow-100 px-2 py-1 rounded text-xs">npm run seed:blogs:all</code>
            </p>
          </div>
          <Link 
            href="/resource-center" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Resource Center
          </Link>
        </div>
      </div>
    );
  }

  // Parse the content to extract sections
  const parseContent = (content: any) => {
    // Helper function to process text and extract images
    const processTextWithImages = (text: string): Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }> => {
      if (!text || typeof text !== 'string') return [];
      
      // Check if the entire text is an HTML block
      if (text.trim().startsWith(':html:') && text.trim().endsWith(':endHtml:')) {
        const htmlContent = text.trim().replace(/^:html:\s*/, '').replace(/\s*:endHtml:$/, '');
        if (htmlContent.trim()) {
          return [{
            type: 'html' as const,
            content: htmlContent.trim()
          }];
        }
        return [];
      }
      
      // First, split by HTML blocks (:html: ... :endHtml:)
      const htmlRegex = /:html:\s*([\s\S]*?)\s*:endHtml:/g;
      let htmlParts = text.split(htmlRegex);
      let processedParts: Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }> = [];
      
      for (let i = 0; i < htmlParts.length; i++) {
        if (i % 2 === 0) {
          // Regular text content - now check for images
          const textContent = htmlParts[i];
          if (textContent.trim()) {
            // Check for custom image format: <image:/uploads/path.png>
            const imageRegex = /<image:([^>]*?)>/g;
            const imageParts = textContent.split(imageRegex);
            
            for (let j = 0; j < imageParts.length; j++) {
              if (j % 2 === 0) {
                // Text content
                if (imageParts[j].trim()) {
                  processedParts.push(imageParts[j]);
                }
              } else {
                // Image path - use Strapi utility to get full URL
                const imagePath = imageParts[j];
                if (imagePath && imagePath.trim()) {
                  const fullImageUrl = getStrapiMediaUrl(imagePath);
                  processedParts.push({
                    type: 'image' as const,
                    src: fullImageUrl,
                    alt: `Blog image ${j}`
                  });
                }
              }
            }
          }
        } else {
          // HTML content block
          const htmlContent = htmlParts[i];
          if (htmlContent && htmlContent.trim()) {
            processedParts.push({
              type: 'html' as const,
              content: htmlContent.trim()
            });
          }
        }
      }
      
      return processedParts;
    };

    // Handle Strapi rich text format
    if (Array.isArray(content)) {
      const sections: Array<{ title: string; paragraphs: Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }> }> = [];
      let currentSection = { title: '', paragraphs: [] as Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }> };
      let htmlBuffer = '';
      let inHtmlBlock = false;
      
      for (const block of content) {
        if (block.type === 'heading' && block.level === 2) {
          // Save previous section if it has content
          if (currentSection.paragraphs.length > 0) {
            sections.push({ ...currentSection });
          }
          // Start new section
          const title = block.children?.map((child: any) => child.text).join('') || '';
          currentSection = { title, paragraphs: [] };
        } else if (block.type === 'paragraph') {
          // Check if this paragraph contains an image link
          const hasImageLink = block.children?.some((child: any) => 
            child.type === 'link' && child.url && child.url.includes('/uploads/')
          );
          
          if (hasImageLink) {
            // Extract image from link
            const imageChild = block.children?.find((child: any) => 
              child.type === 'link' && child.url && child.url.includes('/uploads/')
            );
            
            if (imageChild) {
              const imageUrl = getStrapiMediaUrl(imageChild.url);
              currentSection.paragraphs.push({
                type: 'image',
                src: imageUrl,
                alt: 'Blog image'
              });
            }
          } else {
            // Regular paragraph processing
            const paragraph = block.children?.map((child: any) => {
              if (child.bold) {
                return `**${child.text}**`;
              }
              return child.text;
            }).join('') || '';
            
            if (paragraph.trim()) {
              // Check if this paragraph starts an HTML block
              if (paragraph.trim() === ':html:') {
                inHtmlBlock = true;
                htmlBuffer = '';
                continue;
              } else if (paragraph.trim() === ':endHtml:') {
                inHtmlBlock = false;
                if (htmlBuffer.trim()) {
                  currentSection.paragraphs.push({
                    type: 'html',
                    content: htmlBuffer.trim()
                  });
                }
                htmlBuffer = '';
                continue;
              } else if (inHtmlBlock) {
                htmlBuffer += paragraph + '\n';
                continue;
              }
              
              const processedParts = processTextWithImages(paragraph);
              if (processedParts.length > 0) {
                currentSection.paragraphs.push(...processedParts);
              }
            }
          }
        } else if (block.type === 'list') {
          // Handle list items - group consecutive list blocks
          const listItems = block.children?.map((item: any) => {
            if (item.type === 'list-item') {
              return item.children?.map((child: any) => {
                if (child.type === 'text') {
                  if (child.bold) {
                    return `**${child.text}**`;
                  }
                  return child.text;
                }
                return '';
              }).join('') || '';
            }
            return '';
          }).filter((item: string) => item.trim()) || [];
          
          if (listItems.length > 0) {
            // Add each list item as a separate paragraph for now
            // The ContentSection component will handle rendering them properly
            listItems.forEach((item: string) => {
              currentSection.paragraphs.push(`<li>${item}</li>`);
            });
          }
        }
      }
      
      // Add the last section
      if (currentSection.paragraphs.length > 0) {
        sections.push({ ...currentSection });
      }
      
      return sections;
    }
    
    // Handle plain string content (fallback)
    if (typeof content === 'string') {
      const lines = content.split('\n');
      const sections: Array<{ title: string; paragraphs: Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }> }> = [];
      let currentSection = { title: '', paragraphs: [] as Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }> };
      let htmlBuffer = '';
      let inHtmlBlock = false;
      
      for (const line of lines) {
        if (line.trim() === ':html:') {
          // Start of HTML block
          inHtmlBlock = true;
          htmlBuffer = '';
          continue;
        } else if (line.trim() === ':endHtml:') {
          // End of HTML block
          inHtmlBlock = false;
          if (htmlBuffer.trim()) {
            currentSection.paragraphs.push({
              type: 'html',
              content: htmlBuffer.trim()
            });
          }
          htmlBuffer = '';
          continue;
        } else if (inHtmlBlock) {
          // We're inside an HTML block, accumulate content
          htmlBuffer += line + '\n';
          continue;
        }
        
        // Regular line processing
        if (line.startsWith('## ')) {
          // Save previous section if it has content
          if (currentSection.paragraphs.length > 0) {
            sections.push({ ...currentSection });
          }
          // Start new section
          currentSection = { title: line.replace('## ', ''), paragraphs: [] };
        } else if (line.trim()) {
          const processedParts = processTextWithImages(line);
          if (processedParts.length > 0) {
            currentSection.paragraphs.push(...processedParts);
          }
        }
      }
      
      // Add the last section
      if (currentSection.paragraphs.length > 0) {
        sections.push({ ...currentSection });
      }
      
      return sections;
    }
    
    // Fallback for any other content type
    return [{
      title: '',
      paragraphs: [String(content || '')]
    }];
  };

  const sections = parseContent(blogData.content);
  const authorInitial = blogData.author.charAt(0).toUpperCase();
  const featuredImageUrl = getStrapiMediaUrl(blogData.featuredImage);
  const authorImageUrl = getStrapiMediaUrl(blogData.authorImage);

  return (
    <>
      <DebugInfo slug={slug} blogData={blogData} error={error} />
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="flex flex-col items-start text-left w-full gap-[16px]">
          <CustomHeader
            text={blogData.title}
            className="w-full"
          />
        </div>

        <div className="flex flex-col text-black pt-[35px]">
          <div className="flex">
            <div className="flex justify-between items-center w-full border-t border-b border-[#D3D3D3] py-5">
              <div className="flex gap-[16px] items-center">
                <div className="object-cover relative flex justify-center">
                  {authorImageUrl ? (
                    <Image
                      src={authorImageUrl}
                      alt={blogData.author}
                      width={48}
                      height={48}
                      className="w-[48px] h-[48px] rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-[48px] h-[48px] bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{authorInitial}</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>By {blogData.author}</h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    {blogData.publication && <p>Published in{blogData.publication}</p>}
                    {blogData.readTime && <p>{blogData.readTime} read</p>}
                    <p>{new Date(blogData.publishedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-[8px]">
                <Image
                  src="/section_images/blog/play.webp"
                  width={24}
                  height={24}
                  alt=""
                />
                <Image
                  src="/section_images/blog/share.webp"
                  width={24}
                  height={24}
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Featured Image with animated background */}
          {featuredImageUrl && (
            <div className="pt-[35px] relative flex justify-center">
              <AnimatedBackground />
              <Image
                src={featuredImageUrl}
                alt={blogData.title}
                width={1160}
                height={500}
                priority
                quality={100}
              />
            </div>
          )}

          {/* Blog Content */}
          <div className="flex flex-col pt-[24px] gap-12">
            {sections.map((section, index) => (
              <ContentSection
                key={index}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>

          {/* More Blogs Section */}
          <div className="mt-16">
            <CustomHeader text="More Blogs" className="text-center" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {otherBlogs.slice(0, 3).map((blog, index) => {
                const featuredImageUrl = getStrapiMediaUrl(blog.featuredImage);
                return (
                  <div
                    key={blog.slug || index}
                    className="bg-white max-w-[360px] h-[528px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
                  >
                    <div className="h-[269px]">
                      {featuredImageUrl ? (
                        <Image
                          src={featuredImageUrl}
                          alt={`Image for ${blog.title}`}
                          width={360}
                          height={209}
                          className="rounded-md object-cover"
                          quality={100}
                        />
                      ) : (
                        <div className="h-[209px] bg-gray-100 rounded-md flex items-center justify-center">
                          <span className="text-gray-400">No Image</span>
                        </div>
                      )}
                      <h6 className="text-gray-400 tracking-widest text-[14px] font-bold uppercase md:mt-4 mb-2">
                        Blog
                      </h6>
                      <p className="font-bold mt-4 text-[20px]">{blog.title}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 flex justify-center w-full cursor-pointer bg-white text-center h-[54px] rounded-b-[20px]">
                      <Link href={`/resource-center/${blog.slug}`} className="text-[#1A69DC] font-semibold">
                        Read More →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <ReadyToGo />
    </>
  );
}

interface ContentSectionProps {
  title: string;
  paragraphs: Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }>;
}

function ContentSection({ title, paragraphs }: ContentSectionProps) {
  const renderTextWithBold = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  // Group consecutive list items into a single ul
  const processParagraphs = (paragraphs: Array<string | { type: 'image'; src: string; alt: string } | { type: 'html'; content: string }>) => {
    const processed: Array<{ type: 'text' | 'image' | 'html' | 'list'; content: any }> = [];
    let currentListItems: string[] = [];

    paragraphs.forEach((paragraph, index) => {
      if (typeof paragraph === 'string' && paragraph.startsWith('<li>') && paragraph.endsWith('</li>')) {
        // It's a list item
        currentListItems.push(paragraph);
      } else {
        // If we have accumulated list items, add them as a group
        if (currentListItems.length > 0) {
          processed.push({
            type: 'list',
            content: currentListItems
          });
          currentListItems = [];
        }
        
        // Add the current paragraph
        if (typeof paragraph === 'object') {
          if (paragraph.type === 'image') {
            processed.push({
              type: 'image',
              content: paragraph
            });
          } else if (paragraph.type === 'html') {
            processed.push({
              type: 'html',
              content: paragraph
            });
          }
        } else {
          processed.push({
            type: 'text',
            content: paragraph
          });
        }
      }
    });

    // Don't forget any remaining list items
    if (currentListItems.length > 0) {
      processed.push({
        type: 'list',
        content: currentListItems
      });
    }

    return processed;
  };

  const processedParagraphs = processParagraphs(paragraphs);

  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="text-[#292929] text-[28px] leading-[36px] font-bold font-plus-jakarta">
        {title}
      </h3>
      <div className="flex flex-col gap-4 text-[16px]">
        {processedParagraphs.map((item, index) => {
          if (item.type === 'image') {
            return (
              <div key={index} className="my-6 flex justify-center">
                <Image
                  src={item.content.src}
                  alt={item.content.alt}
                  width={800}
                  height={400}
                  className="rounded-lg shadow-lg max-w-full h-auto w-full"
                  quality={100}
                />
              </div>
            );
          } else if (item.type === 'html') {
            return (
              <div 
                key={index} 
                className="html-content my-6"
                dangerouslySetInnerHTML={{ __html: item.content.content }}
              />
            );
          } else if (item.type === 'list') {
            return (
              <ul key={index} className="list-disc list-inside space-y-2">
                {item.content.map((listItem: string, listIndex: number) => (
                  <li key={listIndex}>
                    {renderTextWithBold(listItem.replace(/^<li>|<\/li>$/g, ''))}
                  </li>
                ))}
              </ul>
            );
          } else {
            // Handle text content
            return (
              <p key={index}>
                {typeof item.content === 'string' ? renderTextWithBold(item.content) : String(item.content)}
              </p>
            );
          }
        })}
      </div>
    </div>
  );
}
