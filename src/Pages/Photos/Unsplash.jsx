/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TfiDownload } from "react-icons/tfi";
import Loader from "../Shared/Animation/Loader";
import Title from "../Shared/TitleContainer/Title";
import { useState, useEffect, useRef } from "react";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

const Api_Key = `?client_id=${import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY}`;

const SearchEndPoint = `https://api.unsplash.com/search/photos/`;
const EndPoint = `https://api.unsplash.com/photos/
`;

const Unsplash = () => {
  const isFetching = useRef(false);
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [bgImage, setBgImage] = useState("");
  const [openModal, setOpenModal] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { query } = useSelector((store) => store.pexel);

  const fetchPhotos = async () => {
    const url = `${EndPoint}${Api_Key}&page=${page}`;
    const urlQuery = `${SearchEndPoint}${Api_Key}&query=${query}&page=${page}`;

    if (!query) {
      setError(true);
      setErrorMessage("Search query is empty.");
      return;
    }

    setError(false);
    setIsLoading(true);
    try {
      const response = await axios(`${query ? urlQuery : url}`);

      if (response.status !== 200) {
        setError(true);
        setErrorMessage(response.statusText);
        return;
      }

      const { results } = response.data;

      page === 1
        ? setPhotos(results)
        : setPhotos((oldPhotos) => [...oldPhotos, ...results]);

      setBgImage(results[3].urls.full);

      setIsLoading(false);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
    setIsLoading(false);
  };

  const handleDownload = async (e, imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl, { mode: "cors" });
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${imageName || "downloaded-image"}.jpg`; // Set a default name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      toast.error("Download failed", error);
    }
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
    fetchPhotos();
  }, [page, query]);

  useEffect(() => {
    window.addEventListener("scroll", ScrollHandler);
    return () => window.removeEventListener("scroll", ScrollHandler);
  }, []);

  return (
    <Wrapper>
      <IntroContainer photo={bgImage} />
      <Title title={"unsplash"} content={"images"} />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4 p-4">
        {error ? (
          <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
            Error Occurred : {errorMessage}
          </h1>
        ) : (
          photos.map(
            ({
              id,
              alt_description,
              urls: { regular },
              user: {
                name,
                profile_image: { small },
              },
              color,
            }) => {
              return (
                <div
                  key={id}
                  className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer"
                >
                  <img
                    src={regular}
                    alt={alt_description}
                    className="rounded-lg w-full object-cover h-65"
                    onClick={() => {
                      setIsModalOpen(true);
                      setOpenModal([regular, color]);
                    }}
                  />
                  <div className="flex items-center justify-between p-2 container w-full absolute top-90  group-hover:top-[80%] transition-all duration-[500ms] ease-linear">
                    <a
                      href={`https://unsplash.com/@${name.replace(
                        /\s+/g,
                        "_"
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden items-center justify-center md:flex gap-2.5"
                    >
                      <img
                        src={small}
                        alt={name}
                        className="w-[40px] h-[40px] rounded-full object-cover shadow-xl shadow-black"
                      />
                      <h2 className="font-bold text-[1rem] text-white text">
                        {name}
                      </h2>
                    </a>
                    <button
                      onClick={(e) =>
                        handleDownload(e, regular, alt_description)
                      }
                      className="ml-auto p-2 text-white text-2xl bg-black hover:bg-gray-800 rounded-lg font-bold cursor-pointer text-[1.3rem] border border-blue-500 shadow-lg shadow-cyan-500/50"
                    >
                      <TfiDownload />
                    </button>
                  </div>
                </div>
              );
            }
          )
        )}
      </div>

      {isLoading && <Loader />}

      <div
        className={` w-screen h-screen fixed top-0 left-0 z-[999]  items-center justify-center  ${
          isModalOpen ? "flex md:hidden" : "hidden"
        }`}
        style={{ backgroundColor: `${openModal[1]}` }}
      >
        <div className="text-white text-[1.5rem] absolute top-[5%] w-screen px-4 flex items-center justify-between">
          <button
            onClick={(e) => handleDownload(e, openModal[0], "unsplash-image")}
            className=" p-2 text-white text-2xl bg-black hover:bg-gray-800 rounded-lg font-bold cursor-pointer text-[1.3rem] border border-blue-500 shadow-lg shadow-cyan-500/50"
          >
            <TfiDownload />
          </button>
          <FaTimes onClick={() => setIsModalOpen(false)} />
        </div>

        <img
          src={openModal[0]}
          alt="unsplash-image"
          className="w-[95%] object-cover rounded-xl"
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ======================================================== */
`;

export default Unsplash;
