/* eslint-disable react-hooks/exhaustive-deps */

import styled from "styled-components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdFileDownloadOff } from "react-icons/md";
import Loader from "../Shared/Animation/Loader";
import Title from "../Shared/TitleContainer/Title";
import { useEffect, useState, useRef } from "react";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

const Api_Key = import.meta.env.VITE_PEXEL_API_KEY;

const PexelVideo = () => {
  const isFetching = useRef(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { query, photos } = useSelector((store) => store.pexel);

  const FetchApi = async () => {
    if (!query) {
      setError(true);
      setErrorMessage("Search query is empty.");
      return;
    }

    setError(false);
    setIsLoading(true);

    try {
      const resp = await fetch(
        `https://api.pexels.com/videos/search?query=${query}&page=${page}`,
        {
          headers: { Authorization: Api_Key },
        }
      );

      if (!resp.ok) {
        setError(true);
        setErrorMessage(resp.statusText);
        return;
      }

      const data = await resp.json();

      page === 1
        ? setVideos(data.videos)
        : setVideos((oldPhotos) => [...oldPhotos, ...data.videos]);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(`An error occurred. Please try again later`);
    }
    setIsLoading(false);
  };

  const ScrollHandler = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.scrollHeight - 30
    ) {
      if (!isFetching.current) {
        isFetching.current = true;
        setPage((oldPage) => oldPage + 1);
        setTimeout(() => {
          isFetching.current = false;
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (!query) return;
    setPage(1);
  }, [query]);

  useEffect(() => {
    FetchApi();
  }, [page, query]);

  useEffect(() => {
    window.addEventListener("scroll", ScrollHandler);
    return () => window.removeEventListener("scroll", ScrollHandler);
  }, []);

  return (
    <Wrapper>
      <IntroContainer photo={photos[12]?.src?.original} />
      <Title title={"pexel"} content={"videos"} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 p-4">
        {error ? (
          <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
            Error Occurred : {errorMessage} Search for another keyword
          </h1>
        ) : (
          videos.map(
            ({ id, video_files, video_pictures, user: { name, url } }) => {
              const video_url = video_files.find(
                (v) => v.quality === "hd"
              )?.link;
              const video_image = video_pictures[1].picture;
              return (
                <div
                  className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer"
                  key={id}
                >
                  <video
                    muted
                    src={video_url}
                    poster={video_image}
                    onTouchEnd={(e) => e.target.pause()}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    onTouchStart={(e) => e.target.play()} // Fix for mobile
                    className="rounded-lg w-full object-cover h-65"
                  ></video>

                  <div className="flex items-center justify-between p-2 container w-full absolute top-90  group-hover:top-[80%] transition-all duration-[500ms] ease-linear">
                    <Link
                      to={url}
                      className="hidden items-center justify-center md:flex gap-2.5"
                    >
                      <img
                        src={video_image}
                        alt={name}
                        className="w-[40px] h-[40px] rounded-full object-cover shadow-xl shadow-black"
                      />
                      <h2 className="font-bold text-[1rem] text-white text">
                        {name}
                      </h2>
                    </Link>
                    <button
                      onClick={() => toast.error("Download is disabled")}
                      className="ml-auto p-2 text-white text-2xl bg-gray-800 rounded-lg font-bold cursor-pointer text-[1.3rem] border border-blue-500 shadow-lg shadow-cyan-500/50"
                    >
                      <MdFileDownloadOff />
                    </button>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>

      {isLoading && <Loader />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ==================================================== */

  .text {
    text-shadow: 2px 2px 3px black;
  }
`;

export default PexelVideo;
