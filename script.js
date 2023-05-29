reset();
function loadDoc() {
    const xhttp = new XMLHttpRequest();

    xhttp.onload = function() {
        showXml(this);
    }

    xhttp.open("GET", "./rate.xml");
    xhttp.send();
}

function showXml(xml) {
    const xmlDoc = xml.responseXML;
    const x = xmlDoc.getElementsByTagName("EXCHANGERATE");
    let twdAmount = document.getElementById("inputBar").value;
    //Question5: check if the input is valid and do reset function
    if(!(+twdAmount)) {
        alert("Please enter a valid number!");
        reset();
        return;
    }
    else if(twdAmount < 0) {
        alert("Please enter a positive number!");
        reset();
        return;
    }

    document.getElementById("hintText").innerHTML = `This is the result of How much other currency can be get by ${twdAmount} TWD. TWD(台幣) USD(美元) EUR(歐元) JPY(日幣) KRW(韓元) AUD(澳幣)`;
    let table = "<tr><th>TWD</th><th>USD</th><th>EUR</th><th>JPY</th><th>KRW<th>AUD</th></tr>"

    //table content, toFixed(2) is to keep 2 decimal places
    table += "<tr><td>" +
    twdAmount +
    "</td><td>$" +
    (twdAmount / x[0].getElementsByTagName("USD")[0].childNodes[0].nodeValue).toFixed(2) +
    "</td><td>€" +
    (twdAmount / x[0].getElementsByTagName("EUR")[0].childNodes[0].nodeValue).toFixed(2) +
    "</td><td>¥" +
    (twdAmount / x[0].getElementsByTagName("JPY")[0].childNodes[0].nodeValue).toFixed(2) +
    "</td><td>₩" +
    (twdAmount / x[0].getElementsByTagName("KRW")[0].childNodes[0].nodeValue).toFixed(2) +
    "</td><td>A$" +
    (twdAmount / x[0].getElementsByTagName("AUD")[0].childNodes[0].nodeValue).toFixed(2) +
    "</td></tr>";

    document.getElementById("resultTable").innerHTML = table;
}

//Question4: reset function
function reset() {
    document.getElementById("resultTable").innerHTML = "";
    document.getElementById("inputBar").value = "";
    document.getElementById("hintText").innerHTML = "Waiting Convert...";

}
