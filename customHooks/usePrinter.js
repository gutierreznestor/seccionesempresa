import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../components/Button/Button.component";

const usePrinter = () => {
  const printerRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printerRef.current,
  });
  return {
    PrintButton: <Button label="Imprimir" onClick={handlePrint} />,
    ref: printerRef,
  }
};

export default usePrinter;
