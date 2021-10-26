"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.PDFRender = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _ControlPanel = _interopRequireDefault(require("./ControlPanel"));

var _PDFRenderModule = _interopRequireDefault(require("./PDFRender.module.css"));

var _reactPdf = require("react-pdf");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

_reactPdf.pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(_reactPdf.pdfjs.version, "/pdf.worker.js");

const PDFRender = props => {
  const [numPages, setNumPages] = (0, _react.useState)(null);
  const [pageNumber, setPageNumber] = (0, _react.useState)(1);
  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [scale, setScale] = (0, _react.useState)(1);
  const {
    pdfFile
  } = props;

  function onDocumentLoadSuccess(_ref) {
    let {
      numPages
    } = _ref;
    setNumPages(numPages);
    setIsLoading(false);
  } // this will change the scale of the PDF based on window's resize


  (0, _react.useEffect)(() => {
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

  return /*#__PURE__*/_react.default.createElement("div", null, !process.browser && /*#__PURE__*/_react.default.createElement("h1", null, "BROWSER123"), /*#__PURE__*/_react.default.createElement("section", {
    className: _PDFRenderModule.default.pdfRender,
    id: "navbar"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _PDFRenderModule.default.controlPanel
  }, /*#__PURE__*/_react.default.createElement(_ControlPanel.default, {
    numPages: numPages,
    pageNumber: pageNumber,
    setPageNumber: setPageNumber,
    scale: scale,
    setScale: setScale,
    fileToPrint: pdfFile
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _PDFRenderModule.default.pdfSection
  }, /*#__PURE__*/_react.default.createElement(_reactPdf.Document, {
    file: pdfFile,
    onLoadSuccess: onDocumentLoadSuccess
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement(_reactPdf.Page, {
    pageNumber: pageNumber,
    scale: scale
  }))))));
};

exports.PDFRender = PDFRender;
var _default = PDFRender;
exports.default = _default;