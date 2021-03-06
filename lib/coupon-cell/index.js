"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _default2 = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('cell-group', {
      class: _vm.b()
    }, [_c('cell', {
      attrs: {
        "title": _vm.title || _vm.$t('title'),
        "value": _vm.value,
        "is-link": _vm.editable
      },
      on: {
        "click": function click($event) {
          _vm.$emit('click');
        }
      }
    })], 1);
  },
  name: 'coupon-cell',
  model: {
    prop: 'chosenCoupon'
  },
  props: {
    title: String,
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    editable: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: '￥'
    }
  },
  computed: {
    value: function value() {
      var coupons = this.coupons;
      var coupon = coupons[this.chosenCoupon];

      if (coupon) {
        return "-" + this.currency + (coupon.value / 100).toFixed(2);
      }

      return coupons.length === 0 ? this.$t('tips') : this.$t('count', coupons.length);
    }
  }
});

exports.default = _default2;