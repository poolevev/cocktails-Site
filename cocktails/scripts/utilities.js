function getEl(id) {
    return document.getElementById(id);
}

function createEl(el, param = null) {
    let element = document.createElement(el);
    if (el === "img") {
        element.src = param;
    } else {
        element.innerText = param;
    }
    return element;
}

function makeAPICall(url, options) {
    return fetch(url, options)
        .then(response => {

            if (response.ok) {

                return new Promise((res, rej) => {
                    response.json()
                        .then(body => {
                            return res(body)

                        })
                        .catch(error => res(error))
                })
            }

            return new Promise((res, rej) => {

                response.json().
                    then(body => {
                        rej(body.message);
                    })

            })

        })

}

function debounce(action, seconds) {
    let timerId = null;
    return function (...event) {
        clearTimeout(timerId);
        timerId = setTimeout(action, seconds, ...event)

    }
}

function throttle(callee, timeout) {

    let timer = null

    return function perform(...args) {

        if (timer) return
        // Если таймера нет, значит мы можем вызвать функцию:
        timer = setTimeout(() => {
            callee(...args)
            clearTimeout(timer)
            timer = null
        }, timeout)
    }
}
export { getEl, createEl, makeAPICall, debounce };

