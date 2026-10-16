/**
 * UHMC Business Department - Ka Lama Interactive Touchscreen Kiosk
 * Client-side Controller & Data Store
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- STATE MANAGEMENT ---
  const state = {
    currentView: 'view-home',
    idleSecondsRemaining: 60,
    idleThreshold: 60,
    isIdle: false,
    activeFloor: 1,
    selectedProgram: 'abit',
    selectedJobCategory: 'all',
    surveyVotes: {
      events: 48,
      mentorship: 36,
      study: 52,
      workshops: 41,
      sports: 22
    }
  };

  // Check LocalStorage for saved survey votes if any
  const savedVotes = localStorage.getItem('uhmc_kiosk_survey_votes');
  if (savedVotes) {
    try {
      state.surveyVotes = JSON.parse(savedVotes);
    } catch (e) {
      console.warn('Could not parse saved votes', e);
    }
  }

  // --- MOCK DATA: ACADEMIC PROGRAMS ---
  const programsData = {
    abit: {
      name: "Applied Business & Information Technology (ABIT)",
      degree: "Bachelor of Applied Science (BAS)",
      description: "A premier four-year degree that fuses business administration, entrepreneurship, software development, cybersecurity, and data analysis. Tailored specifically to build high-earning leaders for Hawaii's digital economy.",
      highlights: [
        "Four-year accredited Bachelor of Applied Science degree right on Maui",
        "Curriculum combines core business finance with software development & web technologies",
        "Includes a comprehensive senior capstone project building a real business or tech venture",
        "Prepares students for management, tech consulting, and tech entrepreneurship"
      ],
      careers: "Systems Analyst, Business Tech Consultant, Project Manager, Web Developer, Entrepreneur",
      coordinator: "Debasis Bhattacharya, J.D., D.B.A.",
      office: "Ka Lama 202 (2nd Floor Tech Hub)"
    },
    business: {
      name: "Business Administration",
      degree: "Associate in Applied Science (AAS) & Transfer Options",
      description: "Develops foundational expertise in management, marketing, business law, ethics, and operations. Designed for students seeking immediate employment in island enterprises or transferring toward a 4-year degree.",
      highlights: [
        "Hands-on coursework in practical marketing, management, and small business ops",
        "Direct articulation pathways to UH West Oʻahu & UH Mānoa Shidler College of Business",
        "Active student business club with guest speakers and business competitions",
        "Flexible hybrid and evening course schedules for working students"
      ],
      careers: "Small Business Manager, Marketing Specialist, Sales Executive, Operations Supervisor",
      coordinator: "Business Department Faculty",
      office: "Ka Lama 203 (2nd Floor Faculty Offices)"
    },
    hospitality: {
      name: "Hospitality & Tourism (HOST)",
      degree: "Associate in Science (AS) & Certificates",
      description: "Prepares students for rewarding leadership and supervisory positions within Maui's world-renowned hospitality, resort, travel, and guest services industry with real island hospitality values.",
      highlights: [
        "Industry-endorsed curriculum co-designed with top Maui resort and hotel leaders",
        "Guaranteed internship and practicum placements at luxury island properties",
        "Focus on Hawaiian culture, guest relations, revenue management, and event hosting",
        "Certificates of Achievement stackable into full associate and bachelor degrees"
      ],
      careers: "Guest Services Manager, Resort Operations Lead, Event Coordinator, Concierge Director",
      coordinator: "HOST Program Coordinator",
      office: "Ka Lama 204 (2nd Floor Hospitality Wing)"
    },
    accounting: {
      name: "Accounting Program",
      degree: "Associate in Applied Science (AAS) & Certificates",
      description: "Provides comprehensive technical training in financial accounting, managerial accounting, computer applications (QuickBooks, Excel), payroll, and taxation.",
      highlights: [
        "Master industry-standard bookkeeping and tax software suites",
        "Preparation for national certifications and Hawaii state accounting positions",
        "Free VITA (Volunteer Income Tax Assistance) clinic run by students annually",
        "High demand across private, public, and non-profit sectors on Maui"
      ],
      careers: "Staff Accountant, Bookkeeper, Payroll Specialist, Tax Preparer, Auditing Assistant",
      coordinator: "Accounting Faculty Advisor",
      office: "Ka Lama 203 (2nd Floor Faculty Offices)"
    }
  };

  // --- MOCK DATA: KA LAMA DIRECTORY ---
  const directoryData = [
    // 1st Floor
    { floor: 1, room: "KL-101", name: "Lecture Hall & Classroom", category: "Classroom", desc: "Main multimedia classroom for business lectures and presentations.", x: 40, y: 35, w: 90, h: 60 },
    { floor: 1, room: "KL-102", name: "Active Learning Classroom", category: "Classroom", desc: "Collaborative pods for team projects and case studies.", x: 145, y: 35, w: 90, h: 60 },
    { floor: 1, room: "KL-103", name: "Student Study Lounge", category: "Common Area", desc: "Comfortable seating, charging stations, and group study area.", x: 250, y: 35, w: 100, h: 60 },
    { floor: 1, room: "KL-104", name: "Restrooms & Water Station", category: "Facility", desc: "Accessible restrooms and filtered water refill station.", x: 365, y: 35, w: 70, h: 60 },
    { floor: 1, room: "KL-ELEV", name: "Elevator & Main Lobby", category: "Access", desc: "Access to 2nd floor classrooms and faculty offices.", x: 200, y: 110, w: 80, h: 45 },

    // 2nd Floor
    { floor: 2, room: "KL-201", name: "Open Computer Lab & Printing", category: "Lab", desc: "30 PC workstations with specialized business and Adobe software.", x: 40, y: 35, w: 90, h: 60 },
    { floor: 2, room: "KL-202", name: "ABIT Technology & Cyber Hub", category: "Tech Lab", desc: "Software engineering, networking lab, and ABIT faculty desks.", x: 145, y: 35, w: 90, h: 60 },
    { floor: 2, room: "KL-203", name: "Business Faculty Offices", category: "Faculty", desc: "Office hours for Accounting, Business Administration, and Advising.", x: 250, y: 35, w: 100, h: 60 },
    { floor: 2, room: "KL-204", name: "Hospitality & Tourism Lab", category: "Specialized", desc: "HOST program classroom and resort simulation center.", x: 365, y: 35, w: 70, h: 60 },
    { floor: 2, room: "KL-205", name: "Department Conference Room", category: "Meeting", desc: "Boardroom for faculty meetings, defenses, and seminars.", x: 200, y: 110, w: 80, h: 45 }
  ];

  // --- MOCK DATA: JOB OPPORTUNITIES ---
  const jobsData = [
    {
      title: "Business Analyst Intern",
      company: "Maui High Performance Computing Center",
      type: "internship",
      typeLabel: "Student Internship",
      pay: "$22.00 / hr",
      location: "Kihei, Maui (Hybrid)",
      desc: "Assist defense and research analysts with operational workflows, data reporting, and tech documentation. Open to ABIT and Business students."
    },
    {
      title: "Student Help - Business Dept",
      company: "UHMC Business Department",
      type: "part-time",
      typeLabel: "Part-Time Campus Job",
      pay: "$16.50 / hr",
      location: "Ka Lama Building",
      desc: "Support Ka Lama lab operations, student inquiries, printing assistance, and department flyer distribution. 15 hrs/week."
    },
    {
      title: "Hospitality Management Trainee",
      company: "Grand Wailea Resort",
      type: "full-time",
      typeLabel: "Full-Time Career",
      pay: "$58,000 / yr + Benefits",
      location: "Wailea, Maui",
      desc: "Fast-track rotational leadership program across front desk, guest operations, and food & beverage services. UHMC HOST graduates prioritized."
    },
    {
      title: "Junior Staff Bookkeeper",
      company: "Valley Isle Financial Services",
      type: "full-time",
      typeLabel: "Full-Time Career",
      pay: "$24.00 - $28.00 / hr",
      location: "Kahului, Maui",
      desc: "Manage payroll, general ledgers, and accounts payable for local businesses. Proficiency with QuickBooks and Excel required."
    },
    {
      title: "Marketing & Social Media Specialist",
      company: "Maui Native Nursery & Green Goods",
      type: "part-time",
      typeLabel: "Part-Time",
      pay: "$19.00 / hr",
      location: "Upcountry Maui",
      desc: "Design promotional graphics, manage Instagram campaigns, and assist with online store customer orders."
    },
    {
      title: "IT Support & Web Intern",
      company: "County of Maui - Dept of Finance",
      type: "internship",
      typeLabel: "Student Internship",
      pay: "$20.50 / hr",
      location: "Wailuku, Maui",
      desc: "Support municipal finance systems, hardware maintenance, and data cleanup. Great resume builder for ABIT students."
    }
  ];

  // --- MOCK DATA: EVENTS & SPOTLIGHTS ---
  const eventsData = [
    {
      month: "NOV",
      day: "04",
      title: "ABIT Capstone Presentations & Pitch Day",
      time: "1:00 PM - 4:00 PM • Ka Lama 102",
      desc: "Graduating seniors present their web and business venture projects to local industry judges and faculty."
    },
    {
      month: "NOV",
      day: "12",
      title: "Maui Hospitality Career & Internship Fair",
      time: "10:00 AM - 2:00 PM • Pilina Multi-Purpose Room",
      desc: "Meet recruiters from 15+ premier Maui hotels, resorts, airlines, and eco-tour operators. Bring resumes!"
    },
    {
      month: "DEC",
      day: "01",
      title: "Spring 2027 Priority Course Registration Opens",
      time: "STAR GPS System Online",
      desc: "Make an appointment with Ka Lama faculty advisors now to lock in your spring schedule and graduate on time."
    },
    {
      month: "DEC",
      day: "08",
      title: "Free Resume & LinkedIn Workshop",
      time: "12:00 PM - 1:30 PM • Ka Lama 201 Computer Lab",
      desc: "Get 1-on-1 feedback on your resume and optimize your LinkedIn profile for local island employers."
    }
  ];

  // --- INITIALIZATION ---
  initClock();
  initIdleTimer();
  initNavigation();
  initProgramsView();
  initDirectoryView();
  initJobsView();
  initSurveyView();
  initEventsView();
  initAccessibility();

  // --- CLOCK & DATE WIDGET ---
  function initClock() {
    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');

    function update() {
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      dateEl.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
    }
    update();
    setInterval(update, 1000);
  }

  // --- NAVIGATION CONTROLLER ---
  function initNavigation() {
    // Nav Tiles on Home Screen
    document.querySelectorAll('.nav-tile').forEach(tile => {
      tile.addEventListener('click', () => {
        const targetView = tile.getAttribute('data-view');
        switchView(targetView);
      });
    });

    // "Back to Menu" buttons on all sub-screens
    document.querySelectorAll('.btn-back').forEach(btn => {
      btn.addEventListener('click', () => {
        switchView('view-home');
      });
    });

    // Quick "Home" button in top header
    const btnHome = document.getElementById('btn-return-home');
    if (btnHome) {
      btnHome.addEventListener('click', () => {
        switchView('view-home');
      });
    }
  }

  function switchView(viewId) {
    document.querySelectorAll('.view-panel').forEach(panel => {
      panel.classList.remove('active');
    });

    const target = document.getElementById(viewId);
    if (target) {
      target.classList.add('active');
      state.currentView = viewId;
    }

    // Scroll main view back to top
    const mainEl = document.querySelector('.kiosk-main');
    if (mainEl) mainEl.scrollTop = 0;

    resetIdleTimer();
  }

  // --- IDLE TIMER & ATTRACT MODE (SCREENSAVER) ---
  function initIdleTimer() {
    const screensaver = document.getElementById('attract-screensaver');
    const idleSecondsEl = document.getElementById('idle-seconds');

    // Any touch, click, or keypress resets idle timer
    ['touchstart', 'click', 'mousemove', 'keydown'].forEach(evt => {
      window.addEventListener(evt, () => {
        if (state.isIdle) {
          wakeFromScreensaver();
        }
        resetIdleTimer();
      }, { passive: true });
    });

    // Tap on screensaver wakes immediately
    screensaver.addEventListener('click', wakeFromScreensaver);

    // 1-second interval loop
    setInterval(() => {
      if (!state.isIdle) {
        state.idleSecondsRemaining--;
        if (idleSecondsEl) {
          idleSecondsEl.textContent = Math.max(0, state.idleSecondsRemaining);
        }

        if (state.idleSecondsRemaining <= 0) {
          triggerScreensaver();
        }
      }
    }, 1000);

    // Screensaver rotating slides
    let currentReelIndex = 0;
    const slides = document.querySelectorAll('.reel-slide');
    setInterval(() => {
      if (state.isIdle && slides.length > 0) {
        slides[currentReelIndex].classList.remove('active');
        currentReelIndex = (currentReelIndex + 1) % slides.length;
        slides[currentReelIndex].classList.add('active');
      }
    }, 4500);
  }

  function resetIdleTimer() {
    state.idleSecondsRemaining = state.idleThreshold;
  }

  function triggerScreensaver() {
    state.isIdle = true;
    const screensaver = document.getElementById('attract-screensaver');
    if (screensaver) screensaver.classList.add('active');
    // Also reset back to home view behind the screensaver
    switchView('view-home');
  }

  function wakeFromScreensaver() {
    state.isIdle = false;
    resetIdleTimer();
    const screensaver = document.getElementById('attract-screensaver');
    if (screensaver) screensaver.classList.remove('active');
  }

  // --- ACADEMIC PROGRAMS MODULE ---
  function initProgramsView() {
    const display = document.getElementById('program-display');
    const tabButtons = document.querySelectorAll('.tab-btn');

    function renderProgram(key) {
      const prog = programsData[key];
      if (!prog) return;

      display.innerHTML = `
        <div class="program-card-detail">
          <div class="program-overview">
            <span class="degree-tag">${prog.degree}</span>
            <h3>${prog.name}</h3>
            <p>${prog.description}</p>
            <div class="program-highlights-list">
              <h4>Program Strengths & Career Outcomes:</h4>
              <ul>
                ${prog.highlights.map(item => `<li>${item}</li>`).join('')}
              </ul>
            </div>
          </div>
          <div class="program-sidebar">
            <div>
              <h4 style="color:#FFF; font-size:16px; margin-bottom:8px;">Target Career Fields:</h4>
              <p style="color:var(--text-muted); font-size:14px; line-height:1.5;">${prog.careers}</p>
            </div>
            <div class="coordinator-card">
              <span class="coordinator-role">Faculty & Advising Location:</span>
              <div class="coordinator-name">${prog.coordinator}</div>
              <div style="color:var(--uh-gold-light); font-weight:700; font-size:14px; margin-top:4px;">📍 ${prog.office}</div>
            </div>
          </div>
        </div>
      `;
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-program');
        renderProgram(key);
      });
    });

    // Initial render
    renderProgram('abit');
  }

  // --- BUILDING DIRECTORY & MAP MODULE ---
  function initDirectoryView() {
    const floorButtons = document.querySelectorAll('.floor-btn');
    const searchInput = document.getElementById('directory-search');
    const clearBtn = document.getElementById('clear-search');
    const itemsContainer = document.getElementById('directory-items-container');
    const countEl = document.getElementById('directory-count');
    const floorTitleEl = document.getElementById('map-floor-title');
    const mapWrapper = document.getElementById('svg-map-wrapper');

    function render() {
      const query = (searchInput.value || '').toLowerCase().trim();
      const filtered = directoryData.filter(item => {
        const matchesFloor = item.floor === state.activeFloor;
        const matchesSearch = !query || 
          item.room.toLowerCase().includes(query) ||
          item.name.toLowerCase().includes(query) ||
          item.desc.toLowerCase().includes(query);
        return matchesFloor && matchesSearch;
      });

      countEl.textContent = filtered.length;
      floorTitleEl.textContent = `Ka Lama • Floor ${state.activeFloor} Layout`;

      // Render Listings
      if (filtered.length === 0) {
        itemsContainer.innerHTML = `<div style="color:var(--text-muted); padding:20px; text-align:center;">No rooms matching "${query}" on Floor ${state.activeFloor}.</div>`;
      } else {
        itemsContainer.innerHTML = filtered.map(item => `
          <div class="dir-item" data-room="${item.room}">
            <div>
              <div class="dir-name">${item.name}</div>
              <div class="dir-desc">${item.desc}</div>
            </div>
            <span class="dir-room-badge">${item.room}</span>
          </div>
        `).join('');

        // Add click highlights to list items
        itemsContainer.querySelectorAll('.dir-item').forEach(el => {
          el.addEventListener('click', () => {
            const room = el.getAttribute('data-room');
            highlightRoom(room);
          });
        });
      }

      // Render SVG Floor Map
      renderSvgMap(filtered);
    }

    function renderSvgMap(activeList) {
      const currentFloorRooms = directoryData.filter(d => d.floor === state.activeFloor);

      mapWrapper.innerHTML = `
        <svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Background outline -->
          <rect x="20" y="15" width="440" height="170" rx="12" fill="#121D24" stroke="rgba(255,255,255,0.15)" stroke-width="2"/>
          
          <!-- Hallway line -->
          <line x1="30" y1="100" x2="450" y2="100" stroke="rgba(255,255,255,0.08)" stroke-width="20" stroke-linecap="round"/>
          <text x="240" y="104" fill="rgba(255,255,255,0.25)" font-size="11" font-weight="700" text-anchor="middle">CENTRAL CORRIDOR</text>

          <!-- Rooms -->
          ${currentFloorRooms.map(r => `
            <g class="map-room-node" id="node-${r.room}" data-room="${r.room}">
              <rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" rx="6" 
                    fill="rgba(2, 71, 49, 0.6)" stroke="#0d694b" stroke-width="1.5" />
              <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 - 2}" fill="#FFFFFF" font-size="11" font-weight="700" text-anchor="middle">${r.room}</text>
              <text x="${r.x + r.w / 2}" y="${r.y + r.h / 2 + 12}" fill="#C59B27" font-size="9" text-anchor="middle">${r.category}</text>
            </g>
          `).join('')}
        </svg>
      `;

      // Map node click
      mapWrapper.querySelectorAll('.map-room-node').forEach(node => {
        node.addEventListener('click', () => {
          const room = node.getAttribute('data-room');
          highlightRoom(room);
        });
      });
    }

    function highlightRoom(room) {
      // Highlight SVG node
      mapWrapper.querySelectorAll('.map-room-node').forEach(n => n.classList.remove('highlighted'));
      const targetNode = mapWrapper.querySelector(`#node-${room}`);
      if (targetNode) targetNode.classList.add('highlighted');

      // Highlight list item and scroll into view
      itemsContainer.querySelectorAll('.dir-item').forEach(el => {
        if (el.getAttribute('data-room') === room) {
          el.classList.add('selected');
          el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
          el.classList.remove('selected');
        }
      });
    }

    // Floor Toggle Buttons
    floorButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        floorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeFloor = parseInt(btn.getAttribute('data-floor'), 10);
        render();
      });
    });

    // Search input
    searchInput.addEventListener('input', render);
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      render();
    });

    render();
  }

  // --- JOB OPPORTUNITIES MODULE ---
  function initJobsView() {
    const container = document.getElementById('jobs-container');
    const filterButtons = document.querySelectorAll('.filter-pill');

    function renderJobs() {
      const filtered = jobsData.filter(job => {
        if (state.selectedJobCategory === 'all') return true;
        return job.type === state.selectedJobCategory;
      });

      container.innerHTML = filtered.map(job => `
        <div class="job-card">
          <div>
            <div class="job-header">
              <div>
                <div class="job-title">${job.title}</div>
                <div class="job-company">${job.company}</div>
              </div>
              <span class="job-type-tag">${job.typeLabel}</span>
            </div>
            <p class="job-desc">${job.desc}</p>
          </div>
          <div class="job-meta">
            <span>📍 ${job.location}</span>
            <span style="font-weight:700; color:var(--text-main);">${job.pay}</span>
          </div>
        </div>
      `).join('');
    }

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedJobCategory = btn.getAttribute('data-filter');
        renderJobs();
      });
    });

    renderJobs();
  }

  // --- STUDENT VOICE SURVEY MODULE ---
  function initSurveyView() {
    const choiceButtons = document.querySelectorAll('.survey-choice-btn');
    const barsContainer = document.getElementById('results-bars-container');
    const totalCountEl = document.getElementById('total-votes-count');
    const feedbackMsg = document.getElementById('vote-confirmed-msg');

    const choiceLabels = {
      events: "🎉 Campus Social Events & Food Trucks",
      mentorship: "💼 Mentorship & Networking Nights",
      study: "☕ 24/7 Quiet Study & Free Coffee",
      workshops: "🚀 AI, Tech & Certification Workshops",
      sports: "⚽ Sports & Wellness Tournaments"
    };

    function updateSurveyDisplay() {
      const totalVotes = Object.values(state.surveyVotes).reduce((a, b) => a + b, 0);
      totalCountEl.textContent = `Total Student Votes: ${totalVotes}`;

      barsContainer.innerHTML = Object.entries(state.surveyVotes).map(([key, count]) => {
        const percentage = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
        return `
          <div class="result-bar-row">
            <div class="result-label-line">
              <span>${choiceLabels[key]}</span>
              <span><strong>${percentage}%</strong> (${count})</span>
            </div>
            <div class="bar-track">
              <div class="bar-fill" style="width: ${percentage}%;"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    choiceButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const choice = btn.getAttribute('data-choice');
        if (state.surveyVotes[choice] !== undefined) {
          state.surveyVotes[choice]++;
          localStorage.setItem('uhmc_kiosk_survey_votes', JSON.stringify(state.surveyVotes));
          updateSurveyDisplay();

          // Show confirmation message with subtle fade
          feedbackMsg.classList.add('show');
          setTimeout(() => {
            feedbackMsg.classList.remove('show');
          }, 3500);
        }
      });
    });

    updateSurveyDisplay();
  }

  // --- EVENTS MODULE ---
  function initEventsView() {
    const container = document.getElementById('events-container');
    container.innerHTML = eventsData.map(item => `
      <div class="event-card">
        <div class="event-date-box">
          <span class="event-month">${item.month}</span>
          <span class="event-day">${item.day}</span>
        </div>
        <div class="event-details">
          <h3>${item.title}</h3>
          <div class="event-time-loc">🕒 ${item.time}</div>
          <p>${item.desc}</p>
        </div>
      </div>
    `).join('');
  }

  // --- ACCESSIBILITY & FULLSCREEN CONTROLS ---
  function initAccessibility() {
    const fsBtn = document.getElementById('btn-fullscreen');
    const contrastBtn = document.getElementById('btn-accessibility');

    if (fsBtn) {
      fsBtn.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(err => {
            console.warn('Fullscreen error:', err);
          });
          fsBtn.textContent = '✕ Exit Fullscreen';
        } else {
          document.exitFullscreen();
          fsBtn.textContent = '⛶ Fullscreen';
        }
      });
    }

    if (contrastBtn) {
      contrastBtn.addEventListener('click', () => {
        document.body.classList.toggle('high-contrast');
        const isHc = document.body.classList.contains('high-contrast');
        contrastBtn.textContent = isHc ? '👁 Standard Mode' : '👁 High Contrast';
      });
    }
  }
});
