const mongoose = require('mongoose');

const PaikkaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Etunimi:{
        type:String,
        required: true
    },
    Sukunimi:{
        type:String,
        required: true
    },
    Luokka:{
        type:mongoose.Schema.Types.Mixed,
        required: true
    },
    Istumapaikka:{
        type:mongoose.Schema.Types.Mixed,
        required: true
    },
    Confirmed:{
        type:Boolean,
        default: false,
        required: true
    },
    Turnaus:{
        type:Boolean,
        required: true
    },
    Tiiminimi:{
        type:mongoose.Schema.Types.Mixed,
    },
    Turnauspelit:{
        type:String,
    },
    ExtraInfo:{
        type:mongoose.Schema.Types.Mixed,
    },
    create_date:{
        type:Date,
        default: Date.now
    },
    IP:{
        type:mongoose.Schema.Types.Mixed,
    }
});

module.exports = mongoose.model('qIstumaPaikka', PaikkaSchema);