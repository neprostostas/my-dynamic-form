import { defineStore } from "pinia";
import { ref } from "vue";
import { Field } from "@/types";

export const useFieldsStore = defineStore(
  "fieldsStore",
  () => {
    const fields = ref<Field[]>([]);
    const searchQuery = ref<string>("");
    const searchQueryMatches = ref<boolean>(false);

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

    const handleInputChange = (index: number) => {
      updateVowelCount(fields.value[index]);
      highlightMatchingFields();
    };

    const updateVowelCount = (field: Field) => {
      const value = field.value;
      const vowelMatch = value.match(/[aeiou]/gi);
      field.vowelCount = vowelMatch ? vowelMatch.length : 0;
    };

    const highlightMatchingFields = () => {
      const query = searchQuery.value.toLowerCase();
      let matchFound = false;
      fields.value.forEach((field) => {
        if (query && field.value.toLowerCase().includes(query)) {
          field.highlighted = true;
          matchFound = true;
        } else {
          field.highlighted = false;
        }
      });
      searchQueryMatches.value = matchFound;
    };

    return {
      fields,
      searchQuery,
      searchQueryMatches,
      addField,
      removeField,
      handleInputChange,
      updateVowelCount,
      highlightMatchingFields,
    };
  },
  {
    persist: true,
  }
);
