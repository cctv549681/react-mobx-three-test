import * as WHS from 'whs';
import * as PHYSICS from 'physics-module-ammonext';
let canvas: any = document.getElementById('app');

const app = new WHS.App([
    new WHS.app.ElementModule(),
    new WHS.app.SceneModule(),
    new WHS.app.CameraModule({
        position: new THREE.Vector3(0, 0, 50)
    }),
    new PHYSICS.WorldModule({
        gravity: new THREE.Vector3(0, -10, 0)
    }),
    new WHS.app.RenderingModule({ bgColor: 0x162129 }),
    new WHS.app.ResizeModule(),
    new WHS.BasicAppPreset()
]);
const box = new WHS.Box();


const sphere = new WHS.Sphere({ // Create sphere component.
    geometry: {
        radius: 3,
        widthSegments: 32,
        heightSegments: 32
    },

    material: new THREE.MeshBasicMaterial({
        color: 0xF2F2F2
    }),

    position: [0, 10, 0]
});

sphere.addTo(app); // Add sphere to world.

new WHS.Plane({
    geometry: {
        width: 100,
        height: 100
    },

    material: new THREE.MeshBasicMaterial({
        color: 0x447F8B
    }),

    rotation: {
        x: -Math.PI / 2
    }
}).addTo(app);
const group = new WHS.Group(box, sphere);
new WHS.Loop(() => {
    box.rotation.y += 0.02;
}).start(app)