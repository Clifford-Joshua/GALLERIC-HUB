import axios from "axios";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Loader from "../../Shared/Animation/Loader";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Features/pexelSlice";

const EndPoint = `https://pixabay.com/api/`;
const Api_Key = `?key=${import.meta.env.VITE_PEXABAY_API_KEY}`;
const Pexabay = () => {
  const dispatch = useDispatch();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(false);
  const [errormessage, setErrorMessage] = useState("");

  const { query, loading } = useSelector((store) => store.pexel);

  const FetchData = async () => {
    const SearchQuery = `&q=${query}&image_type=photo`;

    const response = await axios(`${EndPoint}${Api_Key}${SearchQuery}`);
    dispatch(setLoading(true));

    try {
      if (response.status === 200) {
        const {
          data: { hits },
        } = response;
        setPhotos(hits);
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
    FetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Wrapper>
      <div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
          {loading ? (
            <Loader />
          ) : error ? (
            <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
              Error Occurred : {errormessage} Search for another keyword
            </h1>
          ) : (
            photos.map(({ id, webformatURL, tags }) => {
              return (
                <Link to={`/pexabay-photo/${id}`} key={id}>
                  <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer">
                    <img
                      src={webformatURL}
                      alt={tags}
                      className="rounded-lg w-full object-cover h-65"
                    />
                    <h2 className="absolute top-0 w-full h-full z-10 bg-neutral-500 bg-opacity-50 text-white hover:text-green-400 text-center font-semibold text-[1.2rem] flex justify-center items-center capitalize opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      visit pexabay page
                      <TiArrowForwardOutline className="ml-2" />
                    </h2>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* ==================================================== */
`;

export default Pexabay;
