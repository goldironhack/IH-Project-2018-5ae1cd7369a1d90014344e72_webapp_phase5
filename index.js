
var neighbor = "https://data.cityofnewyork.us/api/views/xyye-rtrs/rows.json?accessType=DOWNLOAD";
var geoshape = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson";
var housing = "https://data.cityofnewyork.us/api/views/hg8x-zxpr/rows.json?accessType=DOWNLOAD";
var crimes = "https://data.cityofnewyork.us/api/views/wuv9-uv8d/rows.json?accessType=DOWNLOAD";
var museum = "https://data.cityofnewyork.us/api/views/fn6f-htvy/rows.json?accessType=DOWNLOAD";
var art = "https://data.cityofnewyork.us/api/views/43hw-uvdj/rows.json?accessType=DOWNLOAD";

var r = new Map();
var crim = new Map();
var bounds1 = new Map();
var bounds2 = new Map();
var bounds3 = new Map();
var bounds4 = new Map();
var bounds5 = new Map();
var puntajes = new Map();

var cri1 = [];
var cri2 = [];
var cri3 = [];
var cri4 = [];
var cri5 = [];
var afo1 = [];
var afo2 = [];
var afo3 = [];
var afo4 = [];
var afo5 = [];
var distancias = new Map();
var distanciasArr = [];

var topDistance = [];
var dista = [];
var topAffor = [];
var affor = [];
var mapaAffor = new Map();
var topSafe = [];
var safe = [];
var totalAfor = [];
var nombresAfor = [];

var map, heatmap;
var customStyle = [
      {
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      }
    ];
    
function getDataFromURL(URL, key){
    $.get(URL, function(data){})
    .done(function(data){
        switch(key){
            case "neigh":
                r.set(key, data.data) ;
                break;
            case "geo":
                r.set(key, JSON.parse(data).features);
                break;
            case "hous":
                r.set(key, data.data);
                break;
            case "cri":
                r.set(key, data.data);
                break;
            case "museum":
                r.set(key, data.data);
                break;
            case "art":
                r.set(key, data.data);
                break;
            default:
            break;
        }
    })
    .fail(function(error){
        console.error(error);
    });
}

function getDatasets(){
    getDataFromURL(neighbor, "neigh");
    getDataFromURL(geoshape, "geo");
    getDataFromURL(housing, "hous");
    getDataFromURL(crimes, "cri");
    getDataFromURL(museum, "museum");
    getDataFromURL(art, "art");
}

function reset(){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 18
    });
    map.set('styles', customStyle);
    var marker = new google.maps.Marker({
        position: centro,
        animation: google.maps.Animation.DROP,
        title: 'New York University Stern School of Business',
        map: map,
    });
}

function initMap(){
    
    
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 18
    });
    map.set('styles', customStyle);
    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    map.data.setStyle(function(feature){
       var bounds = new google.maps.LatLngBounds();
       feature.getGeometry().forEachLatLng(function(path){
          bounds.extend(path); 
       });
       var numero = feature.getProperty('BoroCD').toString()[0];
       var cb = parseInt(feature.getProperty('BoroCD').toString().slice(1, 3));
       if(cb < 26){
           switch(numero){
                case "1":
                    bounds1.set(cb, bounds);
                   break;
                case "2":
                    bounds2.set(cb, bounds);
                    break;
                case "3":
                    bounds3.set(cb, bounds);
                    break;
                case "4":
                    bounds4.set(cb, bounds);
                    break;
                case "5":
                    bounds5.set(cb, bounds);
                    break;
                default:
                break;
           }
       }
       return{
           fillOpacity: 0,
           strokeWeight: 0
       };
    });
    
    var marker = new google.maps.Marker({
        position: centro,
        animation: google.maps.Animation.DROP,
        title: 'New York University Stern School of Business',
        map: map,
    });
}

