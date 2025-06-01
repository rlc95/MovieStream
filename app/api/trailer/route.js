// app/api/trailer/route.js
import ky from 'ky';

export async function POST(req) {
  try {
    const { title, year } = await req.json();
    const query = `${title} ${year} official trailer`;

    const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

    const response = await ky
      .get('https://www.googleapis.com/youtube/v3/search', {
        searchParams: {
          part: 'snippet',
          q: query,
          key: YOUTUBE_API_KEY,
          maxResults: 1,
          type: 'video',
          videoEmbeddable: 'true',
        },
      })
      .json();

    const videoId = response?.items?.[0]?.id?.videoId;

    if (videoId) {
      return Response.json({ videoUrl: `https://www.youtube.com/embed/${videoId}` });
    } else {
      return new Response(JSON.stringify({ message: 'Trailer not found' }), { status: 404 });
    }
  } catch (error) {
    console.error('YouTube API error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
