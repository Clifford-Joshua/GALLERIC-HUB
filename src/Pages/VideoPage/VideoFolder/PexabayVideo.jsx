import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../../Shared/Animation/Loader";
import { TiArrowForwardOutline } from "react-icons/ti";

const EndPoint = `https://pixabay.com/api/videos/`;
const Api_Key = `?key=${import.meta.env.VITE_PEXABAY_API_KEY}`;

const PexabayVideo = () => {
  const [error, setError] = useState(false);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const { query } = useSelector((store) => store.pexel);

  const FetchApi = async () => {
    try {
      const SearchQuery = `&q=${query}`;

      const response = await axios(`${EndPoint}${Api_Key}${SearchQuery}`);

      if (response.status !== 200) {
        setError(true);
        setErrorMessage(response.statusText);
      }

      const { data } = response;

      setVideos(data.hits);

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(`An error occurred. Please try again later`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    FetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);
  return (
    <Wrapper className="p-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
        {isLoading ? (
          <Loader />
        ) : error ? (
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
            }) => {
              return (
                <Link to={`/video/pexabay-video/${id}`} key={id}>
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer">
                    <video
                      src={url}
                      poster={thumbnail}
                      controls
                      className="rounded-lg w-full object-cover h-65"
                    ></video>
                    <h2 className="absolute top-0 w-full h-full z-10 bg-neutral-500 bg-opacity-50 text-white hover:text-green-400 text-center font-semibold text-[1.2rem] flex justify-center items-center capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      visit pexel page
                      <TiArrowForwardOutline className="ml-2" />
                    </h2>
                  </div>
                </Link>
              );
            }
          )
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ============================================================================= */
`;

export default PexabayVideo;
