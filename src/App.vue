<template>
  <DynamicForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import DynamicForm from "@/components/DynamicForm.vue";

export default defineComponent({
  name: "App",
  components: {
    DynamicForm,
  },
});
</script>

<style>
body {
  font-family: "Inter", Arial, sans-serif;
}
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
</style>
