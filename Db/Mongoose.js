const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

dbConnection = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("Db Connection Established");
    } catch (err) {
        console.log("DB Error", err);
    }
};

module.exports = dbConnection;
