import * as express from "express"
import {Request, Response} from "express"
import * as bodyParser from "body-parser"
import {Routes} from "./routes"

// create express app
const app = express()
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))

// register express routes from defined application routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
})

// setup express app here
// ...

module.exports = app