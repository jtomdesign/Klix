import { useState } from "react";

const EMBED_SOURCES = [
  (type, id) => `https://vidsrc.to/embed/${type}/${id}`,
  (type, id) => `https://autoembed.cc/embed/${type}/${id}`,
  (type, id) => `https://embed.su/embed/${type}/${id}`,
  (type, id) => `https://vidlink.pro/${type}/${id}`,
  (type, id) => `https://2embed.org/embed/${type}/${id}`,
  (type, id) => `https://streamimdb.me/embed/${type}/${id}`,
];

export default function MoviePlayer({ type, imdbId }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const [key, setKey] = useState(0);

  const currentUrl = EMBED_SOURCES[sourceIndex](type, imdbId);

  const nextSource = () => {
    if (sourceIndex < EMBED_SOURCES.length - 1) {
      setSourceIndex((i) => i + 1);
      setKey((k) => k + 1);
    }
  };

  const prevSource = () => {
    if (sourceIndex > 0) {
      setSourceIndex((i) => i - 1);
      setKey((k) => k + 1);
    }
  };

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-6">
      {/* Player Container */}
      <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-2xl shadow-black/50">
        <iframe
          key={key}
          src={currentUrl}
          width="100%"
          height="540"
          allowFullScreen
          frameBorder="0"
          className="aspect-video w-full md:aspect-auto"
          title="Stream"
        />
      </div>

      {/* Controls Bar */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={prevSource}
          disabled={sourceIndex === 0}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            sourceIndex === 0
              ? "cursor-not-allowed border-gray-700/50 bg-gray-800/50 text-gray-600"
              : "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white active:scale-95"
          } `}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Previous
        </button>

        <div className="flex flex-col items-center gap-1">
          <span className="text-sm font-medium text-gray-400">
            Source <span className="text-white">{sourceIndex + 1}</span> /{" "}
            {EMBED_SOURCES.length}
          </span>
          <span className="font-mono text-xs text-gray-500">
            {new URL(currentUrl).hostname}
          </span>
        </div>

        <button
          onClick={nextSource}
          disabled={sourceIndex >= EMBED_SOURCES.length - 1}
          className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
            sourceIndex >= EMBED_SOURCES.length - 1
              ? "cursor-not-allowed border-gray-700/50 bg-gray-800/50 text-gray-600"
              : "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white active:scale-95"
          } `}
        >
          Next
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Source Dots Indicator */}
      <div className="mt-3 flex justify-center gap-2">
        {EMBED_SOURCES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setSourceIndex(i);
              setKey((k) => k + 1);
            }}
            className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
              i === sourceIndex
                ? "scale-125 bg-blue-500"
                : "bg-gray-700 hover:bg-gray-500"
            } `}
          />
        ))}
      </div>
    </div>
  );
}
