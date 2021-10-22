import React, { useState, useEffect } from "react";
import ControlPanel from "./ControlPanel";
import pdf from "./PDFRender.module.css";
import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFRender = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const { pdfFile } = props;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsLoading(false);
  }

  // this will change the scale of the PDF based on window's resize
  useEffect(() => {
    if (process.browser) {
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  function handleResize() {
    if (window.matchMedia("(max-width: 640px)").matches) {
      setScale(0.75);
    } else {
      setScale(1);
    }
  }

  return (
    <div>
      {!process.browser && <h1>BROWSER123</h1>}
      <section className={pdf.pdfRender} id="navbar">
        <div className={pdf.controlPanel}>
          <ControlPanel
            numPages={numPages}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            scale={scale}
            setScale={setScale}
            fileToPrint={pdfFile}
          />
        </div>
        <div className={pdf.pdfSection}>
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <div>
              <Page pageNumber={pageNumber} scale={scale} />
            </div>
          </Document>
        </div>
      </section>
    </div>
  );
};

export default PDFRender;
