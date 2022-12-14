import {AppDataSource} from "./data-source"
import {logger} from "./util/logging";

AppDataSource.initialize().then(async () => {

    // create express app
    // const app = express()
    // app.use(bodyParser.json())
    //
    // // register express routes from defined application routes
    // Routes.forEach(route => {
    //     (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
    //         const result = (new (route.controller as any))[route.action](req, res, next)
    //         if (result instanceof Promise) {
    //             result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)
    //
    //         } else if (result !== null && result !== undefined) {
    //             res.json(result)
    //         }
    //     })
    // })
    //
    // // setup express app here
    // // ...

    const app = require('./app')

    // start express server
    app.listen(3000)

    logger.info("Express server has started on port 3000. Open http://localhost:3000/messages to see results")

}).catch(error => console.error(error))
