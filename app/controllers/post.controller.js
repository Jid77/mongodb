const db = require('../models')
const Post = db.posts
const mongoose = require('mongoose')

// exports.findAll = (req, res) => {
//     Post.find()
//     .then((result) => {
//         res.send(result)
//     }).catch((err) => {
//         res.status(500).send({
//             message: err.message || "Some error while retrieving posts."
//         })
//     });
// }

function mongodb_create(datas){
    let data = datas.split('|')
    let mongodb_set = {}
    mongodb_set._id = new mongoose.Types.ObjectId(),
    mongodb_set.SN = data[0],
    mongodb_set.Date = data[1],
    mongodb_set.Datas = {
        AX: data[2],
        AY: data[3],
        AZ: data[4],
        GX: data[5],
        GY: data[6],
        GZ: data[7],
        Temperature: data[8],
        Battery: data[9],
    }
    return mongodb_set
}

exports.create = (req, res) => {
    let datas = req.body.datas
    if(datas != ""){
        if(datas[0] == ',')datas = datas.substring(1);
        if(datas[datas.length-1] == ',')datas = datas.substring(0,datas.length-1);
        if(datas.indexOf(',') == -1){
            const post = new Post(
                mongodb_create(datas)
            )
            post.save()
            .then((result) => {
                // res.send(result)
                res.send({
                    message: '1'
                })
            }).catch((err) =>{
                res.status(409).send({
                    message: err.message || "Some error while create post."
                })
            });
        }
        else{
            datas = datas.split(',')
            let mongodb_nest = []
            datas.forEach(data => {
                mongodb_nest.push(mongodb_create(data))
            })
            Post.insertMany(mongodb_nest)
            .then((result) => {
                // res.send(result)
                res.send({
                    message: mongodb_nest.length
                })
            }).catch((err) =>{
                res.status(409).send({
                    message: err.message || "Some error while create post."
                })
            });
        }
    }
    else{
        res.status(409).send({
            message: err.message || "Some error while create post."
        })
    }
}

// exports.findOne  = (req, res) => {
//     const id = req.params.id
//     Post.findById(id)
//     .then((result) => {
//         res.send(result)
//     }).catch((err) =>{
//         res.status(409).send({
//             message: err.message || "Some error while show post."
//         })
//     });
// }

// exports.update = (req, res) => {
//     const id = req.params.id
//     console.log(req.body);
//     Post.findByIdAndUpdate(id, req.body)
//     .then((result) =>{
//         if(!result){
//             res.status(404).send({
//                 message: "Post not found"
//             })
//         }
//         res.send({
//             message: "Post was updated"
//         })
//     }).catch((err) => {
//         res.status(409).send({
//             message: err.message || "Some error while update post."
//         })
//     })
// }

// exports.delete = (req, res) =>{
//     const id = req.params.id
//     Post.findByIdAndRemove(id)
//     .then((result) => {
//         if(!result){
//             res.status(404).send({
//                 message: "Post not found"
//             })
//         }
//         res.send({
//             message: "Post was updated"
//         })
//     }).catch((err) => {
//         res.status(409).send({
//             message: err.message || "Some error while delete post."
//         })
//     })
// }
