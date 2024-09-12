import Barber from "../models/barberModels.js";
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

// สร้างตัวแปร __dirname จาก import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })


export const AddServe = async (req, res, next) => {
  const {
    nameServe,
    price,

  } = req.body;
  const { useId } = req.params

  try {
    // const existinUser = await Users.findOne({ useremail, username });
    // if (existinUser)
    //   return res.status(403).json({
    //     success: false,
    //     message: "This user already exists.",
    //   });

    // Check if user already exists
    // const oldMember = await Users.findOne({ where: { useremail } });
    // if (oldMember) {
    //   return res.status(409).send("User already exists. Please login");
    // }

    // Encrypt user password
    const newServe = await Barber.create({
      idBarber: useId,
      nameServe,
      price,
    });


    // Optionally save token to newUser
    await newServe.save();

    // Return new user with status
    res.status(201).json({ data: newServe, status: "OK" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const createBarber = async (req, res, next) => {
  try {
    const { idBarber, nameBarber, phone, location, dateOpen, dateClose, address, contact } = req.body;

    // แปลงเวลาให้เป็นวันที่สมบูรณ์ (เช่น เพิ่มวันที่ปัจจุบัน)
    const currentDate = new Date().toISOString().split('T')[0]; // เอาแค่ส่วนวันที่ // ใช้ชื่อไฟล์ใหม่ที่ตั้งโดย Multer\
    const contacts = JSON.parse(req.body.contact);

    const newBarber = new Barber({
      idBarber,
      nameBarber,
      phone,
      location,
      dateOpen,// แปลงเวลารวมกับวันที่ปัจจุบัน
      dateClose, // แปลงเวลารวมกับวันที่ปัจจุบัน
      address,
      contact: contacts,
      imgDetail: 'https://png.pngtree.com/png-vector/20240115/ourmid/pngtree-barber-shop-logo-black-color-png-image_11437949.png' // บันทึกชื่อไฟล์ในฐานข้อมูล
    });

    const savedBarber = await newBarber.save();
    res.status(201).json({ success: true, data: savedBarber });
  } catch (error) {
    console.error(error); // พิมพ์ข้อผิดพลาดในคอนโซลเพื่อดูรายละเอียด
    res.status(500).json({ success: false, error: error.message });
  }
};
// const deleteAllBarbers = async () => {
//   try {
//     await Barber.deleteMany({});
//     console.log('All barbers deleted');
//   } catch (err) {
//     console.error('Error deleting barbers:', err);
//   }
// };

// deleteAllBarbers();

export const updateBarberbyid = async (req, res) => {
  try {
    const {
      idBarber,
      nameBarber,
      phone,
      dateOpen,
      dateClose,
      address,
      contact,
      imgDetail,
      location
    } = req.body;

    console.log('idBarber:', idBarber);
    console.log('nameBarber:', nameBarber);
    console.log('phone:', phone);
    console.log('dateOpen:', dateOpen);
    console.log('dateClose:', dateClose);
    console.log('address:', address);
    console.log('contact:', contact);
    console.log('imgDetail:', imgDetail);
    console.log('location:', location);

    // ค้นหาด้วย idBarber และอัพเดตข้อมูล
    const updatedBarber = await Barber.findOneAndUpdate(
      { idBarber }, // ใช้ idBarber แทน _id
      {
        nameBarber,
        phone,
        dateOpen,
        dateClose,
        address,
        contact,
        imgDetail,
        location
      },
      { new: true } // คืนค่าข้อมูลที่อัพเดตแล้ว
    );

    if (!updatedBarber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    res.status(200).json(updatedBarber);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}



export const getBarberByIds = async (req, res) => {
  try {
    const barberId = req.params.idBarber;
    const result = await Barber.findOne({ idBarber: barberId });
    if (result) {
      res.json(result);
    }
    else {
      res.json({ staus: false, message: "ไม่พบข้อมูล" });
    }

  } catch (error) {
    console.log("Error getting barber by idBarber", error);
    res.status(500).json({ message: "Error getting barber by idBarber" });
  }
}




export const getBarberById = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    // สร้าง URL สำหรับภาพ
    const imgUrl = `/uploads/${barber.imgDetail}`;

    res.status(200).json({
      success: true,
      data: {
        ...barber._doc,
        imgUrl, // เพิ่ม URL ของภาพในข้อมูลที่ส่งกลับ
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};




export const getimage = async (req, res) => {
  try {
    const barber = await Barber.findById(req.params.id);
    if (!barber) {
      return res.status(404).json({ message: 'Barber not found' });
    }

    // Convert image buffer to base64 string
    if (barber.imgDetail) {
      // Make sure the data field is converted to a base64 string
      barber.imgDetail.data = barber.imgDetail.data.toString('base64');
      barber.imgDetail.contentType = barber.imgDetail.contentType || 'image/jpeg';
    }

    res.status(200).json({ success: true, data: barber });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}



export const getAllServeById = async (req, res, next) => {
  try {
    const data = await Barber.find({ idBarber: req.params.useId });

    if (!data) {
      return next("User doesn't exists", 400);
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};



export const getAllServe = async (req, res, next) => {
  try {
    const data = await Barber.find();

    if (!data) {
      return next("User doesn't exists", 400);
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

export const getServeDetailById = async (req, res, next) => {
  try {
    const data = await Barber.findById(req.params.useId);

    if (!data) {
      return next("User doesn't exists", 400);
    }

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

export const deleteServeById = async (req, res, next) => {
  const barberid = req.params.useId;
  try {
    const dataServe = await Barber.findByIdAndDelete(barberid);
    if (!dataServe) {
      return next(createError(400, "Book doesn't exists"));
    }
    res.status(200).json({
      success: true,
      message: "Delete a Serve Successfully !",
    });
  } catch (err) {
    next(createError(500, "Book Data is Not Working !"));
  }
};
