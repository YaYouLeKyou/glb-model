import * as THREE from './three.js-master/build/three.module.js'
import {GLTFLoader} from './three.js-master/examples/jsm/loaders/GLTFLoader.js'
import {OrbitControls} from './three.js-master/examples/jsm/controls/OrbitControls.js';
// console.log(THREE)

const canvas = document.querySelector('webgl')
var scene = new THREE.Scene();



//Loader


const loader = new GLTFLoader()
loader.load('assets/wraith.glb', function(glb){
  console.log(glb)
  const root = glb.scene;
  root.scale.set(0.02,0.02,0.02)
  scene.add(root);
  console.log(root)
}, function(xhr){
  // console.log((xhr.loaded/xhr.total*100)+ "% loaded")
}, function(error){
  console.log("an error occurred")
})

// const loader = new GLTFLoader()
// loader.load('assets/wraith.glb', function(glb){
//   console.log(glb)
//   const root = glb.scene;
//   root.scale.set(0.02,0.02,0.02)
//   scene.add(root);
// }, function(xhr){
//   console.log((xhr.loaded/xhr.total*100)+ "% loaded")
// }, function(error){
//   console.log("an error occurred")
// })

//Old Light

// const light = new THREE.DirectionalLight(0xffffff, 1)
// light.position.set(2,2,5)
// scene.add(light)

// Lights


const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)



var camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);
camera.position.z = 3;
scene.add(camera)

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.shadowMap.enabled = true
renderer.gammaOuput = true

document.body.appendChild(renderer.domElement);



//OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
		controls.autoRotate = true;
    camera.position.set( -2, 1, 1 );


//Cube
// var geometry = new THREE.BoxGeometry(1, 1, 1);
// var material = new THREE.MeshNormalMaterial({ color: 0x00aaff });

// var cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

function animate() {
  requestAnimationFrame(animate);

  // model.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
   controls.update();

  renderer.render(scene, camera);
}

animate();