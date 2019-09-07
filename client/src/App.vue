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
	--link-color: #165E8B;
}

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

a {
	color: var(--link-color);
	font-size: 1rem;
	font-weight: bold;
	text-decoration: none;
}

a:hover {
	text-decoration: underline;
}

a:visited {
	color: var(--link-color);
}

ul, ol {
	list-style: none;
}

.body-bg-img {
	background: #121212 url('./assets/bgimg.png') no-repeat top right;
}

.body-bg-no-img {
	background: #121212;
}

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
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

#avatar, .avatar {
	width: 50px;
	height: 50px;
	margin-right: 15px;
}
</style>
