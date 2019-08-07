const express = require('express');
const router = express.Router();

router.get('/api/v1/profile/:platform/:gamertag', (request, response) => {
	console.log(request.params.platform, request.params.gamertag);
	response.send('Hello');
});

module.exports = router;
