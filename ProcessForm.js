var Aufgabe8;
(function (Aufgabe8) {
    window.addEventListener("load", init);
    let address = "https://aufgabe6server.herokuapp.com/";
    let inputs = document.getElementsByTagName("input");
    function init(_event) {
        console.log("Init");
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("search");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    function insert(_event) {
        let genderButton = document.getElementById("male");
        // Radio Button
        let matrikel = inputs[2].value;
        // Variable für die Matrikelnummer anlegen
        let studi;
        // Variable vom Typ Studi (Interface)
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked,
            studyPath: document.getElementsByTagName("select").item(0).value
        };
        let stringifyJSON = JSON.stringify(studi);
        // JavaScript-JSON-Objekt wird in einen string umgewandelt
        console.log(stringifyJSON);
        let xhr = new XMLHttpRequest();
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
    function handleChangeInsert(_event) {
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // wenn readyState mit XLMHttpRequest.DONE übereinstimmt, dann:
            alert(xhr.response);
        }
    }
    function refresh(_event) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", address + "?command=refresh", true);
        // "GET": Methode, mit der Daten versendet werden
        // address: Internetaddresse vom Datentyp string (zuvor in einer Varaible gespeichert)
        // ?order=refresh: wird an die Internetaddresse angehängt
        // true: Asynchronous, zu einem späteren Zeitpunkt kann festgestellt werden, welche Antwort zu welcher Anfrage gehört
        xhr.addEventListener("readystatechange", handleChangeRefresh);
        // Aufruf der Funktion "handleChangeRefresh"
        xhr.send();
    }
    function handleChangeRefresh(_event) {
        let output = document.getElementsByTagName("textarea")[0];
        // In der Variable output wird das 1. Textfeld ([0]) aus dem html-Dokument "gespeichert"
        output.value = "";
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // wenn readyState mit XLMHttpRequest.DONE übereinstimmt, dann:
            output.value += xhr.response;
        }
    }
    function search(_event) {
        let matrikel = inputs[6].value;
        // Variable für die Matrikelnummer anlegen
        let xhr = new XMLHttpRequest();
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
    function handleChangeSearch(_event) {
        let output = document.getElementsByTagName("textarea")[1];
        // In der Variable output wird das 2. Textfeld ([1]) aus dem html-Dokument "gespeichert"
        output.value = "";
        var xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            // wenn readyState mit XLMHttpRequest.DONE übereinstimmt, dann:
            output.value += xhr.response;
        }
    }
})(Aufgabe8 || (Aufgabe8 = {}));
//# sourceMappingURL=ProcessForm.js.map