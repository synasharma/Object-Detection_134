status=""; //status variable as the cocossd model needs time to load
status_no="";
img="";
objects=[];//declaring an empty array
function preload()
{
img=loadImage("dog_cat.jpg");//image used
}

function setup()
{
canvas=createCanvas(480,400);
canvas.center();
video=createCapture(VIDEO);
video.hide();

objectDetection=ml5.objectDetector('cocossd',modelLoaded); //loading the cocossd model
document.getElementById("status").innerHTML="Status: Detecting Objects";
}

function modelLoaded()
{
    console.log('Model has Loaded!');  
    status=true; //status activates when model loads
    
}



function getResult(error,result)//order of parameters should not be changed
{
    if (error)
    {
        console.log(error); //if any error occurs
    }
    else 
    {
        console.log(result); //to obtain results
        objects=result; //copying the objects array into the results array
    }
}

function draw(){ //image and rectangle with text and colour
    image(video,0,0,480,400);
    objectDetection.detect(video,getResult); //to continuosly detect the result and not only in the first time when the model loads
if(status!="") //displaying the result only after the model gets loaded (to check if the model gets loaded)~if the status is true
{
    for(i=0;i<objects.length;i++)
    {
        
        document.getElementById("status").innerHTML="Status: Detected Objects"
        fill('black');
        document.getElementById("status_no").innerHTML="No. of objects detected: "+objects.length;
        textSize(20);
        percent=floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
        noFill();
        stroke(random(255),random(255),random(255));
        strokeWeight(2);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }

}

}


/*fill('red');
textSize(20);
text('Cat',400,100);
noFill();
stroke('red');
strokeWeight(2);
rect(340,80,180,300);*/
