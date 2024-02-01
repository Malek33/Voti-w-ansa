const User = require("../models/User");
const bcrypt = require("bcrypt")

const jwt = require('jsonwebtoken')


// userController.js
const UserController = {

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      let token = req.headers.token
      let decoded = jwt.decode(token, process.env.TOKENSECRETKEY)
      // console.log(decoded);
      const users = await User.find({_id: decoded.id});

      if (users.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      const user = users[0];

      const userClaims = {
        id: user.id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        phoneNumb: user.phoneNumb,
        vote: user.vote,
        birthdate: user.birthdate,
        cin: user.cin
      }

      // console.log(user);
      // console.log(userClaims);

      // const token = jwt.sign(userClaims, process.env.TOKENSECRETKEY, { expiresIn: '1d' });
    // const responseUser = { token, data: user };
    res.status(201).json({ userClaims });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserIn: async (req, res) => {
    try {
      // console.log(req.body);
      const users = await User.find({email: req.body.email});

      if (users.length === 0) {
        return res.status(404).json({ error: 'User does not exist' });
      }

      const user = users[0];

      if( !await bcrypt.compare(req.body.password, user.password) ){
        return res.status(404).json({ error: 'Wrong password' });
      }

      // console.log(user);

      const userClaims = {
        id: user._id,
        username: user.username,
        email: user.email,
        isVerified: user.isVerified,
        phoneNumb: user.phoneNumb,
        vote: user.vote,
      }

      // console.log(userClaims);

      const token = jwt.sign(userClaims, process.env.TOKENSECRETKEY, { expiresIn: '1min' });
    const responseUser = { token, data: user };
    res.status(201).json({ user: responseUser });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { username, email, password, phoneNumb, birthdate, cin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, birthdate, email, phoneNumb, password: hashedPassword, cin });
      await newUser.save();
      // console.log("id:", (newUser._id.toHexString()));
      let payload = {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      }
      const token = jwt.sign(payload, process.env.TOKENSECRETKEY, {expiresIn: '1d'})
      const user = {token: token, data: newUser}
      res.status(201).json({user});
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  tokenValidator: async (req, res) => {
    try {
      token = req.body.token
      if (token) {
          jwt.verify(token, process.env.TOKENSECRETKEY, (err, decoded) => {
              if (err) {
                res.send({message: "Forbidden"})
              }else{
                res.status(200).json({message: "Authorized"})
              }
          })
      }
    else{
        res.json({error: "no token"})
    }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

};

module.exports = UserController;
