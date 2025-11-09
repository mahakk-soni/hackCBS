document.addEventListener("DOMContentLoaded", () => {
    // 💡 Detailed Data Source (Keeping this data structure as it's excellent)
    const problemsData = [
        {
            title: "AI-powered waste sorting system",
            desc: "The problem of inefficient manual sorting leads to contamination and low recycling rates. An AI vision system needs to quickly and accurately identify materials, reducing human error and boosting throughput.", // 30-40 words
            idea: "Develop a low-cost, modular AI system using convolutional neural networks (CNNs) trained on vast image datasets to recognize complex waste materials, enabling high-speed pneumatic or robotic sorting in existing facilities.", // 50-60 words
            research: [
                "**Existing:** Balyo robots and AMP Robotics offer commercial solutions, proving feasibility but often requiring high capital investment.",
                "**Under Development:** Open-source AI models are being refined for greater precision with materials like multi-layer plastics and textiles.",
                "**Related Ideas:** Decentralized, household-level smart bins that pre-sort waste at the source."
            ],
            roadmap: "Phase 1 (6 months): Train and test CNN model for 5 core material types. Phase 2 (12 months): Build and integrate low-cost hardware module. Phase 3 (18 months): Pilot program in a small city facility.",
            img_src: "https://picsum.photos/seed/waste-sort/300/200"
        },
        {
            title: "Smart irrigation system for farmers",
            desc: "Water scarcity and high operational costs challenge farming sustainability. Traditional irrigation systems often overwater, wasting resources and energy. A smart system must optimize water delivery based on real-time needs.",
            idea: "A wireless network of soil moisture sensors, weather API integration, and AI-driven control valves to adjust water application rates precisely, minimizing consumption and maximizing yield efficiency for various crop types.",
            research: [
                "**Existing:** Companies like CropX and Teralytic use sensor probes, but integration complexity and battery life limit small farm adoption.",
                "**Under Development:** Drone-based spectral analysis is being integrated to monitor plant stress and refine water schedules dynamically.",
                "**Related Ideas:** Utilizing rainwater harvesting and moisture retention polymers in drought-prone regions."
            ],
            roadmap: "Phase 1: Sensor selection and network protocol design. Phase 2: Develop cloud-based data platform. Phase 3: Field tests across diverse climates and soil conditions.",
            img_src: "https://picsum.photos/seed/irrigation/300/200"
        },
        {
            title: "Blockchain-based student credential system",
            desc: "Verifying educational achievements is slow and costly, and often prone to fraud. A decentralized system offers an immutable, secure record that gives students full control over sharing their academic history globally and instantly.",
            idea: "Create a private, permissioned blockchain network where educational institutions issue secure, tamper-proof digital certificates (NFTs) that students own and can share instantly with employers or other schools via cryptographic keys.",
            research: [
                "**Existing:** MIT's Blockcerts and various government initiatives are exploring digital credential issuance, facing regulatory hurdles.",
                "**Under Development:** Standardization of metadata and cross-chain compatibility for global academic recognition.",
                "**Related Ideas:** Digital wallets for storing academic and professional records alongside decentralized identity solutions."
            ],
            roadmap: "Phase 1: Blockchain platform selection (e.g., Ethereum or Hyperledger Fabric) and smart contract development. Phase 2: Pilot with three major universities. Phase 3: Develop standard API for employer verification.",
            img_src: "https://picsum.photos/seed/blockchain-cert/300/200"
        },
        {
            title: "Affordable clean water purifier",
            desc: "Millions lack access to safe drinking water, leading to widespread disease. Existing purification systems are often too expensive, require complex maintenance, or rely on unreliable energy sources, necessitating a low-cost, robust solution.",
            idea: "A portable, passive solar-thermal disinfection unit that utilizes widely available materials and requires zero electrical input. The design focuses on high efficiency and easy filter replacement using natural, local resources like sand and carbon.",
            research: [
                "**Existing:** SODIS (Solar Water Disinfection) is simple but slow. Advanced membrane filtration is effective but costly.",
                "**Under Development:** Graphene oxide membranes and various point-of-use systems optimized for resource-limited settings.",
                "**Related Ideas:** Community-scale filtration systems powered by micro-hydro or small solar arrays."
            ],
            roadmap: "Phase 1: Prototype design and material sourcing. Phase 2: Efficacy testing against common pathogens in a lab. Phase 3: Field deployment and user feedback in two remote villages.",
            img_src: "https://picsum.photos/seed/water-purifier/300/200"
        },
        {
            title: "IoT-based traffic congestion monitor",
            desc: "Urban traffic gridlock wastes countless hours and fuel, and contributes to air pollution. Current monitoring methods are expensive and lack real-time granularity needed for proactive signal adjustments and commuter routing.",
            idea: "Deploy low-power, inexpensive IoT acoustic and visual sensors at key intersections. These sensors analyze ambient noise and basic flow patterns, sending compressed, anonymized data to a central cloud for rapid congestion modeling and alert dissemination.",
            research: [
                "**Existing:** Loop detectors and camera systems are standard but suffer from high installation and maintenance costs.",
                "**Under Development:** AI-based predictive modeling that anticipates congestion 30 minutes in advance based on event schedules and historical data.",
                "**Related Ideas:** Integration with ride-sharing and public transit data to dynamically shift resource allocation."
            ],
            roadmap: "Phase 1: Sensor hardware and firmware development. Phase 2: Cloud platform and predictive algorithm creation. Phase 3: Pilot on a medium-sized urban commuter corridor.",
            img_src: "https://picsum.photos/seed/iot-traffic/300/200"
        },
        {
            title: "Green packaging solution for e-commerce",
            desc: "The e-commerce boom generates vast amounts of non-recyclable, single-use plastic and bulky packaging. Consumers demand sustainable options, driving the need for materials that are lightweight, durable, and truly compostable.",
            idea: "Create a fungi-based (mycelium) packaging foam grown using agricultural waste. This material is strong enough for shipping, compostable in backyard conditions, and can be customized to fit various product shapes, eliminating void fill.",
            research: [
                "**Existing:** Biodegradable plastics often require industrial composting. Recycled cardboard is common but less protective than foam.",
                "**Under Development:** Edible packaging films and dissolving polymer packaging that safely breaks down in water.",
                "**Related Ideas:** Standardized reusable shipping containers incentivized through deposit schemes."
            ],
            roadmap: "Phase 1: Optimize mycelium growth parameters for strength and density. Phase 2: Develop scalable molding and drying processes. Phase 3: Partner with a major e-commerce distributor for stress testing and consumer feedback.",
            img_src: "https://picsum.photos/seed/eco-package/300/200"
        },
        {
            title: "Remote health diagnostics for rural areas",
            desc: "Geographic distance and lack of infrastructure prevent millions in rural communities from accessing timely medical care and early diagnosis. Solutions must be rugged, battery-powered, and simple enough for non-specialist use.",
            idea: "A handheld, multi-diagnostic device (MDD) that integrates blood pressure, temperature, ECG, and basic blood chemistry analysis. Data is transmitted via standard cellular networks to a central specialist for immediate remote review and triage.",
            research: [
                "**Existing:** Telehealth apps exist but rely on local diagnostic input. Dedicated diagnostic devices are often too expensive or complex.",
                "**Under Development:** AI-assisted diagnosis based on images taken by simple smartphone cameras (e.g., skin conditions or retinal issues).",
                "**Related Ideas:** Mobile diagnostic clinics utilizing solar power and satellite internet for truly isolated communities."
            ],
            roadmap: "Phase 1: MDD prototype hardware and secure data encryption system development. Phase 2: Clinical trials in partnership with a university hospital's rural outreach program. Phase 3: Regulatory approval and training materials deployment.",
            img_src: "https://picsum.photos/seed/telehealth/300/200"
        },
        {
            title: "Energy-efficient cooling technology",
            desc: "Global temperatures are rising, increasing reliance on conventional AC, which consumes enormous amounts of electricity and uses refrigerants with high global warming potential (GWP). We need sustainable, low-power cooling alternatives.",
            idea: "A novel solid-state thermoelectrical cooling system using advanced nanomaterials instead of vapor compression. The system harvests waste heat and uses minimal electricity to provide localized, silent cooling for individual rooms or specialized equipment.",
            research: [
                "**Existing:** Evaporative coolers are energy efficient but only work in dry climates. Traditional AC dominates the market.",
                "**Under Development:** Magnetocaloric and elastocaloric cooling systems are being explored, though material scalability remains a challenge.",
                "**Related Ideas:** Passive cooling architectural designs that use natural airflow, shading, and thermal mass."
            ],
            roadmap: "Phase 1: Optimize nanomaterial synthesis for maximum Peltier effect. Phase 2: Build and test a prototype cooling module against a standard AC unit. Phase 3: Integrate module into consumer or industrial cooling products.",
            img_src: "https://picsum.photos/seed/passive-cool/300/200"
        },
        {
            title: "Digital platform for small artisans",
            desc: "Small-scale artisans struggle to reach global markets due to high e-commerce platform fees, complex logistics, and difficulty establishing digital trust. Their unique products deserve a more equitable and accessible marketplace.",
            idea: "A cooperative, decentralized e-commerce platform (DAO) where fees are minimal and governance is shared among members. The platform offers multilingual support and streamlined logistics integration, focusing on authenticity and ethical sourcing via verifiable tags.",
            research: [
                "**Existing:** Etsy, Amazon Handmade, and local craft marketplaces exist, but often take large commissions (20%+).",
                "**Under Development:** VR/AR tools for virtual craft exhibitions and personalized shopping experiences.",
                "**Related Ideas:** Micro-lending platforms dedicated to funding small artisan operations and sourcing materials sustainably.",
            ],
            roadmap: "Phase 1: Platform infrastructure and smart contract development for fee distribution. Phase 2: Onboard 50 artisans from 5 countries and test logistics. Phase 3: Launch community governance structure.",
            img_src: "https://picsum.photos/seed/artisan-platform/300/200"
        },
        {
            title: "Decentralized energy grid", // 10th problem
            desc: "Reliance on centralized power plants creates single points of failure, increasing grid vulnerability to natural disasters and cyberattacks. A decentralized grid enhances resilience and enables greater integration of renewable sources.",
            idea: "Implement a microgrid network utilizing blockchain for transparent energy trading between prosumers (producers/consumers). This creates a self-healing grid that automatically reroutes power during localized outages and optimizes neighborhood energy flow.",
            research: [
                "**Existing:** Local utility microgrids are growing, often government-backed, but inter-utility energy sharing is complex.",
                "**Under Development:** Smart inverters and automated peer-to-peer energy market platforms are being trialed in test cities.",
                "**Related Ideas:** Advanced residential battery storage linked to AI prediction models for peak demand shifting.",
            ],
            roadmap: "Phase 1: Develop smart contracts for energy tokenization and trading. Phase 2: Pilot microgrid integration in a planned community with existing solar installations. Phase 3: Standardize protocol for utility interconnection and billing.",
            img_src: "https://picsum.photos/seed/microgrid-solar/300/200"
        }
    ];

    // Store the entire data object in localStorage once at initialization.
    // This allows the detail page to access all data, not just the selected item.
    localStorage.setItem('problemsData', JSON.stringify(problemsData));

    // --- DOM Elements ---
    const cardElements = document.querySelectorAll(".card"); 
    const cardImageElements = document.querySelectorAll(".card-image-placeholder img"); // Get the image tags
    const cardInfoElements = document.querySelectorAll(".card-info");
    const searchInput = document.querySelector(".search-bar input");
    const nextButton = document.getElementById("next");
    const prevButton = document.getElementById("prev");
    
    // --- State Variables ---
    let currentIndex = 0;
    let currentProblems = problemsData;
    let autoSlideInterval;

    // --- Core Function: Navigate to Detail Page ---
    function navigateToDetailPage(problem) {
        // 1. Store the selected problem's data
        localStorage.setItem('selectedProblem', JSON.stringify(problem));
        
        // 2. Redirect the user to the detail page HTML file
        // IMPORTANT: Ensure your second page is named 'detail-page.html'
        window.location.href = 'detail-page.html'; 
    }

    // --- Display Management ---

    function renderCards() {
        const problemsToDisplay = currentProblems.length;
        
        for (let i = 0; i < cardElements.length; i++) {
            const card = cardElements[i];
            const cardInfo = cardInfoElements[i];
            const cardImage = cardImageElements[i];

            const problemIndex = currentIndex + i;

            if (problemIndex < problemsToDisplay) {
                const problem = currentProblems[problemIndex];

                // Update text content
                cardInfo.textContent = problem.title;

                // Update image source
                cardImage.src = problem.img_src;
                cardImage.alt = problem.title + ' image';

                // Show the card
                card.style.display = 'flex'; // Use the flex property set in CSS
                card.classList.remove('hidden-card');
                
                // Attach click event to navigate (using the data structure)
                // We pass the entire problem object for clean data transmission.
                card.onclick = () => navigateToDetailPage(problem);

            } else {
                // Hide the card
                cardInfo.textContent = ''; 
                cardImage.src = '';
                cardImage.alt = '';
                card.style.display = 'none';
                card.classList.add('hidden-card');
                card.onclick = null; // Remove handler
            }
        }

        // Update navigation buttons based on current state
        if (prevButton) prevButton.disabled = currentIndex === 0;
        if (nextButton) nextButton.disabled = currentIndex + cardElements.length >= problemsToDisplay;
    }

    function setNavigationState(enabled) {
        if (nextButton) nextButton.disabled = !enabled || (currentIndex + cardElements.length >= currentProblems.length);
        if (prevButton) prevButton.disabled = !enabled || (currentIndex === 0);
        // Search bar should be enabled in the main view
        if (searchInput) searchInput.disabled = !enabled; 
    }

    // --- Carousel & Filter Logic (Keeping your original logic for flow control) ---

    function startAutoSlide() {
        if (!autoSlideInterval && searchInput.value.trim() === '') {
            autoSlideInterval = setInterval(nextSlide, 6000);
            setNavigationState(true);
        }
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
            autoSlideInterval = null; 
        }
    }

    function nextSlide() {
        // If we can show the next set of cards
        if (currentIndex + 1 < currentProblems.length) {
            currentIndex++;
        } else {
            // Loop back to the start if at the end of the filtered list
            currentIndex = 0;
        }
        renderCards();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            // Loop to the end if at the start
            currentIndex = Math.max(0, currentProblems.length - cardElements.length);
        }
        renderCards();
    }

    function handleSearch(keyword) {
        currentIndex = 0; 
        const trimmedKeyword = keyword.toLowerCase().trim();

        if (trimmedKeyword.length > 0) {
            stopAutoSlide(); 
            // Filter the full dataset by title or description
            currentProblems = problemsData.filter(p => 
                p.title.toLowerCase().includes(trimmedKeyword) || 
                p.desc.toLowerCase().includes(trimmedKeyword) ||
                p.idea.toLowerCase().includes(trimmedKeyword)
            );

            if (currentProblems.length === 0) {
                // Display a clear "No results" message
                currentProblems = [{ 
                    title: "No matches found.", 
                    desc: "Try broader keywords or browse the full list.", 
                    idea: "", 
                    research: [], 
                    roadmap: "", 
                    img_src: "" 
                }]; 
            }
        } else {
            currentProblems = problemsData;
            startAutoSlide(); 
        }
        
        renderCards();
    }

    // --- Event Listeners ---
    if (nextButton) nextButton.addEventListener("click", nextSlide);
    if (prevButton) prevButton.addEventListener("click", prevSlide);

    // Event listener for the ENTER key press or search button click
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSearch(e.target.value);
            searchInput.blur();
        }
    });

    // Event listener to reset if the user manually clears the search field
    searchInput.addEventListener("input", (e) => {
        const keyword = e.target.value.trim();
        if (keyword.length === 0) {
            handleSearch(""); 
        } else {
            stopAutoSlide(); // Stop auto-slide as soon as they start typing
        }
    });

    // --- Initialization ---
    renderCards();
    startAutoSlide();
});