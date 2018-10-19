/***********************************************/
//VARIABLES
/***********************************************/
var tables = ["a","b","c","d","e","f"];
var countAll = 0, countVar = 0;
var style_vapaa = "Pvapaa"; var style_otettu = "Pvarattu"; var fSTATE;var fX; var style_varattukunnolla = "Ppoistettu"
var render = document.getElementById("qLista-render");


/***********************************************/
//MAP RENDER MAIN
/***********************************************/
$.get(ajax_getpaik, function(data, status){
    var map = document.createElement("div"); map.classList.add("istumapaikat");
    var PH_Data = data.length;
    for(var i = 0; i < tables.length; i++)
    {
        var table = document.createElement("div"); table.classList.add("paikat_"+tables[i]);
        var borderspace = document.createElement("table"); borderspace.classList.add("borderspacing");
        var tbody = document.createElement("tbody");
        var tr = document.createElement("tr");
        for(var y = 1; y < 11; y++)
        {
            fSTATE = "Vapaa"
            var text = tables[i].toUpperCase() + y;
            for(var x = 0; x < PH_Data; x++)
            {
                if(text === data[x].Istumapaikka)
                {
                    if(data[x].Confirmed === true){fSTATE = "Varattu"; fX = x;}
                    else{fSTATE = "Poistettu";}
                }
            }

            if(fSTATE === "Varattu")             //AKA PUNANEN
            {   
                var td = document.createElement("td"); td.classList.add(style_otettu);
                var div = document.createElement("div"); var fspan = document.createElement("span");
                fspan.classList.add("unselectable"); fspan.innerHTML = text;
                div.appendChild(fspan); var pspan = document.createElement("span"); pspan.classList.add("tooltiptext");
                pspan.innerHTML = data[fX].Etunimi +" "+ data[fX].Sukunimi.charAt(0) + "."; div.appendChild(pspan);
                td.appendChild(div); tr.appendChild(td);
                countVar++;
            }
            else if(fSTATE === "Poistettu")         //AKA KELTAINEN
            {
                var td = document.createElement("td"); td.classList.add(style_varattukunnolla);
                var fspan = document.createElement("span"); fspan.classList.add("unselectable"); fspan.innerHTML = text;
                td.appendChild(fspan); tr.appendChild(td);
                countVar++;
            }
            else                                    //AKA VIHREÄ
            {
                var td = document.createElement("td"); td.classList.add(style_vapaa);
                var fspan = document.createElement("span"); fspan.classList.add("unselectable"); fspan.innerHTML = text;
                td.appendChild(fspan); tr.appendChild(td);
            }
            if(y === 5)
            {
                tbody.appendChild(tr);
                var tr = document.createElement("tr");
            }
            countAll++;
        }
        tbody.appendChild(tr); borderspace.appendChild(tbody); table.appendChild(borderspace); map.appendChild(table);
    }
    var fPaikat = document.createElement("p"); fPaikat.innerHTML = countVar + "/" + countAll; fPaikat.classList.add("PaikJalj")
    if(countVar < 45)
    {
        fPaikat.classList.add("Vahan");
    }
    else if(countVar > 50)
    {
        fPaikat.classList.add("glow");
    }
    else
    {
        fPaikat.classList.add("Loppu");
    }
    render.appendChild(fPaikat);
    render.appendChild(map);
});
