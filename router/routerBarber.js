import express from 'express';
import { verifyToken } from '../utils/verifyToken.js';
import { getAllServeById, AddServe, getServeDetailById, deleteServeById, createBarber, getAllServe, upload, getimage, getBarberById, getBarberByIds, updateBarberbyid } from '../controllers/barberControllers.js';
// import { AddHaircut, getAllHaircutById, deleteHaircutById } from '../controllers/้haircutControllers.js'

const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post('/create-serve/:useId', verifyToken,AddServe);
router.get('/all-serve/:useId', getAllServeById);
router.post('/create-barber' , upload.single('image') , createBarber)
router.get('/barber/:id/image' , getimage)
router.get('/getall' , getAllServe)
router.get('/detail-serve/:useId', verifyToken,getServeDetailById);
router.delete('/delete-serve/:useId', verifyToken,deleteServeById);

router.get('/getMybarber/:idBarber' , getBarberByIds)
router.post('/updateBarber/:idBarber' , updateBarberbyid)

// router.post('/create-haircut/:useId', verifyToken,AddHaircut);
// router.get('/all-haircut/:useId', verifyToken,getAllHaircutById);
// router.delete('/delete-haircut/:useId', verifyToken,deleteHaircutById);

// router.get("/get-all-user", isAuthenticated, verifyToken, getAllUser);
// router.get('/getdata-user', isAuthenticated,verifyToken,getUser);



export default router;
