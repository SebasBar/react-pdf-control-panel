"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./App.css");

var _components = require("./lib/components");

function App() {
  return /*#__PURE__*/React.createElement("div", {
    className: "App"
  }, /*#__PURE__*/React.createElement(_components.PDFRender, null));
}

var _default = App;
exports.default = _default;