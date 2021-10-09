import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const usePrinter = () => {
  const printerRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printerRef.current,
  });
  return {
    handlePrint,
    ref: printerRef,
  }
};

export default usePrinter;
