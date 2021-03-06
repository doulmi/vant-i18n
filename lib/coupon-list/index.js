"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _Item = _interopRequireDefault(require("./Item"));

var _field = _interopRequireDefault(require("../field"));

var _button = _interopRequireDefault(require("../button"));

var _tab = _interopRequireDefault(require("../tab"));

var _tabs = _interopRequireDefault(require("../tabs"));

var _default2 = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.b()
    }, [_vm.showExchangeBar ? _c('field', {
      class: _vm.b('field'),
      attrs: {
        "clearable": "",
        "border": false,
        "placeholder": _vm.inputPlaceholder || _vm.$t('placeholder'),
        "maxlength": 20
      },
      model: {
        value: _vm.currentCode,
        callback: function callback($$v) {
          _vm.currentCode = $$v;
        },
        expression: "currentCode"
      }
    }, [_c('van-button', {
      class: _vm.b('exchange'),
      attrs: {
        "slot": "button",
        "size": "small",
        "type": "danger",
        "text": _vm.exchangeButtonText || _vm.$t('exchange'),
        "loading": _vm.exchangeButtonLoading,
        "disabled": _vm.buttonDisabled
      },
      on: {
        "click": _vm.onClickExchangeButton
      },
      slot: "button"
    })], 1) : _vm._e(), _c('tabs', {
      class: _vm.b('tab'),
      attrs: {
        "line-width": 120
      },
      model: {
        value: _vm.tab,
        callback: function callback($$v) {
          _vm.tab = $$v;
        },
        expression: "tab"
      }
    }, [_c('tab', {
      attrs: {
        "title": _vm.title
      }
    }, [_c('div', {
      class: _vm.b('list'),
      style: _vm.listStyle
    }, [_vm._l(_vm.coupons, function (item, index) {
      return _c('coupon-item', {
        key: item.id || item.name,
        ref: "card",
        refInFor: true,
        attrs: {
          "currency": _vm.currency,
          "data": item,
          "chosen": index === _vm.chosenCoupon
        },
        nativeOn: {
          "click": function click($event) {
            _vm.$emit('change', index);
          }
        }
      });
    }), !_vm.coupons.length ? _c('div', {
      class: _vm.b('empty')
    }, [_c('img', {
      attrs: {
        "src": "https://img.yzcdn.cn/v2/image/wap/trade/new_order/empty@2x.png"
      }
    }), _c('p', [_vm._v(_vm._s(_vm.$t('empty')))])]) : _vm._e()], 2)]), _c('tab', {
      attrs: {
        "title": _vm.disabledTitle
      }
    }, [_c('div', {
      class: _vm.b('list'),
      style: _vm.listStyle
    }, [_vm._l(_vm.disabledCoupons, function (item) {
      return _c('coupon-item', {
        key: item.id || item.name,
        attrs: {
          "disabled": "",
          "currency": _vm.currency,
          "data": item
        }
      });
    }), !_vm.disabledCoupons.length ? _c('div', {
      class: _vm.b('empty')
    }, [_c('img', {
      attrs: {
        "src": "https://img.yzcdn.cn/v2/image/wap/trade/new_order/empty@2x.png"
      }
    }), _c('p', [_vm._v(_vm._s(_vm.$t('empty')))])]) : _vm._e()], 2)])], 1), _c('van-button', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.showCloseButton,
        expression: "showCloseButton"
      }],
      class: _vm.b('close'),
      attrs: {
        "size": "large",
        "text": _vm.closeButtonText || _vm.$t('close')
      },
      on: {
        "click": function click($event) {
          _vm.$emit('change', -1);
        }
      }
    })], 1);
  },
  name: 'coupon-list',
  components: {
    Tab: _tab.default,
    Tabs: _tabs.default,
    Field: _field.default,
    VanButton: _button.default,
    CouponItem: _Item.default
  },
  model: {
    prop: 'code'
  },
  props: {
    code: String,
    closeButtonText: String,
    inputPlaceholder: String,
    disabledListTitle: String,
    exchangeButtonText: String,
    exchangeButtonLoading: Boolean,
    exchangeButtonDisabled: Boolean,
    exchangeMinLength: {
      type: Number,
      default: 1
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    coupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    disabledCoupons: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    displayedCouponIndex: {
      type: Number,
      default: -1
    },
    showExchangeBar: {
      type: Boolean,
      default: true
    },
    showCloseButton: {
      type: Boolean,
      default: true
    },
    currency: {
      type: String,
      default: '￥'
    }
  },
  data: function data() {
    return {
      tab: 0,
      winHeight: window.innerHeight,
      currentCode: this.code || ''
    };
  },
  computed: {
    buttonDisabled: function buttonDisabled() {
      return !this.exchangeButtonLoading && (this.exchangeButtonDisabled || !this.currentCode || this.currentCode.length < this.exchangeMinLength);
    },
    title: function title() {
      return this.$t('enable') + " (" + this.coupons.length + ")";
    },
    disabledTitle: function disabledTitle() {
      return this.$t('disabled') + " (" + this.disabledCoupons.length + ")";
    },
    listStyle: function listStyle() {
      return {
        height: this.winHeight - (this.showExchangeBar ? 140 : 94) + 'px'
      };
    }
  },
  watch: {
    code: function code(_code) {
      this.currentCode = _code;
    },
    currentCode: function currentCode(code) {
      this.$emit('input', code);
    },
    displayedCouponIndex: function displayedCouponIndex(val) {
      this.scrollToShowCoupon(val);
    }
  },
  mounted: function mounted() {
    this.scrollToShowCoupon(this.displayedCouponIndex);
  },
  methods: {
    onClickExchangeButton: function onClickExchangeButton() {
      this.$emit('exchange', this.currentCode); // auto clear currentCode when not use v-model

      if (!this.code) {
        this.currentCode = '';
      }
    },
    // scroll to show specific coupon
    scrollToShowCoupon: function scrollToShowCoupon(index) {
      var _this = this;

      if (index === -1) {
        return;
      }

      this.$nextTick(function () {
        var _this$$refs = _this.$refs,
            card = _this$$refs.card,
            list = _this$$refs.list;
        /* istanbul ignore next */

        if (list && card && card[index]) {
          list.scrollTop = card[index].$el.offsetTop - 100;
        }
      });
    }
  }
});

exports.default = _default2;