export class RegisterController {

    constructor(userManager) {
        this.userManager = userManager;

    }

    render = () => {
        let form = getEl("registerForm");
        let inputUsername = getEl('inputUsername');
        let inputPassword = getEl("inputPassword");
        let confirmPassword = getEl("confirmPassword");
        let registerBtn = getEl("registerBtn");
        let notification = getEl("notification");
        const passRegex = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])[0-9a-zA-Z!@#$%^&*]{6,}/g;
        notification.innerText = "";

        form.addEventListener("keyup", () => {
            if (inputUsername.value !== "" &&
                inputPassword.value !== "" && confirmPassword.value !== "") {
                registerBtn.disabled = false;
            } else {
                registerBtn.disabled = true;
            }
        }
        )

        form.onsubmit = (event) => {

            event.preventDefault();
            const { username: { value: username },
                password: { value: password },
                confirmPass: { value: confirmPass } } = event.currentTarget;

            if (!passRegex.test(password)) {
                notification.innerText = "The password must be at least 6 characters long and must contain letters, numbers and symbols ";
                inputPassword.value = "";
                confirmPassword.value = "";

            } else if (confirmPass !== password) {
                notification.innerText = "Passwords doesn't match";
                inputPassword.value = "";
                confirmPassword.value = "";

            } else {
                this.userManager.register(username, password)
                    .then(data => {
                        console.log(data)
                        notification.innerText = "Successfull Registration";
                        notification.style.cssText = "font-size : 16px; font-weigth:bold; color : #0C6109; padding-top:5px;"
                        registerBtn.disabled = true;
                        setTimeout(() => {
                            location.hash = "login";
                        }, 1000);
                    })
                    .catch(error => {
                        notification.innerText = error.message;
                    })
                event.currentTarget.reset();
            }

        }

        form.onclick = () => {
            notification.innerText = "";
        }


    }
}
