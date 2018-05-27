import * as Http from "http";
import * as Url from "url";

namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }
    interface Studi {
        name: string;
        firstname: string;
        studyPath: string;
        matrikel: number;
        age: number;
        gender: boolean;
    }
    export interface Studis {
        [matrikel: string]: Studi;
    }

    let port: number = process.env.PORT; 
    if (port == undefined) 
        port = 8100;        
    let server: Http.Server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(): void {
        console.log("Ich höre?");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich höre Stimmen!");
        let query: AssocStringString = Url.parse(_request.url, true).query;
        console.log(query["cmd"]);
        if (query["cmd"]) {
            switch (query["cmd"]) {
                case "insert":
                    insert();
                    break;

                case "refreh":
                    refresh();
                    break;

                case "search":
                    search();
                    break;

                default:
                    flaw();
            }
        }
        function insert(_event: Event): void {
            let obj: Studi = JSON.parse(query["data"]);
            let _name: string = obj.name;
            let _firstname: string = obj.firstname;
            let matrikel: string = obj.matrikel.toString();
            let _age: number = obj.age;
            let _gender: boolean = obj.gender;
            let _studiengang: string = obj.studiengang;
            let studi: Studi;
            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(matrikel),
                age: _age,
                gender: _gender,
                studiengang: _studiengang
            };

            studiHomoAssoc[matrikel] = studi;

            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write("Daten empfangen");
            _response.end();
        }
        studiHomoAssoc[matrikel] = studi;

        function refresh(): void {
            console.log(studiHomoAssoc);
            for (let matrikel in studiHomoAssoc) {
                let studi: Studi = studiHomoAssoc[matrikel];
                let line: string = matrikel + ": ";
                line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
                line += studi.gender ? "(M)" : "(F)";
                console.log(line);
                let data: string = JSON.stringify(line);
                _response.setHeader("Access-Control-Allow-Origin", "*");
                _response.write(data);
                _response.end();
            }
        }
        function error(): void {
            alert("Error");
        }


    }
}