

const express = require('express');
// sesions requirements
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const exp = require("constants");
const env = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const { render, json } = require("express/lib/response");
const path = require("path");
var moment = require('moment');

const app = express();

const url = require('url');
// database modules
require("./db/conn");
const Resister = require("./modules/resisters");
const labour = require("./modules/labours");
const addsiteDB = require("./modules/add-site");
const saveAttendance = require("./modules/attendance");
const Vender = require("./modules/add-vender");
const rentVender = require("./modules/addRentVender");
const material = require("./modules/add-material");
const material_site = require("./modules/add_site_material");
const rentMaterial = require("./modules/rentMatetrial");
const Sites = require("./modules/add-site");
const SitePayment = require("./modules/sitePayment");


// cookieParser
const cookieParser = require("cookie-parser");
const sitePayment = require('./modules/sitePayment');




// port Number
env
    .config({ path: 'config.env' });
const port = process.env.PORT || 8000;

//storing sassions
const store = new MongoDBStore({
    uri: "mongodb://localhost:27017/ConstructorApp",
    collection: 'sessions'
});


// log request
app
    .use(morgan("tiny"));

//  parse request to body parser
app
    .use(bodyparser
        .urlencoded({ extended: true })
    );


app
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        unset: 'destroy',
        store: store,
        name: 'session cookie name',

    }));


// pages directories paths
const staticPath = path
    .resolve(__dirname, "../public");
const viewsPath = path
    .resolve(__dirname, "../views");
const jsPath = path
    .resolve(__dirname, "../public/js");

app
    .use(express.json());
app
    .use(express.urlencoded({ extended: false }));
app
    .use(express.static(staticPath));
app
    .use(express.static(jsPath));

// set view engine
app
    .set("view engine", "ejs");
app
    .set("views", viewsPath);



// Routing
app
    .get("", (req, res) => {
        if (!req.session.user) {

            res.render('Landing', { 'user': req.session.user });
        } else {
            res.render('home', { 'user': req.session.user });
        }
    });

app
    .get("/login", (req, res) => {

        var err;
        res.render("login", { 'err': err });
    }
        //  getMethod.login
    );
app
    .get("/resister", (req, res) => {
        res.render("resister");
    }
        // getMethod.resitration
    );

app
    .get("/add-labour", async (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            let user = req.session.user.Email;


            const uni = await labour.find({ "user": `${user} ` });
            //Auto increament strt-->
            var element = 0;
            let len = uni.length - 1;
            if (uni.length == 0) {
                len = 0;
            }
            for (let i = len; i < uni.length; i++) {
                element = uni[i].unique;
                element += 1;
            }
            const site = await Sites.find({ "user": `${user} ` });
            res.render("add-labour", { 'data': element, 'site': site, 'user': req.session.user });

        }
    }
        //  getMethod.addLabous
    );

app
    .get("/labour", async (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            var user = req.session.user.Email;

            const labours = await labour.find({ "user": `${user} ` });


            res
                .render("labour", { 'getLabours': labours, 'user': req.session.user });
        }
    }

        // getMethod.labours
    );

app
    .get("/add-site", (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            Sites.find().then((data) => {
                res.render("add-site", { 'site': data, 'user': req.session.user });

            })
        }

    }
        //  getMethod.addSite
    );


app
    .get("/my_sites", async (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            let user = req.session.user.Email
            const data = await Sites.find({ "user": `${user} ` });
            res.render('my_sites', { 'sites': data, 'user': req.session.user });
        }

    }

    );

app
    .get("/site-open", async (req, res) => {

        if (!req.session.user) {

            res.redirect('/login');

        } else {

            const id = req.query.id;

            const name = await Sites.findOne({ _id: id });

            let site = name.site_name;

            const rentVen= await rentMaterial.find({'site':`${site} `})

            const labours = await labour.find({ "site": `${site}` });

            const attendace = await saveAttendance.find({ "site_name": `${site} ` });

            const sitePay = await sitePayment.find({ "site_name": `${site}` });

            const vender = await Vender.find({ "user": req.session.user.Email });

            const mymaterial = await material_site.find({'site':`${site} `});

            console.log(req.url);
            res.render('site_op', {
                'id': id, 'url': req.url, 'rentVen':rentVen,'mymaterial': mymaterial, 'Vend': vender, 'sitePay': sitePay,
                'getLabours': labours, 'moment': moment, 'name': site,'site':name ,'user': req.session.user, 'attendance': attendace.attendance
            });
        }

    }


    );

