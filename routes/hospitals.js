const express = require('express');
const router = express.Router();
const appointmentRouter = require('./appointments')
const {protect, authorize} = require('../middleware/auth');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital, getVacCenters} = require('../controllers/hospitals');
const swaggerJSDoc = require('swagger-jsdoc');
const { schema, distinct } = require('../models/User');
const Hospital = require('../models/Hospital');

router.use('/:hospitalId/appointments/', appointmentRouter);

router.route('/vacCenters').get(getVacCenters);

router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital);
/**
* @swagger
* components:
*   schemas:
*       Hospital:
*           type: object
*           required:
*               - name
*               - address
*           properties:
*               id:
*                   type: string
*                   format: uuid
*                   description: The auto-generated id of the hospital
*                   example: d290f1ee-6c54-4b01-90e6-d701748f0851
*               ลําดับ:
*                   type: string
*                   description: Ordinal number
*               name:
*                   type: string
*                   description: Hospital name
*               address:
*                   type: string
*                   description: House No., Street, Road
*               district:
*                   type: string
*                   description: District
*               province:
*                   type: string
*                   description: province
*               postalcode:
*                   type: string
*                   description: 5-digit postal code 
*               tel:
*                   type: string
*                   description: telephone number
*               region:
*                   type: string
*                   description: region
*               example:
*                   id: 609bda561452242d88d36e37
*                   ลําดับ: 121
*                   name: Happy Hospital
*                   address: 121 ถ.สุขุมวิท
*                   district: บางนา
*                   province: กรุงเทพมหานคร
*                   postalcode: 10110
*                   tel: 02-2187000
*                   region: กรุงเทพมหานคร (Bangkok)
*/

/**
* @swagger
* tags:
*   name: Hospitals
*   description: The hospitals managing API
*/

/**
* @swagger
*   /hospitals:
*       get:
*           summary: Get all hospitals
*           tags: [Hospitals]
*           responses:
*               200:
*                   description: List of hospitals
*                   content:
*                       application/json:
*                           schema:
*                               type: array
*                               items:
*                                   $ref: '#/components/schemas/Hospital'
*/

/**
* @swagger
* /hospitals/{id}:
*   get:
*       summary: Get a hospital by ID
*       tags: [Hospitals]
*       parameters:
*         - in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: The hospital ID
*       responses:
*           200:
*               description: Hospital data
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Hospital'
*           404:
*               description: Hospital not found
*/

/**
* @swagger
* /hospitals:
*   post:
*       summary: Create a new hospital
*       tags: [Hospitals]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Hospital'
*       responses:
*           201:
*               description: Hospital created successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Hospital'
*           500:
*               description: Server error
*/

/**
* @swagger
* /hospitals/{id}:
*   put:
*       summary: Update a hospital by ID
*       tags: [Hospitals]
*       parameters:
*         - in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: The hospital ID
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                       $ref: '#/components/schemas/Hospital'
*       responses:
*           200:
*               description: Hospital updated successfully
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/Hospital'
*           404:
*               description: Hospital not found
*           500:
*               description: Server error
*/

/**
* @swagger
* /hospitals/{id}:
*   delete:
*       summary: Delete a hospital by ID
*       tags: [Hospitals]
*       parameters:
*         - in: path
*           name: id
*           schema:
*               type: string
*           required: true
*           description: The hospital ID
*       responses:
*           200:
*               description: Hospital deleted successfully
*           404:
*               description: Hospital not found
*/


module.exports = router;
