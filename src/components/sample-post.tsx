"use client";

import { PostWrapper } from "@/components/post/post-wrapper";
import { UserPost } from "@/components/post/user-post";
import { CodeBlock } from "@/components/ui/code-block";
import { NestedPost } from "@/types/nested-posts";
import { Image, Link } from "@heroui/react";

function getFakeDartilesPost(posts: NestedPost[]) {
  const post = posts[0];
  return {
    ...post,
    user: {
      id: "user_2x1BsnAmgPArzn4l8kjqSpVB8bf",
      username: "dartilesm",
      display_name: "Diego Artiles",
      image_url:
        "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ2l0aHViL2ltZ18yeDFCc3RqSFI5VTBBT2JXV2NqMkxZSWJLOVUifQ",
      bio: "Senior Frontend Engineer 🚀",
      location: "Buenos Aires, Argentina",
      website: "https://dartiles.dev",
    },
  };
}

export function SamplePost({ posts }: { posts: NestedPost[] }) {
  const dartilesPost = getFakeDartilesPost(posts);

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <PostWrapper>
        <UserPost post={dartilesPost} isSamplePost>
          <div className='flex flex-col gap-2 overflow-hidden w-full text-wrap'>
            <div className='text-sm text-wrap w-full'>
              Este es un <strong>post hardcodeado</strong> de ejemplo de lo que se podrá hacer
              próximamente, la idea es que se pueda crear posts con Markdown con soporte a ciertos
              tipos de textos y contenidos, como compartir imagenes y/o snippets de código, etc.{" "}
              <Link href='/@midudev' className='[font-size:inherit]'>
                @midudev
              </Link>
            </div>
            <CodeBlock
              hideSymbol
              className='max-w-full'
              code={`const hello = "hello";
const midu = "midu";

const helloMidu = hello + " " + midu;

console.log(helloMidu);
// Output: hello midu
`}
              tooltipProps={{
                content: "Copy code",
                color: "primary",
              }}
            />
            <div className='flex flex-row gap-2'>
              <Image
                src='https://picsum.photos/200/300'
                alt='dartilesm'
                classNames={{
                  wrapper: "h-[300px] w-auto aspect-[200/300]",
                }}
              />
              <Image
                src='https://picsum.photos/200/300?random=2'
                alt='dartilesm'
                classNames={{
                  wrapper: "h-[300px] w-auto aspect-[200/300]",
                }}
              />
            </div>
          </div>
        </UserPost>
      </PostWrapper>
    </div>
  );
}
