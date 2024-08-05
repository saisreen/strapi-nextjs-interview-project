import { useRouter } from "next/router";
import { fetchBlogs } from "@/lib/fetchData";
import { useEffect, useState } from "react";
import Image from "next/image";

type Blog = {
  id: number;
  Title: string;
  Slug: string;
  Publish_Date: string;
  Body: string;
  Read_Time: number;
  Image: {
    url: string;
  };
};

const BlogDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        const blogs = await fetchBlogs();
        const selectedBlog = blogs.find((b) => b.id === Number(id));
        setBlog(selectedBlog || null);
      };

      fetchBlog();
    }
  }, [id]);

  if (!blog) return <p>Loading...</p>;

  return (
    <div>
      <h1>{blog.Title}</h1>
      <Image
        src={`http://localhost:1337${blog.Image.url}`}
        alt={blog.Title}
        width={500}
        height={300}
      />
      <p><strong>Publish Date:</strong> {blog.Publish_Date}</p>
      <p><strong>Read Time:</strong> {blog.Read_Time} mins</p>
      <div dangerouslySetInnerHTML={{ __html: blog.Body }} />
    </div>
  );
};

export default BlogDetail;
