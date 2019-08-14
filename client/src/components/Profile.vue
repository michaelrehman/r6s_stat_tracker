<template>
	<div v-if="loading">
		<h1>Loading...</h1>
	</div>
	<div v-else-if="error">
		<h1>{{ error }}</h1>
		<router-link to="/">Go Back</router-link>
	</div>
	<section v-else-if="playerData" id="profile" class="container">
		<header>
			<div id="playerAvatarName">
				<img id="avatar" :src="`https://ubisoft-avatars.akamaized.net/${playerData.player.p_user}/default_146_146.png`" alt="Player avatar">
				<h1>{{ playerData.player.p_name }}</h1>
			</div>
			<span>Current MMR: {{ playerData.player.p_currentmmr }}</span>
		</header>
		<div class="grid">
			<div id="profileImageContainer"></div>
			<ul id="stats">

			</ul>
		</div>

		<h3>Seasonal Win Rate: {{ getWinRate }}%</h3>
		<!-- <h3>K/D Ratio: {{ getStat('killDeathRatio') }}</h3> -->
		<!--
			Win rate in % (wins & losses)
			Time played in hours
			K/D Ratio (kills & deaths)
			Total XP
		-->
	</section>
</template>

<script>
import axios from 'axios';

export default {
	name: 'Profile',
	data() {
		return {
			loading: true,
			error: null,
			playerData: null
		}
	},
	computed: {
		getWinRate() {
			const ref = this.playerData.playerStats.seasonal;
			// TODO: Fix calculation
			const winsOverTotal = (ref.total_casualwins + ref.total_rankedwins + ref.total_generalwins + ref.bomb_wins) / (ref.total_casualtotal + ref.total_rankedtotal + ref.total_generaltotal + ref.bomb_total);
			const rounded = Math.round(winsOverTotal * 10000) / 100
			return rounded;
		}
	},
	beforeCreate() {
		document.body.className = 'body-bg-no-img';
	},
	async created() {
		try {
			// Using axios (you get an object and have to go into its data property)
			const resp = await axios.get(
				`/api/v1/profile/${this.$route.params.platform}/${this.$route.params.gamertag}`
			);
			this.playerData = resp.data;

			// Using fetch (you get a Response object and have to convert to JSON)
			// const resp = await fetch(
			// 	`/api/v1/profile/${this.$route.params.platform}/${this.$route.params.gamertag}`
			// );
			// this.playerData = await resp.json();

			this.loading = false;
		} catch (err) {
			this.loading = false;
			// Using axios (not sure how to get the error using fetch)
			this.error = err.response.data.message;
		}
	}
}
</script>

<style scoped>
#profile {
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.3);
}

#playerAvatarName {
	display: flex;
	justify-content: start;
	align-items: center;
}

#avatar {
	width: 50px;
	height: 50px;
	margin-right: 15px;
}
</style>
