<template>
	<div v-if="loading">
		<h1>Loading...</h1>
	</div>
	<div v-else-if="error">
		<h1>{{ error }}</h1>
		<router-link to="/">Go Back</router-link>
	</div>
	<section v-else-if="profileData" id="profile" class="container">
		<h1>{{ profileData.player.handle }}</h1>
		<div class="grid">
			<div id="profileImageContainer">
				<img src="" alt="Most played operator">
			</div>
		</div>

		<!-- <h3>Win Rate: {{ Math.round(getStat('winRate') * 10000) / 100 }}</h3> -->
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
			profileData: null
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
			this.profileData = resp.data;

			// Using fetch (you get a Response object and have to convert to JSON)
			// const resp = await fetch(
			// 	`/api/v1/profile/${this.$route.params.platform}/${this.$route.params.gamertag}`
			// );
			// this.profileData = await resp.json();

			this.loading = false;
		} catch (err) {
			this.loading = false;
			// Using axios (not sure how to get the error using fetch)
			this.error = err.response.data.message;
		}
	},
	methods: {
		getStat(statName) {
			const indexOfStat = this.findIndexOf(statName);
			const statDisplayValue = this.profileData.playerStats.stats[indexOfStat].displayValue;
			return statDisplayValue;
		},
		findIndexOf(keyValue) {
			let indexOf = -1;
			this.profileData.playerStats.stats.forEach((statObj, index) => {
				const idx = index;
				if (statObj.metadata.key === keyValue) {
					indexOf = index;
				}
			});
			return indexOf;
		}
	}
}
</script>

<style scoped>
#profile {
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.3);
}
</style>
