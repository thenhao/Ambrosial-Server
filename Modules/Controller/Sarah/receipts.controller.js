// Import Joi for validation
const Joi = require('joi');

// Import the service for receipts
const receiptsService = require("../../Services/Sarah/receipts.service.js");

// Create class for controller for receipts
class ReceiptsController {
    // Function to find one receipt
    async findOne(req, res){
        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNo: Joi.number().required()
        });

        // Implement validation, else throw an error
        try{
            schema.validate({ orderId:req.params.orderNo });
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        // Use receipts service layer
        const result = await receiptsService.findOne(req.params.orderNo);
        res.status(result.status);

        // Return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    // Function to find all receipts
    async findMany(req, res){
        // Use receipts service layer
        const result = await receiptsService.findMany();
        res.status(result.status);
        // Return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }
}

module.exports = ReceiptsController;