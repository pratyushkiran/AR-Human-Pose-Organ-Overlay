import * as Three from 'three';

const dimensions = {
    width: 640,
    height: 480,
};

dimensions.aspect = dimensions.width / dimensions.height;

// Scene
const scene = new Three.Scene();

// Mesh
const geometry = new Three.BoxGeometry();
const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new Three.Mesh(geometry, material);
scene.add(cube);

// Camera
const camera = new Three.PerspectiveCamera(
    75,
    dimensions.aspect,
    0.1,
    1000
);
// camera.position.y = 2;
camera.position.z = 3;


// Renderer
const renderer = new Three.WebGLRenderer({ 
    antialias: true, 
    alpha: true, 
    canvas: document.getElementById('three') 
});
renderer.setSize(dimensions.width, dimensions.height);
renderer.setClearColor(0x000000, 0);

// Scaling factor to amplify movement
const SCALING_FACTOR = 5; // Adjust this to match your scene scale

// Animate
function animate() {
    requestAnimationFrame(animate);

    if (window.sharedData.keypointsP5 && window.sharedData.keypointsP5[0]) {
        const nose = window.sharedData.keypointsP5[0].keypoints3D[0]; // Access the nose keypoint

        if (nose) {
            // Update the cube's position, scaling the values for better movement
            cube.position.set(
                -nose.x * SCALING_FACTOR, 
                nose.y * SCALING_FACTOR / 2, 
                // (nose.z || 0) * SCALING_FACTOR 
                // 0.2,
                0
                // left shoulder plus right shoulder distance 
            );



        }

        // Render the scene
        renderer.render(scene, camera);
    }
}

animate();
