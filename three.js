import * as Three from 'three';

const dimensions = {
    width: 640,
    height: 480,
};

dimensions.aspect = dimensions.width / dimensions.height;

// Scene
const scene = new Three.Scene();

// Add an example object (e.g., a rectangle)
const geometry = new THREE.PlaneGeometry(50, 50);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const plane = new THREE.Mesh(geometry, material);


// Mesh
// const geometry = new Three.BoxGeometry();
// const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new Three.Mesh(geometry, material);
// scene.add(cube);

// Set up a camera
const camera = new THREE.OrthographicCamera(
    0, // left
    window.innerWidth, // right
    window.innerHeight, // top
    0, // bottom
    0.1, // near
    1000 // far
  );
  camera.position.z = 10;

// Renderer
const renderer = new Three.WebGLRenderer({ 
    antialias: true, 
    alpha: true, 
    canvas: document.getElementById('three') 
});

// Set up a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

renderer.setSize(dimensions.width, dimensions.height);
renderer.setClearColor(0x000000, 0);

// Adjust scene to match p5.js coordinate system
scene.scale.y = -1; // Invert the Y-axis

// Position object based on p5.js-style coordinates
plane.position.set(100, 100, 0); // Top-left corner is (0, 0)
scene.add(plane);

// Scaling factor to amplify movement
const SCALING_FACTOR = 1; // Adjust this to match your scene scale


// Animate
function animate() {
    requestAnimationFrame(animate);

    if (window.sharedData.keypointsP5 && window.sharedData.keypointsP5[0]) {
        const nose = window.sharedData.keypointsP5[0].keypoints3D[0]; // Access the nose keypoint

        if (nose) {
            // Update the cube's position, scaling the values for better movement
            cube.position.set(
                nose.x * SCALING_FACTOR, 
                nose.y * SCALING_FACTOR, 
                0
            );
        }
        // Render the scene
        renderer.render(scene, camera);
    }
}

animate();
