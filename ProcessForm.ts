namespace Aufgabe8 {

    window.addEventListener("load", init);
    let address: string = "https://eia2-node-alenamaria.herokuapp.com/";

    let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");

    function init(_event: Event): void {
        console.log("Init");

        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("search");

        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }

    function insert(_event: Event): void {
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        // Radio Button
        let matrikel: string = inputs[2].value;
        // Variable für die Matrikelnummer anlegen
        let studi: Studi;
        // Variable vom Typ Studi (Interface)

        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked,
            studyPath: document.getElementsByTagName("select").item(0).value
        };

        let stringifyJSON: string = JSON.stringify(studi);
        // JavaScript-JSON-Objekt wird in einen string umgewandelt
        console.log(stringifyJSON);

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?command=insert&data=" + stringifyJSON, true);
        // "GET": Methode, mit der Daten versendet werden
        // address: Internetaddresse vom Datentyp string (zuvor in einer Varaible gespeichert)
        // ?order=insert&data=: wird an die Internetaddresse angehängt
        // stringifyJSON: an die Internetaddresse werden die Daten aus dem Interface als string angehängt
        // true: Asynchronous, zu einem späteren Zeitpunkt kann festgestellt werden, welche Antwort zu welcher Anfrage gehört
        xhr.addEventListener("readystatechange", handleChangeInsert);
        // Aufruf der Funktion "handleChangeInsert"
        xhr.send();
    }

    function handleChangeInsert(_event: ProgressEvent): void {
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // wenn readyState mit XLMHttpRequest.DONE übereinstimmt, dann:
            alert(xhr.response);
            // erscheint eine Alert-Box
        }
    }

    function refresh(_event: Event): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?command=refresh", true);
        // "GET": Methode, mit der Daten versendet werden
        // address: Internetaddresse vom Datentyp string (zuvor in einer Varaible gespeichert)
        // ?order=refresh: wird an die Internetaddresse angehängt
        // true: Asynchronous, zu einem späteren Zeitpunkt kann festgestellt werden, welche Antwort zu welcher Anfrage gehört
        xhr.addEventListener("readystatechange", handleChangeRefresh);
        // Aufruf der Funktion "handleChangeRefresh"
        xhr.send();
    }

    function handleChangeRefresh(_event: ProgressEvent): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        // In der Variable output wird das 1. Textfeld ([0]) aus dem html-Dokument "gespeichert"
        output.value = "";
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // wenn readyState mit XLMHttpRequest.DONE übereinstimmt, dann:
            output.value += xhr.response;
            // wird dem, was zu diesem Zeitpunkt im Textfeld steht, der neue Datensatz hinzugefügt
        }
    }

    function search(_event: Event): void {
        let matrikel: string = inputs[6].value;
        // Variable für die Matrikelnummer anlegen

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?command=search&searchFor=" + matrikel, true);
        // "GET": Methode, mit der Daten versendet werden
        // address: Internetaddresse vom Datentyp string (zuvor in einer Varaible gespeichert)
        // ?order=search&searchFor: wird an die Internetaddresse angehängt
        // die anktuell in der Variable matrikel gespeicherten Zahlen, werden an die Internetaddresse angehängt
        // true: Asynchronous, zu einem späteren Zeitpunkt kann festgestellt werden, welche Antwort zu welcher Anfrage gehört
        xhr.addEventListener("readystatechange", handleChangeSearch);
        // Aufruf der Funktion handleChangeSearch
        xhr.send();
    }

    function handleChangeSearch(_event: ProgressEvent): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
        // In der Variable output wird das 2. Textfeld ([1]) aus dem html-Dokument "gespeichert"
        output.value = "";
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // wenn readyState mit XLMHttpRequest.DONE übereinstimmt, dann:
            output.value += xhr.response;
            // wird dem, was zu diesem Zeitpunkt im Textfeld steht, der neue Datensatz hinzugefügt
        }
    }
} 