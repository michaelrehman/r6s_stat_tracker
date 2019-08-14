const express = require('express');
const router = express.Router();
const fetch = require('node-fetch')

router.get('/:platform/:gamertag', async (request, response) => {
	try {
		const { platform, gamertag } = request.params;
		let player;
		let playerStats;
		// Get players
		const respPlayer = await fetch(`https://r6tab.com/api/search.php?platform=${platform}&search=${gamertag}`);
		const search = await respPlayer.json();

		// Check if we have any players before we starts pulling data
		if (search.results.length > 0) {
			const topResult = search.results[0];
			player = topResult;
			// Get player stats
			const respStats = await fetch(`https://r6tab.com/api/player.php?p_id=${player.p_id}`);
			playerStats = await respStats.json();
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
			// search for displaying a list of all the found players
			// player for basic stats and info
			// playerStats for in-depth stats and info
			return response.json({ search, player, playerStats });
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: 'Server Error'
		});
	}
});

module.exports = router;
