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
</style>
