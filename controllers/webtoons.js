const models = require('../models')
const Op = require('sequelize').Op;
const Webtoon = models.webtoons
const User = models.users

exports.index = async (req, res) => {
    try{
        await Webtoon.findAll({
            attributes: ['id','title','createdAt', ['img_banner', 'url']],
            include: [{
                model: User,
                as: "createdBy",
                attributes: ['name'],
            }],
            order: [
                ['id', 'DESC']
            ],
        }).then(result=>res.send(result))
    }catch(err){
        res.send({
            err
        })
    }
}
exports.mywebtoon = async (req, res) => {
    try{
        await Webtoon.findAll({
            attributes: ['id','title','createdAt', ['img_banner', 'url']],
            where:{create_by: req.params.id},  
            include: [{
                model: User,
                as: "createdBy",
                attributes: ['name'],
            }],
            order: [
                ['id', 'DESC']
            ],
        }).then(result=>res.send(result))
    }catch(err){
        res.send({
            err
        })
    }
}
exports.search = async (req, res) => {
    try{
        await Webtoon.findAll({
            where: {
                title: { [Op.like]: `%${req.params.keyword}%` }
            },
            include: [{
                model: User,
                as: "createdBy",
                attributes: ['name'],
            }],
            order: [
                ['id', 'DESC']
            ],
        }).then(result=>res.send(result))
    }catch(err){
        res.send({
            err
        })
    }
}

exports.show = async (req, res) => {
    try{
        await Webtoon.findOne({
            where:{id: req.params.id}
        }).then(result=> res.send(result)).catch((err=>{
            res.send({
                err,
            })
        }))
    }catch(err){
        res.send({
            err
        })
    }
}

exports.store = async (req, res) => {
    const data = { 
        "create_by": req.body.create_by,
        "title" : req.body.title, 
        "description": req.body.description,
        "img_banner": req.file.path
    }

    try{
        await Webtoon.create (data).then(webtoon=> {
            res.send({
                message: "success",
                webtoon: data
            })
        })
    }catch(err){
        res.send({
            err,
            req: data
        })
    }
}

exports.update = async (req, res) => {
    try{
        await Webtoon.update(
            req.body,
            {where: {id: req.params.id}}
        ).then(webtoon=> {
            res.send({
                message: "success",
                webtoon: req.body
            })
        })
    }catch(err){
        res.send({
            err
        })
    }
}

exports.delete = async (req, res) => {
    try{
        await Webtoon.destroy({where: {id: req.params.id}}).then(webtoon=> {
            res.send({
                message: "success",
                webtoon: req.body
            })
        })
    }catch(err){
        res.send({
            err
        })
    }
}
