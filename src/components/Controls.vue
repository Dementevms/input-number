<template>
  <div @click="click" v-click-outside="clickout" class="controls">
    <Trap :disabled="disabledTrap">
      <InputNumber
        ref="firstControl"
        class="controls__item"
        :tabindex="1"
        :value="valueControlA"
        :comand="comandControl01"
        @input="setValueControl('valueControlA', $event)"
      />
      <InputNumber
        class="controls__item"
        :tabindex="1"
        :value="valueControlB"
        :comand="comandControl02"
        @input="setValueControl('valueControlB', $event)"
      />
      <InputNumber
        class="controls__item"
        :tabindex="1"
        :value="valueControlB"
        @input="setValueControl('valueControlB', $event)"
      />
    </Trap>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import InputNumber from "./InputNumber.vue";
import Trap from "vue-focus-lock";

export default {
  name: "Controls",
  components: {
    InputNumber,
    Trap
  },
  data() {
    return {
      disabledTrap: true,
      comandControl01: {
        title: "Сумма",
        func: () => {
          this.executeComandControl01();
        }
      },
      comandControl02: {
        title: "Константа",
        func: () => {
          this.executeComandControl02();
        }
      }
    };
  },
  computed: {
    valueControlA() {
      return this.$store.state.controls.valueControlA;
    },
    valueControlB() {
      return this.$store.state.controls.valueControlB;
    }
  },
  methods: {
    click(){
      this.disabledTrap = false;
    },
    clickout(){
      this.disabledTrap = true;
    },
    executeComandControl01() {
      const value = this.$store.state.controls.valueControlB * 2;
      this.setValueControl("valueControlA", value);
    },
    executeComandControl02() {
      this.setValueControl("valueControlB", 1000);
    },
    setValueControl(id, value) {
      const data = { id, value };
      this.$store.dispatch("controls/setControl", data);
    }
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss">
.controls {
  outline: none;

  &__item {
    margin: 0 0 16px;

    &:last-child {
      margin: 0;
    }
  }
}
</style>
