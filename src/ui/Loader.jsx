import React from "react";

const Loader = () => {
  return (
    <div class="bg-blueTom-900 fixed inset-0 z-50 flex items-center justify-center">
      <div class="flex flex-col items-center gap-4">
        <div class="border-blueTom-100 h-10 w-10 animate-spin rounded-full border-2 border-t-white"></div>
        <p class="text-blueTom-100 text-sm">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
