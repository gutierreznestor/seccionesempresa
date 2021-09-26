import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Backdrop.component";
import { StyledModal } from './Modal.styled';

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const ModalButton = ({ onClick, label }) => (
  <motion.button
    className="modal-button"
    type="button"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
  >
    {label}
  </motion.button>
);

const Modal = ({ children, handleClose }) => {

  return (
    <Backdrop onClick={handleClose}>
      <StyledModal>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="modal orange-gradient"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {children}
          <ModalButton label="Cerrar" onClick={handleClose} />
        </motion.div>
      </StyledModal>
    </Backdrop>
  );
};


export default Modal;