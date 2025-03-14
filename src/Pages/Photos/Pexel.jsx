import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Spinner from "../Shared/Animation/Spinner";
import Title from "../Shared/TitleContainer/Title";
import IntroContainer from "../Shared/IntroPage/IntroContainer";

const Api_Key = import.meta.env.VITE_PEXEL_API_KEY;

const Pexel = () => {
  const [error, setError] = useState("");
  // const [per_Page, setPer_Page] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [FetchedImages, setFetchedImages] = useState([]);

  const { query } = useSelector((store) => store.pexel);
  const FetchApi = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(
        `https://api.pexels.com/v1/search?query=${query}`,
        {
          headers: { Authorization: Api_Key },
        }
      );

      if (resp.ok) {
        setError(false);
        const data = await resp.json();
        setFetchedImages(data.photos);
      } else {
        setError(true);
        setErrorMessage(resp.statusText);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight) {
        console.log("hi");
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);

  return (
    <Wrapper>
      <IntroContainer photo={FetchedImages[3]} />
      <Title title={"pexel"} content={"images"} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
            Error Occurred : {errorMessage} Search for another keyword
          </h1>
        ) : (
          FetchedImages.map(({ id, src: { medium }, alt }) => {
            return (
              <Link to={`/pexel-photo/${id}`} key={id}>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer">
                  <img
                    src={medium}
                    alt={alt}
                    className="rounded-lg w-full object-cover h-65"
                  />
                </div>
              </Link>
            );
          })
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ==================================================== */
`;

export default Pexel;
