import { envVariable } from "./app/config/env.config"
import mongoose from "mongoose"
import app from "./app"
import http from "http"
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin"
const server = http.createServer(app)
// MONGODB DATABASE
const PORT = process.env.PORT || envVariable.PORT || 2000
const startMongoose = async () => {
    try {
        await mongoose.connect(`${envVariable.DATABASE_URL}`)
        console.log("MONGODB CONNECTED SUCCESSFULLY 😍")
        await seedSuperAdmin()
        server.listen(PORT, () => { console.log(`SERVER IS RUNNING AT http://localhost:${PORT}`) })
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
startMongoose()







const racefullyShutown = async () => {
    console.log('Gracefully shutting down the server ...')

    server.close(async err => {
        if (err) {
            console.log("Error during server close", err)
            process.exit(1)
        }
    })

    try {
        await mongoose.connection.close()
        console.log(`MongoDB connection closed`)
        process.exit((0))
    } catch (mongoErr) {
        console.log(`Error closing MongoDB connection`, mongoErr)
        process.exit(1)
    }

}

process.on(`SIGINT`, racefullyShutown);
process.on(`SIGTERM`, racefullyShutown)