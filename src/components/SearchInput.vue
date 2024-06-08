<template>
  <input
    v-model="localSearchQuery"
    placeholder="Search"
    @input="onInputChange"
    :class="{ highlight: searchQueryMatches }"
    class="input-field search"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "SearchInput",
  props: {
    searchQuery: {
      type: String,
      required: true,
    },
    searchQueryMatches: {
      type: Boolean,
      required: true,
    },
  },
  emits: ["updateSearchQuery"],
  setup(props, { emit }) {
    const localSearchQuery = ref(props.searchQuery);

    watch(localSearchQuery, (newQuery) => {
      emit("updateSearchQuery", newQuery);
    });

    const onInputChange = () => {
      emit("updateSearchQuery", localSearchQuery.value);
    };

    return {
      localSearchQuery,
      onInputChange,
    };
  },
});
</script>

<style scoped>
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
.highlight {
  transition: background-color 0.3s ease;
  background-color: #d4edda;
}
</style>
