import { motion } from "framer-motion";
import { StyledBackdrop } from "./Backdrop.styled";

const Backdrop = ({ children, onClick }) => {

  return (
    <StyledBackdrop onClick={onClick}>
      <motion.div
        onClick={onClick}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </StyledBackdrop>
  );
};

export default Backdrop;