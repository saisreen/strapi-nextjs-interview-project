

export async function fetchBlogs(page = 1, limit = 5) {
  try {
    const res = await fetch(`http://localhost:1337/api/blogs?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}

export async function fetchVideos(page = 1, limit = 5) {
  try {
    const res = await fetch(`http://localhost:1337/api/videos?page=${page}&limit=${limit}`);
    if (!res.ok) {
      throw new Error("Failed to fetch videos");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching videos:", error);
    return null;
  }
}
