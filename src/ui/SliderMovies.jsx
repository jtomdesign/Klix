import React, { useEffect, useState } from "react";
import { backdropUrl, getMovieGenres } from "../services/apiMovie";
import { FaStar } from "react-icons/fa";
import Button from "./Button";

const SliderMovies = ({ movie }) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    async function getGenre() {
      const data = await getMovieGenres();

      const genres = movie.genre_ids.map((id) =>
        data.genres.filter((genre) => genre.id === id),
      );

      setGenres(genres.flat(genres.length));
    }

    getGenre();
  }, [movie.genre_ids]);

  return (
    <div
      style={{
        // backgroundImage: `url(${backdropUrl(movie.backdrop_path)})`,
        background: `linear-gradient(180deg,rgba(1, 22, 30, 0.3) 10%, rgba(1, 22, 30, 1) 100%),url(${backdropUrl(movie.backdrop_path)})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="flex h-[70vh] w-full items-center"
    >
      <div className="ml-8 w-[60%]">
        <h1 className="text-blueTom-50 font-display font-bold+- mb-5 text-8xl leading-20">
          {movie.title}
        </h1>
        <div className="mt-8 flex gap-2.5">
          <span className="text-blueTom-50 flex items-center gap-3 text-sm font-bold">
            <span>
              <FaStar />
            </span>
            <span>{movie.vote_average.toFixed(1)}</span>
          </span>
          <div>
            <span className="text-blueTom-50 ml-4 rounded p-1 text-sm font-bold">
              {new Date(movie.release_date).getFullYear()}
            </span>
          </div>
          <div>
            {genres.map((genre) => (
              <span
                className="text-blueTom-50 ml-4 rounded p-1 text-sm font-bold"
                key={genre.id}
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <p className="text-blueTom-50 rounded p-1 text-sm">
            {movie.overview}
          </p>
          <div className="mt-5 flex gap-4">
            <Button type={"primary"}>Watch now</Button>
            <Button
              to={`/overview/${movie.mediatype ?? "movie"}/${movie.id}`}
              type={"outline"}
            >
              More info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderMovies;
