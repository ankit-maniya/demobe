import express from 'express'
import models from '../models/index'
import Joi from 'joi'

const party = express.Router();

// validate requests
const Schema = Joi.object({
    name: Joi.string().required(),
    contact: Joi.string().required(),
    createdBy: Joi.string().required(),
    orgId: Joi.string().required(),
    updatedBy: Joi.string(),
    userid: Joi.string(),
})

// validate requests
const Schema2 = Joi.object({
    name: Joi.string().required(),
    contact: Joi.string().required(),
    updatedBy: Joi.string(),
    userid: Joi.string(),
})

// get all party
party.get('/', async (req, res, next) => {
    try {
        const Partys = await models.Party.find({})
        res.json(Partys);
    } catch (error) {
        res.json('Error Occure ===>', error)
    }
})

party.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const Partys = await models.Party.findOne({
            _id: id
        })
        res.json(Partys);
    } catch (error) {
        res.json('Error Occure ===>', error)
    }
})

// get  party wise data
party.post('/getAllParty', async (req, res, next) => {
    try {
        const { orgId, userid } = req.body;
        const getParty = await models.Party.find({
            orgId: orgId,
            isDel:true,
            createdBy: userid
        }).populate('orgId')
        if (!getParty) return res.send("Not Found");
        return res.status(200).json(getParty)
    } catch (error) {
        res.json(200, { error })
    }
})

// insert Party
party.post('/', async (req, res, next) => {
    try {
        req.body.createdBy = req.body.userid;
        const value = await Schema.validateAsync(req.body)
        delete value["userid"];
        const inserted = await models.Party.create(value);
        res.send(inserted);
    } catch (error) {
        res.json(200, { error })
    }
})

// update Party
party.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await Schema2.validateAsync(req.body)
        // get
        const getParty = await models.Party.findOne({
            _id: id
        })
        if (!getParty) return next();
        // update
        await models.Party.updateOne({ _id: id }, { $set: value })
        res.send(getParty);
    } catch (error) {
        res.json(200, { error })
    }
})

// delete Party
party.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteParty = await models.Party.updateOne({
            _id: id

        }, { $set: { isDel: false } })
        if (!deleteParty) return next()
        res.send(deleteParty);
    } catch (error) {
        res.send(200, { error })
    }
})



export default party