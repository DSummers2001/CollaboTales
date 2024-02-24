const { newStory } = require('../Controllers/storyController');
const { allStories } = require('../Controllers/storyController');
const { getSpecificStory } = require('../Controllers/storyController');
const { updateStory } = require('../Controllers/storyController');
const { addLike } = require('../Controllers/storyController');

const router = require('express').Router();

router.post("/newStory", newStory);
router.get("/allStories", allStories);
router.post("/getSpecificStory", getSpecificStory);
router.post("/updateStory", updateStory);
router.post("/addLike", addLike);

module.exports = router;