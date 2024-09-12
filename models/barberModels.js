import mongoose from "mongoose";
const { schema } = mongoose;
const barberSchema = new mongoose.Schema({
  idBarber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'members'
  },
  nameBarber: {
    type: String,
  },
  nameServe: {
    type: String,
  },
  price: {
    type: String,
  },
  phone: {
    type: String,
  },
  moreDetail: {
    type: String,
  },
  imgDetail: {
    type: String
  },
  dateOpen: {
    type: String,
  },
  dateClose: {
    type: String,
  },
  location: {
    type: String,
  },
  address: {
    type: String,
  },
  nameHaircut: {
    type: String
  },
  imgHaircut: {
    type: String
  },
  contact: {
    facebook: String,
    line: String,
    instagram: String
  },
});

const Barber = mongoose.model("barber_shop", barberSchema);

export default Barber;

