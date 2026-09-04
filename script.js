let scene, camera, renderer, particles, group;
let mouseX = 0, mouseY = 0;
let time = 0;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // نور طلایی
    const ambient = new THREE.AmbientLight(0xFFD700, 0.8);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(0xFFD700, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // ذرات طلایی
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i]     = (Math.random() - 0.5) * 200;
        positions[i + 1] = Math.random() * 200;
        positions[i + 2] = (Math.random() - 0.5) * 200;
        colors[i]        = Math.random() * 0.5 + 0.5;
        colors[i + 1]    = Math.random() * 0.5 + 0.5;
        colors[i + 2]    = Math.random() * 0.5 + 0.5;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({ 
        size: 1.5, 
        vertexColors: true,
        transparent: true,
        opacity: 0.9 
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    camera.position.z = 50;

    window.addEventListener('resize', onResize);
    document.addEventListener('mousemove', onMouseMove);

    animate();
}

function onMouseMove(e) {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
}

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    // حرکت ذرات و گروه
    particles.rotation.y = time * 0.1;
    particles.rotation.x = Math.sin(time * 0.05) * 0.1;

    // پارالاکس با موس
    camera.position.x = mouseX * 10;
    camera.position.y = mouseY * 10;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
}

init();
