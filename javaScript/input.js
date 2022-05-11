function renderInput(){

    graphData = []
    graphData2 = []
    nodeData = []

    var change = 0; 
    var change2 = 0; 

    d3.selectAll("svg > *").remove();

    var x1input = parseFloat(document.getElementById("x1").value);
    var x2input = parseFloat(document.getElementById("x2").value);
    var time = parseInt(document.getElementById("time").value); 
    
    var stable = document.getElementById("stable").checked; 
    var unstable = document.getElementById("unstable").checked;
    var saddle = document.getElementById("saddle").checked;
    var focus = document.getElementById("focus").checked;

    var x1 = x1input;
    var x2 = x2input;  
    
    if (unstable == true){
        x1 = 0;
        x2 = 0;       
    }
    else if (saddle == true){
        x1 = 0;
        x2 = x2input; 
    }

    graphData.push({"x":0, "y":x1, "dataSet":1});
    graphData.push({"x":0, "y":x2, "dataSet":2});
    graphData2.push({"x":x1.toFixed(2), "y":x2.toFixed(2), "dataSet":1}); 

    let i = 1;
    while (i <= time) {
     
        var x1parent = x1;
        var x2parent = x2; 
        
        change = x1input / (time - (i / 2));
        change2 = x2input / (time - (i / 2)); 

       if (stable == true){

            title = 'Stable node'; 

           
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

            x1 += change; 
            x2 += change2;
         
        }

        else if (saddle == true){

            title = 'Saddle node'; 
    
            x1 += change; 

            if (x2.toFixed(2) > 0){
                if (x2 - change2 <= 0){x2 = 0;}
                else {x2 -= change2;} 
               }
            else if (x2.toFixed(2) < 0){
                if (x2 - change2 >= 0){x2 = 0;}
                else {x2 -= change2;} 
               }
     
        }

        else if (focus == true){

            /* to be completed */
        }

        if (x1parent != x1 && x2parent != x2){
            nodeData.push({"position":[x1.toFixed(2), x2.toFixed(2)] , "parentPosition": [x1parent.toFixed(2), x2parent.toFixed(2)]}); 
        }
   
        graphData.push({"x":i, "y":x1.toFixed(2), "dataSet":1});
        graphData.push({"x":i, "y":x2.toFixed(2), "dataSet":2});
        graphData2.push({"x":x1.toFixed(2), "y":x2.toFixed(2), "dataSet":1});
        i++; 

    }   

    nested = d3.group(graphData, d => d.dataSet);

    console.log(nodeData);
    renderGraph(graphData);
    renderPhase(nodeData); 
}