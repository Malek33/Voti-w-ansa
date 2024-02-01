// routes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const OrganizationController = require('../controllers/organizationController');
const authMiddleware = require('../middlewares/authMiddleware');

const multer = require("multer")
const { v4: uuidv4 } = require('uuid')
const path = require('path')


router.get('/user', authMiddleware, UserController.getUser);
router.get('/users', UserController.getAllUsers);
router.post('/userin', UserController.getUserIn);
router.post('/user', UserController.createUser);

router.post('/validateToken', UserController.tokenValidator);

router.get('/organization', authMiddleware, OrganizationController.getOrganization);
router.get('/organizations', OrganizationController.getAllOrganizations);
// router.get('/userOrganizations', OrganizationController.createUser);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/src/uploads/org')
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now()
        cb(null, uniqueSuffix + "-" + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    // console.log(file);
    const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"]
    if(allowedFileTypes.includes(file.mimetype)) cb(null, true)
    else  cb(null, false)
}

let upload = multer({storage, fileFilter})

router.post('/organization', upload.single('orgImg'), OrganizationController.createOrganization);


module.exports = router;
