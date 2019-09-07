<template>
	<div class="result" @click="goToPlayer">
		<div class="avatar-name">
			<img class="avatar" :src="`https://ubisoft-avatars.akamaized.net/${result.p_user}/default_146_146.png`" alt="Player Avatar">
			<h1 class="player-name">{{ result.p_name }}</h1>
		</div>
		<div class="lvl-mmr">
			<h3>LVL {{ result.p_level }}</h3>&nbsp;|&nbsp;
			<h3>MMR {{ result.p_currentmmr }}</h3>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Result',
	props: {
		result: Object
	},
	methods: {
		goToPlayer() {
			this.$router.push(`/profile/${this.result.p_platform}/${this.result.p_name}`);
		}
	}
}
</script>

<style scoped>
.result {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 1.5rem;
	padding: 1rem;
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.5);
	box-shadow: 0px 0px 10px 3px rgba(0, 0, 0, 0.5);
	transition: ease 0.15s;
}

.result:hover {
	cursor: pointer;
	box-shadow: 0px 3px 10px 5px rgba(0, 0, 0, 0.5);
	transform: translateY(-2px);
}

.result > div {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
</style>