function go(){
    var sel = document.getElementById('manSel');
    var sel1 = document.getElementById('brookSel');
    var sel2 = document.getElementById('queSel');
    var sel3 = document.getElementById('staSel');
    var sel4 = document.getElementById('broSel');
    
    var dist = [];
    var housi = [];
    var arte = [];
    var houses = [];
    var crimenes = [];
    var barrios = [];
    
    if(sel.checked === true){
        dist.push("1");
        housi.push("New York");
        barrios.push("Manhattan");
        arte.push("New York");
        houses.push("Manhattan");
        crimenes.push("MANHATTAN");
    }
    if(sel1.checked === true){
        houses.push("Brooklyn");
        dist.push("3");
        arte.push("Brooklyn");
        housi.push("Brooklyn");
        barrios.push("Brooklyn");
        crimenes.push("BROOKLYN");
    }
    if(sel2.checked === true){
        barrios.push("Queens");
        crimenes.push("QUEENS");
        houses.push("Queens");
        dist.push("4");
        housi.push("Queens");
        housi.push("Jackson Heights");
        arte.push("Astoria");
        arte.push("Bayside");
        arte.push("Far Rockaway");
        arte.push("East Elmhurst");
        arte.push("Long Island City");
        arte.push("Jamaica");
        arte.push("Ridgewood");
        arte.push("Forest Hills");
        arte.push("Flushing");
        arte.push("Woodside");
        arte.push("Saint Albans");
        arte.push("Middle Village");
        arte.push("Rego Park");
        
    }
    if(sel3.checked === true){
        barrios.push("Staten Island");
        crimenes.push("STATEN ISLAND");
        houses.push("Staten Island");
        arte.push("Staten Island");
        dist.push("5");
        housi.push("Staten Island");
    }
    if(sel4.checked === true){
        barrios.push("Bronx");
        crimenes.push("BRONX");
        houses.push("Bronx");
        arte.push("Bronx");
        dist.push("2");
        housi.push("Bronx");
    }
    var sel5 = document.getElementById('criSel');
    var sel6 = document.getElementById('artSel');
    var sel7 = document.getElementById('houSel');
    var sel8 = document.getElementById('musSel');
    var sel9 = document.getElementById('neighSel');
    
    if(sel5.checked === false)drawD(dist);
    if(sel5.checked === true)srchCrim(crimenes);
    if(sel9.checked === true)searNeigh(barrios);
    if(sel6.checked === true)artGal(arte);
    if(sel8.checked === true)muse(housi);
    if(sel7.checked === true)searHouse(houses);
    
}

function scrollto(key){
    var aux = "#"+key;
    $('html, body').animate({
    scrollTop: $(aux).offset().top
    }, 500);
}

function drawD(arreglo){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 10
    });
    map.set('styles', customStyle);
    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    map.data.setStyle(function(feature){
        var numero = feature.getProperty('BoroCD').toString()[0];
        if(arreglo.includes(numero)){
            return{
            fillOpacity: 0.2,
            strokeWeight: 1
            };
        }else{
            return{
           fillOpacity: 0,
           strokeWeight: 0
       };
        }
    });
}

function draw(){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 10
    });
    
    map.set('styles', customStyle);
    map.data.loadGeoJson('https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson');
    
    
    map.data.setStyle(function(feature){
        var numero = feature.getProperty('BoroCD').toString()[0];
        var col;
        switch(numero){
            case "1":
                col = 'chocolate';
                break;
            case "2":
                col = 'blue';
                break;
            case "3":
                col = 'yellow';
                break;
                
            case "4":
                col = 'black';
                break;
            case "5":
                col = 'red';
                break;
            default:
            break;
        }
        return{
            fillOpacity: 0.6,
            fillColor: col,
            strokeWeight: 1
        };
    });
}

function muse(arreglo){
    var aux = r.get("museum");
    for(var i in aux){
        var p = aux[i][8];
        var nom = aux[i][14];
        var tit = aux[i][9];
        if(!arreglo.includes(nom))continue;
        var s = p.substring(7, p.length-1);
        var arr = s.split(" ");
        var centro = new google.maps.LatLng(arr[1], arr[0]);
        var marker = new google.maps.Marker({
           position: centro,
           map: map,
           icon: 'https://i.imgur.com/Thn48cw.png',
           title: tit
        });
    }
}

function artGal(arreglo){
    var aux = r.get("art");
    for(var i in aux){
        var p = aux[i][9];
        var s = p.substring(7, p.length-1);
        var nom = aux[i][14];
        var tit = aux[i][8];
        if(!arreglo.includes(nom))continue;
        var arr = s.split(" ");
        var centro = new google.maps.LatLng(arr[1], arr[0]);
        var marker = new google.maps.Marker({
           position: centro,
           map: map,
           icon: 'https://i.imgur.com/EnoM4eh.png',
           title: tit
        });
    }
}

