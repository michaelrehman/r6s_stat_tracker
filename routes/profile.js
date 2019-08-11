const express = require('express');
const router = express.Router();
const scout = require('@scoutsdk/server-sdk');

scout.configure({
	clientId: process.env.TRACKER_API_KEY,
	clientSecret: 'cefdc776c0d1fd2d323528c602441a162d07c4512b22e22fef9b67973db72f8c',
	scope: 'public.read'
});

router.get('/:platform/:gamertag', async (request, response) => {
	try {
		const { platform, gamertag } = request.params;
		const search = await scout.players.search(gamertag, platform, null, 'r6siege');
		let player;
		let playerStats;

		// Check if we have any results and get the top one
		// otherwise we found no players
		if (search.results.length > 0) {
			const topResult = search.results[0];
			playerStats = await scout.players.get('r6siege', topResult.player.playerId);
			player = topResult.persona;
		} else {
			return response.status(404).json({
				message: 'No players found.'
			});
		}

		// Check for the player's stats
		if (!playerStats) {
			return response.json({
				message: 'Stats for this player could not be retrieved.'
			});
		} else {
			// return response.json({ search, topResultStats: playerStats });   // for testing
			return response.json({ player, playerStats });   // for production
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: 'Server Error'
		});
	}
});

module.exports = router;
