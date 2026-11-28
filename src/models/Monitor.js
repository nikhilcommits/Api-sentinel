    const mongoose = require("mongoose");


    const monitorSchema = new mongoose.Schema({
        name:{
            type : String,
            required : true

        },
        url:{
            type: String,
            required : true
        },
        method:{
            type : String,
            default : 'GET'
        },
        expectedStatus:{
            type : Number,
            default : 200

        },
        timeout:{
            type: Number,
            default: 5000
        },
        isActive:{
            type : Boolean,
            default : true

        },
        checkInterval: {
        type: Number,
        default: 5
        }

    },{timestamps : true});

    const Monitor = mongoose.model("monitor",monitorSchema);

    module.exports = Monitor;