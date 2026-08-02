const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const toast = document.querySelector('.toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.classList.toggle('open');
  nav.classList.toggle('open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('open');
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element, index) => {
  element.style.transitionDelay = `${Math.min((index % 4) * 70, 210)}ms`;
  revealObserver.observe(element);
});

const counter = document.querySelector('.count');
const countObserver = new IntersectionObserver(([entry], observer) => {
  if (!entry.isIntersecting) return;
  const target = Number(counter.dataset.target);
  const decimals = Number(counter.dataset.decimals || 0);
  const start = performance.now();
  const duration = 1200;

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = (target * eased).toFixed(decimals);
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
  observer.disconnect();
}, { threshold: 0.7 });
if (counter) countObserver.observe(counter);

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category.split(' ').includes(filter);
      card.classList.toggle('is-hidden', !match);
    });
  });
});

const caseStudies = {
  insideinsight: {
    kicker: 'AI product · Pricing strategy',
    title: 'InsideInsight',
    summary: 'A decision-support product that helps Airbnb hosts identify pricing gaps and act on market, property, and guest-review signals.',
    question: 'How can hosts move from static competitor checks to explainable, listing-level pricing decisions?',
    approach: 'Engineered a Bronze/Silver/Gold pipeline across 1.95M rows, created pricing and NLP features, and orchestrated specialist agents through LangGraph with a Streamlit interface.',
    outcome: 'Surfaced listings priced up to 65% below comparable properties, representing $51,830 in recoverable revenue; awarded Judges & Instructor’s Favorite at Carlson.'
  },
  mativ: {
    kicker: 'Operations consulting · Reliability',
    title: '4MATIV Transportation Reliability',
    summary: 'A vendor-performance framework that converted noisy GPS signals into a transparent confidence score for route execution.',
    question: 'How reliably are transportation vendors executing planned routes, and where should management investigate first?',
    approach: 'Combined five weighted components, hypothesis testing, and IQR-based anomaly detection across 10,800+ trips and 20+ vendors.',
    outcome: 'Uncovered a 5.8× route-deviation spread and flagged 47% of low-confidence trips, informing vendor conversations and contract renegotiations.'
  },
  csi: {
    kicker: 'Commercial analytics · Roadmap',
    title: 'CSI Bid Analysis',
    summary: 'A Tableau-led bid-performance analysis designed to move from descriptive patterns to prioritized business actions.',
    question: 'Which pricing, regional, material, and seasonal factors are most associated with lost bids?',
    approach: 'Synthesized 1,000+ bid records, segmented outcomes, mapped regional hotspots, and translated findings into impact scenarios scored against business value criteria.',
    outcome: 'Uncovered a 25% year-over-year cost increase and shaped roadmap commitments presented to the Field Advisory Board.'
  },
  santander: {
    kicker: 'Financial services · Predictive strategy',
    title: 'Santander Customer Churn',
    summary: 'A churn model paired with a retention roadmap and explicit business-impact sizing.',
    question: 'How can a bank identify high-risk customers early enough to prioritize effective retention action?',
    approach: 'Developed and compared six models on 76,020 profiles with a 24:1 class imbalance, including gradient-boosting and ensemble techniques.',
    outcome: 'Achieved AUC-ROC 0.827 and modeled $256M in protected annual revenue through targeted retention.'
  },
  greenroi: {
    kicker: 'Sustainability · Behavioral analytics',
    title: 'Green ROI',
    summary: 'A practical framework for reducing travel emissions without treating sustainability as a reporting-only exercise.',
    question: 'Where are corporate travel emissions concentrated, and which interventions create the greatest reduction per unit of disruption?',
    approach: 'Analyzed 87K+ travel records, isolated emissions drivers, modeled reduction scenarios, and designed an AI-enabled nudge concept.',
    outcome: 'Identified flights as 84% of emissions and demonstrated a potential reduction of more than 4.5M kg of CO₂.'
  },
  exportease: {
    kicker: 'Trade operations · Document intelligence',
    title: 'ExportEase',
    summary: 'A multilingual document-intelligence product designed to make cross-border trade workflows faster and easier to navigate.',
    question: 'How can teams reduce the time and manual effort required to understand, translate, and act on complex trade documents?',
    approach: 'Designed Doc Buddy with LayoutLM, AWS Translate, Django, and Docker to support real-time question answering across more than 10 document types.',
    outcome: 'Modeled a 30% reduction in manual processing effort, a 45% faster response time, and faster operations across five or more countries.'
  },
  barclays: {
    kicker: 'Service operations · NLP',
    title: 'Barclays ConnectCare',
    summary: 'An NLP-driven support-routing concept paired with operational dashboards for faster issue resolution and stronger SLA visibility.',
    question: 'How can a service organization classify incoming tickets, prioritize urgent issues, and make support performance visible to decision-makers?',
    approach: 'Designed NLP classification and routing with GCP Dialogflow, AWS data pipelines, and QlikSense dashboards to monitor ticket flow and SLA trends.',
    outcome: 'Modeled a 45% improvement in critical issue resolution and a 35% reduction in latency for more than 1,500 users.'
  },
  armd: {
    kicker: 'Medical AI · Multimodal learning',
    title: 'ARMD-NetX',
    summary: 'A multimodal ensemble framework for age-related macular degeneration detection using retinal imaging data.',
    question: 'Can OCT and fundus signals be combined to improve disease detection while supporting more explainable medical AI research?',
    approach: 'Combined convolutional neural networks with ensemble meta-classifiers and created a labeled OCT-Fundus dataset for model development and evaluation.',
    outcome: 'Reported 99.41% accuracy and published a dataset containing more than 12,000 labeled images.'
  },
  medicare: {
    kicker: 'Healthcare analytics · Cost drivers',
    title: 'Medicare Spending Drivers',
    summary: 'A population-level study of whether high spending is driven more by episode intensity or frequency of care.',
    question: 'What distinguishes high-cost beneficiaries, and which spending mechanism offers the clearest intervention point?',
    approach: 'Applied weighted statistical methods in SAS to 274,654 beneficiaries and communicated findings through Tableau and a white paper.',
    outcome: 'Established that 3.1% of patients accounted for 46.7% of spending, with episode intensity emerging as the central cost driver.'
  }
};

