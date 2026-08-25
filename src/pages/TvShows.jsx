import React, { useEffect } from "react";
import { Link, replace, useFetcher, useNavigate } from "react-router-dom";
import MovieCard from "../ui/MovieCard";

const TvShows = () => {
  const fetcher = useFetcher("/");
  useEffect(() => {
    if (!fetcher?.data && fetcher.state === "idle") fetcher.load("/");
  }, [fetcher]);
  const movies = fetcher?.data?.trendingTV;

  return (
    <div className="mx-auto flex w-full flex-wrap">
      {movies?.map((movie) => (
        <MovieCard movie={movie} size="w-48" />
      ))}
    </div>
  );
};

export default TvShows;
