<template>
	<div id="app">
		<Header/>
		<router-view/>
	</div>
</template>

<script>
import Header from '@/components/Header.vue';

export default {
	name: 'app',
	components: { Header }
}
</script>

<style>
:root {
	--gray: #dcdcdc;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

.body-bg-img {
	background: #121212 url('./assets/bgimg.png') no-repeat top right;
}

.body-bg-no-img {
	background: #121212;
}

#app {
	width: 100%;
	max-width: 1200px;
	margin: auto;
	padding: 1rem 3rem;
	color: var(--gray);
}

.container {
	width: 100%;
	margin: auto;
	padding: 1.5rem;
}
</style>
