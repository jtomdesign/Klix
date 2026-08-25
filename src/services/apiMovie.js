const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
export const posterUrl = (path, size = "original") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
export const backdropUrl = (path, size = "original") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;
export const profileUrl = (path, size = "w185") =>
  path ? `${IMAGE_BASE_URL}/${size}${path}` : null;

// ─── Core Fetcher ───────────────────────────────────────────────────────────

async function tmdb(endpoint, params = {}) {
  try {
    const url = new URL(`${BASE_URL}${endpoint}`);
    url.searchParams.set("api_key", API_KEY);
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) url.searchParams.set(k, v);
    });

    const res = await fetch(url.toString());
    if (!res.ok) throw new Error(`TMDB error ${res.status}: ${res.statusText}`);

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(`[TMDB] ${endpoint}`, error.message);
    return null;
  }
}

// ─── MOVIES ─────────────────────────────────────────────────────────────────

export async function getTrendingMovies(time_window = "week") {
  const data = await tmdb(`/trending/movie/${time_window}`);
  return data;
}

export async function getPopularMovies(page = 1) {
  const data = await tmdb("/movie/popular", { page });
  return data;
}

export async function getNowPlayingMovies(page = 1) {
  const data = await tmdb("/movie/now_playing", { page });
  return data;
}

export async function getUpcomingMovies(page = 1) {
  const data = await tmdb("/movie/upcoming", { page });
  return data;
}

export async function getTopRatedMovies(page = 1) {
  const data = await tmdb("/movie/top_rated", { page });
  return data;
}

export async function getMovieDetails(movie_id) {
  const data = await tmdb(`/movie/${movie_id}`, {
    append_to_response: "credits,videos,images,similar,recommendations,reviews",
  });
  return data;
}

export async function getMovieCredits(movie_id) {
  const data = await tmdb(`/movie/${movie_id}/credits`);
  return data;
}

export async function getMovieVideos(movie_id) {
  const data = await tmdb(`/movie/${movie_id}/videos`);
  return data;
}

export async function getMovieImages(movie_id) {
  const data = await tmdb(`/movie/${movie_id}/images`);
  return data;
}

export async function getSimilarMovies(movie_id, page = 1) {
  const data = await tmdb(`/movie/${movie_id}/similar`, { page });
  return data;
}

export async function getMovieRecommendations(movie_id, page = 1) {
  const data = await tmdb(`/movie/${movie_id}/recommendations`, { page });
  return data;
}

export async function getMovieReviews(movie_id, page = 1) {
  const data = await tmdb(`/movie/${movie_id}/reviews`, { page });
  return data;
}

export async function getMovieWatchProviders(movie_id) {
  const data = await tmdb(`/movie/${movie_id}/watch/providers`);
  return data;
}

export async function getMovieExternalIds(movie_id) {
  const data = await tmdb(`/movie/${movie_id}/external_ids`);
  return data;
}

// ─── TV SHOWS ────────────────────────────────────────────────────────────────

export async function getTrendingTV(time_window = "week") {
  const data = await tmdb(`/trending/tv/${time_window}`);
  return data;
}

export async function getPopularTV(page = 1) {
  const data = await tmdb("/tv/popular", { page });
  return data;
}

export async function getAiringTodayTV(page = 1) {
  const data = await tmdb("/tv/airing_today", { page });
  return data;
}

export async function getOnTheAirTV(page = 1) {
  const data = await tmdb("/tv/on_the_air", { page });
  return data;
}

export async function getTopRatedTV(page = 1) {
  const data = await tmdb("/tv/top_rated", { page });
  return data;
}

export async function getTVDetails(tv_id) {
  const data = await tmdb(`/tv/${tv_id}`, {
    append_to_response: "credits,videos,images,similar,recommendations,reviews",
  });
  return data;
}

export async function getTVSeasonDetails(tv_id, season_number) {
  const data = await tmdb(`/tv/${tv_id}/season/${season_number}`);
  return data;
}

export async function getTVEpisodeDetails(
  tv_id,
  season_number,
  episode_number,
) {
  const data = await tmdb(
    `/tv/${tv_id}/season/${season_number}/episode/${episode_number}`,
  );
  return data;
}

