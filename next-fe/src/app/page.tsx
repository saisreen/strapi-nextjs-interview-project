"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { fetchBlogs, fetchVideos } from "@/lib/fetchData";
import { useEffect, useState } from "react";
import Search from "@/components/Search";
import Pagination from "@/components/Pagination";
import Filter from "@/components/Filter";
import Link from "next/link";

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
  category: string;
};

type Video = {
  id: number;
  Title: string;
  Slug: string;
  Publish_Date: string;
  Video_Description: string;
  Duration: number;
  Video?: {
    // Updated: Marked as optional
    url: string;
  };
  category: string;
};

const ITEMS_PER_PAGE = 5;

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState("all");
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const blogsData = await fetchBlogs();
      const videosData = await fetchVideos();
      setBlogs(blogsData);
      setVideos(videosData);
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setPage(1);
  };

  const handleContentTypeChange = (type: string) => {
    setContentType(type);
    setPage(1);
  };

  // Filter blogs based on search query, selected category, and content type
  const filteredBlogs = blogs.filter((blog) => {
    return (
      blog.Title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? blog.category === selectedCategory : true) &&
      (contentType === "blogs" || contentType === "all")
    );
  });

  // Filter videos based on search query, selected category, and content type
  const filteredVideos = videos.filter((video) => {
    return (
      video.Title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? video.category === selectedCategory : true) &&
      (contentType === "videos" || contentType === "all")
    );
  });

  const totalItems =
    (contentType === "blogs" || contentType === "all"
      ? filteredBlogs.length
      : 0) +
    (contentType === "videos" || contentType === "all"
      ? filteredVideos.length
      : 0);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedItems = [
    ...(contentType === "blogs" || contentType === "all"
      ? filteredBlogs
      : []),
    ...(contentType === "videos" || contentType === "all"
      ? filteredVideos
      : []),
  ].slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  // Extract unique categories from blogs and videos
  const categories = Array.from(
    new Set([
      ...blogs.map((blog) => blog.category),
      ...videos.map((video) => video.category),
    ])
  );

  return (
    <main className={styles.main}>
      <Image
        src="/vercel.svg"
        alt="Vercel Logo"
        className={styles.vercelLogo}
        width={100}
        height={24}
      />
      <h1 className={styles.header}>Modern Web Development</h1>
      <Search onSearch={handleSearch} />
      <Filter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        contentType={contentType}
        onContentTypeChange={handleContentTypeChange}
      />
      <div className={styles.contentSection}>
        {paginatedItems.map((item) =>
          item.hasOwnProperty("Body") ? ( // Check if the item is a Blog
            <Link href={`/blogs/${item.id}`} key={item.id}>
              <div className={styles.blogCard}>
                <h3>{item.Title}</h3>
                {item.Image && (
                  <Image
                    src={`http://localhost:1337${item.Image.url}`}
                    alt={item.Title}
                    width={200}
                    height={150}
                    className={styles.blogImage}
                  />
                )}
                <p>
                  <strong>Publish Date:</strong> {item.Publish_Date}
                </p>
                <p>
                  <strong>Read Time:</strong> {item.Read_Time} mins
                </p>
              </div>
            </Link>
          ) : (
            <Link href={`/videos/${item.id}`} key={item.id}>
              <div className={styles.videoCard}>
                <h3>{item.Title}</h3>
                {item.Video && item.Video.url ? ( 
                  <video
                    controls
                    width="200"
                    height="150"
                    className={styles.video}
                  >
                    <source
                      src={`http://localhost:1337${item.Video.url}`}
                      type="video/mp4"
                    />
                  </video>
                ) : (
                  <p>Video not available</p>
                )}
                <p>
                  <strong>Publish Date:</strong> {item.Publish_Date}
                </p>
                <p>
                  <strong>Duration:</strong> {item.Duration} mins
                </p>
              </div>
            </Link>
          )
        )}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </main>
  );
}