const modal = document.querySelector('#case-modal');
const modalFields = {
  kicker: document.querySelector('#modal-kicker'),
  title: document.querySelector('#modal-title'),
  summary: document.querySelector('#modal-summary'),
  question: document.querySelector('#modal-question'),
  approach: document.querySelector('#modal-approach'),
  outcome: document.querySelector('#modal-outcome')
};

document.querySelectorAll('[data-modal]').forEach(button => {
  button.addEventListener('click', () => {
    const study = caseStudies[button.dataset.modal];
    if (!study) return;
    Object.entries(modalFields).forEach(([key, field]) => field.textContent = study[key]);
    modal.showModal();
    document.body.classList.add('modal-open');
  });
});

const closeModal = () => {
  modal.close();
  document.body.classList.remove('modal-open');
};

document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
modal.addEventListener('close', () => document.body.classList.remove('modal-open'));



const photoModal = document.querySelector('#photo-modal');
const photoModalImage = document.querySelector('#photo-modal-image');
const photoModalClose = document.querySelector('.photo-modal-close');

document.querySelectorAll('[data-photo]').forEach(button => {
  button.addEventListener('click', () => {
    photoModalImage.src = button.dataset.photo;
    photoModalImage.alt = button.dataset.photoAlt || '';
    photoModal.showModal();
    document.body.classList.add('modal-open');
  });
});

const closePhotoModal = () => {
  photoModal.close();
  photoModalImage.src = '';
  document.body.classList.remove('modal-open');
};

photoModalClose.addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', event => {
  if (event.target === photoModal) closePhotoModal();
});
photoModal.addEventListener('close', () => {
  photoModalImage.src = '';
  document.body.classList.remove('modal-open');
});

const copyButton = document.querySelector('.copy-email');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    toast.textContent = 'Email copied';
  } catch {
    toast.textContent = copyButton.dataset.email;
  }
  toast.classList.add('show');
  window.setTimeout(() => toast.classList.remove('show'), 1800);
});

document.querySelector('#year').textContent = new Date().getFullYear();
