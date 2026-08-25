import React from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import {
  backdropUrl,
  getMovieDetails,
  getTVDetails,
  posterUrl,
} from "../services/apiMovie";
import { FaStar } from "react-icons/fa";
import Button from "../ui/Button";
import MoviePlayer from "../ui/Player";
import { HiBookmark } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { addToSaved } from "../features/Saved/saveSlice";

const Overview = () => {
  const movie = useLoaderData();
  const hours = Math.floor(movie.runtime / 60);
  const mins = movie.runtime % 60;
  const params = useParams();
  const navigate = useNavigate();
  console.log(movie);
  const dispatch = useDispatch();

  const toSaved = {
    ...movie,
    media_type: params.mediatype,
  };

  console.log(toSaved);

  return (
    <div>
      <div
        style={{
          // backgroundImage: `url(${backdropUrl(movie.backdrop_path)})`,
          background: `linear-gradient(180deg,rgba(1, 22, 30, 0.3) 0%, rgba(1, 22, 30, 1) 90%),url(${backdropUrl(movie.backdrop_path)})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="relative flex h-[70vh] w-full flex-col items-center justify-center"
      >
        <span className="absolute top-4 left-4">
          <Button onClick={() => navigate(-1)} type={"small"}>
            &larr; Back
          </Button>
        </span>
        <div className="flex items-center justify-center">
          <div>
            <img
              className="w-80 rounded-3xl"
              src={posterUrl(movie.poster_path)}
              alt=""
            />
          </div>
          <div className="ml-8 w-full">
            <div className="mb-8 flex gap-2.5">
              <span className="text-blueTom-50 flex items-center gap-3 rounded bg-blue-400 p-1.5 text-[0.7rem] font-bold uppercase">
                {params.mediatype}
              </span>
              <span className="text-blueTom-50 flex items-center gap-3 text-sm font-bold">
                <span>
                  <FaStar />
                </span>
                <span>{movie.vote_average.toFixed(1)}</span>
              </span>
              <span className="text-blueTom-50 flex items-center gap-3 text-sm font-bold">
                <span>
                  {!hours && !mins
                    ? `${movie.number_of_seasons}  ${movie.number_of_seasons <= 1 ? "Season" : "Seasons"}`
                    : `${hours}h ${mins}m`}
                </span>
              </span>
              <div>
                <span className="text-blueTom-50 ml-4 rounded p-1 text-sm font-bold">
                  {new Date(
                    movie.release_date ?? movie.first_air_date,
                  ).getFullYear()}
                </span>
              </div>
              <div>
                {movie.genres.map((genre) => (
                  <span
                    className="text-blueTom-50 ml-4 rounded p-1 text-sm font-bold"
                    key={genre.id}
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="text-blueTom-50 font-display font-bold+- mb-5 text-8xl leading-20">
              {movie.title ?? movie.name}
            </h1>
            <div className="mt-7 flex gap-4">
              <Button
                type={"primary"}
                onClick={() => dispatch(addToSaved(toSaved))}
              >
                <HiBookmark className="text-2xl" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        <MoviePlayer imdbId={movie.imdb_id} type={params.mediatype} />
      </div> */}
    </div>
  );
};

export default Overview;

export async function loader({ params }) {
  let data;
  if (params.mediatype === "movie") data = await getMovieDetails(params.id);
  if (params.mediatype === "tv") data = await getTVDetails(params.id);

  return data;
}
