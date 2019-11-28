const inputTextbox = document.getElementById("textbox-text");
const renderButton = document.getElementById("render-btn");
const body = document.body;

renderButton.addEventListener("click", (ev) => {
    let inputText = inputTextbox.value;     
    init(inputText);
})

function init(inputText) {
    let scene, camera, renderer;
    let fontLoader;
    let dirLight;
    let inputMesh;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 0, 500);
    camera.lookAt(scene.position);
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xfff6e6 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    body.appendChild(renderer.domElement);
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.addEventListener( 'change', function() { renderer.render(scene, camera); } );
    dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.setScalar(10);
    scene.add(dirLight);
    fontLoader = new THREE.FontLoader();
    fontLoader.load('https://threejs.org/examples/fonts/helvetiker_bold.typeface.json', function(font) {
        inputMesh = createTextMesh(inputText, font, 80, materialSelector());
        scene.add(inputMesh);
       
    });

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createTextMesh(text, font, size, mat) {
       var geo = new THREE.TextGeometry(text, {
        font: font,
		size: 80,
		height: 5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 10,
		bevelSize: 8,
		bevelOffset: 0,
		bevelSegments: 5
        });

        geo.center();
        geo.computeBoundingBox();

        return new THREE.Mesh(geo, mat);
    }
function materialSelector() {
                return new THREE.MeshPhongMaterial({
                    color: 0x9e0031,
                    specular: 0x555555,
                    shininess: 30
                });}
    render();

}