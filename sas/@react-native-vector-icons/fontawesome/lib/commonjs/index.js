"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _common = require("@react-native-vector-icons/common");
var _FontAwesome = _interopRequireDefault(require("../../glyphmaps/FontAwesome.json"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/**
 * FontAwesome icon set component.
 * Usage: <FontAwesome name="icon-name" size={20} color="#4F8EF7" />
 */

const Icon = (0, _common.createIconSet)(_FontAwesome.default, 'FontAwesome', 'FontAwesome.ttf');
var _default = exports.default = Icon;
//# sourceMappingURL=index.js.map