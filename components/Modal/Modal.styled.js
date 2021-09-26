import styled from 'styled-components';
import { motion } from "framer-motion";

export const StyledModal = styled(motion.div)`
  width: clamp(50%, 700px, 90%);
  height: min(50%, 300px);

  margin: auto;
  padding: 0 2rem;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
