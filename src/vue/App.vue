<template>
  <h1>A vue app</h1>
  <button @click="increase">Clicked {{ count }} times.</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(0);
    const increase = () => {
      count.value++;
    };

    return {
      count,
      increase,
    };
  },
});
</script>