export async function getTVCredits(tv_id) {
  const data = await tmdb(`/tv/${tv_id}/credits`);
  return data;
}

export async function getTVVideos(tv_id) {
  const data = await tmdb(`/tv/${tv_id}/videos`);
  return data;
}

export async function getTVImages(tv_id) {
  const data = await tmdb(`/tv/${tv_id}/images`);
  return data;
}

export async function getSimilarTV(tv_id, page = 1) {
  const data = await tmdb(`/tv/${tv_id}/similar`, { page });
  return data;
}

export async function getTVRecommendations(tv_id, page = 1) {
  const data = await tmdb(`/tv/${tv_id}/recommendations`, { page });
  return data;
}

export async function getTVWatchProviders(tv_id) {
  const data = await tmdb(`/tv/${tv_id}/watch/providers`);
  return data;
}

export async function getTVExternalIds(tv_id) {
  const data = await tmdb(`/tv/${tv_id}/external_ids`);
  return data;
}

// ─── PEOPLE ──────────────────────────────────────────────────────────────────

export async function getPopularPeople(page = 1) {
  const data = await tmdb("/person/popular", { page });
  return data;
}

export async function getPersonDetails(person_id) {
  const data = await tmdb(`/person/${person_id}`, {
    append_to_response: "movie_credits,tv_credits,images,external_ids",
  });
  return data;
}

export async function getPersonMovieCredits(person_id) {
  const data = await tmdb(`/person/${person_id}/movie_credits`);
  return data;
}

export async function getPersonTVCredits(person_id) {
  const data = await tmdb(`/person/${person_id}/tv_credits`);
  return data;
}

export async function getPersonImages(person_id) {
  const data = await tmdb(`/person/${person_id}/images`);
  return data;
}

// ─── SEARCH ──────────────────────────────────────────────────────────────────

export async function searchMovies(query, page = 1) {
  const data = await tmdb("/search/movie", { query, page });
  return data;
}

export async function searchTV(query, page = 1) {
  const data = await tmdb("/search/tv", { query, page });
  return data;
}

export async function searchPeople(query, page = 1) {
  const data = await tmdb("/search/person", { query, page });
  return data;
}

export async function searchMulti(query, page = 1) {
  const data = await tmdb("/search/multi", { query, page });
  return data;
}

// ─── DISCOVER ────────────────────────────────────────────────────────────────

export async function discoverMovies(filters = {}) {
  const data = await tmdb("/discover/movie", filters);
  return data;
}

export async function discoverTV(filters = {}) {
  const data = await tmdb("/discover/tv", filters);
  return data;
}

// ─── GENRES ──────────────────────────────────────────────────────────────────

export async function getMovieGenres() {
  const data = await tmdb("/genre/movie/list");
  return data;
}

export async function getTVGenres() {
  const data = await tmdb("/genre/tv/list");
  return data;
}

// ─── CONFIGURATION ───────────────────────────────────────────────────────────

export async function getConfiguration() {
  const data = await tmdb("/configuration");
  return data;
}

export async function getLanguages() {
  const data = await tmdb("/configuration/languages");
  return data;
}

export async function getCountries() {
  const data = await tmdb("/configuration/countries");
  return data;
}

// ─── WATCH PROVIDERS ─────────────────────────────────────────────────────────

export async function getMovieProviders(watch_region = "US") {
  const data = await tmdb("/watch/providers/movie", { watch_region });
  return data;
}

export async function getTVProviders(watch_region = "US") {
  const data = await tmdb("/watch/providers/tv", { watch_region });
  return data;
}

// ─── COLLECTIONS & COMPANIES ─────────────────────────────────────────────────

export async function getCollection(collection_id) {
  const data = await tmdb(`/collection/${collection_id}`);
  return data;
}

export async function getNetwork(network_id) {
  const data = await tmdb(`/network/${network_id}`);
  return data;
}

export async function getCompany(company_id) {
  const data = await tmdb(`/company/${company_id}`);
  return data;
}
