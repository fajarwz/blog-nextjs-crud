import { fetchPosts } from "@/db/queries/posts";
import Link from "next/link";
import PostDelete from "@/components/post-delete";

export default async function Home() {
  const posts = await fetchPosts()
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      <div className="mb-4">
        <Link href="/posts/create" className="bg-white px-4 py-2 rounded">Create Post</Link>
      </div>
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {posts.map(post => {
          return <div key={post.id}>
            <div className="mb-4">
              <Link
                key={post.id}
                href={`/posts/${post.id}/edit`}
                className=""
              >
                <h2 className={`mb-3 text-2xl font-semibold`}>
                  {post.title}
                </h2>
              </Link>
              <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>
                {post.content}
              </p>
            </div>
            <div className="text-sm opacity-30">{'Updated at ' + post.updatedAt.toLocaleDateString("en-US", dateOptions)}</div>
            <PostDelete id={post.id} />
          </div>
        })}
      </div>
    </main>
  );
}
