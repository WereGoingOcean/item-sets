<template>
  <div>
    <h1>League Item Sets</h1>
    <select v-model="state.provider">
      <option value="ugg">U.gg</option>
    </select>
    <p>Selected provider is {{ state.provider }}</p>
    <button @click="generateSets">Generate</button>
  </div>
</template>

<script lang="ts">
import { reactive } from "vue";
import { ipcRenderer } from "electron";

export default {
  setup() {
    const state = reactive({
      provider: ''
    });

    function generateSets() {
      console.log('GEN!');
      ipcRenderer.send('generateSets', {
        provider: this.state.provider
      });
    }

    return {state, generateSets};
  },
};
</script>
