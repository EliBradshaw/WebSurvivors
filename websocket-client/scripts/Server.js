export default class Server {
    static USERNAME;
    static ID;
    static encodeArgs(args) {
        return args.map(JSON.stringify).map(str => btoa(str));
    }
    
    static decodeArgs(encodedArgs) {
        return encodedArgs.map(arg => atob(arg)).map(str => JSON.parse(str));
    }
    
    static async call(command, ...args) {
        let loc = window.location.origin;
        let encodedArgs = Server.encodeArgs(args);
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
}