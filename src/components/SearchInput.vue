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
import { SearchInputProps } from "@/types";

export default defineComponent({
  name: "SearchInput",
  props: {
    searchQuery: {
      type: String as () => SearchInputProps["searchQuery"],
      required: true,
    },
    searchQueryMatches: {
      type: Boolean as () => SearchInputProps["searchQueryMatches"],
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
.input-field.search {
  width: 380px;
  margin: 20px 0 30px;
}
</style>
