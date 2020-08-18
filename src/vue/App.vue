<template>
	<div>
		<label>Select Provider:</label>
		<select v-model="selectedProvider">
			<option v-for="provider in providers" :key="provider.id" :value="provider.id">{{provider.name}}</option>
		</select>
		<p>{{ selectedProvider }}</p>
	</div>
	<div v-if="errorMessage" style="color:red">{{errorMessage}}</div>
	<div v-if="notification">{{notification}}</div>
	<div>
		<button @click="generate">Generate</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// Import won't work for this
const ipcRenderer = window.require('electron').ipcRenderer;

import GenerationOptions from '../electron/generation-options';

import { Providers } from '../electron/sources/sources';

export default defineComponent({
	setup() {
		const selectedProvider = ref('');
		const providers = Array.from(Providers);
		let errorMessage = ref('');
		let notification = ref('');

		ipcRenderer.on('error', (event, args) => {
			errorMessage.value = args.message;
		});

		ipcRenderer.on('notification', (event, args) => {
      notification.value = args.message;
		});

		const generate = () => {
			ipcRenderer.send(
				'generate-item-sets',
				new GenerationOptions([selectedProvider.value])
			);
		};

		return {
			selectedProvider,
      generate,
      providers,
      errorMessage,
      notification
		};
	},
});
</script>
