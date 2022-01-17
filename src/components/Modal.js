import ReactDOM from "react-dom";
import { GrClose } from "react-icons/gr";
const Modal = ({ visible, toggleModal }) => {
  if (!visible) return null;
  return ReactDOM.createPortal(
    <>
      <div className="overlay"></div>
      <div className="modal">
        <GrClose onClick={() => toggleModal(false)}></GrClose>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default Modal;
