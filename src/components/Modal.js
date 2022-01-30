import ReactDOM from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import { GrClose } from "react-icons/gr";

const Modal = ({ visible, toggleModal, moreInfo, setMoreInfo, trailers }) => {
  if (!visible) return null;

  let actors = moreInfo.map((cast) => {
    return {
      name: cast.name,
      photo_path: cast.profile_path,
    };
  });
  actors = actors.slice(0, 5);

  const actorsProfil = actors.map((actor) => (
    <div key={actor.name} className="actor">
      <div className="photo">
        <img
          src={`https://image.tmdb.org/t/p/original/${actor.photo_path}`}
          alt=""
        />
      </div>
      <p className="name">{actor.name}</p>
    </div>
  ));

  const videosObj = trailers.filter((trailer) => trailer.type === "Trailer");
  const videosPath = videosObj.map((obj) => {
    return { path: `https://www.youtube.com/embed/${obj.key}` };
  });

  const videos = videosPath.map((video) => (
    <SwiperSlide key={video.path}>
      <iframe
        className="video"
        title={video.path}
        width="420"
        height="315"
        frameBorder="0"
        src={video.path}
      ></iframe>
    </SwiperSlide>
  ));

  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <GrClose
          size="23px"
          className="close-modal"
          onClick={() => {
            toggleModal(false);
            setMoreInfo([]);
          }}
        ></GrClose>

        <div className="trailers">
          <Swiper navigation={true} modules={[Navigation]}>
            {videos}
          </Swiper>
        </div>
        <div>
          <h2>Obsada:</h2>
        </div>
        <div className="actors">{actorsProfil}</div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
