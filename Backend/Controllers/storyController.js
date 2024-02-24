const Story = require("../Models/storyModel");
const { ObjectId } = require('mongodb');

module.exports.newStory = async (req, res, next) => {
    try{
        const {title, genre, content, author, coAuthorList} = req.body;
        console.log(req.body)
        const story = await Story.create({
            title: title,
            genre: genre,
            content: content,
            author: author,
            coAuthorList: coAuthorList,
            numberOfLikes: 0,
        });
        return res.json({ status: true, story});
    } catch (ex) {
        next(ex)
    }
};

module.exports.updateStory = async (req, res, next) => {
    try{
        const {id,content} = req.body;
        const story = await Story.updateOne(
            { _id: id }, 
            { $set: { content: content } } 
          );
        return res.json({story});
    } catch (ex) {
        next(ex)
    }
};

module.exports.addLike = async (req, res, next) => {
    try{
        const {id,numberOfLikes} = req.body;
        const story = await Story.updateOne(
            { _id: id }, 
            { $set: { numberOfLikes: numberOfLikes } } 
          );
        return res.json({story});
    } catch (ex) {
        next(ex)
    }
};

module.exports.allStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
};

module.exports.getSpecificStory = async (req, res, next) => {
    try{
    const { storyID } = req.body;
    _id = new ObjectId(storyID);
    const story = await Story.findById({ _id });
     if(!story)
         return res.json({msg: "Story does not exist"});
    return res.json({ story });
    } catch (ex){
        next(ex);
    }
};