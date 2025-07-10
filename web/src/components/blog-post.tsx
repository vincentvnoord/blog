import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { specialFont } from '@/lib/fonts';

export const BlogPost = ({ content }: { content: string }) => {
  const cleanContent = content.replace(/\\n/g, '\n');

  return (
    <main className="flex w-full flex-col pt-4 pb-12">
      <ReactMarkdown
        components={{
          h1: ({ ...props }) => <h1 className={`${specialFont.className} text-3xl md:text-5xl font-bold mt-4`} {...props} />,
          h2: ({ ...props }) => <h2 className={`${specialFont.className} text-2xl md:text-3xl font-semibold mt-4`} {...props} />,
          h3: ({ ...props }) => <h3 className={`${specialFont.className} text-2xl font-semibold mt-4`} {...props} />,
          h4: ({ ...props }) => <h4 className={`${specialFont.className} text-2xl font-semibold mt-4`} {...props} />,
          p: ({ ...props }) => <p className="text-md md:text-lg" {...props} />,
          a: ({ href, children }) => <Link
            href={href || '#'}
            className="text-blue-500 hover:underline"
          >
            {children}
          </Link>,
        }}
      >
        {cleanContent}
      </ReactMarkdown>
    </main>
  )
}
