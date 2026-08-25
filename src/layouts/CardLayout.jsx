import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MovieCard from "../ui/MovieCard";

const CardLayout = ({ movies }) => {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2,
    },
    breakpoints: {
      "(min-width: 480px)": {
        slides: { perView: 3 },
      },
      "(min-width: 640px)": {
        slides: { perView: 4 },
      },
      "(min-width: 768px)": {
        slides: { perView: 5 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 6 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 8 },
      },
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider">
      {movies.map((movie) => (
        <div key={movie.id} className="keen-slider__slide">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default CardLayout;
