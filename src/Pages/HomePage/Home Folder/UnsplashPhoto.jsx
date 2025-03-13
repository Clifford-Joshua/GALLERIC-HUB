import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Shared/Animation/Loader";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Features/pexelSlice";

const Api_Key = `?client_id=${import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY}`;

const SearchEndPoint = `https://api.unsplash.com/search/photos/`;
const EndPoint = `https://api.unsplash.com/photos/
`;

const UnsplashPhoto = () => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const { query, loading } = useSelector((store) => store.pexel);

  const FetchApi = async () => {
    const url = `${EndPoint}${Api_Key}`;
    const urlQuery = `${SearchEndPoint}${Api_Key}&query=${query}`;

    dispatch(setLoading(true));
    const response = await axios(`${query ? urlQuery : url}`);
    try {
      if (response.status == 200) {
        const data = query ? response.data.results : response.data;
        setPhotos(data);
      } else {
        setError(true);
        setErrorMessage(response.statusText);
      }

      dispatch(setLoading(false));
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      console.error("API Fetch Error:", error);
    }
  };

  useEffect(() => {
    FetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Wrapper className="p-6 w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
            Error Occurred : {errormessage} Search for another keyword
          </h1>
        ) : (
          photos.map(({ alt_description, id, urls: { small } }) => {
            return (
              <Link to={`/pexel-photo/${id}`} key={id}>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer">
                  <img
                    src={small}
                    alt={alt_description}
                    className="rounded-lg w-full object-cover h-65"
                  />
                  <h2 className="absolute top-0 w-full h-full z-10 bg-neutral-500 bg-opacity-50 text-white hover:text-green-400 text-center font-semibold text-[1.2rem] flex justify-center items-center capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    visit pexel page
                    <TiArrowForwardOutline className="ml-2" />
                  </h2>
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
  /* ======================================================== */
`;

export default UnsplashPhoto;
