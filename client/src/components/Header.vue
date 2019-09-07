<template>
	<header id="mainHeader">
		<img src="@/assets/logo.png" alt="Rainbow Six Siege Logo">
	</header>
</template>

<script>
export default {
	name: 'Header'
}
</script>

<style>
img {
	height: 200px;
}

/* Center image */
@media screen and (max-width: 925px) {
	.body-bg-img {
		background-position: bottom;
	}

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
	.body-bg-img {
		background-position: right;
	}

	img {
		height: 60px;
	}
}
</style>
