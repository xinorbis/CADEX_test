import * as THREE from './three.module.js';
import { OrbitControls } from './OrbitControls.js';

function sendData (geometry, params) {
    $.get('/triangulate', params, function (response) {
        for (let i = 0; i < geometry.vertices.length; i ++) {
            geometry.vertices[i].set(response[i].x, response[i].y, response[i].z);
        }

        geometry.verticesNeedUpdate = true;
    });
}

function createGui (geometry) {
    const params = {
        length: 1,
        width:  1,
        height: 1,
    }

    const gui = new dat.GUI();

    gui.add(params, 'length', 1, 10).onFinishChange(function () {
        sendData(geometry, params);
    });

    gui.add(params, 'width', 1, 10).onFinishChange(function () {
        sendData(geometry, params);
    });

    gui.add(params, 'height', 1, 10).onFinishChange(function () {
        sendData(geometry, params);
    });
}

function createGeometry () {
    let geometry = new THREE.Geometry();
    geometry.vertices.push(
        new THREE.Vector3(-0.5, 0,  0.5),  // 0
        new THREE.Vector3( 0.5, 0,  0.5),  // 1
        new THREE.Vector3(-0.5, 1,  0.5),  // 2
        new THREE.Vector3( 0.5, 1,  0.5),  // 3
        new THREE.Vector3(-0.5, 0, -0.5),  // 4
        new THREE.Vector3( 0.5, 0, -0.5),  // 5
        new THREE.Vector3(-0.5, 1, -0.5),  // 6
        new THREE.Vector3( 0.5, 1, -0.5),  // 7
    );

    /*
         6--------7
        /|       /|
       2--------3 |
       | |      | |
       | 4------|-5
       |/       |/
       0--------1
    */

    geometry.faces.push(
        // front
        new THREE.Face3(0, 3, 2),
        new THREE.Face3(0, 1, 3),
        // right
        new THREE.Face3(1, 7, 3),
        new THREE.Face3(1, 5, 7),
        // back
        new THREE.Face3(5, 6, 7),
        new THREE.Face3(5, 4, 6),
        // left
        new THREE.Face3(4, 2, 6),
        new THREE.Face3(4, 0, 2),
        // top
        new THREE.Face3(2, 7, 6),
        new THREE.Face3(2, 3, 7),
        // bottom
        new THREE.Face3(4, 1, 0),
        new THREE.Face3(4, 5, 1),
    );

    geometry.verticesNeedUpdate = true;

    return geometry;
}

function makeInstance(geometry, color, x, scene) {
    const material = new THREE.MeshBasicMaterial({color});

    let cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    return cube;
}

window.onload = function() {
    function run() {
        const canvas = document.querySelector('#render');
        const renderer = new THREE.WebGLRenderer({canvas});
        renderer.setSize(window.innerWidth, window.innerHeight);

        const fov = 45;
        const aspect = 2;
        const near = 1;
        const far = 100;
        const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        const scene = new THREE.Scene();
        const controls = new OrbitControls(camera, renderer.domElement);

        scene.add(new THREE.AxesHelper(20));

        camera.position.set(0, 0, 10);
        controls.update();

        {
            const color = 0xFFFFFF;
            const intensity = 1;
            const light = new THREE.DirectionalLight(color, intensity);
            light.position.set(-2, 4, 8);
            scene.add(light);
        }

        let geometry = createGeometry();
        let cube = makeInstance(geometry, 0x999999, 0, scene);

        createGui(geometry);

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }

        animate();
    }

    run();
}