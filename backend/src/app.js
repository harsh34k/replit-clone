
import express from "express"

import http from 'http';
import { Server } from 'socket.io';
import cookieParser from "cookie-parser"
import { ApiError } from "./utils/ApiError.js"
import { retrieveFilesFromCloudinary } from "./utils/cloudinary.js"
import { ApiResponse } from "./utils/ApiResponse.js"
// import initWs from "./initWs.js";


// const server = http.createServer(app);
// const io = new Server(server);


// io.on('connection', (socket) => {
//     console.log('A client connected', socket.id);
//     // Handle socket events
// });

// initWs(server);


export default function initHttp(app) {
    // const app = express()


    app.use(express.json({ limit: "16kb" }))
    app.use(express.urlencoded({ extended: true, limit: "16kb" }))
    app.use(express.static("public"))
    app.use(cookieParser())


    app.post('/', async (req, res) => {
        try {
            const { languageValue, replitName } = req.body;
            if (!languageValue || !replitName) {
                throw new ApiError(400, "Missing required fields")
            }

            // Wait for the promise returned by retrieveFilesFromCloudinary to resolve
            const resources = await retrieveFilesFromCloudinary(languageValue, replitName);

            // Process the retrieved files
            console.log("hello:", resources);

            // Send the response with the retrieved files
            res.status(200).json(new ApiResponse(200, resources, "Successfully retrieved files"));
        } catch (error) {
            console.log(error);
            res.status(500).json(new ApiResponse(500, null, "An error occurred"));
        }
    });
}
