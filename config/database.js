import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const connectDB = () => {
    mongoose.connect( process.env.API_MONGO, {useNewUrlParser: true});
    mongoose.connection.once('open', () => {
    console.log('connected to mongoDB');

}).on('error', (error) => {
    console.log(error)

});
};

export default connectDB