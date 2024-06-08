<template>
  <div class="form-container">
    <input
      v-model="searchQuery"
      placeholder="Search"
      @input="highlightMatchingFields"
      :class="{ highlight: searchQueryMatches }"
      class="input-field search"
    />

    <div
      v-for="(field, index) in fields"
      :key="field.id"
      class="form-field"
      :class="{ highlight: field.highlighted }"
    >
      <input
        v-model="field.value"
        :placeholder="'Field ' + (index + 1)"
        @input="() => handleInputChange(index)"
        class="input-field"
      />
      <button @click="() => removeField(index)" class="btn btn-remove">
        Remove
      </button>
      <span>Vowels: {{ field.vowelCount }}</span>
    </div>

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

const fieldsStore = useFieldsStore();
const { fields, searchQuery, searchQueryMatches } = storeToRefs(fieldsStore);
const { addField, removeField, handleInputChange, highlightMatchingFields } =
  fieldsStore;
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
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
.input-field.search {
  width: 380px;
  margin: 20px 0 30px;
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
.btn-remove {
  background-color: #dc3545;
  color: white;
}
.btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.highlight {
  transition: background-color 0.3s ease;
  background-color: #d4edda;
}
</style>
