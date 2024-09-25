const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const { jwtAuthMiddleware } = require('../jwt');
const User = require('../models/user'); // Import User model correctly

const checkAdminRole = async(userID) => {
    try {
        const user = await User.findById(userID);
        if (user.role === 'admin') { // Fixed typo here
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
}

router.post('/', jwtAuthMiddleware, async(req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ error: 'User does not have admin role' }); // Consistency in error response format
        }

        const data = req.body;
        const newCandidate = new Candidate(data);
        const response = await newCandidate.save();

        console.log('Data saved');
        res.status(200).json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ error: 'User does not have admin role' }); // Consistency in error response format
        }

        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;

        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true,
            runValidators: true,
        });

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('Candidate data updated');
        res.status(200).json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.delete('/:candidateID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!await checkAdminRole(req.user.id)) {
            return res.status(403).json({ error: 'User does not have admin role' }); // Consistency in error response format
        }

        const candidateID = req.params.candidateID;
        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        console.log('Candidate deleted');
        res.status(200).json({ response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
