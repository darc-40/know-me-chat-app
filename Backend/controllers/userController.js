const User = require('../models/userModel');

// LOGIC TO GET ALL USERS EXCEPT THE LOGGEDIN USER
const getUsers =async (req, res) => {
    try {
       const loggedinUser = req.params.userId ;
       const user = await User.find({_id:{$ne:loggedinUser}});
       res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
// SENDING A AREQUEST TO A AUSER
const sendingRequest = async (req, res) => {
const {currentUserId, selectedUserId } = req.body;
try {
    // updating the receipient array
    const requestSent = await User.findByIdAndUpdate(selectedUserId,{
        $push:{friendRequests: currentUserId}
    });
    // updating the senders array with sent requests
    const sendersRequest = await User.findByIdAndUpdate(currentUserId,{
        $push:{ sentFriendRequests: selectedUserId}
    });
    res.status(200).json({ requestSent, sendersRequest})
} catch (error) {
    res.status(400).json({error:error.message})
}
}
// GETTING USERS FRIEND REQUESTS
const getFriendRequests  =  async(req, res ) => {
    const { userId } = req.params;
try {
    const user = await User.findById(userId).populate('friendRequests', "name, email, profile").lean();
    const friendRequest = user.friendRequests;
    res.status(200).json({ friendRequest})
} catch (error) {
    res.status(400).json({error:error.message})
}
}

module.exports = { getUsers, sendingRequest, getFriendRequests }