/**
 * Yash Gawad - Portfolio Logic
 * Sleek Dark Modern Engineer Showcase
 * Vanilla JavaScript (Zero External Dependencies)
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCopyButtons();
  initModals();
  initContactForm();
});

/* ==========================================================================
   1. NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Mobile Menu Toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('bx-menu');
        icon.classList.toggle('bx-x');
      }
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        const icon = navToggle?.querySelector('i');
        if (icon) {
          icon.classList.add('bx-menu');
          icon.classList.remove('bx-x');
        }
      });
    });
  }

  // Scroll Header Effect & Scroll Spy
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Header background blur on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll Spy active links
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-menu a[href*="#${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-menu a[href*="#${sectionId}"]`)?.classList.remove('active');
      }
    });
  });
}

/* ==========================================================================
   2. COPY TO CLIPBOARD & TOAST NOTIFICATION
   ========================================================================== */
function showToast(message, iconClass = 'bx-check-circle') {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class='bx ${iconClass}'></i><span>${message}</span>`;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

function initCopyButtons() {
  const copyButtons = document.querySelectorAll('[data-copy]');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast(`Copied ${textToCopy} to clipboard!`);
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        showToast('Copied to clipboard!');
      });
    });
  });
}

/* ==========================================================================
   3. INTERACTIVE SYSTEM ARCHITECTURE MODAL
   ========================================================================== */
const PROJECT_DETAILS = {
  localcommerce: {
    title: 'LocalCommerce — Multi-Tenant Commerce Platform',
    category: 'React.js · Node.js · Express.js · PostgreSQL · REST APIs · Vercel · Render',
    liveUrl: 'https://yashgawad.github.io/Yash_Portfolio/',
    githubUrl: 'https://github.com/YashGawad',
    architectureText: `+-----------------------------------------------------------------------+
|                       LOCALCOMMERCE ARCHITECTURE                      |
+-----------------------------------------------------------------------+

 [Clients: Customer / Business / Courier / Admin Portals]
                            |
                   (HTTPS / JSON REST API)
                            v
  +-------------------------------------------------------------+
  |                   FRONTEND LAYER (Vercel)                   |
  |  - React.js Single Page Application                         |
  |  - Separate Customer, Business, Delivery & Admin Dashboards |
  |  - Role-based dynamic layout & state routing                |
  +-------------------------------------------------------------+
                            |
                            v  [JWT Auth Tokens]
  +-------------------------------------------------------------+
  |              BACKEND & API GATEWAY (Render)                 |
  |  - Node.js & Express.js RESTful Controller Services         |
  |  - Store-scoped middleware: tenant_id validation            |
  |  - Role-Based Access Control (RBAC)                         |
  |  - Catalog, Order Pipeline, Staff, Analytics & Discounts    |
  +-------------------------------------------------------------+
                            |
                            v  [Connection Pool / Parameterized SQL]
  +-------------------------------------------------------------+
  |                   DATABASE LAYER (PostgreSQL)               |
  |  - Multi-tenant relational schema (stores, products, orders)|
  |  - Store-scoped compound indexes on (store_id, created_at)  |
  |  - Global product catalog + store-specific inventory/pricing|
  |  - Pickup & local-delivery state machine workflows          |
  +-------------------------------------------------------------+`,
    specs: [
      { label: 'Frontend Stack', value: 'React.js, Modern CSS, Responsive Component Architecture' },
      { label: 'Backend Stack', value: 'Node.js, Express.js REST API, JWT Authentication' },
      { label: 'Database', value: 'PostgreSQL with multi-tenant relational isolation' },
      { label: 'Cloud Deployment', value: 'Frontend on Vercel, Backend & Database on Render' },
      { label: 'Key Protocols', value: 'RESTful JSON endpoints, JWT Bearer Token Auth, RBAC' }
    ],
    highlights: [
      'Built a multi-tenant local commerce platform with separate Customer, Business, Delivery, and Admin experiences for independent local businesses, deployed with the frontend on Vercel and backend/database on Render.',
      'Designed store-scoped management for products, inventory, orders, customers, staff, fulfillment, discounts, analytics, and reviews, with role-based access and pickup/local-delivery workflows.',
      'Architected a global product and store-specific listing model enabling cross-store product discovery while preserving independent pricing, inventory, and fulfillment rules.',
      'Built a Node.js/Express REST API with PostgreSQL and JWT-based authentication for catalog, ordering, and multi-tenant data management.'
    ]
  },
  foodnutrition: {
    title: 'AI-Based Food Nutrition Estimator',
    category: 'React.js · Python · TensorFlow · MySQL · AWS (EC2, RDS, S3, IAM) · Docker',
    liveUrl: 'https://yashgawad.github.io/Yash_Portfolio/',
    githubUrl: 'https://github.com/YashGawad',
    architectureText: `+-----------------------------------------------------------------------+
|                    AI NUTRITION ESTIMATOR ARCHITECTURE                 |
+-----------------------------------------------------------------------+

 [User: Upload Food Photo]
            |
            v
  +-------------------------------------------------------------+
  |                   FRONTEND CLIENT (Vercel)                  |
  |  - React.js client with image dropzone & preview            |
  |  - Real-time nutritional breakdown & macronutrient charts   |
  +-------------------------------------------------------------+
            |
            v  [REST API: Upload Image Payload]
  +-------------------------------------------------------------+
  |              CLOUD BACKEND ORCHESTRATOR (AWS EC2)           |
  |  - RESTful API gateway connecting React with Python service |
  |  - Stores raw image assets in Amazon S3                     |
  |  - Dispatches inference task to containerized AI worker     |
  +-------------------------------------------------------------+
            |
            v  [Docker Microservice Call]
  +-------------------------------------------------------------+
  |           DOCKERIZED AI INFERENCE SERVICE (AWS EC2)         |
  |  - Python + TensorFlow / Keras CNN Architecture             |
  |  - Transfer Learning approach for feature extraction        |
  |  - Estimates calories and macro nutritional breakdown       |
  +-------------------------------------------------------------+
            |
            v  [Nutrient Metadata Query]
  +-------------------------------------------------------------+
  |                     DATABASE (AWS RDS MySQL)                |
  |  - MySQL database hosted on AWS RDS                         |
  |  - Structured food taxonomy, caloric indices, meal tracking |
  |  - AWS IAM-based access controls for cloud resources        |
  +-------------------------------------------------------------+`,
    specs: [
      { label: 'Deep Learning', value: 'Python, TensorFlow, CNN / Transfer Learning' },
      { label: 'Frontend', value: 'React.js with live preview & nutritional visualization' },
      { label: 'Cloud Infrastructure', value: 'AWS EC2 (Compute), AWS RDS (MySQL), Amazon S3 (Images)' },
      { label: 'Containerization', value: 'Docker container for isolated model inference' },
      { label: 'Access Control', value: 'AWS IAM-based role access controls for cloud resources' }
    ],
    highlights: [
      'Developed a cloud-based full-stack application that analyzes user-uploaded food images using a CNN/transfer-learning approach to estimate calories and nutritional information.',
      'Built RESTful APIs to connect the React frontend with a Python/TensorFlow AI service and manage application data through MySQL.',
      'Deployed the React frontend on Vercel and backend/AI services on AWS EC2, with MySQL hosted on AWS RDS and food images stored in Amazon S3.',
      'Containerized the Python AI service with Docker and configured AWS IAM-based access controls for cloud resources.'
    ]
  }
};

function initModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalGithubLink = document.getElementById('modal-github-link');
  const codeContent = document.getElementById('modal-code-content');
  const specsList = document.getElementById('modal-specs-list');
  const highlightsList = document.getElementById('modal-highlights-list');
  const modalTabs = document.querySelectorAll('.modal-tab');
  const tabPanes = document.querySelectorAll('.tab-pane');

  if (!modalOverlay) return;

  // Open Modal Handler
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = trigger.getAttribute('data-open-modal');
      const data = PROJECT_DETAILS[projectId];
      if (!data) return;

      // Populate content
      if (modalTitle) modalTitle.textContent = data.title;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalLiveLink) modalLiveLink.href = data.liveUrl;
      if (modalGithubLink) modalGithubLink.href = data.githubUrl;
      if (codeContent) codeContent.textContent = data.architectureText;

      // Populate Specs
      if (specsList) {
        specsList.innerHTML = data.specs.map(s => `
          <div style="display:flex; justify-content:space-between; padding:0.65rem 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:0.9rem;">
            <strong style="color:var(--accent-gold-light); font-family:var(--font-mono); font-size:0.825rem;">${s.label}:</strong>
            <span style="color:var(--text-secondary);">${s.value}</span>
          </div>
        `).join('');
      }

      // Populate Highlights
      if (highlightsList) {
        highlightsList.innerHTML = data.highlights.map(h => `
          <li style="display:flex; align-items:flex-start; gap:0.65rem; margin-bottom:0.85rem; font-size:0.92rem; color:var(--text-secondary); line-height:1.6;">
            <i class='bx bx-check-shield' style="color:var(--accent-gold); font-size:1.2rem; margin-top:0.15rem; flex-shrink:0;"></i>
            <span>${h}</span>
          </li>
        `).join('');
      }

      // Reset to first tab
      modalTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      modalTabs[0]?.classList.add('active');
      tabPanes[0]?.classList.add('active');

      // Show Modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // Tab Switching
  modalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      modalTabs.forEach(t => t.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      document.getElementById(`tab-${targetTab}`)?.classList.add('active');
    });
  });

  // Close Modal Handler
  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. CONTACT FORM VALIDATION & INTERACTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    // FormSubmit default fallback or AJAX handling
    const name = form.querySelector('[name="name"]')?.value.trim();
    const email = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      showToast('Please fill out all required fields.', 'bx-error-circle');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Sending...";
    }

    // Let the form submit naturally to FormSubmit endpoint, but show positive confirmation
    showToast('Sending your message...');
  });
}
