const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:platform/:gamertag', async (request, response) => {
	try {
		const {platform, gamertag} = request.params;
		const resp = await fetch(`https://r6tab.com/api/search.php?platform=${platform}&search=${gamertag}`);
		const search = await resp.json();
		return response.json(search);
	} catch (error) {
		console.error(error);
		return response.status(500).json({
			message: 'Server Error'
		});
	}
});

module.exports = router;