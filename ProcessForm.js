var Aufgabe6_Interfaces;
(function (Aufgabe6_Interfaces) {
    window.addEventListener("load", init);
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
    }
    console.group("Simple Array");
    console.log(Aufgabe6_Interfaces.studiSimpleArray);
    console.groupEnd();
    console.group("Associatives Array (Object)");
    console.log(Aufgabe6_Interfaces.studiHomoAssoc);
    console.groupEnd();
})(Aufgabe6_Interfaces || (Aufgabe6_Interfaces = {}));
//# sourceMappingURL=ProcessForm.js.map