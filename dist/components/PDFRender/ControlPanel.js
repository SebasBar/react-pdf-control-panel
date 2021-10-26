"use strict";

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.number.to-fixed.js");

var _react = _interopRequireWildcard(require("react"));

var _reactToPrint = require("react-to-print");

var _reactPdf = require("react-pdf");

var _PDFRenderModule = _interopRequireDefault(require("./PDFRender.module.css"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ControlPanel = props => {
  const {
    numPages,
    pageNumber,
    setPageNumber,
    scale,
    setScale,
    fileToPrint
  } = props; //print

  const componentRef = (0, _react.useRef)();
  const handlePrint = (0, _reactToPrint.useReactToPrint)({
    content: () => componentRef.current
  }); //max values

  const isFirstPage = pageNumber === 1;
  const isLastPage = pageNumber === numPages;
  const isMinZoom = scale <= 0.25;
  const isMaxZoom = scale >= 3.0; //dinamic classes

  const zoomOutClass = isMinZoom ? "disabled" : "clickable";
  const zoomInClass = isMaxZoom ? "disabled" : "clickable";
  const firstPageClassName = isFirstPage ? "disable" : "clickable";
  const lastPageClassName = isLastPage ? "disable" : "clickable"; //page number control

  const goToFirstPage = () => {
    if (!isFirstPage) setPageNumber(1);
  };

  const goToPreviousPage = () => {
    if (!isFirstPage) setPageNumber(pageNumber => pageNumber - 1);
  };

  const goToNextPage = () => {
    if (!isLastPage) setPageNumber(pageNumber => pageNumber + 1);
  };

  const goToLastPage = () => {
    if (!isLastPage) setPageNumber(numPages);
    console.log(numPages);
  };

  const onPageChange = event => {
    const {
      value
    } = event.target;

    if (Number(value) <= numPages) {
      setPageNumber(Number(value));
    } else setPageNumber(1);
  }; //zoom control


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

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _PDFRenderModule.default.controlPanelInt
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _PDFRenderModule.default.panelDiv
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faPrint,
    className: "control-panel-icon",
    onClick: () => {
      handlePrint();
      console.log("Printing...");
    }
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _PDFRenderModule.default.panelDiv
  }, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      display: "none"
    },
    className: _PDFRenderModule.default.docToPrint
  }, /*#__PURE__*/_react.default.createElement(_reactPdf.Document, {
    file: fileToPrint,
    ref: componentRef
  }, Array.from(new Array(numPages), (element, index) => /*#__PURE__*/_react.default.createElement(_reactPdf.Page, {
    key: "page_".concat(index + 1),
    pageNumber: index + 1
  }))), ");"), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faFastBackward,
    className: "mr-1 ".concat(_PDFRenderModule.default.element, " ").concat(firstPageClassName, " ").concat(_PDFRenderModule.default.hideIcon),
    onClick: goToFirstPage
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faBackward,
    className: "mr-1 ".concat(_PDFRenderModule.default.element, " ").concat(firstPageClassName),
    onClick: goToPreviousPage
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(_PDFRenderModule.default.element, " ").concat(_PDFRenderModule.default.text)
  }, "Page", " ", /*#__PURE__*/_react.default.createElement("input", {
    name: "pageNumber",
    size: "1",
    className: "".concat(_PDFRenderModule.default.pageNumber, " ").concat(_PDFRenderModule.default.element, " ").concat(_PDFRenderModule.default.text),
    value: pageNumber,
    onChange: onPageChange
  }), " ", "of ", numPages), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faForward,
    className: "mr-1 ".concat(_PDFRenderModule.default.element, " ").concat(lastPageClassName),
    onClick: goToNextPage
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faFastForward,
    className: "mr-1 ".concat(_PDFRenderModule.default.element, " ").concat(lastPageClassName, "  ").concat(_PDFRenderModule.default.hideIcon),
    onClick: goToLastPage
  })), /*#__PURE__*/_react.default.createElement("div", {
    className: _PDFRenderModule.default.panelDiv
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faSearchMinus,
    className: "mr-1 ".concat(_PDFRenderModule.default.element, " ").concat(zoomOutClass),
    onClick: zoomOut
  }), /*#__PURE__*/_react.default.createElement("span", {
    className: _PDFRenderModule.default.text
  }, " ", (scale * 100).toFixed(), "% "), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faRetweet,
    className: "mx-1 ".concat(_PDFRenderModule.default.element, " ").concat(zoomOutClass, " ").concat(_PDFRenderModule.default.hideIcon),
    onClick: resetZoom
  }), /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faSearchPlus,
    className: "".concat(_PDFRenderModule.default.element, " ").concat(zoomInClass),
    onClick: zoomIn
  }), /*#__PURE__*/_react.default.createElement("a", {
    className: "".concat(_PDFRenderModule.default.element),
    href: fileToPrint,
    download: true
  }, /*#__PURE__*/_react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faFileDownload
  }))));
};

var _default = ControlPanel;
exports.default = _default;