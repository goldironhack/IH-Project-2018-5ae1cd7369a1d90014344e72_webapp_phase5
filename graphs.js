
var margin = {top: 20, right: 10, bottom: 100, left:80},
    width = 700 - margin.right - margin.left,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("body")
    .append("svg")
      .attr ({
        "width": width + margin.right + margin.left,
        "height": height + margin.top + margin.bottom
      })
    .append("g")
      .attr("transform","translate(" + margin.left + "," + margin.right + ")");


var xScale = d3.scale.ordinal()
    .rangeRoundBands([0,width], 0.2, 0.2);

var yScale = d3.scale.linear()
    .range([height, 0]);


var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");

function graficar2(){
    svg.selectAll("*").remove();
    d3.csv("average.csv", function(error,data) {
      if(error) console.log("Error: data not loaded!");
    
      data.forEach(function(d) {
        d.district = d.district;
        d.number = +d.number;  
      });
    
      
      xScale.domain(data.map(function(d) { return d.district; }) );
      yScale.domain([0, d3.max(data, function(d) { return d.number; } ) ]);
    
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(3000)
        .delay( function(d,i) { return i * 200; })
        .attr({
          "x": function(d) { return xScale(d.district); },
          "y": function(d) { return yScale(d.number); },
          "font-family": "Raleway", 
          "width": xScale.rangeBand(),
          "height": function(d) { return  height - yScale(d.number); }
        })
        .style("fill", function(d,i) { return 'rgb(255, 0, ' + 0 + ')'});
    
    
            svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
    
                .text(function(d){
                    return d.number;
                })
                .attr({
                    "x": function(d){ return xScale(d.district) +  xScale.rangeBand()/2; },
                    "y": function(d){ return yScale(d.number)+ 12; },
                    "font-family": "Raleway", 
                    "font-size": '13px',
                    "font-weight": 'bold',
                    "fill": 'white',
                    "text-anchor": 'middle'
                });
    
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("dx", "-.8em")
            .attr("dy", ".25em")
            .attr("transform", "rotate(-60)" )
            .style("text-anchor", "end")
            .attr("font-size", "10px");
    
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height/2)
            .attr("dy", "-4em")
            .style("text-anchor", "middle")
            .text("Total Score");
    });
}
function graficar(){
    svg.selectAll("*").remove();
    var texto = document.getElementById('single');
    var opcion = texto.options[texto.selectedIndex].text;
    var textoY;
    var nombre;
    switch(opcion){
        case "Safety":
            nombre = "crimes.csv";
            textoY = "Number of Crimes";
            break;
        case "Afordability":
            nombre = "affordability.csv";
            textoY = "Number of Extremely low income units";
            break;
        case "Distance":
            nombre = "housing.csv";
            textoY = "Distance (m)"
            break;
        default:
        break;
    }
    d3.csv(nombre, function(error,data) {
      if(error) console.log("Error: data not loaded!");
    
      data.forEach(function(d) {
        d.district = d.district;
        d.number = +d.number;  
      });
    
      
      xScale.domain(data.map(function(d) { return d.district; }) );
      yScale.domain([0, d3.max(data, function(d) { return d.number; } ) ]);
    
      svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr("height", 0)
        .attr("y", height)
        .transition().duration(3000)
        .delay( function(d,i) { return i * 200; })
        .attr({
          "x": function(d) { return xScale(d.district); },
          "y": function(d) { return yScale(d.number); },
          "font-family": "Raleway", 
          "width": xScale.rangeBand(),
          "height": function(d) { return  height - yScale(d.number); }
        })
        .style("fill", function(d,i) { return 'rgb(255, 0, ' + 0 + ')'});
    
    
            svg.selectAll('text')
                .data(data)
                .enter()
                .append('text')
    
                .text(function(d){
                    return d.number;
                })
                .attr({
                    "x": function(d){ return xScale(d.district) +  xScale.rangeBand()/2; },
                    "y": function(d){ return yScale(d.number)+ 12; },
                    "font-family": "Raleway", 
                    "font-size": '13px',
                    "font-weight": 'bold',
                    "fill": 'white',
                    "text-anchor": 'middle'
                });
    
        
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .attr("dx", "-.8em")
            .attr("dy", ".25em")
            .attr("transform", "rotate(-60)" )
            .style("text-anchor", "end")
            .attr("font-size", "10px");
    
        
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -height/2)
            .attr("dy", "-4em")
            .style("text-anchor", "middle")
            .text(textoY);
    });
}
$(document).ready( function(){
    $("#goSingle").on("click", graficar);
    $("#avgPara").on("click", graficar2);
});