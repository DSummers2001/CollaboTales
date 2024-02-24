const Character = require("../Models/characterModel");

module.exports.newCharacter = async (req, res, next) => {
    try{
        const {name, description } = req.body;
        const character = await Character.create({
            name,
            description,
        });
        return res.json({ status: true, character});
    } catch (ex) {
        next(ex)
    }
};