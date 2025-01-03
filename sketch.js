let bodyPose;
let video;
let connections;

var poses = []

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose("BlazePose", () => console.log('BlazePose Model Loaded !'), { flipped: true });
}

// Callback function for when the model returns pose data
function gotPoses(results) {
  // Store the model's results in a global variable
  poses = results;
}

function setup() {
  // noCanvas(); // Disable p5.js default canvas
  const canvas = createCanvas(640, 480, WEBGL);
  canvas.parent("canvas")


  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  // background(1); 
  image(video, -width / 2, -height / 2, width, height);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    // Iterate through all the keypoints for each pose
    for (let j = 0; j < pose.keypoints3D.length; j++) {
      let keypoint = pose.keypoints3D[j];
      // Only draw a circle if the keypoint's confidence is greater than 0.1
      if (keypoint.confidence > 0.3) {
        fill(0, 255, 0);
        // noStroke();
        strokeWeight(6);
        const scale = 700;
        const offsetY = 300;
        circle(keypoint.x * scale, keypoint.y * scale + offsetY, 5);
        // point(keypoint.x * scale, keypoint.y * scale + offsetY, keypoint.z * scale);
        // push();
        // translate(keypoint.x, keypoint.y, keypoint.z);
        // rotateZ(angle);
        // box(0.1);
        // pop();
      }
    }
    // Draw the skeleton connections
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if we have confidence in both points
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }

    window.sharedData = {
      keypointsP5: poses
    }
  }
}


function mousePressed() {
  console.log(poses);
  console.log(poses[0].keypoints3D[0]);
  console.log(poses[0].keypoints[0]);
}