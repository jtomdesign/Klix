import React from "react";
import { posterUrl } from "../services/apiMovie";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";

// const fakeMOvie = {
//   adult: false,
//   backdrop_path: "/oUozq2XHWifwAVOoS1qHU0qfXqM.jpg",
//   genre_ids: [27, 9648, 878],
//   id: 1083381,
//   title: "Backrooms",
//   original_language: "en",
//   original_title: "Backrooms",
//   overview:
//     "A strange doorway appears in the basement of a furniture showroom.",
//   popularity: 457.4145,
//   poster_path: "/rhGx6E3qRNMgj3i5su2oukNHwIQ.jpg",
//   release_date: "2026-05-27",
//   softcore: false,
//   video: false,
//   vote_average: 6.9,
//   vote_count: 787,
// };

const MovieCard = ({ movie, size = "w-full", toDelete = null }) => {
  return (
    <Link
      to={`/overview/${movie.media_type ?? "movie"}/${movie.id}`}
      className={`m-3 inline-block ${size} rounded-md p-3`}
    >
      <img
        className="w-full rounded-lg"
        src={posterUrl(movie.poster_path)}
        alt={movie.name ?? movie.title}
      />
      <div className="mt-3 flex justify-between">
        <div>
          <p className="text-blueTom-50 mb-2 text-sm leading-4 font-bold">
            {movie.name ?? movie.title}
          </p>
          <p className="text-blueTom-200 text-sm font-bold">
            {new Date(movie.first_air_date).getFullYear() ||
              new Date(movie.release_date).getFullYear()}
          </p>
        </div>
        {toDelete && (
          <div onClick={toDelete} role="button">
            <FaTrash className="text-blueTom-200 text-sm font-bold" />
          </div>
        )}
      </div>
    </Link>
  );
};

export default MovieCard;
