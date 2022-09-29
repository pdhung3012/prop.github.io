function loadElement(){
    var url_string = window.location.href;
    // console.log(url_string)
    let paramString = url_string.split('?')[1];
    let queryString = new URLSearchParams(paramString);
    // console.log(queryString)
    for (let pair of queryString.entries()) {
       console.log("Key is: " + pair[0]);
       console.log("Value is: " + pair[1]);
    }
    var part = queryString.get('p');
    if (part==null){
        part=1;
    }

    for (var i = 1; i <= 4; i++) {
        var idDivPart='divPart'+String(i);
        var idAPart='a'+String(i);
        if(i==part){
            document.getElementById(idAPart).style='color:#FF9900;'
            document.getElementById(idDivPart).style.display = "block";
        } else {
            document.getElementById(idDivPart).style.display = "none";
        }
    }

    // alert(part);
}
