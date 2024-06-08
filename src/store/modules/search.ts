import { ref } from "vue";
import { Field } from "@/types";
import { fields, updateVowelCount } from "@/store/modules/fields";

const searchQuery = ref<string>("");
const searchQueryMatches = ref<boolean>(false);

const handleInputChange = (index: number) => {
  updateVowelCount(fields.value[index]);
  highlightMatchingFields();
};

const highlightMatchingFields = () => {
  const query = searchQuery.value.toLowerCase();
  let matchFound = false;
  fields.value.forEach((field: Field) => {
    if (query && field.value.toLowerCase().includes(query)) {
      field.highlighted = true;
      matchFound = true;
    } else {
      field.highlighted = false;
    }
  });
  searchQueryMatches.value = matchFound;
};

export {
  searchQuery,
  searchQueryMatches,
  handleInputChange,
  highlightMatchingFields,
};
