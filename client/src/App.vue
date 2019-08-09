<template>
	<div id="app">
		<Header/>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
	nmae: 'app',
	components: {
		Header
	}
}
</script>

<style>
* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

body {
	display: block;
	margin: auto;
	background: darkgray;
}

#app {
	width: 100%;
	max-width: 1200px;
	margin: auto;
	padding: 1rem 3rem;
	background: gray;
}
</style>
