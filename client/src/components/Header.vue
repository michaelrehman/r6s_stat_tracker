<template>
	<header>
		<img :src="image" alt="Rainbow Six Siege Logo">
	</header>
</template>

<script>
export default {
	name: 'Header',
	data() {
		return {
			image: require('@/assets/logo.png')
		}
	}
}
</script>

<style scoped>
header {
	background-color: black;
}

img {
	height: 200px;
}

/* Center image */
@media screen and (max-width: 925px) {
	img {
		display: block;
		margin: auto;
	}
}

/* Make image smalller */
@media screen and (max-width: 850px) {
	img {
		height: 125px;
	}
}
@media screen and (max-width: 500px) {
	img {
		height: 60px;
	}
}
</style>
