function renderInput(){

    graphData = []
    nodeData = []

    var x1;
    var x2; 

    d3.selectAll("svg > *").remove();

    var x1input = parseFloat(document.getElementById("x1").value);
    var x2input = parseFloat(document.getElementById("x2").value);
    var time = parseInt(document.getElementById("time").value); 
    
    var stable = document.getElementById("stable").checked; 
    var unstable = document.getElementById("unstable").checked;
    var focus = document.getElementById("focus").checked;
    var vortex = document.getElementById("vortex").checked; 

    if (unstable == true){
        x1 = 0;
        x2 = 0; 
        console.log(x1);
    }
    else{
        x1 = x1input;
        x2 = x2input;  
    }

    graphData.push({"x":0, "y":x1, "dataSet":1});
    graphData.push({"x":0, "y":x2, "dataSet":2});
    nodeData.push({"x":x1.toFixed(2), "y":x2.toFixed(2), "dataSet":1}); 

    var countup = true; 
    var countup2 = false; 
    
    var change = 0; 
    var change2 = 0; 

    let i = 1;
    while (i <= time) {

        
        var x1parent = x1;
        var x2parent = x2; 
 
       if (stable == true){

            title = 'Stable node'; 

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

        else if (unstable == true){

            title = 'Unstable node'; 

            x1 += x1input * (time - i); 
            x2 += x2input * (time - i);

        }

        else if (focus == true){

            title = 'Focus / center';
            
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

    
        else if (vortex == true){
           
        }

        //nodeData.push({"position":[i, x1.toFixed(2)] , "parentPosition": [i-1, x1parent.toFixed(2)]})
        //nodeData.push({"position":[x1.toFixed(2), x2.toFixed(2)] , "parentPosition": [x1parent.toFixed(2), x2parent.toFixed(2)]})
   
        nodeData.push({"x":x1.toFixed(2), "y":x2.toFixed(2), "dataSet":1}); 
        graphData.push({"x":i, "y":x1.toFixed(2), "dataSet":1});
        graphData.push({"x":i, "y":x2.toFixed(2), "dataSet":2});
        i++; 

    }   
    chartTime = time; 
    nested = d3.group(graphData, d => d.dataSet);
    nested2 = d3.group(nodeData, d => d.dataSet);

    console.log(graphData);
    render(graphData);
    render2(nodeData); 
}