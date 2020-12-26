import express from 'express'
import models from "../models/index"
import Joi from 'joi'

const Organization = express.Router();

const Schema = Joi.object({
    _id: Joi.string().required(),
    userid: Joi.string()
})

// get all Organization (Company)
Organization.get('/', async (req, res, next) => {
    try {
        const value = await models.Organization.find({})
        // let userid = { userid: req.userid}
        // value.push({userid:req.userid})
        console.log("All Company ====>",value);

        res.json(value);
    } catch (error) {
        res.json(400, { error })
    }
})

// get Specific Organization
Organization.get('/:id', (req, res, next) => {
    try {
        const { id } = req.params;
        const value = models.Organization.findOne({
            _id: id
        })
        if (!value) return next();

        res.json(200, { value })
    } catch (error) {
        res.json(400, { error })
    }
})

// insert One
Organization.post('/', async (req, res, next) => {
    try {
        const value = await Schema.validateAsync(req.body)
        const insertOn = await models.Organization.create(value)
        res.status(200).json(insertOn)
    } catch (error) {
        res.status(400).json(error)
    }
})

// update One
Organization.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const values = await Schema.validateAsync(req.body)
        // find
        const getOrganization = await models.Organization.find({
            _id: id
        })
        if (!getOrganization) return next();
        // update
        await models.Organization.updateOne({
            _id: id
        }, { $set: values })

        res.status(200).json(values)
    } catch (error) {
        res.status(400).json(error)
    }
})

// delete One
Organization.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const deleteOrganization = await models.Organization.deleteOne({
            _id: id
        })
        res.status(200).json("Deleted");
    } catch (error) {
        res.status(400).json(error)
    }
})

export default Organization