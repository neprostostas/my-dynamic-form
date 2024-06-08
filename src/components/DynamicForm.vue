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
import { ref, reactive, watch, onMounted } from "vue";

interface Field {
  id: number;
  value: string;
  vowelCount: number;
  highlighted: boolean;
}

const fields = reactive<Field[]>([]);
const searchQuery = ref<string>("");
const searchQueryMatches = ref<string | boolean>(false);

const addField = () => {
  if (fields.length >= 10) {
    return;
  }
  fields.push({
    id: Date.now(),
    value: "",
    vowelCount: 0,
    highlighted: false,
  });
  saveFieldsToLocalStorage();
};

const removeField = (index: number) => {
  if (fields.length <= 1) {
    return;
  }
  fields.splice(index, 1);
  saveFieldsToLocalStorage();
};

const handleInputChange = (index: number) => {
  updateVowelCount(fields[index]);
  highlightMatchingFields();
  saveFieldsToLocalStorage();
};

const updateVowelCount = (field: Field) => {
  const value = field.value;
  const vowelMatch = value.match(/[aeiou]/gi);
  field.vowelCount = vowelMatch ? vowelMatch.length : 0;
};

const highlightMatchingFields = () => {
  const query = searchQuery.value.toLowerCase();
  let matchFound = false;
  fields.forEach((field) => {
    if (query && field.value.toLowerCase().includes(query)) {
      field.highlighted = true;
      matchFound = true;
    } else {
      field.highlighted = false;
    }
  });
  searchQueryMatches.value = query && matchFound;
};

const saveFieldsToLocalStorage = () => {
  localStorage.setItem("fields", JSON.stringify(fields));
};

const loadFieldsFromLocalStorage = () => {
  const storedFields = localStorage.getItem("fields");
  if (!storedFields) {
    fields.push({ id: 1, value: "", vowelCount: 0, highlighted: false });
    fields.push({ id: 2, value: "", vowelCount: 0, highlighted: false });
    fields.push({ id: 3, value: "", vowelCount: 0, highlighted: false });
    return;
  }
  const parsedFields = JSON.parse(storedFields);
  parsedFields.forEach((field: Field) => {
    fields.push(field);
  });
  fields.forEach(updateVowelCount);
  highlightMatchingFields();
};

onMounted(() => {
  loadFieldsFromLocalStorage();
});

watch(searchQuery, () => {
  highlightMatchingFields();
});

watch(
  fields,
  (newFields) => {
    newFields.forEach(updateVowelCount);
    highlightMatchingFields();
  },
  { deep: true }
);
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
