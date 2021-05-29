const _ = require('lodash')
const User = require('../models/User')
const utils = require('../lib/utils');


exports.auth = async(  req, res ) =>{
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!"});
}

exports.getUsers = async(req, res) =>{
    const users = await User.find({});
    res.status(200).send(users);
}

exports.registerUser = async(req, res) =>{
    try {
        if(!req.body.password || !req.body.username){
            res.status(402).send("username and password, both are required");
        }
        const saltHash = utils.genPassword(req.body.password);
       // console.log(saltHash)
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        const newUser = new User({
            username: req.body.username,
            hash: hash,
            salt: salt
        });

        await newUser.save()
        res.status(200).send(newUser);

    } 
    catch (err) {
       res.status(500).send(err)
    
    }
}

exports.loginUser = async(req, res) =>{
    try{
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return res.status(401).send({ success: false, msg: "could not find user" });
        }
       // console.log(user);
        const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
       // console.log(isValid)
        if (isValid) {
            const tokenObject = utils.issueJWT(user);
            res.status(200).json({ success: true, token: tokenObject.token, expiresIn: tokenObject.expires });
        }
        else {
            res.status(401).json({ success: false, msg: "you entered the wrong password" });
        }   
    }
    catch (err) {
        res.status(500).send(err)
     
     }
}
