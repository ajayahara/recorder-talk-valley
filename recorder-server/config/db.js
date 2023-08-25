const mongoose=require("mongoose");
const connection=mongoose.connect(`mongodb+srv://abak00350:talk-valley-recorder@cluster0.ysbocax.mongodb.net/RecordUser?retryWrites=true&w=majority`);
module.exports={connection};

