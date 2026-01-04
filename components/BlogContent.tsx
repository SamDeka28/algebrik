"use client"
import { motion } from "framer-motion";

interface BlogContentProps {
  sections: Array<{ title: string; paragraphs: string[] }>;
}

export default function BlogContent({ sections }: BlogContentProps) {
  return (
    <div className="flex flex-col gap-[32px] pt-[32px]">
      {sections.map((section, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="flex flex-col gap-[16px]"
        >
          {section.title && (
            <h2 className="text-[#1A1A1A] font-plus-jakarta font-bold text-[24px] leading-[32px]">
              {section.title}
            </h2>
          )}
          <div className="flex flex-col gap-[16px]">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[#1A1A1A] font-plus-jakarta text-[16px] leading-[24px]"
                      dangerouslySetInnerHTML={{
                        __html: paragraph
                      }}
                    />
                  ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
