import { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Loader from "../../Shared/Animation/Loader";
import { TiArrowForwardOutline } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { setPhotos, setError, setLoading } from "../../../Features/pexelSlice";

const Api_Key = import.meta.env.VITE_PEXEL_API_KEY;

const Photos = () => {
  const dispatch = useDispatch();
  const [errormessage, setErrorMessage] = useState("");
  const { photos, query, error, loading } = useSelector((store) => store.pexel);

  const FetchApi = async () => {
    dispatch(setLoading(true));
    try {
      const resp = await fetch(`api/search?query=${query}&per_page=30&page=1`, {
        headers: { Authorization: Api_Key },
      });

      console.log(resp);

      if (resp.ok) {
        dispatch(setError(false));
        const data = await resp.json();
        dispatch(setPhotos(data.photos));
      } else {
        dispatch(setError(true));
        setErrorMessage(resp.statusText);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log.error(error);
    }
  };

  useEffect(() => {
    FetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <Wrapper className="p-4">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <h1 className="text-center text-red-500 text-[1.5rem] font-semibold">
            Error Occurred : {errormessage} Search for another keyword
          </h1>
        ) : (
          photos.map(({ id, src: { medium }, alt }) => {
            return (
              <Link to={`/pexel-photo/${id}`} key={id}>
                <div className="border-2 border-gray-200 rounded-lg overflow-hidden shadow-xl relative group cursor-pointer">
                  <img
                    src={medium}
                    alt={alt}
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
  /* =============================================== */
  /* Mobile View */

  img:hover .image_link {
    display: flex;
  }
`;

export default Photos;
