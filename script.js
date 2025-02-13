// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('universe') });
renderer.setSize(window.innerWidth, window.innerHeight);

// Create Stars
function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff });

  const starVertices = [];
  for (let i = 0; i < 1000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}

createStars();

// Glowing Heart Planet
const heartGeometry = new THREE.SphereGeometry(5, 32, 32);
const heartMaterial = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
const heartPlanet = new THREE.Mesh(heartGeometry, heartMaterial);
heartPlanet.position.set(0, 0, -50);
scene.add(heartPlanet);

// Camera Position
camera.position.z = 50;

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate Heart Planet
  heartPlanet.rotation.x += 0.01;
  heartPlanet.rotation.y += 0.01;

  renderer.render(scene, camera);
}
animate();

// Reveal Hidden Content on Scroll
window.addEventListener('scroll', () => {
  const hiddenContent = document.getElementById('hidden-content');
  if (window.scrollY > 200) {
    hiddenContent.classList.add('visible');
  }
});

// Play Background Music
document.getElementById('background-music').play();

// Shooting Stars
function createShootingStar() {
  const geometry = new THREE.SphereGeometry(0.1, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffd700 });
  const star = new THREE.Mesh(geometry, material);

  star.position.set(
    (Math.random() - 0.5) * 200,
    Math.random() * 100,
    -Math.random() * 1000
  );

  scene.add(star);

  // Animate Shooting Star
  function moveStar() {
    star.position.z += 10;
    if (star.position.z > 0) {
      scene.remove(star);
    } else {
      requestAnimationFrame(moveStar);
    }
  }
  moveStar();
}

setInterval(createShootingStar, 2000); // Spawn a shooting star every 2 seconds

// Constellations That Form "Sahana"
function createConstellation(name) {
  const points = [];
  const letters = name.split('');
  const spacing = 10;

  letters.forEach((letter, index) => {
    const x = index * spacing - (name.length * spacing) / 2;
    const y = 0;
    const z = -50;
    points.push(new THREE.Vector3(x, y, z));
  });

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
  const constellationLine = new THREE.Line(lineGeometry, lineMaterial);
  scene.add(constellationLine);

  // Add Stardust Effect
  const stardust = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.PointsMaterial({ color: 0xffff00, size: 0.5 })
  );
  scene.add(stardust);
}

createConstellation("Sahana"); // Her name appears as a constellation

// Cinematic Ending Sequence
setTimeout(() => {
  alert("Thank you for being my universe, Sahana. Happy Valentine's Day, my love.");
}, 30000); // Trigger after 30 seconds
