namespace Aufgabe6_Interfaces {
    
    window.addEventListener("load", init);
    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchButton");
        
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        let studyPath: HTMLSelectElement = <HTMLSelectElement>document.getElementById("select");  
        let matrikel: string = inputs[2].value;
        let studi: Studi;
        
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
        studiHomoAssoc[matrikel] = studi;
        studiSimpleArray.push(studi);
    }
    function refresh(_event: Event): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        output.value = "";
      
        
        for (let matrikel in studiHomoAssoc) { 
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.studyPath + ", ";                          
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
    }
    function search(_event: Event): void {
        let output: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textarea2");
        output.value = "";
        let matrikel: number = parseInt((<HTMLInputElement>document.getElementById("matrikelNr")).value);
        let studi: Studi = studiHomoAssoc[matrikel];
        
        if (typeof studi === "undefined") {
            output.value += "Kein Suchergebnis gefunden";
        }
        
        else {
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
            line += studi.studyPath + ", ";                            
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
    
    }
    console.group("Simple Array");
    console.log(studiSimpleArray);
    console.groupEnd();
    console.group("Associatives Array (Object)");
    console.log(studiHomoAssoc);
    console.groupEnd();
}