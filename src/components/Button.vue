<template>
  <button
    :class="['btn', buttonClass]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ButtonProps } from "@/types";

export default defineComponent({
  name: "Button",
  props: {
    buttonClass: {
      type: String as () => ButtonProps["buttonClass"],
      default: "",
    },
    disabled: {
      type: Boolean as () => ButtonProps["disabled"],
      default: false,
    },
  },
});
</script>

<style scoped>
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.btn-add {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
}
.btn-remove {
  background-color: #dc3545;
  color: white;
}
</style>
