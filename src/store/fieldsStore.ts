import { defineStore } from "pinia";
import {
  fields,
  addField,
  removeField,
  updateVowelCount,
} from "@/store/modules/fields";
import {
  searchQuery,
  searchQueryMatches,
  handleInputChange,
  highlightMatchingFields,
} from "@/store/modules/search";

export const useFieldsStore = defineStore(
  "fieldsStore",
  () => {
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
