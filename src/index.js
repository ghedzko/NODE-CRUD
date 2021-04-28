const express = require ("express");
const morgan = require("morgan");
const pool = require("./settings/db"); 
const app = express();
const hbs = require("express-handlebars");
const path = require("path");

app.set("port",process.env.PORT || 4000);
app.set("views",path.join(__dirname,"views"));
app.engine(".hbs", hbs({
    defaultLayout:"main",
    layoutsDir:path.join(app.get("views"),"layouts"),
    partialsDir:path.join(app.get("views"),"partials"),
    extname : ".hbs"
}));
app.set("view engine",".hbs");
//middleware
app.use(morgan("dev"));

//rutas
app.use(require("./routes/app"));
app.use("/support",require(  "./routes/admin"));
app.use("/req" ,require( "./routes/authentication"));

app.use(express.static(path.join(__dirname,"public")));
app.listen(app.get("port"),()=>{
    console.log("servidor en puerto", app.get("port"))
});