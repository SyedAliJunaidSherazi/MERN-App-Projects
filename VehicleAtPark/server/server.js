const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT;
const app = express();

//Modals 
const user = require('./models/user');
const vehicle_parking = require('./models/vehicle_parking');
const parking_space = require('./models/parking_space');
const parking_zone = require('./models/parking_zone');

//false mangoose pluralize
mongoose.pluralize(null);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const router = express.Router();

const databaseURL = process.env.DATABASE_URL;

mongoose.connect(databaseURL, { useNewUrlParser: true, useUnifiedTopology: true });
let db = mongoose.connection;


// connect through mongo client this is optional 
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(databaseURL, { useNewUrlParser: true });


db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(logger("dev"));


db.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

router.get("/", (req, res) => {
    res.json({ message: "Hello World" });
});

router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const userData = await user.findOne({ email });
  
      if (!userData) {
        return res.status(400).json({
          success: false,
          message: "User Not Exist"
        });
      }
  
      if (password !== userData.password) {
        return res.status(400).json({
          success: false,
          message: "Password is not correct"
        });
      }
  
      const previlage = {
        canInitialize: userData.type === 'agent',
        canBookParking: userData.type === 'agent',
        canSeeReports: true  // can manage reports also
      };
  
      const users = {
        u_id: userData._userId,
        u_name: userData.name,
        u_email: userData.email,
        u_type: userData.type,
        previlage
      };
  
      return res.json({ success: true, users });
    } catch (error) {
      console.error("Error in login:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  });
  
  router.get("/getDashboard", async (req, res) => {
    try {
      const parkingSpaces = await parking_space.find({});
  
      if (!parkingSpaces || parkingSpaces.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No Data Exist"
        });
      }
  
      const dashboard = parkingSpaces.map(space => ({
        title: space.parking_space_title,
        is_available: space.is_available,
        vehicle_no: space.vehicle_no || "",
        zone_id: space.parking_zone_id,
        vehicle_transaction_id: space.vehicle_transaction_id || ''
      }));
  
      return res.json({ success: true, dashboard });
    } catch (error) {
      console.error("Error in getDashboard:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  });  
  router.get("/getReport", async (req, res) => {
    try {
      const parkingReports = await vehicle_parking.find({});
  
      if (!parkingReports || parkingReports.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No Data Exist"
        });
      }
  
      const report = parkingReports.map(entry => ({
        parking_zone_id: entry.parking_zone_id,
        parking_space_id: entry.parking_space_id,
        booking_date_time: entry.booking_date_time,
        release_date_time: entry.release_date_time,
        vehicle_no: entry.vehicle_no
      }));
  
      return res.json({ success: true, report });
    } catch (error) {
      console.error("Error in getReport:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  });
  

router.get("/getZone", async (req, res) => {
  try {
    const parkingZones = await parking_zone.find({});

    if (!parkingZones || parkingZones.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Data Exist"
      });
    }

    return res.json({ success: true, data: parkingZones });
  } catch (error) {
    console.error("Error in getZone:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.get("/createZone", async (req, res) => {
  try {
    const zones = await parking_zone.find({});
    const block = String.fromCharCode(65 + zones.length);

    const newZone = await parking_zone.create({
      parking_zone_id: block,
      parking_zone_title: block
    });

    console.log(newZone.parking_zone_title + " saved to parkingMgmt collection.");

    const parkingSpaces = [];

    for (let i = 1; i <= 10; i++) {
      const parkingSpace = new parking_space({
        is_available: true,
        parking_space_id: `${block}${i === 10 ? i : '0' + i}`,
        parking_space_title: `${block}${i === 10 ? i : '0' + i}`,
        parking_zone_id: block,
        vehicle_no: '',
        vehicle_transaction_id: ''
      });

      parkingSpaces.push(parkingSpace);
    }

    const createdSpaces = await parking_space.insertMany(parkingSpaces);

    return res.json({ success: true, data: createdSpaces });
  } catch (error) {
    console.error("Error in createZone:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.get("/deleteZone", async (req, res) => {
  try {
    const zones = await parking_zone.find({});
    if (!zones || zones.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Data Exist"
      });
    }

    const block = String.fromCharCode(65 + (zones.length - 1));
    console.log('delete block', block);

    await parking_space.deleteMany({ parking_zone_id: block });
    const deletedZone = await parking_zone.deleteOne({ parking_zone_id: block });

    console.log(deletedZone.deletedCount + " delete parking_zone from parkingMgmt collection.");
    return res.json({ success: true, data: deletedZone });
  } catch (error) {
    console.error("Error in deleteZone:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.post("/bookParking", async (req, res) => {
  try {
    const { title, is_available, vehicle_no, zone_id } = req.body;

    const vehicle = await vehicle_parking.create({
      parking_zone_id: zone_id,
      parking_space_id: title,
      booking_date_time: new Date(),
      release_date_time: null,
      vehicle_no: vehicle_no
    });

    if (!vehicle) {
      return res.status(400).json({
        success: false,
        message: "Unable to update"
      });
    }

    const update = {
      is_available: false,
      vehicle_no: vehicle_no,
      vehicle_transaction_id: vehicle._id
    };

    const updatedSpace = await parking_space.findOneAndUpdate(
      { parking_space_title: title },
      update,
      { new: true, upsert: true, returnNewDocument: true }
    );

    if (!updatedSpace) {
      return res.status(400).json({
        success: false,
        message: "Unable to update"
      });
    }

    return res.json({ success: true, data: updatedSpace });
  } catch (error) {
    console.error("Error in bookParking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.post("/releaseParking", async (req, res) => {
  try {
    const { title, vehicle_transaction_id } = req.body;

    const update = {
      is_available: true,
      vehicle_no: '',
      vehicle_transaction_id: ''
    };

    const vehicleUpdate = {
      release_date_time: new Date()
    };

    const updatedVehicle = await vehicle_parking.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(vehicle_transaction_id) },
      vehicleUpdate
    );

    if (!updatedVehicle) {
      return res.status(400).json({
        success: false,
        message: "Unable to update"
      });
    }

    const updatedSpace = await parking_space.findOneAndUpdate(
      { parking_space_title: title },
      update,
      { new: true, upsert: true, returnNewDocument: true }
    );

    if (!updatedSpace) {
      return res.status(400).json({
        success: false,
        message: "Unable to update"
      });
    }

    return res.json({ success: true, data: updatedSpace });
  } catch (error) {
    console.error("Error in releaseParking:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

router.get("/insert", async (req, res) => {
  try {
    const insertData = async (zone_id, start, end) => {
      for (let i = start; i <= end; i++) {
        const parking = new parking_space({
          is_available: true,
          parking_space_id: `${zone_id}${i < 10 ? '0' + i : i}`,
          parking_space_title: `${zone_id}${i < 10 ? '0' + i : i}`,
          parking_zone_id: zone_id,
          vehicle_no: '',
          vehicle_transaction_id: ''
        });

        await parking.save();
      }
    };

    await insertData('A', 1, 10);
    await insertData('B', 11, 20);
    await insertData('C', 21, 30);

    return res.json({ success: true, message: "Data inserted successfully" });
  } catch (error) {
    console.error("Error in insert:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});


// router.post("/updateData", (req, res) => {
//   const { id, update } = req.body;
//   Data.findByIdAndUpdate(id, update, err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

// router.delete("/deleteData", (req, res) => {
//   const { id } = req.body;
//   Data.findByIdAndRemove(id, err => {
//     if (err) return res.send(err);
//     return res.json({ success: true });
//   });
// });

// router.post("/putData", (req, res) => {
//   let data = new Data();

//   const { id, message } = req.body;

//   if ((!id && id !== 0) || !message) {
//     return res.json({
//       success: false,
//       error: "INVALID INPUTS"
//     });
//   }
//   data.message = message;
//   data.id = id;
//   data.save(err => {
//     if (err) return res.json({ success: false, error: err });
//     return res.json({ success: true });
//   });
// });

app.use("/api", router);

app.listen(PORT, () => console.log(`LISTENING ON PORT NO ${PORT}`));