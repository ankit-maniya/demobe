import express from 'express'
import models from '../models/index'
import Joi from 'joi'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const user = express.Router();

// create jwt-token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, 'crudOp', {
        expiresIn: maxAge
    })
}

// validate requests
const Schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(6).max(12).required(),
    userid: Joi.string(),
})

const SchemaLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
    userid: Joi.string(),
})

// get all user
user.get('/', async (req, res, next) => {
    try {
        const Users = await models.User.find({})
        res.json(Users);
    } catch (error) {
        res.json('Error Occure ===>', error)
    }
})

// get specific user with cradientials
user.post('/find', async (req, res, next) => {

    try {
        const { email, password } = req.body;
        const data = await SchemaLogin.validateAsync(req.body)
        delete data["userid"];
        const getUser = await models.User.findOne({
            email: email,
        })

        if (getUser) {
            const auth = await bcrypt.compare(password, getUser.password)
            if (!auth) {
                return res.status(200).json({ user: { _id: 0 } });
            } else {
                const token = createToken(getUser._id)
                if (token) {
                    res.cookie('jwt', token, { maxAge: maxAge * 1000 })
                    return res.status(200).json({ user: getUser })
                }
            }
        }

        

    } catch (error) {
        res.status(200).json(error)
    }
})

// insert user
user.post('/', async (req, res, next) => {
    try {
        const value = await Schema.validateAsync(req.body)
        delete value["userid"];
        const inserted = await models.User.create(value);
        const token = createToken(inserted._id)

        res.cookie('jwt', token, { maxAge: maxAge * 1000 })
        res.status(200).json({ user: inserted })
    } catch (error) {
        res.status(200).json(error)
    }
})

// update User
user.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await Schema.validateAsync(req.body)
        delete value["userid"];
        
        // get
        const getUser = await models.User.findOne({
            _id: id
        })
        if (!getUser) return next();
        // update
        await models.User.updateOne({ _id: id }, { $set: value })
        res.status(200).send(getUser);
    } catch (error) {
        res.status(200).json(error)
    }
})

// delete User
user.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const deleteUser = await models.User.remove({
            _id: id
        })
        if (!deleteUser) return next()
        res.status(200).send(deleteUser);
    } catch (error) {
        res.status(200).send(error)
    }
})



export default user