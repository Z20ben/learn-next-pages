import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"))
export default function Posts({ posts }) {
  console.log("data posts : ", posts)
  return (
    <>
      <LayoutComponent metaTitle="Posts" metaDescription="Semua informasi postingan" >
        {posts.map((item) => (
          <div key={item.id}>
            <p>{item.id}</p>
            <p><b>{item.title}</b></p>
            <p>{item.body}</p>
          </div>
        ))}
      </LayoutComponent>

    </>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  // Pass data to the page via props
  return { props: { posts } }
}
