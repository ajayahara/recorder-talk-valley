const mongoose=require("mongoose");
const connection=mongoose.connect(`mongodb+srv://abak00350:${process.env.PASSWORD}@cluster0.ysbocax.mongodb.net/RecordUser?retryWrites=true&w=majority`);
module.exports={connection};

