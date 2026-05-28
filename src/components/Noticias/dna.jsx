import * as THREE from "three";

/**
 * Configura o DNA 3D num container específico.
 * @param {HTMLElement} container - Elemento DOM onde o canvas será anexado.
 * @returns {Object} Componentes necessários para construir e animar o DNA.
 */
export function setupDNA3D(container) {
    const blue = 0x84D0F0;
    const yellow = 0xFED162;
    const purple = 0x651E59;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const tubeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 6, 16);
    const ballGeometry = new THREE.SphereGeometry(0.8, 16, 16);

    const blueMaterial = new THREE.MeshBasicMaterial({ color: blue });
    const yellowMaterial = new THREE.MeshBasicMaterial({ color: yellow });
    const purpleMaterial = new THREE.MeshBasicMaterial({ color: purple });

    const dnaGroup = new THREE.Group();

    return {
        scene,
        camera,
        renderer,
        dnaGroup,
        tubeGeometry,
        ballGeometry,
        blueMaterial,
        yellowMaterial,
        purpleMaterial,
        container, // guardamos para redimensionamento
    };
}

/**
 * Cria a estrutura helicoidal do DNA (20 camadas).
 * @param {Object} components - Retornado por setupDNA3D.
 */
export function criarEstruturaDNA(components) {
    const { dnaGroup, tubeGeometry, ballGeometry, blueMaterial, yellowMaterial, purpleMaterial } = components;

    for (let i = 0; i <= 20; i++) {
        const row = new THREE.Group();
        const yPos = i * 2 - 20;

        const blueTube = new THREE.Mesh(tubeGeometry, blueMaterial);
        blueTube.rotation.z = Math.PI / 2;
        blueTube.position.set(-3, 0, 0);

        const yellowTube = new THREE.Mesh(tubeGeometry, yellowMaterial);
        yellowTube.rotation.z = Math.PI / 2;
        yellowTube.position.set(3, 0, 0);

        const ballLeft = new THREE.Mesh(ballGeometry, purpleMaterial);
        ballLeft.position.set(-6, 0, 0);

        const ballRight = new THREE.Mesh(ballGeometry, purpleMaterial);
        ballRight.position.set(6, 0, 0);

        row.add(blueTube, yellowTube, ballLeft, ballRight);
        row.position.y = yPos;
        row.rotation.y = i * 0.5;

        dnaGroup.add(row);
    }

    return dnaGroup;
}

/**
 * Inicia a animação de rotação do DNA.
 * @param {Object} components - Deve conter dnaGroup, renderer, scene, camera.
 * @returns {Function} Função para cancelar a animação.
 */
export function iniciarAnimacaoDNA(components) {
    const { dnaGroup, renderer, scene, camera } = components;
    let animationId;

    function animate() {
        animationId = requestAnimationFrame(animate);
        dnaGroup.rotation.x += 0.005;
        dnaGroup.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();

    return () => cancelAnimationFrame(animationId);
}

/**
 * Torna o DNA responsivo ao redimensionamento da janela.
 * @param {Object} components - Deve conter container, camera, renderer.
 * @returns {Function} Função de cleanup para remover o event listener.
 */
export function configurarRedimensionamentoDNA(components) {
    const { container, camera, renderer } = components;

    const handleResize = () => {
        const width = container.clientWidth;
        const height = container.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
}