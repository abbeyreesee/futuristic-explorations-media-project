let currentAudio = null;
let isAudioPlaying = false;
document.addEventListener("DOMContentLoaded", () => {
  const expandButtons = document.querySelectorAll(".expand-btn");
  const expandedPanel = document.querySelector(".expanded-panel");
  const closeButton = document.querySelector(".close-btn");

  const panelContent = {
    architecture: {
      title: "Architecture & Infrastructure",
      text: [
       ["AI-Optimized Cities", "Amazon’s advancements in AI and logistics led to urban planning dictated by real-time efficiency models. Smart cities are structured to optimize supply chains, data flows, and energy consumption."],
       ["Hyper-Automated Warehouses & Residences", "With fulfillment centers integrated into skyscrapers, urban warehouses have become automated hubs embedded in residential and commercial spaces. Drone highways and underground tunnels enable near-instant delivery of goods and services."],
	   ["Retail Space Reinvented", "Traditional stores vanish as Amazon’s ‘Just Walk Out’ technology and ultra-personalized AR/VR shopping create immersive, AI-driven experiences. Physical shopping has become a niche luxury experience."],
       ["Personalized Smart Homes", "Houses embedded with Amazon AI (Alexa-like systems evolved into full-fledged personal assistants) will anticipate and fulfill needs before users even voice them. Homes will structurally support the automated delivery services allowing for items to drop right into your home."]
      ],
      media: ["assets/1.4.mp4", "assets/1.5.mp4", "assets/1.8.mp4", "assets/1.10.mp4","assets/1.6.mp4", "assets/1.7.mp4", "assets/1.1.mp4", "assets/1.2.mp4"],
      audio: "assets/vo1.mp3"
    },
    politics: {
      title: "Politics & Governance",
      text: [
        ["Regulation of Megacorporations", "As Amazon’s ecosystem expands, governments struggle to regulate its power. It functions as a quasi-government entity, issuing its own currency, providing security (automated surveillance drones), and even offering universal basic income through employment in its AI-run systems."],
	    ["Privatization of Public Services", "Amazon’s logistics, data, and AI infrastructure led governments to outsource public transport, healthcare, and emergency response to Amazon’s autonomous systems."], 
        ["AI-Legislated Policies", "Amazon’s AI, given its influence over economic and logistical decisions, is integrated into governance for decision-making on urban planning, disaster response, and trade regulation."]
      ],
      media: ["assets/2.1.mp4", "assets/2.2.mp4", "assets/2.3.mp4", "assets/2.4.mp4", "assets/2.5.mp4"],
      audio: "assets/vol2.mp3"
    },
    economy: {
      title: "Economy & Labor",
      text: [
        ["End of Traditional Employment", "With full automation of warehouses, transportation, and digital labor, Amazon’s role in universal automation-driven income (UDI) replaces traditional wages, allowing people to focus on creative, scientific, or leisure pursuits."],
        ["Decentralized Commerce", "Amazon’s ecosystem will extend into personal AI-driven trade networks, where individuals use Amazon AI agents to produce and sell digital goods in a post-scarcity economy driven by AI creativity."],
        ["Amazon-Run Smart Contracts", "Blockchain-based automated contracts replace traditional employment and business deals, allowing frictionless, AI-mediated global transactions."],
        ["Automated Corporations", "AI-driven enterprises will emerge, requiring no human oversight. Amazon pioneers the first fully AI-operated mega-corporation."]
      ],
      media: ["assets/3.1.mp4", "assets/3.2.mp4", "assets/3.3.mp4", "assets/3.4.mp4", "assets/3.5.mp4", "assets/3.6.mp4"],
      audio: "assets/vol3.mp3"
    },
    social: {
      title: "Social & Cultural Relations",
      text: [
        ["Hyper-Personalized AI Companionship", "Amazon’s AI will evolve into sentient-level personal assistants, forming deep relationships with people, replacing traditional customer service, companionship, and even elements of social interaction."],
        ["Metaverse Dominance", "Amazon controls a vast, AI-generated metaverse economy where digital and real-world commerce blur. People may live primarily in virtual environments where they “buy” experiences rather than physical goods."],
        ["Culture Shaped by Algorithms", "With Amazon’s dominance in streaming, publishing, and AI-generated content, human creativity has become algorithmically optimized, making it difficult to distinguish human-made art from AI-driven narratives."],
        ["Work-Free Society", "With labor largely automated, Amazon’s influence in digital entertainment, AI-based education, and personalized experiences defines a new leisure-based civilization, where people focus on self-actualization rather than productivity."]
      ],
      media: ["assets/4.1.mp4", "assets/4.2.mp4", "assets/4.3.mp4", "assets/4.4.mp4", "assets/4.5.mp4", "assets/4.6.mp4", "assets/4.7.mp4"],
      audio: "assets/vol4.mp3"
    },
    medicine: {
      title: "Medicine & Biotechnology",
      text: [
        ["Predictive Healthcare", "Amazon’s AI and biometric monitoring systems detect and cure diseases before symptoms arise, integrating medical insights into everyday life through wearables and nanotech."],
        ["Biotech-Driven Longevity", "With Amazon’s vast research in AI and cloud-based bioinformatics, it funds and commercializes anti-aging treatments or genetic enhancements for extending human life."],
        ["Automated, AI-Run Hospitals", "AI-operated robotic surgeons and autonomous hospital logistics replace traditional healthcare infrastructure, reducing the need for human medical professionals."],
        ["Subscription-Based Healthcare", "Amazon offers on-demand, AI-driven medical treatments as part of a Prime-like subscription, dynamically adjusting treatments based on a user’s health history."]
      ],
      media: ["assets/5.6.mp4", "assets/5.5.mp4", "assets/5.1.mp4", "assets/5.4.mp4", "assets/5.7.mp4", "assets/5.3.mp4", "assets/5.2.mp4"],
      audio: "assets/vol5.mp3"
    }
  };

  const titleEl = document.querySelector(".expanded-title");
  const columnsEl = document.querySelector(".expanded-columns");
  const mediaScroll = document.querySelector(".media-scroll");
  const audioBtn = document.querySelector(".audio-btn");
  const audioLabel = document.querySelector(".audio-label");

  let currentMediaIndex = 0;

  expandButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-category");
      const content = panelContent[category];
      if (!content) return;

      titleEl.textContent = content.title;
      // columnsEl.innerHTML = content.text.map(p => `<p>${p}</p>`).join("");
      columnsEl.innerHTML = `
        <ul>
        ${content.text.slice(0, Math.ceil(content.text.length / 2)).map(([subtitle, desc]) => `
            <li>
            <span class="subtitle"><strong><em>${subtitle}</em></strong></span>
            ${desc}
            </li>
        `).join("")}
        </ul>
        <ul>
        ${content.text.slice(Math.ceil(content.text.length / 2)).map(([subtitle, desc]) => `
            <li>
            <span class="subtitle"><strong><em>${subtitle}</em></strong></span>
            ${desc}
            </li>
        `).join("")}
        </ul>
        `;

      mediaScroll.innerHTML = content.media
        .map((src, i) => {
          const isVideo = src.endsWith(".mp4");
          return isVideo
            ? `<video class="media-item" src="${src}" muted autoplay loop playsinline style="display:${i === 0 ? 'block' : 'none'};"></video>`
            //? `<video class="media-item" src="${src}" controls style="display:${i === 0 ? 'block' : 'none'};"></video>`
            : `<img class="media-item" src="${src}" alt="Media" style="display:${i === 0 ? 'block' : 'none'};">`;
        })
        .join("");

      const mediaItems = mediaScroll.querySelectorAll(".media-item");
      currentMediaIndex = 0;

      const updateVisibleMedia = () => {
        mediaItems.forEach((el, idx) => {
          const isCurrent = idx === currentMediaIndex;
          el.style.display = isCurrent ? "block" : "none";

          if (el.tagName === "VIDEO") {
            if (isCurrent) {
              el.play().catch(() => {});
            } else {
              el.pause();
              el.currentTime = 0;
            }
          }
        });
      };

      document.querySelector(".left-arrow").onclick = () => {
        currentMediaIndex = (currentMediaIndex - 1 + mediaItems.length) % mediaItems.length;
        updateVisibleMedia();
      };

      document.querySelector(".right-arrow").onclick = () => {
        currentMediaIndex = (currentMediaIndex + 1) % mediaItems.length;
        updateVisibleMedia();
      };

      // Set up audio button with toggle play/pause logic
      // Reset audio state and icon
      const audioIcon = audioBtn.querySelector("img");
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
      currentAudio = null;
      isAudioPlaying = false;
      audioIcon.src = "assets/audio-icon.png";

      audioBtn.onclick = () => {
        const audioIcon = audioBtn.querySelector("img");

        if (isAudioPlaying) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
          audioIcon.src = "assets/audio-icon.png"; // play icon
          isAudioPlaying = false;
        } else {
          if (!currentAudio) {
            currentAudio = new Audio(content.audio);
          } else {
            currentAudio.currentTime = 0;
          }
          currentAudio.play();
          audioIcon.src = "assets/pause-icon.png"; // pause icon
          isAudioPlaying = true;

          currentAudio.onended = () => {
            audioIcon.src = "assets/audio-icon.png";
            isAudioPlaying = false;
          };
        }
      };

      expandedPanel.classList.remove("hidden");
    });
  });

  closeButton.addEventListener("click", () => {
    expandedPanel.classList.add("hidden");
    // Stop and reset audio when panel closes
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    isAudioPlaying = false;
    const audioIcon = audioBtn.querySelector("img");
    if (audioIcon) audioIcon.src = "assets/audio-icon.png";
    currentAudio = null;
  });
});
