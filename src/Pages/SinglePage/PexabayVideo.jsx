/* eslint-disable react-hooks/exhaustive-deps */

import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { MdFileDownloadOff } from "react-icons/md";
import Loader from "../Shared/Animation/Loader";
import Title from "../Shared/TitleContainer/Title";
import { useEffect, useState, useRef } from "react";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

const EndPoint = `https://pixabay.com/api/videos/`;
const Api_Key = `?key=${import.meta.env.VITE_PEXABAY_API_KEY}`;

const PexabayVideo = () => {
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
      const SearchQuery = `&q=${query}`;

      const response = await axios(`${EndPoint}${Api_Key}${SearchQuery}`);

      if (response.status !== 200) {
        setError(true);
        setErrorMessage(response.statusText);
      }

      const {
        data: { hits },
      } = response;

      console.log(hits);

      page === 1
        ? setVideos(hits)
        : setVideos((oldPhotos) => [...oldPhotos, ...hits]);

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
      <IntroContainer photo={photos[8]?.src?.original} />
      <Title title={"pexabay"} content={"videos"} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 p-4">
        {error ? (
          <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
            Error Occurred : {errorMessage} Search for another keyword
          </h1>
        ) : (
          videos.map(
            ({
              id,
              videos: {
                medium: { url, thumbnail },
              },

              userImageURL,
              user,
              user_id,
            }) => {
              return (
                <div
                  className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer"
                  key={id}
                >
                  <video
                    muted
                    src={url}
                    poster={thumbnail}
                    onTouchEnd={(e) => e.target.pause()}
                    onTouchStart={(e) => e.target.play()}
                    onMouseEnter={(e) => e.target.play()}
                    onMouseLeave={(e) => e.target.pause()}
                    className="rounded-lg w-full object-cover h-65"
                  ></video>

                  <div className="flex items-center justify-between p-2 container w-full absolute top-90  group-hover:top-[80%] transition-all duration-[500ms] ease-linear">
                    <a
                      href={`https://pixabay.com/users/${user.replace(
                        /\s+/g,
                        "_"
                      )}-${user_id}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden items-center justify-center md:flex gap-2.5"
                    >
                      <img
                        src={userImageURL}
                        alt={user}
                        className="w-[40px] h-[40px] rounded-full object-cover shadow-xl shadow-black"
                      />
                      <h2 className="font-bold text-[1rem] text-white text">
                        {user}
                      </h2>
                    </a>
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

export default PexabayVideo;
