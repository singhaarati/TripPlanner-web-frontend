// src/mocks/handlers.js
import { rest } from 'msw'
const baseUrl = 'http://110.44.119.188:4000'
export const handlers = [
    // Handles a POST /login request
    rest.post(`${baseUrl}/users/login`, (req, res, ctx) => {
        console.log(req.body)
        return res(
            ctx.status(200),
            ctx.json({
                status: "login success",
                token: 'some token'
            })
        )
    }),

    // Handles a GET /user request
    rest.get('/user', null),
]