function searHouse(arreglo){
    var arr = r.get("hous");
    for(var aux in arr){
        if(arreglo.includes(arr[aux][15])){
            var centro2 = new google.maps.LatLng(arr[aux][23], arr[aux][24]);
            var marker = new google.maps.Marker({
            position: centro2,
            map: map,
            icon: 'https://i.imgur.com/Y9kXJFF.png'
            });
        }
    }
}

function searNeigh(arreglo){
    var arr = r.get("neigh");
    for(var aux = 0; aux < arr.length; aux++){
        var nom = arr[aux][16];
        var p = arr[aux][9];
        var s = p.substring(7, p.length-1);
        if(!arreglo.includes(nom))continue;
        var coor = s.split(" ");
        var centro = new google.maps.LatLng(coor[1], coor[0]);
        var marker = new google.maps.Marker({
           position: centro,
           map: map,
           title: arr[aux][10]
        });
    }
}

function srchCrim(arreglo){
    var centro = {lat: 40.7291, lng: -73.9965};
    map = new google.maps.Map(document.getElementById('mapContainer'), {
      center: centro,
      zoom: 10
    });
    map.set('styles', customStyle);
    crim.set("BRONX", 0);
    crim.set("BROOKLYN", 0);
    crim.set("STATEN ISLAND", 0);
    crim.set("MANHATTAN", 0);
    crim.set("QUEENS", 0);
    var auxi = r.get("cri");
    var puntos = [];
    for(var i in auxi){
        var act = crim.get(auxi[i][21]);
        var nom = auxi[i][21];
        act++;
        crim.set(auxi[i][21], act);
        if(auxi[i][29] === null || auxi[i][39] === null)continue;
        if(!arreglo.includes(nom))continue;
        var loc = new google.maps.LatLng(auxi[i][29], auxi[i][30]);
        puntos.push(loc);
    }
    
    heatmap = new google.maps.visualization.HeatmapLayer({
          data: puntos
    });
    heatmap.setMap(map);
}

var rad = function(x) {
  return x * Math.PI / 180;
};

var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat() - p1.lat());
  var dLong = rad(p2.lng() - p1.lng());
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat())) * Math.cos(rad(p2.lat())) *
    Math.sin(dLong / 2) * Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

function show(){
    var x = document.getElementById('singleSrch');
    if (x.style.display === "none") {
        x.style.display = "block";
    }
}

function hide(){
    var x = document.getElementById('singleSrch');
    x.style.display = "none";
}

