const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/ConstructorApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex:true
}).then(() => {
    console.log("Database conection successful");
}).catch((e) => {
    console.log("Failled to connect with db", e);
})

