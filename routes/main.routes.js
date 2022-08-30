const router = require('express').Router();
const mainController = require('../controllers/main.controller');


router.get('/', mainController.add);
router.get('/read', mainController.read);

module.exports = router;

