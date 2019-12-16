<template>
  <div
    class="input-number"
    v-click-outside="close"
    :class="[{ active: isActive }]"
    @click="open"
  >
    <div class="input-number__gag">{{ printValue }}</div>
    <div
      ref="el"
      class="input-number__value"
      contenteditable="contenteditable"
      :tabindex="tabindex"
      @paste="paste"
      @input="input"
      @focus="open"
      @keydown="keydown"
    >
      {{ currentValue }}
    </div>
    <div class="input-number__arrow"></div>
    <div class="input-number__controls">
      <div class="input-number__plus" @click="plus"></div>
      <div class="input-number__minus" @click="minus"></div>
    </div>
    <template v-if="comand">
      <div    
        class="input-number__comand"
        @click="executeComand(comand.func)"
      >
        {{ comand.title }}
      </div>
    </template>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
export default {
  name: "InputNumber",
  props: {
    tabindex: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: 0
    },
    comand: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      el: null,
      isActive: false,
      currentValue: 0,
      oldValue: 0
    };
  },
  computed: {
    printValue() {
      return new Intl.NumberFormat("ru-RU").format(this.currentValue);
    }
  },
  watch: {
    value(value) {
      this.currentValue = value > 0 ? value : 0;
    }
  },
  mounted() {
    this.el = this.$refs.el;
  },
  methods: {
    open() {
      if (this.isActive === false) {
        this.isActive = true;
        this.oldValue = this.currentValue;
        this.setSelectionCaret(this.el, 0);
      }
    },
    close() {
      this.$nextTick(() => {
        setTimeout(() => {
          this.isActive = false;
          this.el.blur();
        });
      });
    },
    keydown(e) {
      const key = e.key;
      const keys = [
        "ArrowLeft",
        "ArrowRight",
        "Backspace",
        "Enter",
        "Escape",
        "Tab",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ];
      if (keys.includes(key)) {
        switch (key) {
          case "Tab":
            this.close();
            break;
          case "Escape":
            this.setValue(this.oldValue);
            this.close();
            break;
          case "Enter":
            this.close();
            break;
        }
      } else {
        e.preventDefault();
      }
    },
    input(e) {
      const data = +e.target.innerHTML.toString();
      const value = this.getNumber(data);
      this.setValue(value);
    },
    paste(e) {
      e.preventDefault();
      const data = +e.clipboardData.getData("Text");
      const value = this.getNumber(data);
      this.setValue(value);
    },
    plus() {
      const value = this.currentValue + 1;
      this.setValue(value);
    },
    minus() {
      const value = this.currentValue - 1;
      this.setValue(value);
    },
    executeComand(cb) {
      cb();
      this.close();
    },
    getNumber(data) {
      return typeof data === "number" && data > 0 ? data : 0;
    },
    setValue(value) {
      this.currentValue = value > 0 ? value : 0;
      this.setCursor(this.el);
      this.$emit("input", this.currentValue);
    },
    setCursor(elem) {
      this.$nextTick(() => {
        const position = elem.innerHTML.toString().length;
        this.setSelectionCaret(elem, position);
      });
    },
    setSelectionCaret(elem, pos = 0) {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(elem);
      selection.removeAllRanges();
      selection.addRange(range);
      if (pos > 0) {
        range.setStart(elem.childNodes[0], pos);
        range.collapse(true);
      }
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss">
.input-number {
  $root: &;

  display: flex;
  align-items: center;
  outline: none;
  border: 1px solid transparent;
  border-radius: 2px;
  padding: 2px 4px;
  position: relative;

  &__gag,
  &__value {
    display: block;
    opacity: 0;
    border: none;
    outline: none;
    width: 0;
    height: 0;
    padding-right: 4px;
    font-size: 14px;
  }

  &__gag {
    display: block;
    width: auto;
    height: auto;
    opacity: 1;
  }

  &__controls {
    display: none;
    width: 8px;
  }

  &__plus,
  &__minus {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    width: 0;
    height: 0;
    position: relative;
  }

  &__plus {
    border-bottom: 4px solid #8d96a1;
    top: -2px;

    &:hover {
      border-bottom-color: #f00;
    }
  }

  &__minus {
    border-top: 4px solid #8d96a1;
    bottom: -2px;

    &:hover {
      border-top-color: #f00;
    }
  }

  &__comand {
    display: none;
    cursor: pointer;
    position: absolute;
    bottom: -12px;
    left: 8px;
    font-size: 10px;
    color: #f00;
  }

  &.active {
    border-color: #8d96a1;

    #{$root}__gag {
      display: none;
      height: 0;
    }

    #{$root}__value {
      opacity: 1;
      width: 60px;
      height: auto;
      color: #f00;
    }

    &::after {
      display: none;
    }

    #{$root}__controls {
      display: block;
    }

    #{$root}__comand {
      display: block;
    }
  }

  &::after {
    display: block;
    content: "";
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    margin: 0 2px;
    width: 4px;
    height: 4px;
    position: relative;
    top: -1px;
    transform: rotateZ(135deg);
  }

  &:hover {
    #{$root}__value {
      color: #f00;
    }
    &::after {
      border-color: #f00;
    }
  }
}
</style>
