const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
const { check, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

// @route GET api/profile
// @desc Test route
// @access Private
router.get('/', auth, async (req, res) => {
    try{
        const profile = await Profile.findOne({ user: req.user.id })
            .populate('user', 
            ['name', 'avatar']);

        if(!profile){
            return res.status(400).json({ msg: "There is no profile for this user"})
        }

        res.json(profile)

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route POST api/profile
// @desc Create or update user profile
// @access Private
router.post('/',
    [ 
        auth,
        [
            check('birthdate', 'Birthdate is required')
                .not()
                .isEmpty()

        ] 
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {birthdate} = req.body;
        
        const profileFields = { birthdate , user: req.user.id}

        try {
            let profile = await Profile.findOne({user:req.user.id})
            if(profile) {
                // Update
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Create
            profile = new Profile(profileFields);
            await profile.save();
            res.json(profile);
        } catch(err) {
            console.error(err.message);
            res.status(500).send('Server Error')
        }
    }
)

// @route DELETE api/profile
// @desc Delete profile, user & posts
// @access Private
router.delete('/', auth, async (req, res) => {
    try{
        // @todo - remove users posts

        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });

        // Remove user
        await User.findOneAndRemove({_id: req.user.id});

        res.json({ msg: 'User deleted' });

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;