app
    .get("/add-vender", async (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const Venders = await Vender.find({ 'user': req.session.user.Email });
            res.render("add-vender", { myVender: Venders, 'user': req.session.user });
        }

    }

        //  getMethod.add_vender
    );

app
    .get("/add_material", async (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            // res.render('account', {user: req.session.user});
            const mymaterial = await material.find({'user':req.session.user.Email});
            console.log(mymaterial);
            console.log(req.session.user.Email);
            var user=req.session.user.Email;
            res.render("add_material", { 'mymaterial': mymaterial, 'user': user})
        }
    }

        // getMethod.add_material
    );


app
    .get("/api/labour", (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            // res.render('account', {user: req.session.user});

            Labour.findOne({ _id: req.query })
                .then((labour) => {
                    res.send(labour);
                })
                .catch((err) => {
                    res.status(500).send({ message: "Error occured to get data", 'user': req.session.user })
                });
        }
    }
        //  labourdb.find
    );


app
    .get("/update", (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {

            // res.render('account', {'user': req.session.user});

            labour.findOne({ _id: req.query.id }).then((data) => {
                if (!data) {
                    res.redirect('labour');
                } else {
                    res.render('update_labour', { 'labour': data, 'user': req.session.user })

                }
            })
        }

    });



app
    .get("/logout", (req, res) => {
        if (req.session) {


            req.session.destroy();

            res.redirect("/");
        } else {
            res.send("failled to logout");
        }
    })


// Post methods

app
    .post("/attendance",
        async (req, res) => {
            if (!req.body) {
                res.send("body cant null");
            } else {

                try {

                    let valid = req.body.labourId;

                    if (valid) {
                        const isdone = await saveAttendance.find({ 'day': req.body.day });

                        const att = new saveAttendance({
                            labourId: req.body.labourId,
                            site_name: req.body.site,
                            day: req.body.day,
                            date: req.body.date,
                            attendance: req.body.attendance,
                        })
                        const attSave = await att.save();
                        var url = req.body.id;
                        res.redirect(url);
                    } else {
                        var url = req.body.id;
                        res.redirect(url);
                    }
                } catch (error) {
                    res.send(error);
                }
            }
        }

        //  getMethod.SaveAttendance
    );

app
    .post("/Site_payment", async (req, res) => {
        if (!req.body.amount) {
            var url = req.body.id;
            res
                .redirect(url);
        }
        else {
            try {
                const add = new SitePayment({
                    site_name: req.body.site_name,
                    site_owner: req.body.site_owner,
                    amount: req.body.amount,
                    date: req.body.date,
                    PayType: req.body.paymentType,
                });
                const added = await add.save();
                var url = req.body.id;
                res
                    .redirect(url);
                // res.end();
            } catch (error) {
                res.send(error);
            }
        }

    });

app
    .post("/resister", (req, res) => {

        var { Name, Email, Password, orgName, cPassword } = req.body;

        var err;
        if (Name == '' || Email == '' || Password == '' || orgName == '') {
            err = "plz fill the all fields then submit From...."
            res.render("resister", { 'err': err });
        } else {
            if (Password == cPassword) {
                const data = Resister.findOne({ Email: Email });
                data.then((result) => {
                    if (result) {
                        err = "User Already Have account with this Email...";
                        res.render("resister", { 'err': err });
                    }
                    if (!result) {

                        try {
                            const saveUser = new Resister({
                                Name: req.body.Name,
                                Email: req.body.Email,
                                Password: req.body.Password,
                                orgName: req.body.orgName,
                            });
                            const saved = saveUser.save().then(() => {
                                res.render("login");
                            })
                        } catch (error) {
                            res.send(error);
                        }
                    }
                })


            } else {
                err = "Plz enter valid password...";
                res.render("resister", { 'err': err });
            }
        }


    }
        // getMethod.resiter

    );


app
    .post("/login",
        async (req, res) => {
            try {
                let User = await Resister.findOne({ Email: req.body.Email });

                if (User !== null && User.Password === req.body.Password) {
                    
                        req.session.user = {
                            Email: User.Email,
                            Name: User.Name
                        };

                    res.redirect("/");
                } else {
                    // Login error
                    var err = "Invalid Datails..........";
                    res.render("login", { 'err': err });
                }
            } catch (err) {
                res.sendStatus(500);
            }
        }
    );
