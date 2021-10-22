import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Document, Page } from "react-pdf";
import pdf from "./PDFRender.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFastBackward,
  faBackward,
  faForward,
  faFastForward,
  faPrint,
  faSearchMinus,
  faRetweet,
  faSearchPlus,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";

const ControlPanel = (props) => {
  const {
    numPages,
    pageNumber,
    setPageNumber,
    scale,
    setScale,
    fileToPrint,
  } = props;

  //print

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  //max values

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;

  const isMinZoom = scale <= 0.25;
  const isMaxZoom = scale >= 3.0;

  //dinamic classes

  const zoomOutClass = isMinZoom ? "disabled" : "clickable";
  const zoomInClass = isMaxZoom ? "disabled" : "clickable";

  const firstPageClassName = isFirstPage ? "disable" : "clickable";
  const lastPageClassName = isLastPage ? "disable" : "clickable";

  //page number control

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };
  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber((pageNumber) => pageNumber - 1);
  };
  const goToNextPage = () => {
    if (!isLastPage) setPageNumber((pageNumber) => pageNumber + 1);
  };
  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
    console.log(numPages);
  };
  const onPageChange = (event) => {
    const { value } = event.target;
    if (Number(value) <= numPages) {
      setPageNumber(Number(value));
    } else setPageNumber(1);
  };

  //zoom control

  const zoomIn = () => {
    if (!isMaxZoom) {
      setScale(scale + 0.25);
    }
  };

  const zoomOut = () => {
    if (!isMinZoom) {
      setScale(scale - 0.25);
    }
  };

  const resetZoom = () => {
    setScale(1.0);
  };

  return (
    <div className={pdf.controlPanelInt}>
      <div className={pdf.panelDiv}>
        <FontAwesomeIcon
          icon={faPrint}
          className="control-panel-icon"
          onClick={() => {
            handlePrint();
            console.log("Printing...");
          }}
        />
      </div>
      <div className={pdf.panelDiv}>
        <div style={{ display: "none" }} className={pdf.docToPrint}>
          <Document file={fileToPrint} ref={componentRef}>
            {Array.from(new Array(numPages), (element, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
          );
        </div>

        {/* document page control backward */}
        <FontAwesomeIcon
          icon={faFastBackward}
          className={`mr-1 ${pdf.element} ${firstPageClassName} ${pdf.hideIcon}`}
          onClick={goToFirstPage}
        />
        <FontAwesomeIcon
          icon={faBackward}
          className={`mr-1 ${pdf.element} ${firstPageClassName}`}
          onClick={goToPreviousPage}
        />
        {/* page display */}
        <span className={`${pdf.element} ${pdf.text}`}>
          Page{" "}
          <input
            name="pageNumber"
            size="1"
            className={`${pdf.pageNumber} ${pdf.element} ${pdf.text}`}
            value={pageNumber}
            onChange={onPageChange}
          />{" "}
          of {numPages}
        </span>
        {/* document page control forward */}
        <FontAwesomeIcon
          icon={faForward}
          className={`mr-1 ${pdf.element} ${lastPageClassName}`}
          onClick={goToNextPage}
        />
        <FontAwesomeIcon
          icon={faFastForward}
          className={`mr-1 ${pdf.element} ${lastPageClassName}  ${pdf.hideIcon}`}
          onClick={goToLastPage}
        />
      </div>
      <div className={pdf.panelDiv}>
        {/* zoom control */}
        <FontAwesomeIcon
          icon={faSearchMinus}
          className={`mr-1 ${pdf.element} ${zoomOutClass}`}
          onClick={zoomOut}
        />
        <span className={pdf.text}> {(scale * 100).toFixed()}% </span>
        <FontAwesomeIcon
          icon={faRetweet}
          className={`mx-1 ${pdf.element} ${zoomOutClass} ${pdf.hideIcon}`}
          onClick={resetZoom}
        />
        <FontAwesomeIcon
          icon={faSearchPlus}
          className={`${pdf.element} ${zoomInClass}`}
          onClick={zoomIn}
        />

        {/* Download */}
        <a className={`${pdf.element}`} href={fileToPrint} download>
          <FontAwesomeIcon icon={faFileDownload} />
        </a>
      </div>
    </div>
  );
};

export default ControlPanel;
