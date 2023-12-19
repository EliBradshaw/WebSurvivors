let loc = window.location.origin;

function encodeArgs(args) {
    return args.map(JSON.stringify).map(str => btoa(str));
}

function decodeArgs(encodedArgs) {
    return encodedArgs.map(arg => atob(arg)).map(str => JSON.parse(str));
}

async function callServer(command, ...args) {
    let encodedArgs = encodeArgs(args);
    let argComp = encodedArgs.length ? "?" + encodedArgs.join("&") : "";
    let url = `${loc}/${command}${argComp}`;

    return fetch(url)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        });
}