function todo(){
    afo1.length = 0;
    afo2.length = 0;
    afo3.length = 0;
    afo4.length = 0;
    afo5.length = 0;
    for(var i = 1; i <= 20; i++){
        afo1.push(0);
        afo2.push(0);
        afo3.push(0);
        afo4.push(0);
        afo5.push(0);
    }
    var housx = r.get("hous");
    for(var i in housx){
        var s = housx[i][19].substring(0, 2);
        var num = parseInt(housx[i][19].substring(3));
        if(num == 304)continue;
        switch(s){
            case "MN":
                afo1[num] = Math.max(afo1[num], housx[i][31]);
                break;
            case "QN":
                afo4[num] = Math.max(afo4[num], housx[i][31]);
                break;
            case "SI":
                afo5[num] = Math.max(afo5[num], housx[i][31]);
                break;
            case "BK":
                afo3[num] = Math.max(afo3[num], housx[i][31]);
                break;
            case "BX":
                afo2[num] = Math.max(afo2[num], housx[i][31]);
                break;
            default:
            break;
        }
    }
    var arregloAfo = [];
    for(var i in afo1){
        arregloAfo.push(afo1[i]);
        var nombre  = "MANHATTAN " + i;
        mapaAffor.set(afo1[i], nombre);
        arregloAfo.push(afo2[i]);
        var nombre1  = "BRONX " + i;
        mapaAffor.set(afo2[i], nombre1);
        arregloAfo.push(afo3[i]);
        var nombre2  = "BROOKLYN " + i;
        mapaAffor.set(afo3[i], nombre2);
        arregloAfo.push(afo4[i]);
        var nombre3  = "QUEENS " + i;
        mapaAffor.set(afo4[i], nombre3);
        arregloAfo.push(afo5[i]);
        var nombre4  = "STATEN ISLAND " + i;
        mapaAffor.set(afo5[i], nombre4);
    }
    arregloAfo.sort(function(a, b) {
        return a - b;
    });
    topAffor.length = 0;
    affor.length = 0;
    for(var i = arregloAfo.length-1; i >= arregloAfo.length - 10; i--){
        topAffor.push(arregloAfo[i]);
    }
    for(var i in topAffor){
        var valor = topAffor[i];
        affor.push(mapaAffor.get(valor));
    }
    
    var houses = r.get("hous");
    distancias.clear();
    distanciasArr.length = 0;
    var aux = r.get("geo");
    var j;
    for(j = 0; j < aux.length; j++){
        var puntos = aux[j]["geometry"]["coordinates"];
        var boro = aux[j]["properties"]["BoroCD"].toString()[0];
        var cb = aux[j]["properties"]["BoroCD"].toString().substring(1);
        var coB = parseInt(cb);
        
        if(coB > 18)continue;
        var bounds = new google.maps.LatLngBounds();
        var polygonCoords = [];
        for(k = 0; k < puntos.length; k++){
            var arr = puntos[k];
            if(puntos.length != 1)arr = arr[0];
            for(i = 0; i < arr.length; i++){
                polygonCoords.push(new google.maps.LatLng(arr[i][1],arr[i][0]));
                
            }
            for(i = 0; i < polygonCoords.length; i++){
                bounds.extend(polygonCoords[i]);
            }
        }
        var centro = bounds.getCenter();
        var uni = new google.maps.LatLng(40.7291, -73.9965);
        var distancia = getDistance(centro, uni);
        var st = centro.lat().toString() +" "+ centro.lng().toString();
        distanciasArr.push(distancia);
        distancias.set(distancia, aux[j].properties.BoroCD);
        
    }
    distanciasArr.sort(function(a, b) {
        return a - b;
    });
    dista.length = 0;
    topDistance.length = 0;
    var setAux = new Set();
    for(var i = 0; i < distanciasArr.length; i++){
        var di = distanciasArr[i];
        var di2 = distancias.get(di);
        if(setAux.has(di2))continue;
        setAux.add(di2);
        dista.push(di.toFixed(2));
        var boroug = distancias.get(di).toString()[0];
        var cb = parseInt(distancias.get(di).toString().substring(1));
        var nombreBor;
        if(boroug == "1"){
            nombreBor = "MANHATTAN ";
        }else if(boroug == "2"){
            nombreBor = "BRONX ";
        }else if(boroug == "3"){
            nombreBor = "BROOKLYN ";
        }else if(boroug == "4"){
            nombreBor = "QUEENS "
        }else nombreBor = "STATEN ISLAND ";
        topDistance.push(nombreBor + cb);
    }
    
    cri1.length = 0;
    cri2.length = 0;
    cri3.length = 0;
    cri4.length = 0;
    cri5.length = 0;
    for(var i = 1; i <= 20; i++){
        cri1.push(0);
        cri2.push(0);
        cri3.push(0);
        cri4.push(0);
        cri5.push(0);
    }
    var x = r.get("cri");
    var arrAux = [];
    for(var i in x){
        var a = x[i];
        arrAux.push(a);
    }
    for(var i in arrAux){
        var valor = arrAux[i][21];
        var punto = new google.maps.LatLng(arrAux[i][29], arrAux[i][30]);
        switch(valor){
            case "MANHATTAN":
                for(let [k, v] of bounds1){
                    var aux = v;
                    if(v.contains(punto)){
                        cri1[k]++;
                        break;
                    }
                }
                break;
            case "QUEENS":
                for(let [k, v] of bounds4){
                    var aux = v;
                    if(v.contains(punto)){
                        cri4[k]++;
                        break;
                    }
                }
                break;
            case "STATEN ISLAND":
                for(let [k, v] of bounds5){
                    var aux = v;
                    if(v.contains(punto)){
                        cri5[k]++;
                        break;
                    }
                }
                break;
            case "BRONX":
                for(let [k, v] of bounds2){
                    var aux = v;
                    if(v.contains(punto)){
                        cri2[k]++;
                        break;
                    }
                }
                break;
            case "BROOKLYN":
                for(let [k, v] of bounds3){
                    var aux = v;
                    if(v.contains(punto)){
                        cri3[k]++;
                        break;
                    }
                }
                break;
            default:
            break;
        }
    }
    var arregloAux = [];
    for(var i = 1; i <= 12; i++){
        arregloAux.push(cri1[i]);
        arregloAux.push(cri2[i]);
    }
    for(var i = 1; i <= 18; i++){
        arregloAux.push(cri3[i]);
    }
    for(var i = 1; i <= 14; i++){
        arregloAux.push(cri4[i]);
    }
    for(var i = 1; i <= 3; i++){
        arregloAux.push(cri5[i]);
    }
    arregloAux.sort(function(a, b) {
        return a - b;
    });
    safe.length = 0;
    topSafe.length = 0;
    for(var i in arregloAux){
        var valor = arregloAux[i];
        safe.push(valor);
        var find = false;
        for(var j = 1; j <= 12; j++){
            var valAux = cri1[j];
            if(valAux == valor){
                var nombreS = "MANHATTAN " + j;
                cri1[j] = -1;
                topSafe.push(nombreS);
                find = true;
                break;
            }
        }
        if(find == true)continue;
        for(var j = 1; j <= 12; j++){
            var valAux = cri2[j];
            if(valAux == valor){
                var nombreS = "BRONX " + j;
                cri2[j] = -1;
                topSafe.push(nombreS);
                find = true;
                break;
            }
        }
        if(find == true)continue;
        for(var j = 1; j <= 18; j++){
            var valAux = cri3[j];
            if(valAux == valor){
                var nombreS = "BROOKLYN " + j;
                cri3[j] = -1;
                topSafe.push(nombreS);
                find = true;
                break;
            }
        }
        if(find == true)continue;
        for(var j = 1; j <= 14; j++){
            var valAux = cri4[j];
            if(valAux == valor){
                var nombreS = "QUEENS " + j;
                cri4[j] = -1;
                topSafe.push(nombreS);
                find = true;
                break;
            }
        }
        if(find == true)continue;
        for(var j = 1; j <= 3; j++){
            var valAux = cri5[j];
            if(valAux == valor){
                var nombreS = "STATEN ISLAND " + j;
                cri5[j] = -1;
                topSafe.push(nombreS);
                find = true;
                break;
            }
        }
        if(find == true)continue;
    }
    totalAfor.length = 0;
    nombresAfor.length = 0;
    for(var i = 1; i <= 12; i++){
        var name = "MANHATTAN " + i;
        totalAfor.push(afo1[i]);
        nombresAfor.push(name);
    }
    for(var i = 1; i <= 12; i++){
        var name = "BRONX " + i;
        totalAfor.push(afo2[i]);
        nombresAfor.push(name);
    }
    for(var i = 1; i <= 18; i++){
        var name = "BROOKLYN " + i;
        totalAfor.push(afo3[i]);
        nombresAfor.push(name);
    }
    for(var i = 1; i <= 14; i++){
        var name = "QUEENS " + i;
        totalAfor.push(afo4[i]);
        nombresAfor.push(name);
    }
    for(var i = 1; i <= 3; i++){
        var name = "STATEN ISLAND " + i;
        totalAfor.push(afo5[i]);
        nombresAfor.push(name);
    }
}

