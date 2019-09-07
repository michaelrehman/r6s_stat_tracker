<template>
	<section id="search">
		<h1>Get Player Stats</h1>
		<form @submit.prevent="onSubmit">
			<div class="form-group">
				<label for="i_platform">Platform</label>
				<select id="i_platform" name="platform" v-model="platform">
					<option value="psn">Playstation</option>
					<option value="xbl">Xbox</option>
					<option value="uplay">Uplay</option>
				</select>
			</div>
			<div class="form-group">
				<label for="i_gamertag">Gamertag</label>
				<input id="i_gamertag" type="text" name="gamertag" v-model="gamertag" placeholder="PSN, Xbox, or Uplay gamertag">
			</div>
			<div class="form-group">
				<input class="btn" type="submit" value="Submit">
			</div>
		</form>
	</section>
</template>

<script>
export default {
	name: 'Search',
	data() {
		return {
			platform: 'psn',
			gamertag: ''
		}
	},
	beforeCreate() {
		document.body.className = 'body-bg-img';
	},
	methods: {
		onSubmit() {
			if (!this.gamertag) {
				this.$toasted.show('You\'re not a real gamer unless you have a gamertag.', {
					duration: 3000,
					icon: 'exclamation-circle',
					position: 'top-center',
					type: 'error'
				});
			} else {
				this.$router.push(`/results/${this.platform}/${this.gamertag}`);
			}
		}
	}
}
</script>

<style scoped>
#search {
	margin: 1.5rem 0;
	padding: 1rem;
	border: 3px solid var(--gray);
	background: rgba(0, 0, 0, 0.5);
}

input, select {
	width: 100%;
	padding: 0.2rem 0.5rem;
	font-size: 1rem;
}

label {
	font-weight: bold;
	font-size: 0.8rem;
	line-height: 1.5;
}

.form-group {
	margin-top: 1rem;
}

.btn {
	padding: 0.5rem 0;
	border: none;
	outline: none;
	background-color: var(--gray);
	color: #000000;
	font-weight: bold;
	cursor: pointer;
}
</style>
