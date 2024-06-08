import { ref } from "vue";
import { Field } from "@/types";

const fields = ref<Field[]>([]);

const addField = () => {
  if (fields.value.length >= 10) {
    return;
  }
  fields.value.push({
    id: Date.now(),
    value: "",
    vowelCount: 0,
    highlighted: false,
  });
};

const removeField = (index: number) => {
  if (fields.value.length <= 1) {
    return;
  }
  fields.value.splice(index, 1);
};

const updateVowelCount = (field: Field) => {
  const value = field.value;
  const vowelMatch = value.match(/[aeiou]/gi);
  field.vowelCount = vowelMatch ? vowelMatch.length : 0;
};

export { fields, addField, removeField, updateVowelCount };
