<template>
  <div :class="{ highlight: field.highlighted }" class="form-field">
    <input
      v-model="localValue"
      :placeholder="'Field ' + (index + 1)"
      @input="onInputChange"
      class="input-field"
    />
    <button @click="removeField" class="btn btn-remove">Remove</button>
    <span>Vowels: {{ field.vowelCount }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from "vue";
import { Field } from "@/types";

export default defineComponent({
  name: "FieldInput",
  props: {
    field: {
      type: Object as PropType<Field>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ["updateFieldValue", "removeField"],
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
.input-field {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}
.highlight {
  transition: background-color 0.3s ease;
  background-color: #d4edda;
}
.btn-remove {
  background-color: #dc3545;
  color: white;
}
</style>
