const mongoose = require('mongoose');
const {Schema} = mongoose;
const NotesSchema = new Schema({

    //  In MongoDB, the ObjectId type is typically used as a unique identifier for documents. It's often used to establish relationships between different collections.
    // In the context of your schema, it seems that each "note" document will have a "user" field that holds the ObjectId of a user. This suggests that the "notes" are associated with specific users in some way.
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('notes',NotesSchema);