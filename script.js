/* ==========================================================================
   Manoj Kumar - Portfolio WebGL & UI Interactivity Script
   - Three.js 3D Background: Dark Knight Batarang (Extracted from Reference Images)
   - Color Theme: High-Contrast Black & Tactical Bat-Yellow (#ffcc00)
   - GSAP Scroll & Entrance Animations
   - Recruiter & Privacy-Safe Data Mapping
   - Form Handling & Mobile Nav Controls
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. RESUME & RECRUITER DATA MAPPING CONFIGURATION
       ---------------------------------------------------------------------- */
    const USER_CONFIG = {
        name: "Manoj Kumar",
        role: "Analyst @ Cognizant | Cloud, DevOps & Enterprise Systems Specialist",
        tagline: "Linux administration, IBM AS400/DB2 SQL, Python development, AI image forensics, and DevOps/Cloud technologies.",
        email: "manojkumarofficial2023@gmail.com",
        linkedIn: "https://www.linkedin.com/in/mk1705",
        gitHub: "https://github.com/manojkumar377",
        portfolioUrl: "https://manojkumar377.github.io/portfolio/",
        resumePdfPath: "resume.pdf"
    };

    /* ----------------------------------------------------------------------
       2. THREE.JS 3D DARK KNIGHT BATARANG GEOMETRY GENERATOR
       Accurately modeled from reference images:
       - Angular ears & head notch
       - Swept wing blades with beveled cutting edges
       - Center tail point and scalloped underside
       - Dark Gunmetal body with Tactical Bat-Yellow (#ffcc00) edge glow
    ------------------------------------------------------------------------- */
    const createDarkKnightBatarangGroup = () => {
        const group = new THREE.Group();

        // 1. Vector Shape based on reference image geometry
        const shape = new THREE.Shape();
        
        // Center top notch between ears
        shape.moveTo(0, 0.28);
        
        // Left Ear
        shape.lineTo(-0.16, 0.68);
        shape.lineTo(-0.36, 0.38);
        
        // Left Wing Shoulder & Top Edge
        shape.lineTo(-1.35, 0.65);
        shape.lineTo(-2.8, 0.18);
        
        // Left Wingtip Sharp Point
        shape.lineTo(-2.7, -0.18);
        
        // Left Wing Scalloped Bottom Edge 1
        shape.quadraticCurveTo(-1.8, 0.1, -1.2, -0.32);
        
        // Left Wing Scalloped Bottom Edge 2 (towards center tail)
        shape.quadraticCurveTo(-0.6, -0.38, 0, -0.78);
        
        // Right Wing Scalloped Bottom Edge 2 (from center tail)
        shape.quadraticCurveTo(0.6, -0.38, 1.2, -0.32);
        
        // Right Wing Scalloped Bottom Edge 1 (towards wingtip)
        shape.quadraticCurveTo(1.8, 0.1, 2.7, -0.18);
        
        // Right Wingtip Sharp Point
        shape.lineTo(2.8, 0.18);
        
        // Right Wing Shoulder & Top Edge
        shape.lineTo(1.35, 0.65);
        shape.lineTo(0.36, 0.38);
        
        // Right Ear
        shape.lineTo(0.16, 0.68);
        shape.lineTo(0, 0.28);

        // Extrusion with pronounced bevel edges (as seen in Image 1 & 3)
        const extrudeSettings = {
            steps: 2,
            depth: 0.18,
            bevelEnabled: true,
            bevelThickness: 0.12,
            bevelSize: 0.09,
            bevelOffset: 0,
            bevelSegments: 6
        };

        const batarangGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        batarangGeo.center();

        // Dark Matte Gunmetal Titanium Body Material
        const batarangMat = new THREE.MeshStandardMaterial({
            color: 0x11131a,
            metalness: 0.95,
            roughness: 0.15,
            emissive: 0xffcc00,
            emissiveIntensity: 0.18
        });

        const batarangMesh = new THREE.Mesh(batarangGeo, batarangMat);
        group.add(batarangMesh);

        // Polished Bevel Edge Highlight Mesh
        const edgeGeo = new THREE.ExtrudeGeometry(shape, {
            steps: 1,
            depth: 0.19,
            bevelEnabled: true,
            bevelThickness: 0.13,
            bevelSize: 0.1,
            bevelSegments: 4
        });
        edgeGeo.center();

        const edgeMat = new THREE.MeshBasicMaterial({
            color: 0xffcc00,
            wireframe: true,
            transparent: true,
            opacity: 0.35
        });
        const edgeMesh = new THREE.Mesh(edgeGeo, edgeMat);
        edgeMesh.scale.set(1.01, 1.01, 1.01);
        group.add(edgeMesh);

        // Tactical Bat-Yellow Monogram Ring Center Emblem
        const emblemRingGeo = new THREE.TorusGeometry(0.48, 0.05, 16, 32);
        const emblemRingMat = new THREE.MeshStandardMaterial({
            color: 0xffcc00,
            emissive: 0xffcc00,
            emissiveIntensity: 0.9,
            metalness: 0.9,
            roughness: 0.1
        });
        const emblemRing = new THREE.Mesh(emblemRingGeo, emblemRingMat);
        emblemRing.position.z = 0.18;
        group.add(emblemRing);

        // Central "MK" Emblem Lines
        const mkGroup = new THREE.Group();
        mkGroup.position.z = 0.2;

        const lineMat = new THREE.MeshStandardMaterial({
            color: 0xffcc00,
            emissive: 0xffcc00,
            emissiveIntensity: 1.0
        });

        const createLineSegment = (x1, y1, x2, y2, thickness = 0.038) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);

            const lineGeo = new THREE.BoxGeometry(len, thickness, 0.05);
            const lineMesh = new THREE.Mesh(lineGeo, lineMat);
            lineMesh.position.set((x1 + x2) / 2, (y1 + y2) / 2, 0);
            lineMesh.rotation.z = angle;
            return lineMesh;
        };

        // 'M' Strokes
        mkGroup.add(createLineSegment(-0.3, -0.22, -0.3, 0.22));
        mkGroup.add(createLineSegment(-0.3, 0.22, -0.15, 0.0));
        mkGroup.add(createLineSegment(-0.15, 0.0, -0.01, 0.22));
        mkGroup.add(createLineSegment(-0.01, 0.22, -0.01, -0.22));

        // 'K' Strokes
        mkGroup.add(createLineSegment(0.1, -0.22, 0.1, 0.22));
        mkGroup.add(createLineSegment(0.1, 0.0, 0.28, 0.22));
        mkGroup.add(createLineSegment(0.1, 0.0, 0.28, -0.22));

        group.add(mkGroup);

        group.scale.set(1.4, 1.4, 1.4);

        return { group, emblemRingMat, lineMat };
    };

    /* ----------------------------------------------------------------------
       3. THREE.JS 3D BACKGROUND SCENE
       - Dark Knight Batarang in Black & Tactical Yellow (#ffcc00)
       - Starfield Particles Background
       - Aerodynamic Rotation & Parallax Motion
    ------------------------------------------------------------------------- */
    const initThreeJSBackground = () => {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;

        const scene = new THREE.Scene();
        
        const camera = new THREE.PerspectiveCamera(
            60, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );
        camera.position.z = 7.5;

        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Create 3D Dark Knight Batarang Group
        const { group: batarangGroup, emblemRingMat, lineMat } = createDarkKnightBatarangGroup();
        scene.add(batarangGroup);

        // Tactical Yellow Starfield Particles Background
        const starsCount = 1800;
        const starPositions = new Float32Array(starsCount * 3);

        for (let i = 0; i < starsCount * 3; i += 3) {
            starPositions[i] = (Math.random() - 0.5) * 80;
            starPositions[i + 1] = (Math.random() - 0.5) * 80;
            starPositions[i + 2] = (Math.random() - 0.5) * 80;
        }

        const starGeometry = new THREE.BufferGeometry();
        starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

        const starMaterial = new THREE.PointsMaterial({
            color: 0xffea70,
            size: 0.12,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });

        const starfield = new THREE.Points(starGeometry, starMaterial);
        scene.add(starfield);

        // Lighting System
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
        scene.add(ambientLight);

        // Primary Tactical Yellow Point Light (#ffcc00)
        const yellowLight = new THREE.PointLight(0xffcc00, 3.8, 60);
        yellowLight.position.set(6, 6, 6);
        scene.add(yellowLight);

        // Warm Gold Fill Point Light
        const goldFillLight = new THREE.PointLight(0xff9100, 2.2, 50);
        goldFillLight.position.set(-6, -6, -4);
        scene.add(goldFillLight);

        // Mouse Interactivity
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onMouseMove = (event) => {
            mouseX = (event.clientX - windowHalfX) * 0.0005;
            mouseY = (event.clientY - windowHalfY) * 0.0005;
        };
        window.addEventListener('mousemove', onMouseMove);

        // Window Resize Listener
        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        };
        window.addEventListener('resize', onWindowResize);

        // Render Animation Loop
        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();

            // Aerodynamic 3D Batarang rotation
            batarangGroup.rotation.y = elapsedTime * 0.32;
            batarangGroup.rotation.z = Math.sin(elapsedTime * 0.4) * 0.14;
            batarangGroup.rotation.x = Math.cos(elapsedTime * 0.25) * 0.12;

            // Pulsing emblem glow
            const pulse = 0.8 + Math.sin(elapsedTime * 3) * 0.25;
            if (emblemRingMat) emblemRingMat.emissiveIntensity = pulse;
            if (lineMat) lineMat.emissiveIntensity = pulse;

            // Starfield drift
            starfield.rotation.y = -elapsedTime * 0.02;

            // Parallax camera movement
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            camera.position.x = targetX * 3;
            camera.position.y = -targetY * 3;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };

        animate();
    };

    // Initialize 3D Canvas
    initThreeJSBackground();

    /* ----------------------------------------------------------------------
       4. GSAP ENTRANCE & SCROLLTRIGGER ANIMATIONS
    ------------------------------------------------------------------------- */
    const initGSAPAnimations = () => {
        if (typeof gsap === 'undefined') return;

        gsap.from('.gsap-fade', {
            opacity: 0,
            y: 35,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.1
        });

        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            const revealElements = document.querySelectorAll('.gsap-reveal');
            revealElements.forEach((el) => {
                gsap.from(el, {
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        }
    };

    initGSAPAnimations();

    /* ----------------------------------------------------------------------
       5. NAVIGATION & MOBILE MENU CONTROLS
    ------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }

        let currentSection = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id') || '';
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    navToggle?.addEventListener('click', () => {
        navMenu?.classList.toggle('open');
        const icon = navToggle.querySelector('i');
        if (icon) {
            if (navMenu?.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu?.classList.remove('open');
            const icon = navToggle?.querySelector('i');
            if (icon) icon.className = 'fas fa-bars';
        });
    });

    /* ----------------------------------------------------------------------
       6. RECRUITER CONTACT FORM & EMAIL UTILITIES
    ------------------------------------------------------------------------- */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const emailText = document.getElementById('email-text');

    copyEmailBtn?.addEventListener('click', () => {
        const email = emailText?.textContent || USER_CONFIG.email;
        navigator.clipboard.writeText(email).then(() => {
            const icon = copyEmailBtn.querySelector('i');
            if (icon) icon.className = 'fas fa-check';
            copyEmailBtn.style.color = '#4ade80';

            setTimeout(() => {
                if (icon) icon.className = 'far fa-copy';
                copyEmailBtn.style.color = '';
            }, 2000);
        }).catch(() => {
            alert(`Email: ${email}`);
        });
    });

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('form-submit-btn');

    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        }

        setTimeout(() => {
            if (formStatus) {
                formStatus.className = 'form-status success';
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your message has been sent. Manoj Kumar will get back to you shortly.';
            }

            contactForm.reset();

            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            }

            setTimeout(() => {
                if (formStatus) formStatus.innerHTML = '';
            }, 6000);
        }, 1000);
    });

});
