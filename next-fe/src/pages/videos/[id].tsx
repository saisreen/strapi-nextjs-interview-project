import { useRouter } from "next/router";
import { fetchVideos } from "@/lib/fetchData";
import { useEffect, useState } from "react";

type Video = {
  id: number;
  Title: string;
  Slug: string;
  Publish_Date: string;
  Video_Description: string;
  Duration: number;
  Video: {
    url: string;
  };
};

const VideoDetail = () => {
  const router = useRouter();
  const { id } = router.query;
  const [video, setVideo] = useState<Video | null>(null);

  useEffect(() => {
    if (id) {
      const fetchVideo = async () => {
        const videos = await fetchVideos();
        const selectedVideo = videos.find((v) => v.id === Number(id));
        setVideo(selectedVideo || null);
      };

      fetchVideo();
    }
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <div>
      <h1>{video.Title}</h1>
      <video controls width="600">
        <source
          src={`http://localhost:1337${video.Video.url}`}
          type="video/mp4"
        />
      </video>
      <p><strong>Publish Date:</strong> {video.Publish_Date}</p>
      <p><strong>Duration:</strong> {video.Duration} mins</p>
      <div dangerouslySetInnerHTML={{ __html: video.Video_Description }} />
    </div>
  );
};

export default VideoDetail;
