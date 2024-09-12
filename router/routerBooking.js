import express from 'express';
import {createbooking, getbooking, getbookingbyid, getbookingbyidbarber , joinbookingwithuser } from '../controllers/bookingcontroller.js'
const router = express.Router();


router.get('/getbooking' , getbooking)
router.post('/createbooking' , createbooking)
router.get('/getbookingbyid/:iduser' , getbookingbyid )
router.get('/getbookingbtidbarber/:idBarber' , getbookingbyidbarber)
router.get('/joinbookingwithuser/:idBarber' , joinbookingwithuser)




export default router;
