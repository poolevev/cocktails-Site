import { getEl } from '../utilities.js';
export class LoginController {

    constructor(userManager) {
        this.userManager = userManager;

    }

    render = () => {
        let form = getEl("loginForm");
        let inputUsername = getEl('inputLoginUsername');
        let inputPassword = getEl("inputLoginPassword");
        let notificText = getEl("notifText");
        let logInBtn = getEl("logInBtn");
        let logoutBtn = getEl("logoutBtn");
        let headerLogoutBtn = getEl("headerLogoutBtn");
        let alreadyLogged = getEl("alreadyLogged");
        alreadyLogged.innerText = "";
        notificText.innerText = "";

        if (localStorage.getItem('loggedUser')) {
            logoutBtn.style.display = "inline-block";
            alreadyLogged.innerText = "You are already logged";
            form.style.display = "none";
        } else {
            logoutBtn.style.display = "none";
            form.style.display = "grid";
        };


        form.addEventListener("keyup", () => {
            if (inputUsername.value !== "" && inputPassword.value !== "") {
                logInBtn.disabled = false;
            } else {
                logInBtn.disabled = true;
            }
        }
        );

        logoutBtn.onclick = () => {
            let sessionId = this.userManager.loggedUser.sessionId;
            this.userManager.logout(sessionId);
            location.hash = "cocktailsPage";

        };

        headerLogoutBtn.onclick = () => {
            let sessionId = this.userManager.loggedUser.sessionId;
            this.userManager.logout(sessionId);
            location.hash = "cocktailsPage";

        };


        form.onsubmit = (event) => {

            event.preventDefault();
            const { username: { value: username },
                password: { value: password },
            } = event.currentTarget;

            this.userManager.login(username, password)
                .then(data => {
                    notificText.innerText = "Successfull login";
                    notificText.style.cssText = "font-size : 16px; font-weigth:bold; color : #0C6109; padding-top:5px;";
                    logoutBtn.style.display = "inline-block";
                    location.hash = "cocktailsPage";
                })
                .catch(error =>
                    notificText.innerText = error.message)
            event.currentTarget.reset();
        }

        form.onclick = () => {
            notificText.innerText = "";
        }
    }


}
