// pages/index.js
"use client"
import ReadyToGo from "@/components/about_page/ReadyToGo";
import { blogContent } from "@/components/constant/blogs";
import { CustomHeader } from "@/components/CustomHeader";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const lendingData = {
  "title": "The Death of the Branch? How Digital-First Credit Unions Are Winning Member Loyalty",
  "author": "Prateek Samantaray",
  "sections": [
    {
      title: "",
      paragraphs: [
        "Once upon a time, walking into your local credit union felt like stepping into a community hub—personalized service, friendly conversations, and maybe even a free coffee. But today, members aren’t walking in as often. Instead, they’re logging in.",
        "The rise of digital-first banking has reshaped expectations. Members now demand seamless, 24/7 access to financial services, intuitive mobile experiences, and AI-driven support. The question is: Are credit unions keeping up, or are they falling behind?"
      ]
    },
    {
      "title": "The Numbers Don’t Lie",
      "paragraphs": [
        <strong>✔ 80% of credit union members say digital experience is a key factor in their loyalty.</strong>
        , <strong>✔ 48% of Gen Z and Millennials prefer using mobile apps for banking over in-person visits.</strong>
        , <strong>✔ More than 30% of members will switch institutions if their digital experience is outdated.</strong>

      ]
    },
    {
      "title": "The Credit Union Dilemma",
      "paragraphs": [
        "Big banks and fintech disruptors have embraced automation, AI-driven lending, and digital self-service, but many credit unions are still dependent on legacy systems. The problem? Digital lag can mean member churn.",
        <span><strong>Case in Point:</strong> A 2024 survey by McKinsey found that 65% of credit union members felt their institution’s online experience was “outdated” compared to digital banks. If members struggle to apply for loans, check balances, or resolve issues online, they won’t hesitate to look elsewhere.</span>
      ]
    },
    {
      "title": "The 3 Pillars of Digital Transformation—More Than Just an App",
      "paragraphs": [
        "Think going digital just means launching a shiny new mobile app? Think again. True digital transformation isn’t about tech for tech’s sake—it’s about reimagining how members interact with their credit union.",
        <div>
          <h5 className="text-xl font-semibold">Here’s what winning credit unions are getting right:</h5>
          <ul className="list-disc ml-4 mt-4">
            <li><strong>Seamless Digital Onboarding –</strong> Remember when opening an account meant an endless stack of paperwork? Today, members expect to sign up in minutes, not days, with AI-powered verifications, e-signatures, and instant loan approvals. If your process feels like DMV paperwork, members won’t stick around.</li>
            <li><strong>Omnichannel Engagement –</strong> Whether it’s a mobile app, AI chatbot, or live video chat, members expect answers on their terms, when they need them. No one wants to call a branch and wait on hold just to check their balance.</li>
            <li><strong>Data-Driven Personalization –</strong> People love when Netflix suggests the perfect show—why should banking be any different? Credit unions that leverage AI can offer tailored loan products, proactive fraud alerts, and personalized financial advice—all without losing that human touch.
            </li>
          </ul>
        </div>
      ]
    },
    {
      "title": "Going Digital Without Losing the Human Touch",
      "paragraphs": [
        "Let’s be real—no one wants their credit union to feel like a chatbot factory. Members may love the convenience of instant loan approvals and AI-powered insights, but they also want to know a real person is there when it matters.",
        "Here’s how credit unions can balance automation with the personal touch:",
        "✔ Blend AI with Human Support – AI can answer FAQs, process routine loans, and detect fraud, but complex financial decisions? That’s where human expertise shines. Winning credit unions ensure seamless hand-offs between AI and live agents.",
        "✔ Keep Branches Relevant – The branch isn’t dead—it’s just evolving. Credit unions are reinventing physical spaces as advisory hubs for financial planning, big-ticket loans, and hands-on support. Some are even adding appointment-based services for a VIP experience.",
        "✔ Use Data to Personalize, Not Just Automate – Members don’t want generic emails—they want relevant, proactive outreach. AI can flag when someone might need a credit line increase, mortgage refi, or savings boost, allowing loan officers to reach out at the right time."
      ]
    },
    {
      "title": "Future-Proofing Member Engagement",
      "paragraphs": [
        "Digital transformation isn’t a one-time upgrade—it’s an ongoing evolution. The credit unions that will thrive aren’t just the ones adopting tech, but those rethinking how they serve members in a digital-first world.",
      ]
    },
    {
      "title": "Key Takeaways for a Winning Digital Strategy:",
      "paragraphs": [
        <span><strong>Meet Members Where They Are –</strong> Mobile, desktop, in-branch, AI chatbot—they should all feel seamless.</span>,
        <span><strong>Don’t Automate Everything –</strong> AI is powerful, but complex financial decisions still need a human touch.</span>,
        <span><strong>Use Data for Good –</strong> Proactively offer loans, fraud alerts, or financial wellness tools before members ask for them.</span>,
        <span><strong>Make Digital an Experience, Not Just a Service – </strong>The best credit unions don’t just process transactions; they guide, advise, and empower members through technology.</span>,
        "Digital-first doesn’t mean member-last. The future belongs to credit unions that combine technology with trust, efficiency with empathy, and automation with authenticity.",
        <span>Want to transform your credit union’s digital experience? See how Algebrik AI’s adaptive lending solutions can help you engage members, automate efficiency, and stay ahead. <a href="/contact">Get in touch today!</a></span>
      ]
    },
  ]
}


