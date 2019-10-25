const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const models = require('../models')
const User = models.users


exports.login = async (req, res)=>{    

    const email = req.body.email
    const password = req.body.password 

    try{
        await User.findOne({where: {email}}).then(user=>{
            if(user){
                bcrypt.compare(password, user.password, function(err, result) {
                    if(result){
                        const token = jwt.sign({ userId: user.id }, 'RahasiaIlahi');
                        res.send({
                            message:"Success!",
                            data:{
                                id: user.id.toString(),
                                image: user.image,
                                name: user.name,
                                email: user.email,
                                token,
                            }
                        }) 
                    }else{
                        res.send({
                            error: true,
                            message: "Wrong Password!"
                        })                    
                    }
                });            
            }else{
                res.send({
                    error: true,
                    message: "Wrong Email!"
                })
            }
        }) 
    }catch(err){
        res.send({
            message: "error",
            err
        })
    }
       

}

exports.register = async (req, res,next)=>{
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const image = req.file.path    


        bcrypt.hash(password, 10, async function(err, hash) {
            await User.create({
                name,
                email,
                password: hash,
                image
            }).then(result=> {
                const token = jwt.sign({ userId: result.dataValues.id }, 'RahasiaIlahi');
                res.send({
                    message: "success",
                    data: {
                        id: result.dataValues.id.toString(),
                        image: result.dataValues.image,
                        name: result.dataValues.name,
                        email: result.dataValues.email,
                        token: token
                    }
                })
            }).catch(err=>{
                res.send({
                    err
                })
            })         
    
        });   
}

exports.edit = async (req, res, next) => {
    try{
        await User.update({
            image:req.file.path,
            name: req.body.name
        },{ 
            where: {
                id: req.body.id
            }
        }).then(result=> {
            res.send({
                message: "success",
                data:{
                    image: req.file.path,
                    name: req.body.name                
                }
            })
        })
    }catch(err){
        err
    } 
}