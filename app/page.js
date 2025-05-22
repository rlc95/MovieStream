"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getMovies } from "@/lib/apis/client";
import { FaStar } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Navbar from "@/components/navbar";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const limit = 8;

  // Fetch movies (paginated, optionally filtered)
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const res = await getMovies({
        page,
        limit,
        search: search.trim() !== "" ? search : undefined,
      });

      console.log("data", res);

      if (!res.error) {
        setMovies(res.data);
        setTotalPages(res.totalPages);
      }

      setLoading(false);
    };

    fetchMovies();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page when searching
  };

  const download_movie = (downldurl) => {
    const fileName = downldurl;
    const url = `/torrents/${encodeURIComponent(fileName)}`;

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="h-full w-full overflow-y-auto max-h-[800px] scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-800">
      <div className="container space-y-6 my-12 z-20 pb-32">
        <Navbar search={search} onSearchChange={handleSearchChange} />

        {loading ? (
          <div className="text-center text-white/70">Loading movies...</div>
        ) : movies.length === 0 ? (
          <div className="text-center text-white/70">No movies found.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {movies.map((movie) => (
                <div key={movie?._id} className="h-[480px]">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>
                        {movie?.title}{" "}
                        <span className="text-xs text-neutral-400 font-normal">
                          - {movie?.year ?? "N/A"}
                        </span>
                      </CardTitle>
                      <CardDescription className="sr-only">
                        {movie?.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center bg-black w-full h-[220px] mb-4 rounded">
                        {movie?.poster && (
                          <Image
                            src={movie?.poster}
                            alt={movie?.title}
                            width={200}
                            height={400}
                            className="h-full w-auto object-contain"
                            priority={true}
                          />
                        )}
                      </div>
                      <div className="flex flex-col justify-between h-[154px]">
                        <p className="line-clamp-3 text-xs">{movie?.plot}</p>
                        <div className="text-sm text-blue-900 font-semibold">
                          {movie?.genres?.join(" / ")}
                        </div>
                        <div className="flex flex-row justify-between items-center">
                          <Badge variant="success" className="font-medium">
                            Rated: {movie?.rated ?? "N/A"}
                          </Badge>

                          <Badge
                            variant="success"
                            className="font-medium cursor-pointer"
                            onClick={() => download_movie(movie.download)}
                          >
                            <Download className="w-3 h-3.5 mr-1" /> Download
                          </Badge>

                          <div
                            className="flex flex-row gap-1 items-center"
                            title="IMDb Rating"
                          >
                            <FaStar className="text-yellow-500" />
                            <span className="text-sm font-semibold">
                              {movie?.imdb?.rating ?? 0}/10
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <Button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Previous
              </Button>
              <span className="text-white/70 text-sm">
                Page {page} of {totalPages}
              </span>
              <Button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
