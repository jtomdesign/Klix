import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteToSaved, getSavedMovies } from "../features/Saved/saveSlice";
import MovieCard from "../ui/MovieCard";

const Bookmark = () => {
  const saved = useSelector(getSavedMovies);
  const dispatch = useDispatch();

  return (
    <div className="mx-auto flex w-full flex-wrap">
      {saved?.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.id}
          size="w-48"
          toDelete={(e) => {
            e.preventDefault();
            dispatch(deleteToSaved(movie.id));
          }}
        />
      ))}
    </div>
  );
};

export default Bookmark;
