const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Iamagoodboy';
const fetchUser = require("../middleware/fetchUser");
// const { toHaveErrorMessage } = require('@testing-library/jest-dom/matchers');

// Route 1:- Create a user using: POST "/api/auth/createUser" No login required
router.post('/createUser', [
        body('name', 'Enter a valid name').isLength({ min: 3 }),
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password must atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
        let success = false;
        // obj = {9
        //     a: 'this', 
        //     number: 34
        // }
        // res.json(obj);

        // res.send("Hello");

        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ success,errors: errors.array() });
        }

        // check if the user with the same email already exist
        //The User.findOne() method returns a promise that resolves to the user object or null if no user is found. However, the way you're checking if (user) will always evaluate to true because even if no user is found, the promise itself is truthy.
        // To fix this, you need to use await with User.findOne() and then check the result against null to determine if a user exists with the given email. 

        try {
                let user = await User.findOne({ email: req.body.email });
                if (user) {
                        return res.status(400).json({success, error: "Sorry a user with this email already exist" })
                }

                // create a new user
                const salt = await bcrypt.genSalt(10);
                const secPass = await bcrypt.hash(req.body.password, salt)
                user = await User.create({
                        name: req.body.name,
                        email: req.body.email,
                        password: secPass,
                })
                //       .then(user => res.json(user));

                // console.log(req.body);

                // const user = User(req.body);
                // user.save();

                // res.send(req.body);

                const data = {
                        user: {
                                id: user.id
                        }
                }

                const authToken = jwt.sign(data, JWT_SECRET);
                console.log(authToken);
                
                success = true;
                res.json({ success,authToken })

                // res.json(user);

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})

// Route 2:- Authenticate a user using: POST "/api/auth/login". No login required
router.post('/login', [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists(), // exists is afunction to check if password is available or not
], async (req, res) => {
        let success = false;
        // If there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
        }

        // destructuring the email and password from the request if no errors are encountered
        const { email, password } = req.body;
        try {
                // abstract the user from database whose email is equivalent to the incoming email
                let user = await User.findOne({ email });

                // if user doesn't exist, return error
                if (!user) {
                        success = false;
                        return res.status(400).json({ error: "Invalid credentials" });
                }

                // if user does exist, compare the input password with the user password
                const passwordCompare = await bcrypt.compare(password, user.password);

                // if password doesn't matches, return error
                if (!passwordCompare) {
                        success = false;
                        return res.status(400).json({success, error: "Invalid credentials" })
                }

                // if password is correct, send a payload which is the data of the user to be sent
                // here we have sent the id of the user in the data 
                const data = {
                        user: {
                                id: user.id
                        }
                }

                // send an authtoken
                const authToken = jwt.sign(data, JWT_SECRET)
                success = true;
                res.json({ success, authToken });

        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})

// Route 3:- Get logged in user details using: POST "/api/auth/login". Login required
router.post('/getUser', fetchUser, async (req, res) => {

        // We will fetch all the details of the user from the authentication token
        try {
                // decode the authtoken and abstract the userId from it
                userId = req.user.id;
                // once the user has been found, select all the fields to be displayed except password
                const user = await User.findById(userId).select("-password");
                res.send(user);
        } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
        }
})
module.exports = router;