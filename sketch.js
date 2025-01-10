let bodyPose;
let video;
let connections;
let poses = [];
let isDetecting = false; // Flag to control pose detection

function preload() {
  // Load the bodyPose model on page load
  bodyPose = ml5.bodyPose("BlazePose", () => console.log('Mediapipe BlazePose Model Loaded...'), { flipped: false });
}

function gotPoses(results) {
  if (isDetecting) {
    poses = results; // Update poses only if detection is active
  }
}

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent("canvas");

  // Hide the video initially (will be created on button click)
  video = createCapture(VIDEO, { flipped: true });
  video.size(640, 480);
  video.hide();

  // Create a start button
  let startButton = createButton("Start Detection");
  startButton.position(10, 10);
  startButton.mousePressed(startDetection);
}

function startDetection() {
  if (!isDetecting) {
    isDetecting = true;
    bodyPose.detectStart(video, gotPoses); // Start detecting poses
    connections = bodyPose.getSkeleton(); // Get skeleton connections
    console.log("Pose Detection Started...");
  }
}

function draw() {
  background(1);
  image(video, 0, 0, width, height);

  if (isDetecting) {
    for (let i = 0; i < poses.length; i++) {
      let pose = poses[i];

      for (let j = 0; j < pose.keypoints.length; j++) {
        let keypoint = pose.keypoints[j];
        if (keypoint.confidence > 0.1) {
          fill(0, 255, 0);
          noStroke();
          circle(keypoint.x, keypoint.y, 10);
        }
      }

      for (let j = 0; j < connections.length; j++) {
        let pointAIndex = connections[j][0];
        let pointBIndex = connections[j][1];
        let pointA = pose.keypoints[pointAIndex];
        let pointB = pose.keypoints[pointBIndex];

        if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
          stroke(255, 0, 0);
          strokeWeight(2);
          line(pointA.x, pointA.y, pointB.x, pointB.y);
        }
      }
    }

    window.sharedData = {
      keypointsP5: poses,
    };
  }
}

function mousePressed() {
  console.log("Poses Array 👇", poses);
  if (poses.length > 0) {
    console.log("3D Keypoints 👇", poses[0].keypoints3D[0]);
    console.log("2D Keypoints 👇", poses[0].keypoints[0]);
  }
}
