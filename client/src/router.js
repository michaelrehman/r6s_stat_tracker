import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search.vue'
import Results from './components/Results.vue'
import Profile from './components/Profile.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'search',
			component: Search
		},
		{
			path: '/results/:platform/:gamertag',
			name: 'results',
			component: Results
		},
		{
			path: '/profile/:platform/:gamertag',
			name: 'profile',
			component: Profile
		}
	]
});