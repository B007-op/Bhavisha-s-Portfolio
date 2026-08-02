const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const toast = document.querySelector('.toast');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min((i % 4) * 60, 180)}ms`;
  revealObserver.observe(el);
});

const featureTrack = document.querySelector('#featured-track');
document.querySelectorAll('.carousel-button').forEach(button => {
  button.addEventListener('click', () => {
    const amount = featureTrack.clientWidth * 0.78;
    featureTrack.scrollBy({ left: button.dataset.direction === 'next' ? amount : -amount, behavior: 'smooth' });
  });
});

const tabs = document.querySelectorAll('.work-tab');
const cards = document.querySelectorAll('.work-card');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.filter;
    cards.forEach(card => {
      const categories = card.dataset.category.split(' ');
      card.classList.toggle('is-hidden', filter !== 'all' && !categories.includes(filter));
    });
  });
});

const initialFilter = document.querySelector('.work-tab.active')?.dataset.filter;
if (initialFilter) {
  cards.forEach(card => {
    const categories = card.dataset.category.split(' ');
    card.classList.toggle('is-hidden', !categories.includes(initialFilter));
  });
}

const caseStudies = {
  insideinsight: {
    kicker: 'AI product · Pricing strategy',
    title: 'InsideInsight',
    summary: 'A decision-support product that helps Airbnb hosts identify pricing gaps and act on market, property, and guest-review signals.',
    question: 'How can hosts move from static competitor checks to explainable, listing-level pricing decisions?',
    approach: 'Engineered a Bronze, Silver, and Gold pipeline across 1.95 million rows, created pricing and NLP features, and orchestrated specialist agents through LangGraph with a Streamlit interface.',
    outcome: 'Surfaced listings priced up to 65% below comparable properties, representing $51,830 in recoverable revenue. The project won First Place at the Big Data & AI Trends Market 2026.'
  },
  mativ: {
    kicker: 'Operations consulting · Reliability',
    title: '4MATIV Transportation Reliability',
    summary: 'A vendor-performance framework that converted noisy GPS signals into a transparent confidence score for route execution.',
    question: 'How reliably are transportation vendors executing planned routes, and where should management investigate first?',
    approach: 'Combined five weighted components, hypothesis testing, and IQR-based anomaly detection across more than 10,800 trips and 20 vendors.',
    outcome: 'Uncovered a 5.8x route-deviation spread and flagged 47% of low-confidence trips, informing vendor conversations and contract renegotiations.'
  },
  csi: {
    kicker: 'Commercial analytics · Roadmap',
    title: 'CSI Bid Analysis',
    summary: 'A Tableau-led bid-performance analysis designed to move from descriptive patterns to prioritized business actions.',
    question: 'Which pricing, regional, material, and seasonal factors are most associated with lost bids?',
    approach: 'Synthesized more than 1,000 bid records, segmented outcomes, mapped regional hotspots, and translated findings into impact scenarios.',
    outcome: 'Uncovered a 25% year-over-year cost increase and shaped roadmap commitments presented to the Field Advisory Board.'
  },
  santander: {
    kicker: 'Financial services · Predictive strategy',
    title: 'Santander Customer Churn',
    summary: 'A churn model paired with a retention roadmap and explicit business-impact sizing.',
    question: 'How can a bank identify high-risk customers early enough to prioritize effective retention action?',
    approach: 'Developed and compared six models on 76,020 profiles with a 24:1 class imbalance, including gradient-boosting and ensemble techniques.',
    outcome: 'Achieved AUC-ROC 0.827 and modeled $256 million in protected annual revenue through targeted retention.'
  },
  greenroi: {
    kicker: 'Sustainability · Behavioral analytics',
    title: 'Green ROI',
    summary: 'A practical framework for reducing travel emissions without treating sustainability as a reporting-only exercise.',
    question: 'Where are corporate travel emissions concentrated, and which interventions create the greatest reduction per unit of disruption?',
    approach: 'Analyzed more than 87,000 travel records, isolated emissions drivers, modeled reduction scenarios, and designed an AI-enabled nudge concept.',
    outcome: 'Identified flights as 84% of emissions and demonstrated a potential reduction of more than 4.5 million kg of CO₂.'
  },
  exportease: {
    kicker: 'Trade operations · Document intelligence',
    title: 'ExportEase',
    summary: 'A multilingual document-intelligence product designed to make cross-border trade workflows faster and easier to navigate.',
    question: 'How can teams reduce the time and manual effort required to understand, translate, and act on complex trade documents?',
    approach: 'Designed Doc Buddy with LayoutLM, AWS Translate, Django, and Docker to support real-time question answering across more than 10 document types.',
    outcome: 'Modeled a 30% reduction in manual processing effort and a 45% faster response time across international workflows.'
  },
  barclays: {
    kicker: 'Service operations · NLP',
    title: 'Barclays ConnectCare',
    summary: 'An NLP-driven support-routing concept paired with operational dashboards for faster issue resolution and stronger SLA visibility.',
    question: 'How can a service organization classify incoming tickets, prioritize urgent issues, and make support performance visible?',
    approach: 'Designed NLP classification and routing with GCP Dialogflow, AWS data pipelines, and QlikSense dashboards.',
    outcome: 'The project placed in the Top 5 in India at Barclays Hack-o-Hire.'
  },
  medicare: {
    kicker: 'Healthcare analytics · Cost drivers',
    title: 'Medicare Spending Drivers',
    summary: 'A population-level study of whether high spending is driven more by episode intensity or frequency of care.',
    question: 'What distinguishes high-cost beneficiaries, and which spending mechanism offers the clearest intervention point?',
    approach: 'Applied weighted statistical methods in SAS to 274,654 beneficiaries and communicated findings through Tableau and a white paper.',
    outcome: 'Established that 3.1% of patients accounted for 46.7% of spending, with episode intensity emerging as the central cost driver.'
  },
  armd: {
    kicker: 'Medical AI · Multimodal learning',
    title: 'ARMD-NetX',
    summary: 'A multimodal ensemble framework for age-related macular degeneration detection using retinal imaging data.',
    question: 'Can OCT and fundus signals be combined to improve disease detection while supporting more explainable medical AI research?',
    approach: 'Combined convolutional neural networks with ensemble meta-classifiers and created a labeled OCT-Fundus dataset.',
    outcome: 'Reported 99.41% accuracy and published a dataset containing more than 12,000 labeled images.'
  }
};

const modal = document.querySelector('#case-modal');
const fields = {
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
    Object.entries(fields).forEach(([key, field]) => field.textContent = study[key]);
    modal.showModal();
    document.body.classList.add('modal-open');
  });
});

const closeModal = () => {
  modal.close();
  document.body.classList.remove('modal-open');
};
document.querySelector('.modal-close').addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
modal.addEventListener('close', () => document.body.classList.remove('modal-open'));

const copyButton = document.querySelector('.copy-email');
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    toast.textContent = 'Email copied';
  } catch {
    toast.textContent = copyButton.dataset.email;
  }
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 1800);
});

document.querySelector('#year').textContent = new Date().getFullYear();
