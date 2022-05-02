function renderInput(){

    graphData = []
    nodeData = []

    d3.selectAll("svg > *").remove();

    var x1input = parseFloat(document.getElementById("x1").value);
    var x2input = parseFloat(document.getElementById("x2").value);
    var time = parseInt(document.getElementById("time").value); 
    
    var velocity = parseFloat(document.getElementById("velocity").value); 
     
    var vortex = document.getElementById("vortex").checked; 
    var focus = document.getElementById("focus").checked;
    var stable = document.getElementById("stable").checked;  

    let x1 = x1input;
    let x2 = x2input; 
    graphData.push({"x":0, "y":x1, "dataSet":1});
    graphData.push({"x":0, "y":x2, "dataSet":2});

    var countup = true; 
    var countup2 = false; 
    
    var change = 0; 
    var change2 = 0; 

    let i = 1;
    while (i <= time) {

        var x1parent = x1;
        var x2parent = x2; 
    
        if (stable == true){

            change = x1input / (time - i);
            change2 = x2input / (time - i); 
           
            if (x1.toFixed(2) > 0){
                if (x1 - change <= 0){x1 = 0;}
                else {x1 -= change;}
               }
            else if (x1.toFixed(2) < 0){
                if (x1 - change >= 0){x1 = 0;}
                else {x1 -= change;}
               }
            
            if (x2.toFixed(2) > 0){
                if (x2 - change2 <= 0){x2 = 0;}
                else {x2 -= change2;} 
               }
            else if (x2.toFixed(2) < 0){
                if (x2 - change2 >= 0){x2 = 0;}
                else {x2 -= change2;} 
               }
        }

        else if (vortex == true){
            
            if (x1 > x1input * 2){countup = false;}
            else if (x1 < x1input - x1input){countup = true;}

            if (countup == false){
                x1 -= 1;
            }
            else if (countup == true){
                x1 += 1;
            }
   
            if (x2 > x2input * 2){countup2 = false;}
            else if (x2 < x2input - x2input){countup2 = true;}

            if (countup2 == false){
                x2 -= 1;
            }
            else if (countup2 == true){
                x2 += 1;
            }

        }

    
        else if (focus == true){
           
        }

        console.log(x1);
        console.log(countup);

        nodeData.push({"position":[i, x1.toFixed(2)] , "parentPosition": [i-1, x1parent.toFixed(2)]})
   
        graphData.push({"x":i, "y":x1.toFixed(2), "dataSet":1});
        graphData.push({"x":i, "y":x2.toFixed(2), "dataSet":2});
        i++; 

    }   

    nested = d3.group(graphData, d => d.dataSet);

    console.log(nodeData);
    render(graphData);
    render2(nodeData); 
}