function downDista(){
    var datos = [];
    for(var i = 0; i <= 9; i++){
        var datos2 = [];
        datos2.push(topDistance[i]);
        datos2.push(dista[i]);
        datos.push(datos2);
    }
    var csv = "District, distance\n";
    datos.forEach(function(row){
       csv += row.join(',');
       csv += '\n';
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'distance.csv';
    hiddenElement.click();
}
function downAfor(){
    var datos = [];
    for(var i = 0; i <= 9; i++){
        var datos2 = [];
        datos2.push(affor[i]);
        datos2.push(topAffor[i]);
        datos.push(datos2);
    }
    var csv = "District, Number of units with low income\n";
    datos.forEach(function(row){
       csv += row.join(',');
       csv += '\n';
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'afordability.csv';
    hiddenElement.click();
}
function downSafe(){
    var datos = [];
    for(var i = 0; i <= 9; i++){
        var datos2 = [];
        datos2.push(topSafe[i]);
        datos2.push(safe[i]);
        datos.push(datos2);
    }
    var csv = "District, Number of crimes\n";
    datos.forEach(function(row){
       csv += row.join(',');
       csv += '\n';
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'safety.csv';
    hiddenElement.click();
}
function downAve(){
    var datos = [];
    datos.push(["MANHATTAN 3", 22]);
    datos.push(["MANHATTAN 2", 21]);
    datos.push(["MANHATTAN 6", 21]);
    datos.push(["MANHATTAN 1", 21]);
    datos.push(["BROOKLYN 2", 21]);
    datos.push(["MANHATTAN 11", 21]);
    var csv = "District, Total Score\n";
    datos.forEach(function(row){
       csv += row.join(',');
       csv += '\n';
    });
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'average.csv';
    hiddenElement.click();
}

function scoreDista(valor){
    var val = parseFloat(valor);
    if(valor >= 508 && valor < 4186)return 10;
    if(valor >= 4186 && valor < 7864)return 8;
    if(valor >= 7864 && valor < 11542)return 7;
    if(valor >= 11542 && valor < 15220)return 6;
    if(valor >= 15220 && valor < 18898)return 4;
    if(valor >= 18898 && valor < 22576)return 3;
    if(valor >= 22576 && valor < 26254)return 1;
}
function scoreAfor(valor){
    var val = parseFloat(valor);
    if(valor >= 0 && valor < 62)return 1;
    if(valor >= 62 && valor < 124)return 3;
    if(valor >= 124 && valor < 186)return 4;
    if(valor >= 186 && valor < 250)return 6;
    if(valor >= 250 && valor < 312)return 7;
    if(valor >= 312 && valor < 374)return 8;
    if(valor >= 374 && valor < 436)return 10;
}
function scoreSafe(valor){
    var val = parseFloat(valor);
    if(valor >= 0 && valor < 9)return 10;
    if(valor >= 9 && valor < 18)return 8;
    if(valor >= 18 && valor < 27)return 7;
    if(valor >= 27 && valor < 36)return 6;
    if(valor >= 36 && valor < 45)return 4;
    if(valor >= 45 && valor < 54)return 3;
    if(valor >= 54 && valor < 63)return 1;
}
function scoringInfo(){
    var info = "To get the score all parameters were dividided in intervals, so we could assign a score according to the number of the interval the district is, the intervals are as following:\nAFFORDABILITY\n1. [374, 436)\n2. [312, 374)\n3. [250, 312)\n4. [186, 250)\n5. [124, 186)\n6. [62, 124)\n7. [0, 62)\nDISTANCE\n1. [508, 4186)\n2. [4186, 7864)\n3. [7864, 11542)\n4. [11542, 15220)\n5. [15220, 18898)\n6. [18898, 22576)\n7. [22576, 26254)\nSAFETY\n1. [0, 9)\n2. [9, 18)\n3. [18, 27)\n4. [27, 36)\n5. [36, 45)\n6. [45, 54)\n7. [54, 63)\nThe scores assigned according to the interval were as following:\n1 -> 10pts\n2 -> 8pts\n3 -> 7pts\n4 -> 6pts\n5 -> 4pts\n6 -> 3pts\n7 -> 1pt\nIn case of tie, there will be no tiebreaker, the page will show more than 3 in case of tie.\n";
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(info));
    element.setAttribute('download', "info.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
function CSV(){
    todo();
    var texto = document.getElementById('dwnld');
    var opcion = texto.options[texto.selectedIndex].text;
    if(opcion == "Safety"){
        downSafe();
    }else if(opcion == "Distance"){
        downDista();
    }else if(opcion == "Average"){
        downAve();
    }else downAfor();
}
$(document).ready( function(){
    getDatasets();
    $("#searchBtn").on("click", function(){
        scrollto("navig");
    });
    $("#scrollMap").on("click", function(){
       scrollto("mapcont"); 
    });
    $("#scrollCharts").on("click", function(){
       scrollto("chartsec"); 
    });
    $("#scrollAbout").on("click", function(){
        scrollto("infosec");
    });
    $("#scrollContact").on("click", function(){
        scrollto("contsec");
    });
    $("#rstBtn").on("click", reset);
    $("#drawDistrict").on("click", draw);
    $("#searchHouse").on("click", go);
    $("#sglPara").on("click", show);
    $("#avgPara").on("click", hide);
    $("#exportCSV").on("click", CSV);
    $("#scoreInfBtn").on("click", scoringInfo)
});