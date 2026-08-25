import React, { useEffect } from "react";
import { Link, replace, useFetcher, useNavigate } from "react-router-dom";
import MovieCard from "../ui/MovieCard";

const Movies = () => {
  const fetcher = useFetcher("/");
  const navigate = useNavigate();
  useEffect(() => {
    if (!fetcher?.data && fetcher.state === "idle") fetcher.load("/");
  }, [fetcher]);
  const movies = fetcher?.data?.trendingMovies;

  return (
    <div className="mx-auto flex w-full flex-wrap">
      {movies?.map((movie) => (
        <MovieCard movie={movie} size="w-48" />
      ))}
    </div>
  );
};

export default Movies;
