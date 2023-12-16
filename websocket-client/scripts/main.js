let loc = window.location.origin;

async function callServer(command, ...args) {
    let argComp = args.length ? "?" + args.map(JSON.stringify).join("&") : "";
    return fetch(loc + "/" + command + argComp)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        });
}

function sayHello() {
    callServer("fuzz", 1,2).then(console.log);
}
