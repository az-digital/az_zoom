/**
* DO NOT EDIT THIS FILE.
* See the following change record for more information,
* https://www.drupal.org/node/2815083
* @preserve
**/
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var FocusImg = function () {
  function FocusImg(imageParams) {
    _classCallCheck(this, FocusImg);
    this.DEFAULT_IMAGE_SRC = 'http://via.placeholder.com/500?text=focus.js';
    this.params = {
      imageSrc: this.DEFAULT_IMAGE_SRC,
      parentElement: null,
      zoomFactor: '250%',
      smoother: true,
      width: '100%',
      height: '66.7%',
      cursor: '',
      displayLoc: false,
      displayZoom: false,
      zoomOnScroll: false
    };
    this.focusImg = document.createElement('div');
    this.focusImg.style.position = 'relative';
    if (imageParams) Object.assign(this.params, imageParams);
    this.render();
    this.bindEvents();
    this.displayLocHud = this.params.displayLoc ? document.createElement('span') : null;
    this.displayZoomHud = this.params.displayZoom ? document.createElement('span') : null;
    if (this.params.displayLoc) {
      this.displayLocHud.classList.add('hud', 'hud-bottom-right');
      this.focusImg.appendChild(this.displayLocHud);
    }
    if (this.params.displayZoom) {
      this.displayZoomHud.classList.add('hud', 'hud-bottom-left');
      this.focusImg.appendChild(this.displayZoomHud);
    }
    return this;
  }
  _createClass(FocusImg, [{
    key: "bindEvents",
    value: function bindEvents() {
      var _this = this;
      this.focusImg.addEventListener('mouseover', function (e) {
        _this.focusImg.getElementsByClassName('focus-img')[0].style.backgroundSize = _this.params.zoomFactor;
      }, false);
      this.focusImg.addEventListener('mousemove', function (e) {
        var dimensions = _this.focusImg.getBoundingClientRect();
        _this.relX = e.clientX - dimensions.left;
        _this.relY = e.clientY - dimensions.top;
        _this.percentX = Math.round(100 / (dimensions.width / _this.relX));
        _this.percentY = Math.round(100 / (dimensions.height / _this.relY));
        _this.focusImg.getElementsByClassName('focus-img')[0].style.backgroundPosition = _this.percentX + '% ' + _this.percentY + '%';
        if (_this.params.displayLoc) _this.updateLocHud();
        if (_this.params.displayZoom) _this.updateZoomHud();
      }, false);
      this.focusImg.addEventListener('mouseleave', function (e) {
        _this.focusImg.getElementsByClassName('focus-img')[0].style.backgroundPosition = 'center';
        _this.focusImg.getElementsByClassName('focus-img')[0].style.backgroundSize = 'cover';
      }, false);
      this.focusImg.addEventListener('wheel', function (e) {
        if (!_this.params.zoomOnScroll) return;
        e.preventDefault();
        var curZoom = parseInt(_this.focusImg.getElementsByClassName('focus-img')[0].style.backgroundSize.replace('%', ''));
        if (curZoom <= 40 && e.deltaY > 0) {
          _this.params.zoomFactor = "40%";
          return;
        }
        if (curZoom >= 1000 && e.deltaY < 0) {
          _this.params.zoomFactor = "1000%";
          return;
        }
        _this.params.zoomFactor = "".concat(curZoom + (e.deltaY <= 0 ? 10 : -10), "%");
        _this.focusImg.getElementsByClassName('focus-img')[0].style.backgroundSize = "".concat(_this.params.zoomFactor);
        _this.updateZoomHud();
      });
    }
  }, {
    key: "render",
    value: function render() {
      this.createFocusImgElement();
      this.setStyleForFocusImg();
      this.appendToParent();
    }
  }, {
    key: "createFocusImgElement",
    value: function createFocusImgElement() {
      var imageElementClass = "focus-img ".concat(this.params.smoother ? 'smoother' : '', " ").concat(this.params.cursor ? this.params.cursor : '');
      var imageElementStyle = "\n      background-image: url(".concat(this.params.imageSrc, ");\n      background-repeat: no-repeat;\n      background-size: cover;\n      background-position: center center;\n      width: 100%;\n      padding-top: ").concat(this.params.height, ";\n    ");
      this.focusImg.innerHTML = "<div class=\"".concat(imageElementClass, "\" style=\"").concat(imageElementStyle, "\"></div>");
    }
  }, {
    key: "setStyleForFocusImg",
    value: function setStyleForFocusImg() {
      this.focusImg.style.width = this.params.width;
    }
  }, {
    key: "appendToParent",
    value: function appendToParent() {
      this.params.parentElement.appendChild(this.focusImg);
    }
  }, {
    key: "updateLocHud",
    value: function updateLocHud() {
      this.displayLocHud.innerHTML = "".concat(Math.floor(this.relX) || 0, ", ").concat(Math.floor(this.relY) || 0);
    }
  }, {
    key: "updateZoomHud",
    value: function updateZoomHud() {
      this.displayZoomHud.innerHTML = "".concat(this.params.zoomFactor);
    }
  }]);
  return FocusImg;
}();
export default FocusImg;