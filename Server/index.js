// for env variable
require("dotenv").config();

//Libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//config
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//API
import Auth from "./API/Auth";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Restaurant from "./API/Restaurant";
import Image from "./API/Image";
import Order from "./API/Order";
import Reviews from "./API/Reviews";
import User from "./API/User";
//Database connection
import ConnectDB from "./database/connection";

const zomato = express();

zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport config
googleAuthConfig(passport);
routeConfig(passport);

//For application routes(4000-port)-
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", Menu);
zomato.use("image", Image);
zomato.use("/user", User);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.get("/", (req, res) => res.json({ message: "SetUp Successful🚀🚀🚀" }));

zomato.listen(4000, () =>
  ConnectDB()
    .then(() =>
      console.log("Server is running and Database is connected🚀🚀🚀")
    )
    .catch(() => console.log("DB connection failed"))
);
