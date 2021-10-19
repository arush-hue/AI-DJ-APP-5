song_1="";
song_2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
score_leftWrist=0;
song_status_1="";
score_rightWrist=0;
song_status_2="";
function preload()
{
    song_2=loadSound("music.mp3");
    song_1=loadSound("Alors on danse.mp3");
}
function setup()
{
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();
    PoseNet=ml5.poseNet(video, modelLoaded);
    PoseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("PoseNet model is initialized");
}
function draw()
{
    image(video,0,0,600,500);
    fill("red");
    stroke("blue");
    song_1.isPlaying();
    song_2.isPlaying();
    song_status_1=false;
    song_status_2=false;
    if(score_leftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        song_2.stop();
        if(song_status_1==false)
        {
            song_1.play();
            document.getElementById("play").innerHTML="Song Name- Alors On Danse";
        }
    }
    if(score_rightWrist>0.2)
    {
        circle(rightWristX,rightWristY,20);
        song_1.stop();
        if(song_status_2==false)
        {
            song_2.play();
            document.getElementById("play").innerHTML="Song Name- Harry Potter"
        }
    }
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log("results");
        score_leftWrist=results[0].pose.keypoints[9].score;
        score_leftWrist=results[0].pose.keypoints[10].score;
        console.log("Score Left Wrist- "+score_leftWrist+"Score Right Wrist- "+score_rightWrist);

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;

        console.log("Left Wrist X = "+leftWristX+"Left Wrist Y = "+leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;

        console.log("Right Wrist X = "+rightWristX+" Right Wrist Y = "+rightWristY);
    }
}