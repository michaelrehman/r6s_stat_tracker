<template>
	<div v-if="loading">
		<h1>Loading...</h1>
	</div>
	<div v-else-if="error">
		<h1>{{ error }}</h1>
		<router-link to="/">Go Back</router-link>
	</div>
	<section v-else-if="results" id="results">
		<ol id="resultsList">
			<li v-for="result in results" :key="result.p_id">
				<Result :result="result"/>
			</li>
		</ol>
	</section>
</template>

<script>
import axios from 'axios';
import Result from '@/components/Result';

export default {
	name: 'Results',
	components: {Result},
	data() {
		return {
			loading: true,
			error: null,
			results: null,
		}
	},
	beforeCreate() {
		document.body.className = 'body-bg-img';
	},
	async created() {
		try {
			const resp = await axios.get(
				`/api/v1/results/${this.$route.params.platform}/${this.$route.params.gamertag}`
			);
			this.results = resp.data.results;
			this.loading = false;
		} catch (err) {
			this.loading = false;
			this.error = err.response.data.message;
		}
	}
}
</script>

<style scoped>
#resultsList {
	margin: 1.5rem 0;
}
</style>