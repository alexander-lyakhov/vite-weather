<template>
	<div class="tab-container">
		<slot></slot>
		<spinner />
	</div>
</template>

<script setup>
	// import { ref, reactive } from 'vue'
	import spinner from '@/components/modal/spinner'

	const props = defineProps({
	})
</script>

<style lang="scss" scoped>
.tab-container {
	position: relative;
	margin-top: .25rem;
}
</style>
	