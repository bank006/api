import mongoose from "mongoose";
const { schema } = mongoose;
const bookingschema = new mongoose.Schema({
    iduser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    idBarber:{
        type:mongoose.Schema.Types.ObjectId,
    },
    namembarber:{
        type:String
    },
    imgmbarber:{
        type:String
    },
    time:{
        type:String
    },
    date:{
        type:String
    },
    nameservice:{
        type:String
    },
    price:{
        type:Number
    }
})

const booking = mongoose.model('booking' , bookingschema)
export default  booking;  