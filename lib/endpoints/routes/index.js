const {ownerOf} = require("../../services/owners");
const {whiteListIp} = require("../../middleware/whiteListIPMiddleware");
const router = require("express").Router();

router.post('/ownerOf', whiteListIp, ownerOf);

router.get('/', (req , res) => {
    return res.send("Working...")
});

module.exports = router