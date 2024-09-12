import mongoose from "mongoose";
const {schema} = mongoose;
const usersSchema = new mongoose.Schema(
    {
        username:{
            type: String,
            unique:true,
        },
        email:{
            type: String,
            unique:true,
        },
        password:{
            type: String,
        },
        phone:{
            type: String,
        },
        address:{
            type: String,
        },
        location:{
            type: String,
        },
        role: {
            type: String,
            default: "member",
        }

    }
);



const Users = mongoose.model("member",usersSchema);

export default Users;