app
    .post("/resisterlabour", async (req, res) => {
        // vallidate request

        if (!req.body.name && !req.body.rate && !req.body.type) {

            res
                .redirect("/add-labour");

        }
        else {
            try {
                const labouradd = new labour({
                    user: req.body.user,
                    unique: req.body.unique,
                    site: req.body.Site,
                    name: req.body.name,
                    type: req.body.type,
                    rate: req.body.rate
                });

                const add = await labouradd.save();
                res
                    .redirect("/add-labour");
            } catch (error) {
                res.status(400).send(error);
            }

        }
        // labourdb.create
    }
    );

app
    .post("/add_site",
        async (req, res) => {
            if (!req.body.site_name && !req.body.site_owner) {
                res
                    .redirect("add-site");
            } else {


                try {
                    const savesite = new addsiteDB({
                        user: req.body.user,
                        site_name: req.body.site_name,
                        site_owner: req.body.site_owner
                    })

                    const save = await savesite
                        .save();

                    res
                        .redirect("add-site");
                }
                catch (err) {
                    res
                        .send(err);
                }
            }
        }
        //  siteDB.add_site
    );
app
    .post("/add_material_site", async (req, res) => {

        try {
            var total = (req.body.Units) * (req.body.Price);
            const saveMaterial = new material_site({
                site: req.body.site,
                user: req.body.user,
                material_name: req.body.material_name,
                Company_name: req.body.Company_name,
                Price: req.body.Price,
                Total: total,
                Units: req.body.Units,
            })

            const save = await saveMaterial
                .save();

            var url = req.body.id;
            console.log(url);
            res.redirect(url);
        }
        catch (err) {
            res
                .send(err);
        }
    }
        // siteDB.req.body.company_name
    );
app
    .post("/add_material", async (req, res) => {
        console.log(req.body);
        if (!req.body.Company_name) {
            console.log('failed');
            res
                .redirect("add_material");
        }else{
        try {
            const saveRentVender = new material({
                user: req.body.user,
                Company_name: req.body.Company_name,
                material_name: req.body.material_name,
                
            })

            const save = await saveRentVender
                .save();

            res
                .redirect("add_material");
        }
        catch (err) {
            res
                .send(err);
        }
    }
}
        // siteDB.add_rent_vender
    );
app
    .post("/add_vender", async (req, res) => {
        try {
            const user = req.session.user.Email;
            const saveVender = new Vender({
                user: user,
                vender_name: req.body.vender_name,
                shop_name: req.body.shop_name,
                mobileNumber: req.body.mobileNumber,
            })

            const save = await saveVender
                .save();

            res
                .redirect("add-vender");
        }
        catch (err) {
            res
                .send(err);
        }
    }
        // siteDB.add_vender
    );
app
    .post("/rent_material", async (req, res) => {
        try {
console.log(req.body);
            const saveMaterial = new rentMaterial({
                date: moment().format('YYYY-MM-DD'),
                site: req.body.id,
                material_name: req.body.material_name,
                vender_name: req.body.vender_name,
                Units: req.body.Units,
                Rent: req.body.Rent,
            })

            const save = await saveMaterial
                .save();
            var url = req.body.url;
            res
                .redirect(url);
        }
        catch (err) {
            res
                .send(err);
        }
    }
        //  siteDB.rent_material
    );



app
    .post("/update",
        async (req, res) => {
            if (!req.body) {
                return res.status(400).send({ message: "data can not be empty to update" });
            }
            const u = await labour.findByIdAndUpdate(req.body.id, { name: req.body.name, type: req.body.type, rate: req.body.rate });
            res.redirect("/labour");


        }
        //  labourdb.update
    );
app
    .get("/deleteLabour",
        //  labourdb.delete
        async (req, res) => {
            const id = req.query.id;

            const a = await labour.findByIdAndDelete(id);
            res.redirect("/labour");

        }

    );
app
    .get("/deleteSite",
        async (req, res) => {
            const id = req.query.id;
            const a = await Sites.findByIdAndDelete(id);
            res.redirect("/my_sites");

        }

    );


app
    .listen(port, () => {
        console
            .log(`server is running on http://localhost:${port} `);
    });

