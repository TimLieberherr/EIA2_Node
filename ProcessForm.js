var Aufgabe6_Interfaces;
(function (Aufgabe6_Interfaces) {
    window.addEventListener("load", init);
    let address = "https://aufgabe6eia2.herokuapp.com/";
    function init(_event) {
        console.log("Init");
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("searchButton");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let studyPath = document.getElementById("select");
        let matrikel = inputs[2].value;
        let studi;
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            studyPath: studyPath.value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked
        };
        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);
        Aufgabe6_Interfaces.studiHomoAssoc[matrikel] = studi;
        Aufgabe6_Interfaces.studiSimpleArray.push(studi);
    }
    function refresh(_event) {
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        for (let matrikel in Aufgabe6_Interfaces.studiHomoAssoc) {
            let studi = Aufgabe6_Interfaces.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.studyPath + ", ";
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
    }
    function search(_event) {
        let output = document.getElementById("textarea2");
        output.value = "";
        let matrikel = parseInt(document.getElementById("matrikelNr").value);
        let studi = Aufgabe6_Interfaces.studiHomoAssoc[matrikel];
        if (typeof studi === "undefined") {
            output.value += "Kein Suchergebnis gefunden";
        }
        else {
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
            line += studi.studyPath + ", ";
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
        let convert = JSON.stringify(studi);
        // JavaScript-JSON-Objekt wird in einen string umgewandelt
        console.log(convert);
        let xhr = new XMLHttpRequest();
        xhr.open("GET", address + "?command=insert&data=" + convert, true);
        // "GET": Methode, mit der Daten versendet werden
        // address: Internetaddresse vom Datentyp string (zuvor in einer Varaible gespeichert)
        // ?command=insert&data=: wird an die Internetaddresse angehängt
        // convert: an die Internetaddresse werden die Daten aus dem Interface als string angehängt
        // true: Asynchronous, zu einem späteren Zeitpunkt kann festgestellt werden, welche Antwort zu welcher Anfrage gehört
        xhr.addEventListener("readystatechange", handleStateChangeInsert);
        xhr.send();
    }
})(Aufgabe6_Interfaces || (Aufgabe6_Interfaces = {}));
function handleStateChangeInsert(_event) {
    var xhr = _event.target;
    if (xhr.readyState == XMLHttpRequest.DONE) {
        alert(xhr.response);
    }
}
/*
    //Funktion für Refresh Feld
    function refresh(_event: Event): void {
        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?command=refresh", true);
        xhr.addEventListener("readystatechange", handleStateChangeRefresh);
        xhr.send();
    }

    function handleStateChangeRefresh(_event: ProgressEvent): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        output.value = "";
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            output.value += xhr.response;
        }
    }

    //Funktion für die Suche per Matrikelnummer
    function search(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let mtrkl: string = inputs[6].value;

        let xhr: XMLHttpRequest = new XMLHttpRequest();
        xhr.open("GET", address + "?command=search&searchFor=" + mtrkl, true);
        xhr.addEventListener("readystatechange", handleStateChangeSearch);
        xhr.send();
    }

    function handleStateChangeSearch(_event: ProgressEvent): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[1];
        output.value = "";
        var xhr: XMLHttpRequest = (<XMLHttpRequest>_event.target);
        if (xhr.readyState == XMLHttpRequest.DONE) {
            output.value += xhr.response;
        }
    } */
//# sourceMappingURL=ProcessForm.js.map