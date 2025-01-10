import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const dimensions = {
    width: 640,
    height: 480,
};
dimensions.aspect = dimensions.width / dimensions.height;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    dimensions.aspect,
    0.1,
    1000
);
camera.position.set(0, 0, 3);

// Renderer
const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: true, 
    canvas: document.getElementById('three') 
});
renderer.setSize(dimensions.width, dimensions.height);
renderer.setClearColor(0x000000, 0);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 3);
scene.add(light);

// Mesh
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// Load Heart Model
const loader = new GLTFLoader();
let heart;
loader.load('assets/models/human_heart.glb', (gltf) => {
     heart = gltf.scene;
    // heart.scale.set(0.8, 0.8, 0.8);  // Initial scale
    scene.add(heart);
});

// Add AxesHelper (length of 5 units)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);



// Scaling factor to amplify movement
const SCALING_FACTOR = 3; // Adjust this to match your scene scale

// Animate
function animate() {
    requestAnimationFrame(animate);

    if (window.sharedData.keypointsP5 && window.sharedData.keypointsP5[0]) {
        const nose = window.sharedData.keypointsP5[0].keypoints3D[0]; // Access the nose keypoint

        if (nose) {
            // Update the cube's position, scaling the values for better movement
            heart.position.set(
                -(nose.x + 0) * SCALING_FACTOR, 
                -nose.y * SCALING_FACTOR, 
                -nose.z * SCALING_FACTOR, 
            );
        }

        // Render the scene
        renderer.render(scene, camera);
    }
}

// Function to start rendering after 5 seconds
setTimeout(() => {
    console.log("ThreeJS Rendering started...");
    animate(); // Start the animation loop
}, 7000); // 5000 ms = 5 seconds