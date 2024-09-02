const mongoose=require('mongoose');
const mongoURI=PROCESS.ENV.MONGOURI


//http://127.0.0.1:3000
// const connectToMongo =()=>{
//         mongoose.connect(mongoURI);
//         console.log("Connected to mongo successfully");
// }
const connectToMongo = async () => {
    try {
        family: 4 ;
      mongoose.set("strictQuery", false);
      mongoose.connect(mongoURI);
      console.log("Connected to mongo successfully");
    } catch (error) {
      console.log(error);
      process.exit();
    }
}
module.exports=connectToMongo;