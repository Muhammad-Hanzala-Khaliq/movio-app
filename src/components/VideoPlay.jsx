import React from "react";
import { IoIosClose } from "react-icons/io";
import useFetchDeatail from "../hooks/useFetchDetail";

const VideoPlay = ({ data, close, media_type }) => {
  const {
    data: videoData,
    loading,
    error,
  } = useFetchDeatail(`/${media_type}/${data?.id}/videos`);

  console.log("Video data:", videoData);
  console.log("Loading:", loading);
  console.log("Error:", error);

  // Check if videoData and videoData.results exist and have at least one element
  const videoKey =
    videoData?.results?.length > 0 ? videoData.results[0].key : null;

  return (
    <section className="fixed bg-neutral-700 top-0 right-0 bottom-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
      <div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded relative">
        <button className="absolute -right-2 -top-5 text-3xl" onClick={close}>
          <IoIosClose />
        </button>

        {loading ? (
          <div className="w-full h-full flex items-center justify-center text-white">
            Loading...
          </div>
        ) : error ? (
          <div className="w-full h-full flex items-center justify-center text-white">
            Error loading video
          </div>
        ) : videoKey ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}`}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            No video available
          </div>
        )}
      </div>
    </section>
  );
};

export default VideoPlay;
