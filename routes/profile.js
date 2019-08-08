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
		const search = await scout.players.search(gamertag, platform, null, 'r6siege');   // returns JSON
		const player = await scout.players.get('r6siege', search.results[0].player.playerId);   // returns JSON
		response.json({search, topResult: player, nameOf: search.results[0].player.handle});
	} catch (error) {
		console.error(error);
		response.status(500).json({
			message: 'Server Error'
		});
	}
});

module.exports = router;
