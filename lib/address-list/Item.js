"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _radio = _interopRequireDefault(require("../radio"));

var _create = _interopRequireDefault(require("../utils/create"));

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('cell', {
      class: _vm.b({
        disabled: _vm.disabled
      }),
      attrs: {
        "is-link": !_vm.disabled
      },
      on: {
        "click": function click($event) {
          _vm.$emit('select');
        }
      }
    }, [_c('radio', {
      attrs: {
        "name": _vm.data.id
      }
    }, [_c('div', {
      class: _vm.b('name')
    }, [_vm._v(_vm._s(_vm.data.name) + "，" + _vm._s(_vm.data.tel))]), _c('div', {
      class: _vm.b('address')
    }, [_vm._v(_vm._s(_vm.data.address))])]), _c('icon', {
      class: _vm.b('edit'),
      attrs: {
        "slot": "right-icon",
        "name": "edit"
      },
      on: {
        "click": function click($event) {
          $event.stopPropagation();

          _vm.$emit('edit');
        }
      },
      slot: "right-icon"
    })], 1);
  },
  name: 'address-item',
  components: {
    Radio: _radio.default
  },
  props: {
    data: Object,
    disabled: Boolean
  }
});

exports.default = _default;