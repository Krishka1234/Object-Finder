function preload(){
    img=loadImage("dog_cat.jpg");
}
status="";
objects=[];
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status : Detecting Objects ";
}
function modelloaded(){
    console.log("model is loaded");
    status=true;
}
function gotresult(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video,0,0,640,420);
    if(status!=""){
        objectDetector.detect(video,gotresult);
        for(i=0; i<objects.length;i++){
            document.getElementById("status").innerHTML="Status :  Objects detected ";
            document.getElementById("number").innerHTML="Number of objects detected are : "+objects.length;
            fill("red");
            percent=floor(objects[i].confidence*100);
            text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
        }
    }
}