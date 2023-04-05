import { makeAPICall } from '../utilities.js';
import { SERVER_URL } from "../consts.js";
export class UserManager {

    loggedUser = null;

    constructor() {
        this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"))
    }

    register = (username, password) => {
        return makeAPICall((SERVER_URL + '/users'), {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                username,
                password,
            }),

        })
    }

    login = (username, password) => {
        return makeAPICall((SERVER_URL + '/login'), {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                username,
                password,
            }),

        }).then(({ hasVoted, sessionId, username }) => {

            localStorage.setItem("loggedUser", JSON.stringify({ hasVoted, sessionId, username }))
            this.loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

        })
    }

    logout = (sessionId) => {
        this.loggedUser = null;
        localStorage.removeItem('loggedUser');

        return makeAPICall(SERVER_URL + '/logout', {
            method: "POST",
            headers: {
                "content-type": "application/json",

            },
            body: JSON.stringify({
                id: sessionId,
            })

        })

    }

}