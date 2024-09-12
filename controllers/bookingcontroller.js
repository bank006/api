import booking from "../models/booking.js"
import mongoose from 'mongoose';
import Users from '../models/userModels.js';

export const getbooking = async (req, res) => {
    try {
        const result = await booking.find()
        res.json(result)
    } catch (error) {
        console.log("error get booking", error)
    }
}

export const createbooking = async (req, res) => {
    try {
        const { iduser, idBarber, idmbarber, namembarber, imgmbarber, time, date, nameservice, price } = req.body
        const result = await booking.create({
            iduser,
            idBarber,
            idmbarber,
            namembarber,
            imgmbarber,
            time,
            date,
            nameservice,
            price
        })
        res.json(result)
    } catch (error) {
        console.log("error create booking", error)
    }
}

// const deleteAllBarbers = async () => {
//   try {
//     await booking.deleteMany({});
//     console.log('All barbers deleted');
//   } catch (err) {
//     console.error('Error deleting barbers:', err);
//   }
// };

// deleteAllBarbers();

// 66e062dfcff6101c2376bc34

export const getbookingbyidbarber = async (req, res) => {
    try {
        const idBarber = req.params.idBarber
        const result = await booking.find({ idBarber })
        res.json(result)
    } catch (error) {
        console.log("error get booking by id barber", error)
    }
}


export const joinbookingwithuser = async (req, res) => {

    try {
        const idBarber = req.params.idBarber;
        const objectId = new mongoose.Types.ObjectId(idBarber);

        // ใช้ Aggregation Framework เพื่อ join ข้อมูล
        const result = await booking.aggregate([
            {
                $match: { idBarber: objectId } // กรองข้อมูลตาม idBarber
            },
            {
                $lookup: {
                    from: Users.collection.name, // ชื่อคอลเล็กชันที่ต้องการ join
                    localField: 'iduser', // ฟิลด์ในคอลเล็กชัน booking
                    foreignField: '_id', // ฟิลด์ในคอลเล็กชัน users
                    as: 'userDetails' // ชื่อฟิลด์ที่จะเก็บข้อมูลที่ join
                }
            }
        ]);

        res.json(result);
    } catch (error) {
        console.log("error get booking by id barber", error);
        res.status(500).json({ error: 'An error occurred while fetching bookings.' });
    }
};


export const getbookingbyid = async (req, res) => {
    try {
        const userId = req.params.iduser;
        const result = await booking.find({ iduser: userId });
        res.json(result)
    } catch (error) {
        console.log("error get booking by id", error)
    }
}

export const getbookingbyiduser = () => {

}