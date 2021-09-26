import { useState } from 'react';
import Modal from '../components/Modal/Modal.component';

export const useModal = (body) => {
  const [isShowing, setIsShowing] = useState(false);
  const toggle = () => setIsShowing(!isShowing);
  const handleClose = () => setIsShowing(false);
  const modal = isShowing ? <Modal handleClose={handleClose}>{body}</Modal> : null;

  return { modal, toggle };
}