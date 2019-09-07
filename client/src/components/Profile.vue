<template>
	<div v-if="loading">
		<h1>Loading...</h1>
	</div>
	<div v-else-if="error">
		<h1>{{ error }}</h1>
		<router-link
			:to="`/results/${this.$route.params.platform}/${this.$route.params.gamertag}`">
			Go Back
		</router-link>
	</div>
	<section v-else-if="playerData" id="profile" class="container">
		<header>
			<div id="avatarName">
				<img id="avatar" :src="`https://ubisoft-avatars.akamaized.net/${playerData.p_user}/default_146_146.png`" alt="Player avatar">
				<h1>{{ playerData.p_name }}</h1>
			</div>
			<div id="lvlMMR">
				<p>LVL {{ playerData.p_level }}</p>&nbsp;|&nbsp;
				<p>MMR {{ playerData.p_currentmmr }}</p>
			</div>
		</header>
		<section id="stats">
			<article id="general">
				<header>
					<h3>General Stats</h3>
				</header>
				<ul id="generalStatsList">
					<li><h4>Ranked K/D:</h4> {{ playerData.kd / 100 }}</li>
					<li><h4>Headshot Accuracy:</h4> {{ playerData.p_headshotacc / 1000000 }}%</li>
				</ul>
			</article>
			<article id="seasonal">
				<header>
					<h3>Seasonal Stats</h3>
				</header>
				<ul id="seasonalStatsList">
					<li><h4>Win Rate</h4>
						<ul id="seasonalWinRate">
							<li>General: {{ getWinRate('general') }}%</li>
							<li>Casual: {{ getWinRate('casual') }}%</li>
							<li>Ranked: {{ getWinRate('ranked') }}%</li>
						</ul>
					</li>
					<li><h4>K/D</h4>
						<ul id="seasonalKD">
							<li>General: {{ getKD('general') }}</li>
							<li>Casual: {{ getKD('casual') }}</li>
							<li>Ranked: {{ getKD('ranked') }}</li>
						</ul>
					</li>
				</ul>
			</article>
		</section>
		<router-link to="/">Back To Search</router-link>
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
	// Win Rate (total), Accuracy (total), K/D (ranked, casual), Time Played (total, ranked, casual), Level
	computed: {

	},
	methods: {
		getWinRate(type) {
			const ref = this.playerData.seasonal;
			let winsOverTotal;
			if (type === 'general') {
				winsOverTotal = (ref.total_casualwins + ref.total_rankedwins + ref.total_generalwins + ref.bomb_wins + ref.secure_wins + ref.hostage_wins) / (ref.total_casualtotal + ref.total_rankedtotal + ref.total_generaltotal + ref.bomb_total + ref.secure_total + ref.hostage_total);
			} else if (type === 'casual') {
				winsOverTotal = ref.total_casualwins / ref.total_casualtotal;
			} else {
				winsOverTotal = ref.total_rankedwins / ref.total_rankedtotal;
			}
			return (winsOverTotal * 100).toFixed(2);
		},
		getKD(type) {
			const ref = this.playerData.seasonal;
			let kd;
			if (type === 'general') {
				kd = ref.total_generalkills / ref.total_generaldeaths;
			} else if (type === 'casual') {
				kd = ref.total_casualkills / ref.total_casualdeaths;
			} else {
				kd = ref.total_rankedkills / ref.total_rankeddeaths;
			}
			return kd.toFixed(2);
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
h3 {
	font-weight: 500;
	font-size: 1.5em;
}

#profile {
	border-radius: 15px;
	background-color: rgba(0, 0, 0, 0.5);
}

header {
	display: flex;
	justify-content: space-between;
}

header > div {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}

#stats {
	display: grid;
	margin: 1rem 0;
	grid-template-columns: 1fr 1fr;
	grid-gap: 1rem;
}

#stats > article {
	padding: 1rem;
	background-color: rgba(55, 7, 95, 0.5);
	border-radius: 25px;
}

ul > li > h4 {
	display: inline-block;
}
</style>
