<template>
  <div class="form-container">
    <SearchInput
      v-bind="{ searchQuery, searchQueryMatches }"
      @updateSearchQuery="updateSearchQuery"
    />

    <FieldInput
      v-for="(field, index) in fields"
      :key="field.id"
      v-bind="{ index, field }"
      @updateFieldValue="updateFieldValue"
      @removeField="removeField"
    />

    <button
      @click="addField"
      class="btn btn-add"
      :disabled="fields.length >= 10"
    >
      Add Field
    </button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useFieldsStore } from "@/store/fieldsStore";
import FieldInput from "@/components/FieldInput.vue";
import SearchInput from "@/components/SearchInput.vue";

const fieldsStore = useFieldsStore();
const { fields, searchQuery, searchQueryMatches } = storeToRefs(fieldsStore);
const {
  addField,
  removeField: removeFieldFromStore,
  handleInputChange,
  highlightMatchingFields,
} = fieldsStore;

const updateFieldValue = (index: number, value: string) => {
  fields.value[index].value = value;
  handleInputChange(index);
};

const updateSearchQuery = (query: string) => {
  searchQuery.value = query;
  highlightMatchingFields();
};

const removeField = (index: number) => {
  removeFieldFromStore(index);
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.btn-add {
  margin-top: 20px;
  background-color: #007bff;
  color: white;
}
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
