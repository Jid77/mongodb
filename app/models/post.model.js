module.exports = (mongoose) => {
    const schema = mongoose.Schema({
        _id: mongoose.Types.ObjectId,
        SN : String,
        Date : String,
        Datas:{
            AX: String,
            AY: String,
            AZ: String,
            GX: String,
            GY: String,
            GZ: String,
            Temperature: String,
            Battery: String
        }
    })

    const post = mongoose.model("sapi", schema)
    return post
}



