import create from '../utils/create';
import Popup from '../mixins/popup';
import Touch from '../mixins/touch';
import Swipe from '../swipe';
import SwipeItem from '../swipe-item';
import { range } from '../utils';
var MAX_ZOOM = 3;
var MIN_ZOOM = 1 / 3;
export default create({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _vm.value ? _c('div', {
      class: _vm.b(),
      on: {
        "touchstart": _vm.onWrapperTouchStart,
        "touchend": _vm.onWrapperTouchEnd,
        "touchcancel": _vm.onWrapperTouchEnd
      }
    }, [_vm.showIndex ? _c('div', {
      class: _vm.b('index')
    }, [_vm._v(_vm._s(_vm.active + 1) + "/" + _vm._s(_vm.count))]) : _vm._e(), _c('swipe', {
      ref: "swipe",
      attrs: {
        "initial-swipe": _vm.startPosition,
        "show-indicators": false
      },
      on: {
        "change": _vm.onChange
      }
    }, _vm._l(_vm.images, function (item, index) {
      return _c('swipe-item', {
        key: index
      }, [_c('img', {
        class: _vm.b('image'),
        style: index === _vm.active ? _vm.imageStyle : null,
        attrs: {
          "src": item
        },
        on: {
          "touchstart": _vm.onTouchStart,
          "touchmove": _vm.onTouchMove,
          "touchend": _vm.onTouchEnd,
          "touchcancel": _vm.onTouchEnd
        }
      })]);
    }))], 1) : _vm._e();
  },
  name: 'image-preview',
  mixins: [Popup, Touch],
  components: {
    Swipe: Swipe,
    SwipeItem: SwipeItem
  },
  props: {
    images: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    startPosition: {
      type: Number,
      default: 0
    },
    overlay: {
      type: Boolean,
      default: true
    },
    showIndex: {
      type: Boolean,
      default: true
    },
    overlayClass: {
      type: String,
      default: 'van-image-preview__overlay'
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      scale: 1,
      moveX: 0,
      moveY: 0,
      moving: false,
      zooming: false,
      active: this.startPosition
    };
  },
  computed: {
    count: function count() {
      return this.images.length;
    },
    imageStyle: function imageStyle() {
      var scale = this.scale;
      var style = {
        transition: this.zooming || this.moving ? '' : '.3s all'
      };

      if (scale !== 1) {
        style.transform = "scale3d(" + scale + ", " + scale + ", 1) translate(" + this.moveX / scale + "px, " + this.moveY / scale + "px)";
      }

      return style;
    }
  },
  watch: {
    startPosition: function startPosition(active) {
      this.active = active;
    }
  },
  methods: {
    onWrapperTouchStart: function onWrapperTouchStart() {
      this.touchStartTime = new Date();
    },
    onWrapperTouchEnd: function onWrapperTouchEnd(event) {
      event.preventDefault();
      var deltaTime = new Date() - this.touchStartTime;
      var _this$$refs$swipe = this.$refs.swipe,
          offsetX = _this$$refs$swipe.offsetX,
          offsetY = _this$$refs$swipe.offsetY; // prevent long tap to close component

      if (deltaTime < 300 && offsetX < 10 && offsetY < 10) {
        this.$emit('input', false);
        this.resetScale();
      }
    },
    getDistance: function getDistance(touches) {
      return Math.sqrt(Math.abs((touches[0].clientX - touches[1].clientX) * (touches[0].clientY - touches[1].clientY)));
    },
    startMove: function startMove(event) {
      var image = event.currentTarget;
      var rect = image.getBoundingClientRect();
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;
      this.touchStart(event);
      this.moving = true;
      this.startMoveX = this.moveX;
      this.startMoveY = this.moveY;
      this.maxMoveX = Math.max(0, (rect.width - winWidth) / 2);
      this.maxMoveY = Math.max(0, (rect.height - winHeight) / 2);
    },
    startZoom: function startZoom(event) {
      this.moving = false;
      this.zooming = true;
      this.startScale = this.scale;
      this.startDistance = this.getDistance(event.touches);
    },
    onTouchStart: function onTouchStart(event) {
      var touches = event.touches;
      var offsetX = this.$refs.swipe.offsetX;

      if (touches.length === 1 && this.scale !== 1) {
        this.startMove(event);
      } else if (touches.length === 2 && !offsetX) {
        this.startZoom(event);
      }
    },
    onTouchMove: function onTouchMove(event) {
      var touches = event.touches;

      if (this.moving || this.zooming) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (this.moving) {
        this.touchMove(event);
        var moveX = this.deltaX + this.startMoveX;
        var moveY = this.deltaY + this.startMoveY;
        this.moveX = range(moveX, -this.maxMoveX, this.maxMoveX);
        this.moveY = range(moveY, -this.maxMoveY, this.maxMoveY);
      }

      if (this.zooming && touches.length === 2) {
        var distance = this.getDistance(touches);
        var scale = this.startScale * distance / this.startDistance;
        this.scale = range(scale, MIN_ZOOM, MAX_ZOOM);
      }
    },
    onTouchEnd: function onTouchEnd(event) {
      if (this.moving || this.zooming) {
        var stopPropagation = true;

        if (this.moving && this.startMoveX === this.moveX && this.startMoveY === this.moveY) {
          stopPropagation = false;
        }

        if (!event.touches.length) {
          this.moving = false;
          this.zooming = false;
          this.startMoveX = 0;
          this.startMoveY = 0;
          this.startScale = 1;

          if (this.scale < 1) {
            this.resetScale();
          }
        }

        if (stopPropagation) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    },
    onChange: function onChange(active) {
      this.resetScale();
      this.active = active;
    },
    resetScale: function resetScale() {
      this.scale = 1;
      this.moveX = 0;
      this.moveY = 0;
    }
  }
});