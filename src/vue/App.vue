<template>
  <div>
    <label>Select Provider: </label>
    <select v-model="selectedProvider">
      <option value="u-gg">U.gg</option>
    </select>
    <p>
      {{ selectedProvider }}
    </p>
  </div>
  <div>
    <button @click="generate">Generate</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

// Import won't work for this
const ipcRenderer = window.require("electron").ipcRenderer;

import GenerationOptions from "../electron/generation-options";

export default defineComponent({
  setup() {
    const selectedProvider = ref("");

    const generate = () => {
      ipcRenderer.send(
        "generate-item-sets",
        new GenerationOptions([selectedProvider.value])
      );
    };

    return {
      selectedProvider,
      generate,
    };
  },
});
</script>
