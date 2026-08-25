import React from "react";
import Slider from "../ui/Slider";
import { useLoaderData } from "react-router-dom";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getPopularTV,
  getTopRatedMovies,
  getTrendingMovies,
  getTrendingTV,
} from "../services/apiMovie";
import TitlePage from "../ui/TitlePage";
import CardLayout from "../layouts/CardLayout";

const Home = () => {
  const data = useLoaderData();

  return (
    <div>
      <Slider movies={data.topRated} />;
      <TitlePage title="Trending" />
      <CardLayout movies={data.trendingMovies} />
      <TitlePage title="Popular Tv shows" />
      <CardLayout movies={data.trendingTV} />
      <TitlePage title="Now playing" />
      <CardLayout movies={data.nowPlaying} />
    </div>
  );
};

export default Home;

export async function loader() {
  const [
    trendingMovies,
    popularMovies,
    nowPlaying,
    topRated,
    trendingTV,
    popularTV,
  ] = await Promise.all([
    getTrendingMovies("week"),
    getPopularMovies(1),
    getNowPlayingMovies(1),
    getTopRatedMovies(1),
    getTrendingTV("week"),
    getPopularTV(1),
  ]);

  return {
    trendingMovies: trendingMovies?.results?.slice(0, 20) ?? [],
    popularMovies: popularMovies?.results?.slice(0, 10) ?? [],
    nowPlaying: nowPlaying?.results?.slice(0, 10) ?? [],
    topRated: topRated?.results?.slice(0, 10) ?? [],
    trendingTV: trendingTV?.results ?? [],
    popularTV: popularTV?.results?.slice(0, 10) ?? [],
    hero: trendingMovies?.results?.[0] ?? null,
  };
}
