function renderInput(){

    graphData = []

    d3.selectAll("svg > *").remove();

    var x1input = document.getElementById("x1").value;
    var x2input = document.getElementById("x2").value;
    var time = document.getElementById("time").value; 
    var velocity = parseInt(document.getElementById("velocity").value); 
    
    var vortex = document.getElementById("vortex").checked; 

    //var velocity = 0; 

    let x1 = 0;
    let x2 = 0; 
    graphData.push({"x":0, "y":x1, "dataSet":1});
    graphData.push({"x":0, "y":x2, "dataSet":2});

    var countup = false; 

    let i = 1;
    while (i <= time) {

        if (vortex == true){
            if (x1 >= 1){countup = false;}
            else if (x1 <= -1){countup = true;}

            if (countup == false){
                velocity -= 0.5;
            }
            else if (countup == true){
                velocity += 0.5;
            }
        }

        console.log(velocity);
        console.log(x1);
        console.log(countup);


        x1 += x1input * velocity;
        x2 += x2input * velocity;
        graphData.push({"x":i, "y":x1, "dataSet":1});
        graphData.push({"x":i, "y":x2, "dataSet":2});
        i++; 

    }   

    nested = d3.group(graphData, d => d.dataSet);

    console.log(graphData);
    render(graphData);

}