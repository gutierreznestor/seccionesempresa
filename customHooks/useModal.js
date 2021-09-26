import { useState } from 'react';
import Modal from '../components/Modal/Modal.component';

export const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [body, setBody] = useState(null);
  const toggle = () => setIsShowing(!isShowing);
  const handleClose = () => setIsShowing(false);
  const modal = isShowing ? <Modal handleClose={handleClose}>{body}</Modal> : null;
  return { modal, setBody, toggle };
}