import { Router } from "express";
import RouteError from "../classes/RouteError.js";
import * as userService from "../services/user-service.js";

const router = Router();

function standardRouteErrorCallback(res, req, err) {
    const routeError = new RouteError(err, req.originalUrl)

    res.status(routeError.status || 400)
        .send(routeError)
        .end();
}

router.post("/", (req, res) => {
    userService.create(req.body)
        .then(() => res.status(201).send({}))
        .catch((err) => standardRouteErrorCallback(res, req, err));
})

router.post("/login", (req, res) => {
    userService.login(req.body?.email, req.body?.password)
        .then(({ cookie, expiresAt }) => {
            const cookieOptions = {
                expires: new Date(expiresAt),
                maxAge: 1209600,  // 14 days * 24 * 60 * 60 minutes
                secure: process.env.NODE_ENV === "production"
            }

            res.status(200)
                .cookie("user", cookie, cookieOptions)
                .send({ logged_in: true })
                .end();
        })
        .catch((err) => standardRouteErrorCallback(res, req, err));
})

router.patch("/:id", (req, res) => {
    const user = userService.verifyAuthentication(req.cookies.user);

    if (!user) {
        standardRouteErrorCallback(
            res, req,
            new RouteError("user-unauthenticated", req.originalUrl),
        );

        return;
    }

    userService.update(req.params.id, req.body)
        .then(() => res.status(200).send({}))
        .catch((err) => standardRouteErrorCallback(res, req, err));
})

router.put("/tutor/:id", (req, res) => {
    const user = userService.verifyAuthentication(req.cookies.user);

    if (!user) {
        res.status(401)
            .send(new RouteError("user-unauthenticated", req.originalUrl))
            .end();
    }

    // userService.requestTutor(req.params.id, user.id);
})

export default router;