export default function Blog() {
  const pathname = usePathname();
  // Extract the slug from pathname like /resource-center/slug-name
  const pathSegments = pathname.split('/').filter(Boolean);
  const currentBlogSlug = pathSegments[pathSegments.length - 1] || '';
  
  // Filter out the current blog article
  const otherBlogs = blogContent.filter(
    (blog) => blog.blogSubtitle !== currentBlogSlug
  );

  return (
    <>
      <div className="container mx-auto px-5 md:px-0 py-36 md:w-[1160px] font-plus-jakarta flex flex-col justify-center items-center">
        <div className="flex flex-col items-start text-left w-full gap-[16px]">
          <CustomHeader
            text="The Death of the Branch? How Digital-First Credit Unions Are Winning Member Loyalty"
            className="w-full"
          />
          {/* Uncomment if needed */}
          {/* <CustomSubtitle
          text="The success of any financial system lies in its ability to adapt and serve its people"
          className="w-full"
        /> */}
        </div>

        <div className="flex flex-col text-black pt-[35px]">
          <div className="flex">
            <div className="flex justify-between items-center w-full border-t border-[#D3D3D3] border-b border-[#D3D3D3] py-5">
              <div className="flex gap-[16px] items-center">
                <div className=" object-cover">
                  <Image
                    src="/section_images/blog/pra.webp"
                    className="rounded-[184.59px] object-cover h-[48px]"
                    objectFit="cover"
                    width={48}
                    height={48}
                    alt=""
                    priority
                    quality={100}
                  />
                </div>
                <div className="flex flex-col">
                  <div>
                    <h3>Prateek Samantaray          </h3>
                  </div>
                  <div className="flex flex-col md:flex-row md:gap-4">
                    <h4>
                      Published in <span>The Startup</span>
                    </h4>
                    <p>8 min read</p>
                    <p>Jan 26, 2025</p>
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

          <div className="pt-[35px]">
            <Image
              src="/section_images/blog/6.webp"
              width={1160}
              height={500}
              alt=""
              priority
              quality={100}
            />
          </div>

          <div className="flex flex-col pt-[24px] gap-5">
            {lendingData.sections.map((section, index) => (
              <ContentSection
                key={index}
                title={section.title}
                paragraphs={section.paragraphs}
              />
            ))}
          </div>
          <div className="pt-[35px]">
            <Image
              src="/section_images/blog/6.webp"
              width={1160}
              height={500}
              alt=""
              priority
              quality={100}
            />
          </div>

          <div className="mt-16">
            <CustomHeader text="More Blogs" className="text-center" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
              {otherBlogs.slice(0, 3).map((blog, index) => (
                <div
                  key={index}
                  className="bg-white max-w-[360px] h-[528px] text-gray-900 rounded-[20px] shadow p-6 relative flex flex-col"
                >
                  <div className="h-[269px]">
                    <Image
                      src={blog.blogImage}
                      alt={`Image for ${blog.blogTitle}`}
                      width={360}
                      height={209}
                      className="rounded-md object-cover"
                      quality={100}
                    />
                    <h6 className="text-gray-400 tracking-widest text-[14px] font-bold uppercase md:mt-4 mb-2">
                      Blog
                    </h6>
                    <p className="font-bold mt-4 text-[20px]">{blog.blogTitle}</p>
                  </div>
                  <div className="absolute bottom-0 left-0 flex justify-center w-full cursor-pointer bg-white text-center h-[54px] rounded-b-[20px]">
                    <Link href={`/resource-center/${blog.blogSubtitle.toLowerCase().replace(/ /g, "-")}`} className="text-[#1A69DC] font-semibold">
                      Read More →
                    </Link>
                  </div>
                </div>
              ))}
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
  paragraphs: any[];
}

function ContentSection({ title, paragraphs }: ContentSectionProps) {
  return (
    <div className="flex flex-col gap-[16px]">
      <h3 className="text-[#292929] text-[20px] leading-[28.13px] font-bold font-plus-jakarta">
        {title}
      </h3>
      <div className="flex flex-col gap-4 text-[16px]">
        {paragraphs.map((paragraph, index) => (
          <p key={index} className="flex flex-col gap-4">
            {paragraph}
          </p>
        ))}
      </div>


    </div>
  );
}
