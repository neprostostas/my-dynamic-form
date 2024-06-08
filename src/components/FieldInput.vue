<template>
  <div :class="{ highlight: field.highlighted }" class="form-field">
    <input
      v-model="localValue"
      :placeholder="'Field ' + (index + 1)"
      @input="onInputChange"
      class="input-field"
    />
    <Button @click="removeField" buttonClass="btn-remove">Remove</Button>
    <span>Vowels: {{ field.vowelCount }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { FieldInputProps } from "@/types";
import Button from "@/components/Button.vue";

export default defineComponent({
  name: "FieldInput",
  props: {
    field: {
      type: Object as () => FieldInputProps["field"],
      required: true,
    },
    index: {
      type: Number as () => FieldInputProps["index"],
      required: true,
    },
  },
  emits: ["updateFieldValue", "removeField"],
  components: {
    Button,
  },
  setup(props, { emit }) {
    const localValue = ref(props.field.value);

    watch(localValue, (newValue) => {
      emit("updateFieldValue", props.index, newValue);
    });

    const onInputChange = () => {
      emit("updateFieldValue", props.index, localValue.value);
    };

    const removeField = () => {
      emit("removeField", props.index);
    };

    return {
      localValue,
      onInputChange,
      removeField,
    };
  },
});
</script>

<style scoped>
.form-field {
  border-radius: 15px;
  padding: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 400px;
}
</style>
