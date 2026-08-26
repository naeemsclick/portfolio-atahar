(function () {
  const TOTAL_FRAMES = 181;
  const canvas = document.getElementById('frame-canvas');
  const ctx = canvas ? canvas.getContext('2d') : null;

  const images = [];
  let loadedCount = 0;
  let currentFrame = 0;
  let targetFrame = 0;
  let animationFrameId = null;

  // --- Translation Dictionary (English default, Bangla switch) ---
  let currentLang = 'en';

  const translations = {
    en: {
      brand_sub: "CREATIVE VISUALIZER",
      nav_home: "Home",
      nav_about: "About Me",
      nav_projects: "Project",
      nav_experience: "Experience",
      nav_skills: "Skill",
      nav_education: "Education",
      nav_blog: "Blog",
      lets_talk: "Let's Talk",
      hero_tag: "CEO, CHIRAYAT • CINEMATOGRAPHER",
      hero_title: "Atahar Noor<br>Munna",
      hero_statement: "Crafting visual stories that connect, convert & elevate brands.",
      hero_desc: "Creative Visualizer, Video Editor & YouTube SEO Expert with 3+ years of experience delivering high-impact video content for 10+ companies.",
      feature_1: "Cinematography & Video Editing",
      feature_2: "Creative Visualization",
      feature_3: "YouTube SEO & Growth",
      feature_4: "Nasheed Performance",
      brands_title: "Platforms & Leadership Roles",
      about_tag: "Professional Summary",
      about_title: "Combining<br>Technical Expertise<br>With Storytelling",
      about_lead: "Experienced Cinematographer & Creative Visualizer with 3+ years of hands-on experience delivering professional video content for 10+ companies.",
      about_subtext: "Specialized in Video Editing, YouTube SEO & Nasheed Performance.<br>Committed to high-impact visual storytelling.",
      card_1_tag: "3+ Years | 10+ Companies",
      card_1_title: "Cinematography & Video Editing",
      card_2_tag: "CEO @ Chirayat",
      card_2_title: "Atahar Noor Munna",
      card_3_tag: "YouTube SEO & Artist",
      card_3_title: "YouTube SEO & Nasheed Artist",
      exp_tag: "Career Journey",
      exp_title: "Professional Experience",
      role_1_title: "CEO — Chirayat",
      role_1_meta: "Current Leadership Role",
      role_1_p1: "Leads Chirayat's creative direction, content strategy, and channel growth.",
      role_1_p2: "Oversees production quality across motivational and creative video content.",
      role_2_title: "Cinematographer & Video Editor",
      role_2_meta: "3 Years | 10+ Companies",
      role_2_p1: "Delivered cinematography and video editing services for a range of brands and organizations.",
      role_2_p2: "Produced professional-grade visual content using Adobe Premiere Pro, After Effects, DaVinci Resolve, CapCut, and Filmora Pro.",
      role_2_p3: "Applied color grading, motion graphics, and creative visualization to strengthen storytelling.",
      role_3_title: "YouTube SEO Expert",
      role_3_meta: "2017 — Present",
      role_3_p1: "Worked on YouTube SEO for personal and client channels since 2017.",
      role_3_p2: "Contributed to increased viewership and search ranking across multiple channels.",
      role_4_title: "Nasheed Artist",
      role_4_meta: "4 Years Experience",
      role_4_p1: "Performing as an artist within the Islamic Nasheed industry for the past 4 years.",
      role_4_p2: "Regularly creates and publishes content on his own Nasheed channel.",
      skills_tag: "Technical Mastery",
      skills_title: "Editing Software & Core Skills",
      sw_heading: "Editing Software Proficiency",
      core_heading: "Core Competencies",
      edu_tag: "Background",
      edu_title: "Education & Languages",
      edu_1_title: "Dawra-e-Hadith",
      edu_2_title: "Hifzul Quran",
      edu_2_year: "Completed 2018",
      edu_3_title: "SSC",
      lang_heading: "Languages",
      lang_bn: "Bangla (Native)",
      lang_en: "English",
      lang_ar: "Arabic",
      lang_ur: "Urdu",
      footer_bio: "Cinematographer & Creative Visualizer delivering high-impact video content, YouTube SEO strategies, and creative direction.",
      entities_title: "ENTITIES MANAGED",
      channels_title: "DIRECT CHANNELS",
      created_by: "Created by",
      
      // Projects Page
      proj_header_tag: "Portfolio Showcase",
      proj_header_title: "Featured Projects & Visual Works",
      proj_header_desc: "A selection of cinematography, video editing, color grading and YouTube SEO case studies.",
      tab_all: "All Projects",
      tab_cinema: "Cinematography",
      tab_editing: "Video Editing",
      tab_grading: "Color Grading",
      tab_seo: "YouTube SEO",
      p1_cat: "Cinematography & Editing",
      p1_title: "Motivational Video Series Production for Chirayat",
      p1_desc: "High-impact motivational video production featuring custom lighting, multi-cam editing, and color grading.",
      p2_cat: "Nasheed & Visuals",
      p2_title: "Islamic Music Video & Nasheed Visual Direction",
      p2_desc: "Complete visual direction and post-production editing for top Islamic music releases.",
      p3_cat: "YouTube SEO",
      p3_title: "Client Channel Growth: 0 to 100K Subscribers Case Study",
      p3_desc: "Comprehensive YouTube SEO keyword optimization, metadata restructuring, and click-through rate optimization.",

      // Blog Page
      blog_header_tag: "Insights & Articles",
      blog_header_title: "Latest Blog Posts & Knowledge Sharing",
      blog_header_desc: "Pro tips on Video Editing, YouTube SEO, Cinematography, and Creative Direction.",
      bcat_all: "All Categories",
      bcat_editing: "Video Editing",
      bcat_seo: "YouTube SEO",
      bcat_cinema: "Cinematography",
      bcat_nasheed: "Nasheed Art",
      b1_cat: "Video Editing",
      b1_title: "10 Essential Video Editing Workflows in Premiere Pro & After Effects",
      b1_desc: "Learn speed-editing techniques, shortcut configurations, and color management for high-speed video production.",
      b2_cat: "YouTube SEO",
      b2_title: "How to Rank YouTube Videos in 2026: Complete SEO Masterclass",
      b2_desc: "Discover keyword research techniques, high CTR thumbnail formulas, and retention strategies that boost search ranking.",
      b3_cat: "Nasheed Art",
      b3_title: "The Art of Islamic Nasheed Production: Behind the Scenes",
      b3_desc: "Insights into vocal harmonies, acoustic balancing, and visual direction for Islamic nasheed music videos.",
      b4_cat: "Cinematography",
      b4_title: "Color Grading Secrets in DaVinci Resolve for Cinematic Look",
      b4_desc: "Master skin tone balance, LUT application, and teal/orange contrast for commercial video production.",
      b5_cat: "Video Editing",
      b5_title: "Building Chirayat: Leadership & Creative Direction Journey",
      b5_desc: "Lessons learned scaling Chirayat into a leading creative video and motivational media company.",
      b6_cat: "Cinematography",
      b6_title: "Lighting Setup & Camera Gear Guide for Professional Cinematography",
      b6_desc: "A deep dive into 3-point studio lighting, lens selection, and frame rate choices for cinematic storytelling."
    },
    bn: {
      brand_sub: "ক্রিয়েটিভ ভিজ্যুয়ালাইজার",
      nav_home: "হোম",
      nav_about: "আমার সম্পর্কে",
      nav_projects: "প্রজেক্ট",
      nav_experience: "অভিজ্ঞতা",
      nav_skills: "দক্ষতা",
      nav_education: "শিক্ষা",
      nav_blog: "ব্লগ",
      lets_talk: "কথা বলুন",
      hero_tag: "সিইও, চিরায়াত • সিনেমাটোগ্রাফার",
      hero_title: "আতাহার নূর<br>মুন্না",
      hero_statement: "দৃশ্যমান গল্পের মাধ্যমে ব্র্যান্ডকে আরও উঁচুতে নিয়ে যাওয়া।",
      hero_desc: "ক্রিয়েটিভ ভিজ্যুয়ালাইজার, ভিডিও এডিটর এবং ইউটিউব এসইও বিশেষজ্ঞ। ১০+ কোম্পানির জন্য ৩+ বছরের পেশাদার ভিজ্যুয়াল কন্টেন্ট তৈরির অভিজ্ঞতা।",
      feature_1: "সিনেমাটোগ্রাফি ও ভিডিও এডিটিং",
      feature_2: "ক্রিয়েটিভ ভিজ্যুয়ালাইজেশন",
      feature_3: "ইউটিউব এসইও ও চ্যানেল গ্রোথ",
      feature_4: "নাশিদ পরিবেশনা",
      brands_title: "প্ল্যাটফর্ম ও নেতৃত্ব",
      about_tag: "পেশাদার সারসংক্ষেপ",
      about_title: "কারিগরি দক্ষতা ও<br>গল্প বলার অনন্য<br>সমন্বয়",
      about_lead: "আতাহার নূর মুন্না একজন অভিজ্ঞ সিনেমাটোগ্রাফার এবং ক্রিয়েটিভ ভিজ্যুয়ালাইজার। ১০+ কোম্পানির সাথে ৩+ বছরেরও বেশি সময় কাজ করার বাস্তব অভিজ্ঞতা রয়েছে।",
      about_subtext: "ভিডিও এডিটিং, ইউটিউব এসইও এবং নাশিদ পরিবেশনায় বিশেষ দক্ষ।<br>উচ্চমানের ভিজ্যুয়াল স্টোরিটেলিংয়ে প্রতিশ্রুতিবদ্ধ।",
      card_1_tag: "৩+ বছর | ১০+ কোম্পানি",
      card_1_title: "সিনেমাটোগ্রাফি ও ভিডিও এডিটিং",
      card_2_tag: "সিইও @ চিরায়াত",
      card_2_title: "আতাহার নূর মুন্না",
      card_3_tag: "ইউটিউব এসইও ও শিল্পী",
      card_3_title: "ইউটিউব এসইও ও নাশিদ শিল্পী",
      exp_tag: "ক্যারিয়ার যাত্রা",
      exp_title: "পেশাগত অভিজ্ঞতা",
      role_1_title: "সিইও — চিরায়াত",
      role_1_meta: "বর্তমান নেতৃত্বমূলক ভূমিকা",
      role_1_p1: "চিরায়াতের ক্রিয়েটিভ ডিরেকশন, কন্টেন্ট স্ট্র্যাটেজি এবং চ্যানেল গ্রোথ পরিচালনা করেন।",
      role_1_p2: "মোটিভেশনাল এবং ক্রিয়েটিভ ভিডিও কন্টেন্টের মান নিয়ন্ত্রণ করেন।",
      role_2_title: "সিনেমাটোগ্রাফার ও ভিডিও এডিটর",
      role_2_meta: "৩ বছর | ১০+ কোম্পানি",
      role_2_p1: "বিভিন্ন ব্র্যান্ড ও প্রতিষ্ঠানের জন্য সিনেমাটোগ্রাফি এবং ভিডিও এডিটিং সেবা প্রদান।",
      role_2_p2: "অ্যাডোবি প্রিমিয়ার প্রো, আফটার ইফেক্টস, ডাভিঞ্চি রিজলভ, ক্যাপকাট ও ফিলমোরা প্রো দিয়ে ভিজ্যুয়াল কন্টেন্ট তৈরি।",
      role_2_p3: "কালার গ্রেডিং, মোশন গ্রাফিক্স এবং ক্রিয়েটিভ ভিজ্যুয়ালাইজেশন প্রয়োগ।",
      role_3_title: "ইউটিউব এসইও বিশেষজ্ঞ",
      role_3_meta: "২০১৭ — বর্তমান",
      role_3_p1: "২০১৭ সাল থেকে নিজস্ব এবং ক্লায়েন্ট চ্যানেলের ইউটিউব এসইও কাজ করছেন।",
      role_3_p2: "একাধিক চ্যানেলের ভিউয়ারশিপ এবং সার্চ র‍্যাংকিং বৃদ্ধিতে অবদান।",
      role_4_title: "নাশিদ শিল্পী",
      role_4_meta: "৪ বছরের অভিজ্ঞতা",
      role_4_p1: "গত ৪ বছর ধরে ইসলামিক নাশিদ ইন্ডাস্ট্রিতে শিল্পী হিসেবে কাজ করছেন।",
      role_4_p2: "নিয়মিত নিজস্ব নাশিদ চ্যানেলে কন্টেন্ট তৈরি ও প্রকাশ করেন।",
      skills_tag: "কারিগরি দক্ষতা",
      skills_title: "এডিটিং সফটওয়্যার ও মূল দক্ষতা",
      sw_heading: "এডিটিং সফটওয়্যার দক্ষতা",
      core_heading: "মূল সুবিধাসমূহ",
      edu_tag: "শিক্ষাগত যোগ্যতা",
      edu_title: "শিক্ষা ও ভাষাসমূহ",
      edu_1_title: "দাওরায়ে হাদিস",
      edu_2_title: "হিফজুল কুরআন",
      edu_2_year: "সম্পন্ন ২০১৮",
      edu_3_title: "এসএসসি",
      lang_heading: "ভাষাসমূহ",
      lang_bn: "বাংলা (মাতৃভাষা)",
      lang_en: "ইংরেজি",
      lang_ar: "আরবি",
      lang_ur: "উর্দু",
      footer_bio: "সিনেমাটোগ্রাফার ও ক্রিয়েটিভ ভিজ্যুয়ালাইজার। হাই-ইমপ্যাক্ট ভিডিও কন্টেন্ট, ইউটিউব এসইও স্ট্র্যাটেজি এবং ক্রিয়েটিভ ডিরেকশন প্রদান করেন।",
      entities_title: "পরিচালিত প্রতিষ্ঠান",
      channels_title: "যোগাযোগের মাধ্যম",
      created_by: "তৈরি করেছেন",

      // Projects Page
      proj_header_tag: "পোর্টফোলিও শোকেস",
      proj_header_title: "বিশেষ প্রজেক্ট ও ভিজ্যুয়াল কাজসমূহ",
      proj_header_desc: "সিনেমাটোগ্রাফি, ভিডিও এডিটিং, কালার গ্রেডিং এবং ইউটিউব এসইও কেস স্টাডি।",
      tab_all: "সব প্রজেক্ট",
      tab_cinema: "সিনেমাটোগ্রাফি",
      tab_editing: "ভিডিও এডিটিং",
      tab_grading: "কালার গ্রেডিং",
      tab_seo: "ইউটিউব এসইও",
      p1_cat: "সিনেমাটোগ্রাফি ও এডিটিং",
      p1_title: "চিরায়াতের জন্য মোটিভেশনাল ভিডিও সিরিজ প্রোডাকশন",
      p1_desc: "কাস্টম লাইটিং, মাল্টি-ক্যাম এডিটিং এবং কালার গ্রেডিং সমৃদ্ধ আকর্ষণীয় মোটিভেশনাল ভিডিও।",
      p2_cat: "নাশিদ ও ভিজ্যুয়াল",
      p2_title: "ইসলামিক মিউজিক ভিডিও ও নাশিদ ভিজ্যুয়াল ডিরেকশন",
      p2_desc: "শীর্ষস্থানীয় ইসলামিক নাশিদ মুক্তির জন্য সম্পূর্ণ ভিজ্যুয়াল ডিরেকশন ও পোস্ট-প্রোডাকশন।",
      p3_cat: "ইউটিউব এসইও",
      p3_title: "ক্লায়েন্ট চ্যানেল গ্রোথ: ০ থেকে ১০০কে সাবস্ক্রাইবার কেস স্টাডি",
      p3_desc: "ইউটিউব এসইও কিওয়ার্ড অপটিমাইজেশন, মেটাডেটা পুনর্গঠন এবং ক্লিক-থ্রু রেট বৃদ্ধি।",

      // Blog Page
      blog_header_tag: "নিবন্ধ ও আর্টিকেল",
      blog_header_title: "সর্বশেষ ব্লগ পোস্ট ও জ্ঞান বণ্টন",
      blog_header_desc: "ভিডিও এডিটিং, ইউটিউব এসইও, সিনেমাটোগ্রাফি ও ক্রিয়েটিভ ডিরেকশনের পেশাদার টিপস।",
      bcat_all: "সব ক্যাটাগরি",
      bcat_editing: "ভিডিও এডিটিং",
      bcat_seo: "ইউটিউব এসইও",
      bcat_cinema: "সিনেমাটোগ্রাফি",
      bcat_nasheed: "নাশিদ শিল্প",
      b1_cat: "ভিডিও এডিটিং",
      b1_title: "প্রিমিয়ার প্রো এবং আফটার ইফেক্টসের ১০টি অপরিহার্য ভিডিও এডিটিং ওয়ার্কফ্লো",
      b1_desc: "দ্রুত ভিডিও প্রোডাকশনের জন্য স্পিড এডিটিং টেকনিক, শর্টকাট কনফিগারেশন এবং কালার ম্যানেজমেন্ট শিখুন।",
      b2_cat: "ইউটিউব এসইও",
      b2_title: "২০২৬ সালে যেভাবে ইউটিউব ভিডিও রংক করবেন: মাস্টারক্লাস",
      b2_desc: "কিওয়ার্ড রিসার্চ টেকনিক, হাই সিটিআর থাম্বনেল ফর্মুলা এবং ওয়াচ টাইম বাড়ানোর কৌশল।",
      b3_cat: "নাশিদ শিল্প",
      b3_title: "ইসলামিক নাশিদ প্রোডাকশনের কলাকৌশল: পেছনের গল্প",
      b3_desc: "ইসলামিক নাশিদ মিউজিক ভিডিওর ভয়েস হারমনি, সাউন্ড ব্যালেন্সিং এবং ভিজ্যুয়াল ডিরেকশন।",
      b4_cat: "সিনেমাটোগ্রাফি",
      b4_title: "সিনেম্যাটিক লুকের জন্য ডাভিঞ্চি রিজলভ কালার গ্রেডিং সিক্রেট",
      b4_desc: "পেশাদার ভিডিও প্রোডাকশনের জন্য স্কিন টোন ব্যালেন্স, এলইউটি (LUT) প্রয়োগ এবং কালার কনট্রাস্ট।",
      b5_cat: "ভিডিও এডিটিং",
      b5_title: "চিরায়াত গড়ে তোলার গল্প: নেতৃত্ব ও ক্রিয়েটিভ ডিরেকশনের যাত্রা",
      b5_desc: "চিরায়াতকে একটি শীর্ষস্থানীয় ক্রিয়েটিভ ভিডিও ও মিডিয়া কোম্পানিতে উন্নীত করার অভিজ্ঞতা।",
      b6_cat: "সিনেমাটোগ্রাফি",
      b6_title: "পেশাদার সিনেমাটোগ্রাফির জন্য লাইটিং সেটআপ ও ক্যামেরা গিয়ার গাইড",
      b6_desc: "সিনেম্যাটিক গল্প বলার জন্য থ্রি-পয়েন্ট স্টুডিও লাইটিং, লেন্স সিলেকশন এবং ফ্রেম রেটের বিস্তারিত।"
    }
  };

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('site_lang', lang);
    const dict = translations[lang];

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict && dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    const langBtnText = document.getElementById('lang-btn-text');
    if (langBtnText) {
      langBtnText.textContent = lang === 'en' ? 'Bangla' : 'English';
    }

    // Re-render blog/project detail pages dynamically upon language switch
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    if (document.getElementById('detail-title') && typeof window.renderBlogDetailPage === 'function') {
      window.renderBlogDetailPage(slug || '10-essential-video-editing-workflows-in-premiere-pro-after-effects');
    }
    if (document.getElementById('project-title') && typeof window.renderProjectDetailPage === 'function') {
      window.renderProjectDetailPage(slug || 'motivational-video-series-production-for-chirayat');
    }
  }

  // --- Setup Header Event Listeners ---
  function initHeaderButtons() {
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        const newLang = currentLang === 'en' ? 'bn' : 'en';
        applyLanguage(newLang);
      });
    }

    const mobileBtn = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('mobile-open');
        mobileBtn.classList.toggle('active');
      });

      document.querySelectorAll('.nav-link').forEach((link) => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('mobile-open');
          mobileBtn.classList.remove('active');
        });
      });
    }
  }

  // --- Consultation Pop-up Form Modal Logic ---
  window.openConsultationModal = function () {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
      modal.classList.add('active');
    }
  };

  window.closeConsultationModal = function () {
    const modal = document.getElementById('consultation-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  };

  window.handleFormSubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById('modal-name')?.value || '';
    alert(`Thank you ${name}! Your consultation request has been submitted successfully. Atahar Noor Munna will reach out to you shortly.`);
    closeConsultationModal();
    e.target.reset();
  };

  window.sendToWhatsApp = function () {
    const name = document.getElementById('modal-name')?.value || 'Client';
    const phone = document.getElementById('modal-phone')?.value || 'N/A';
    const req = document.getElementById('modal-requirements')?.value || 'Consultation Inquiry';

    const text = `Hello Atahar Noor Munna,%0A%0AMy Name: ${encodeURIComponent(name)}%0AMobile/WhatsApp: ${encodeURIComponent(phone)}%0ARequirements: ${encodeURIComponent(req)}`;
    const url = `https://wa.me/8801331758098?text=${text}`;
    window.open(url, '_blank');
  };

  // --- Blog Logic (blog.html) ---
  window.filterBlogCategory = function (category) {
    const posts = document.querySelectorAll('.blog-card');
    posts.forEach(post => {
      if (category === 'all' || post.getAttribute('data-category') === category) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'none';
      }
    });

    const tabs = document.querySelectorAll('#blog-category-tabs .filter-btn');
    tabs.forEach(tab => {
      if (tab.getAttribute('data-category') === category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  };

  // Initialize blog category tabs
  document.querySelectorAll('#blog-category-tabs .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = btn.getAttribute('data-category');
      filterBlogCategory(cat);
    });
  });

  window.sortBlogPosts = function (order) {
    const container = document.getElementById('blog-posts-container');
    if (!container) return;

    const posts = Array.from(container.children);
    posts.sort((a, b) => {
      if (order === 'latest') {
        return new Date(b.getAttribute('data-date')) - new Date(a.getAttribute('data-date'));
      } else if (order === 'oldest') {
        return new Date(a.getAttribute('data-date')) - new Date(b.getAttribute('data-date'));
      } else if (order === 'popular') {
        return parseInt(b.getAttribute('data-views')) - parseInt(a.getAttribute('data-views'));
      }
      return 0;
    });

    posts.forEach(post => container.appendChild(post));
  };

  window.filterBlogSearch = function (query) {
    const posts = document.querySelectorAll('.blog-card');
    const q = query.toLowerCase();
    posts.forEach(post => {
      const title = post.querySelector('.blog-card-title').textContent.toLowerCase();
      const excerpt = post.querySelector('.blog-card-excerpt').textContent.toLowerCase();
      if (title.includes(q) || excerpt.includes(q)) {
        post.style.display = 'flex';
      } else {
        post.style.display = 'none';
      }
    });
  };

  // --- Full Blog & Project Detail Page Data Stores (Bilingual: EN & BN) ---
  const blogPostsData = {
    '10-essential-video-editing-workflows-in-premiere-pro-after-effects': {
      title: '10 Essential Video Editing Workflows in Premiere Pro & After Effects',
      titleBn: 'প্রিমিয়ার প্রো এবং আফটার ইফেক্টসে ১০টি গুরুত্বপূর্ণ ভিডিও এডিটিং ওয়ার্কফ্লো',
      category: 'Video Editing',
      categoryBn: 'ভিডিও এডিটিং',
      date: 'Aug 24, 2026',
      views: '1,420',
      image: 'card1.jpg',
      content: `
        <p>In modern video editing, speed and efficiency are just as crucial as visual creativity. When managing high-turnaround projects for brands, channel growth, or commercial advertisements, having an optimized workflow saves dozens of production hours.</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">1. Dynamic Link Optimization</h3>
        <p>Using Adobe Dynamic Link between Premiere Pro and After Effects allows seamless motion graphics integration without rendering intermediate file formats. Ensure your timeline cache is allocated on a dedicated fast NVMe SSD for real-time playback.</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">2. Customized Keyboard Shortcuts & Pancake Editing</h3>
        <p>Implement pancake editing by stacking two sequence timelines on top of each other. Pull raw selects directly into your main timeline using ripple edit shortcuts without losing momentum.</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">3. Color Space Consistency</h3>
        <p>Always align color space profiles between Lumetri Color and After Effects composition settings to prevent gamma shifts upon export.</p>
      `,
      contentBn: `
        <p>আধুনিক ভিডিও এডিটিংয়ে কাজের গতি এবং দক্ষতা ভিজ্যুয়াল ক্রিয়েটিভিটির মতোই অত্যন্ত গুরুত্বপূর্ণ। ব্র্যান্ডের জন্য দ্রুত কন্টেন্ট ডেলিভারি, চ্যানেল গ্রোথ বা বাণিজ্যিক বিজ্ঞাপনের প্রজেক্ট পরিচালনা করার সময় সঠিক ওয়ার্কফ্লো জানা থাকলে বহু সময় বাঁচে।</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">১. ডাইনামিক লিংক অপটিমাইজেশন</h3>
        <p>প্রিমিয়ার প্রো এবং আফটার ইফেক্টসের মধ্যে অ্যাডোবি ডাইনামিক লিংক ব্যবহার করলে মধ্যবর্তী ফাইল রেন্ডার ছাড়াই সরাসরি মোশন গ্রাফিক্স যুক্ত করা যায়। রিয়েল-টাইম প্লেব্যাকের জন্য আপনার টাইমলাইন ক্যাশ দ্রুতগতির NVMe SSD-তে রাখুন।</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">২. কাস্টমাইজড কিবোর্ড শর্টকাট ও প্যানকেক এডিটিং</h3>
        <p>দুটি সিকোয়েন্স টাইমলাইন একটির উপর আরেকটি রেখে প্যানকেক এডিটিং করুন। মূল টাইমলাইনে দ্রুত ফাইল ট্রিম করে রিফল এডিট শর্টকাট ব্যবহার করুন।</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">৩. কালার স্পেস ধারাবাহিকতা</h3>
        <p>লুমেট্রি কালার এবং আফটার ইফেক্টস কম্পোজিশনের কালার প্রোফাইল সবসময় মিলিয়ে রাখুন যাতে এক্সপোর্টের পর কালার পরিবর্তন না হয়।</p>
      `,
      takeaways: [
        'Dynamic link eliminates rendering bottlenecks between Premiere Pro & After Effects.',
        'Pancake editing increases rough-cut assembly speed by over 40%.',
        'NVMe cache allocation prevents timeline drop-frame stutters.'
      ],
      takeawaysBn: [
        'ডাইনামিক লিংক ব্যবহার করলে রেন্ডারিং ছাড়াই আফটার ইফেক্টস ও প্রিমিয়ার প্রোতে কাজ করা যায়।',
        'প্যানকেক এডিটিং কৌশল ভিডিও কাটছাঁট ও অ্যাসেম্বলির গতি ৪০% বাড়ায়।',
        'NVMe ক্যাশ বরাদ্দ টাইমলাইনে ফ্রেম ড্রপ বন্ধ করে।'
      ]
    },
    'how-to-rank-youtube-videos-in-2026-complete-seo-masterclass': {
      title: 'How to Rank YouTube Videos in 2026: Complete SEO Masterclass',
      titleBn: '২০২৬ সালে ইউটিউব ভিডিও র‍্যাংক করার উপায়: কমপ্লিট এসইও মাস্টারক্লাস',
      category: 'YouTube SEO',
      categoryBn: 'ইউটিউব এসইও',
      date: 'Aug 20, 2026',
      views: '2,850',
      image: 'atahar_noor.jpg',
      content: `
        <p>YouTube is the world's second-largest search engine. Ranking your content on search and suggested video feeds in 2026 requires understanding the dual metrics: Click-Through Rate (CTR) and Average Percentage Viewed (APV).</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">1. Keyword Intent & Title Formatting</h3>
        <p>Combine high-volume search terms with curiosity triggers. Place core keywords within the first 30 characters of the title.</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">2. High CTR Thumbnail Formula</h3>
        <p>Use high contrast colors (#f15722 orange combined with #2c8f8f teal), expressive human faces, and maximum 3 bold words of text overlay.</p>
      `,
      contentBn: `
        <p>ইউটিউব হলো বিশ্বের দ্বিতীয় বৃহত্তম সার্চ ইঞ্জিন। ২০২৬ সালে সার্চ এবং সাজেস্টেড ভিডিও ফিডে আপনার কন্টেন্ট র‍্যাংক করাতে হলে দুটি মূল ম্যাট্রিক্স বুঝতে হবে: ক্লিক-থ্রু রেট (CTR) এবং এভারেজ পার্সেন্টেজ ভিউড (APV)।</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">১. কিওয়ার্ড ইনটেন্ট এবং টাইটেল ফরম্যাটিং</h3>
        <p>উচ্চ সার্চ ভলিউম কিওয়ার্ডের সাথে কৌতুহল তৈরি করার মতো শব্দ যুক্ত করুন। টাইটেলের প্রথম ৩০ অক্ষরের মধ্যে মূল কিওয়ার্ড রাখুন।</p>
        <h3 style="font-size:20px; font-weight:800; color:var(--text-white); margin:24px 0 12px;">২. হাই সিটিআর থাম্বনেইল ফর্মুলা</h3>
        <p>উচ্চ কনট্রাস্ট কালার (#f15722 অরেঞ্জ এবং #2c8f8f ডিপ টিল), স্পষ্ট ফেস এক্সপ্রেশন এবং সর্বোচ্চ ৩টি বোল্ড শব্দের কাস্টম থাম্বনেইল ব্যবহার করুন।</p>
      `,
      takeaways: [
        'Place primary keywords within the first 30 characters of video titles.',
        'High contrast dual-color thumbnails boost CTR above 10%.',
        'Intros shorter than 5 seconds maximize first-minute retention.'
      ],
      takeawaysBn: [
        'ভিডিও টাইটেলের প্রথম ৩০ অক্ষরের মধ্যে মূল কিওয়ার্ড রাখুন।',
        'উচ্চ কনট্রাস্ট থাম্বনেইল ডিজাইন CTR ১০% এর উপরে বাড়ায়।',
        '৫ সেকেন্ডের কম ইন্ট্রো প্রথম মিনিটের ভিউয়ার রিটেনশন বাড়ায়।'
      ]
    },
    'the-art-of-islamic-nasheed-production-behind-the-scenes': {
      title: 'The Art of Islamic Nasheed Production: Behind the Scenes',
      titleBn: 'ইসলামিক নাশিদ প্রোডাকশনের শিল্প ও নেপথ্যের গল্প',
      category: 'Nasheed Art',
      categoryBn: 'নাশিদ আর্ট',
      date: 'Aug 18, 2026',
      views: '3,100',
      image: 'card3.jpg',
      content: `
        <p>Islamic Nasheed production combines vocal artistry, spiritual depth, and visual direction. Creating impactful nasheed tracks requires precise vocal layering, vocal percussion balancing, and evocative lighting setups.</p>
      `,
      contentBn: `
        <p>ইসলামিক নাশিদ প্রোডাকশন হলো ভোকাল আর্ট, আধ্যাত্মিক আবেগ এবং ভিজ্যুয়াল ডিরেকশনের এক অপূর্ব মেলবন্ধন। একটি অর্থপূর্ণ নাশিদ তৈরির জন্য নিখুঁত ভোকাল লেয়ারিং, ভোকাল পারকাশন ব্যালেন্সিং এবং গভীর লাইটিং প্রয়োজন।</p>
      `,
      takeaways: [
        'Multi-tracked vocal harmonies create a rich acoustic experience.',
        'Low-key lighting and atmospheric depth match spiritual themes.'
      ],
      takeawaysBn: [
        'মাল্টি-ট্র্যাকড ভোকাল হারমোনি রিচ অ্যাকোস্টিক অভিজ্ঞতা তৈরি করে।',
        'লো-কি লাইটিং এবং বায়ুমণ্ডলীয় গভীরতা ইসলামিক থিমের সাথে মানিয়ে যায়।'
      ]
    },
    'color-grading-secrets-in-davinci-resolve-for-cinematic-look': {
      title: 'Color Grading Secrets in DaVinci Resolve for Cinematic Look',
      titleBn: 'সিনেম্যাটিক লুকের জন্য ড্যাভিঞ্চি রিজলভের কালার গ্রেডিং গোপন কৌশল',
      category: 'Cinematography',
      categoryBn: 'সিনেমাটোগ্রাফি',
      date: 'Aug 15, 2026',
      views: '980',
      image: 'card3.jpg',
      content: `
        <p>DaVinci Resolve is the industry standard for color grading. Achieving a polished, cinematic film look requires structured node trees and careful skin tone isolation.</p>
      `,
      contentBn: `
        <p>ড্যাভিঞ্চি রিজলভ হলো কালার গ্রেডিংয়ের জন্য ইন্ডাস্ট্রির সেরা সফটওয়্যার। একটি নিখুঁত সিনেম্যাটিক ফিল্ম লুক পেতে সুনির্দিষ্ট নোড স্ট্রাকচার এবং স্কিন টোন ব্যালেন্স প্রয়োজন।</p>
      `,
      takeaways: [
        'Separate primary balancing nodes from creative color look nodes.',
        'Protect natural skin tones on the vector scope indicator line.'
      ],
      takeawaysBn: [
        'প্রাইমারি ব্যালেন্সিং নোড এবং ক্রিয়েটিভ কালার নোড আলাদা রাখুন।',
        'ভেক্টরস্কোপ ইন্ডিকেটরে প্রাকৃতিক স্কিন টোন বজায় রাখুন।'
      ]
    },
    'building-chirayat-leadership-creative-direction-journey': {
      title: 'Building Chirayat: Leadership & Creative Direction Journey',
      titleBn: 'চিরায়ত গড়ে তোলার গল্প: নেতৃত্ব ও ক্রিয়েটিভ ডিরেকশনের অভিজ্ঞতা',
      category: 'Video Editing',
      categoryBn: 'ভিডিও এডিটিং',
      date: 'Aug 10, 2026',
      views: '1,750',
      image: 'card1.jpg',
      content: `
        <p>Leading Chirayat as CEO has been a rewarding journey of aligning visual storytelling, brand building, and creative leadership. From initial video concepts to managing full production pipelines, quality commitment is non-negotiable.</p>
      `,
      contentBn: `
        <p>সিইও হিসেবে 'চিরায়ত' পরিচালনা করা ভিজ্যুয়াল স্টোরিটেলিং, ব্র্যান্ড বিল্ডিং এবং ক্রিয়েটিভ লিডারশিপের একটি দারুণ যাত্রা। ভিডিও আইডিয়া থেকে শুরু করে পূর্ণাঙ্গ প্রোডাকশন পাইপলাইন পরিচালনা করার অভিজ্ঞতা অসাধারণ।</p>
      `,
      takeaways: [
        'Creative leadership relies on clear brand standards.',
        'High production quality builds long-term client trust.'
      ],
      takeawaysBn: [
        'ক্রিয়েটিভ লিডারশিপের ভিত্তি হলো স্পষ্ট ব্র্যান্ড স্ট্যান্ডার্ড।',
        'উচ্চমানের ভিডিও প্রডাকশন দীর্ঘমেয়াদী ক্লায়েন্ট ট্রাস্ট তৈরি করে।'
      ]
    },
    'lighting-setup-camera-gear-guide-for-professional-cinematography': {
      title: 'Lighting Setup & Camera Gear Guide for Professional Cinematography',
      titleBn: 'প্রফেশনাল সিনেমাটোগ্রাফির লাইটিং সেটআপ ও ক্যামেরা গিয়ার গাইড',
      category: 'Cinematography',
      categoryBn: 'সিনেমাটোগ্রাফি',
      date: 'Aug 05, 2026',
      views: '2,210',
      image: 'card3.jpg',
      content: `
        <p>Great video quality starts with light quality before editing begins. Understanding key lights, fill lights, and hair rim lights creates 3D depth on flat screens.</p>
      `,
      contentBn: `
        <p>ভালো ভিডিও কোয়ালিটি এডিটিং শুরু হওয়ার আগেই লাইটিংয়ের সঠিক ব্যবহারের উপর নির্ভর করে। কি লাইট, ফিল লাইট এবং রিম লাইটের সঠিক ব্যবহার ফ্ল্যাট স্ক্রিনে থ্রিডি ডেপথ আনে।</p>
      `,
      takeaways: [
        'Soft key light positioning at 45 degrees flatters subject features.',
        'Backlight rim separation adds 3D depth to 2D footage.'
      ],
      takeawaysBn: [
        '৪৫ ডিগ্রি এঙ্গেলে সফট কি লাইট পজিশনিং সাবজেক্টের ভিজ্যুয়াল উন্নত করে।',
        'ব্যাকলাইট রিম সেপারেশন ভিডিওতে ৩ডি ডেপথ তৈরি করে।'
      ]
    }
  };

  const projectsData = {
    'motivational-video-series-production-for-chirayat': {
      title: 'Motivational Video Series Production for Chirayat',
      titleBn: 'চিরায়তের জন্য মোটিভেশনাল ভিডিও সিরিজ প্রোডাকশন',
      category: 'Cinematography & Editing',
      categoryBn: 'সিনেমাটোগ্রাফি এবং এডিটিং',
      client: 'Chirayat Media (@chirayat2.0)',
      role: 'CEO, Lead Cinematographer & Editor',
      roleBn: 'সিইও, প্রধান সিনেমাটোগ্রাফার এবং এডিটর',
      views: '4,850 Views',
      tools: 'Premiere Pro, DaVinci Resolve, Sony A7SIII',
      image: 'card1.jpg',
      content: `
        <p>A flagship motivational video production series created for Chirayat. The objective was to produce visually striking, emotionally resonant videos with professional cinematography, dynamic cuts, and custom sound design.</p>
      `,
      contentBn: `
        <p>চিরায়তের জন্য তৈরি একটি ফ্ল্যাগশিপ মোটিভেশনাল ভিডিও প্রোডাকশন সিরিজ। লক্ষ্য ছিল সিনেমাটোগ্রাফি, ডাইনামিক কাট এবং কাস্টম সাউন্ড ডিজাইনের মাধ্যমে নান্দনিক ভিডিও উপহার দেওয়া।</p>
      `
    },
    'islamic-music-video-nasheed-visual-direction': {
      title: 'Islamic Music Video & Nasheed Visual Direction',
      titleBn: 'ইসলামিক মিউজিক ভিডিও এবং নাশিদ ভিজ্যুয়াল ডিরেকশন',
      category: 'Nasheed & Visuals',
      categoryBn: 'নাশিদ এবং ভিজ্যুয়াল',
      client: 'Nasheed Channel (@ataharnoormunnaartist)',
      role: 'Nasheed Artist & Creative Director',
      roleBn: 'নাশিদ শিল্পী এবং ক্রিয়েটিভ ডিরেক্টর',
      views: '9,120 Views',
      tools: 'After Effects, Audition, Filmora Pro',
      image: 'card3.jpg',
      content: `
        <p>Complete visual direction and post-production for top Islamic Nasheed releases. Focused on spiritual aesthetic lighting, acoustic vocal harmonies, and cinematic color contrast.</p>
      `,
      contentBn: `
        <p>শীর্ষস্থানীয় ইসলামিক নাশিদের জন্য পূর্ণাঙ্গ ভিজ্যুয়াল ডিরেকশন এবং পোস্ট-প্রোডাকশন। আধ্যাত্মিক এস্থেটিক লাইটিং এবং সিনেমাটোগ্রাফিক কালার কনট্রাস্টে ফোকাস করা হয়েছে।</p>
      `
    },
    'client-channel-growth-0-to-100k-subscribers-case-study': {
      title: 'Client Channel Growth: 0 to 100K Subscribers Case Study',
      titleBn: 'ক্লায়েন্ট চ্যানেল গ্রোথ: ০ থেকে ১০০কে সাবস্ক্রাইবার কেস স্টাডি',
      category: 'YouTube SEO',
      categoryBn: 'ইউটিউব এসইও',
      client: 'Partner Media Company',
      role: 'YouTube SEO Strategist & Consultant',
      roleBn: 'ইউটিউব এসইও স্ট্র্যাটেজিস্ট এবং কনসালটেন্ট',
      views: '6,340 Views',
      tools: 'YouTube Studio, VidIQ, Photoshop, SEO Analytics',
      image: 'atahar_noor.jpg',
      content: `
        <p>A comprehensive YouTube channel growth case study demonstrating 0 to 100K subscriber scaling through SEO keyword placement, custom thumbnail design, and audience retention optimization.</p>
      `,
      contentBn: `
        <p>এসইও কিওয়ার্ড প্লেসমেন্ট, কাস্টম থাম্বনেইল ডিজাইন এবং ভিউয়ার রিটেনশন অপটিমাইজেশনের মাধ্যমে ০ থেকে ১০০ হাজার সাবস্ক্রাইবারে উন্নীত করার কেস স্টাডি।</p>
      `
    }
  };

  // --- Dynamic Detail Page Comments ---
  window.renderComments = function (slug) {
    const listContainer = document.getElementById('comments-list');
    const titleEl = document.getElementById('comments-count-title');
    if (!listContainer) return;

    const savedComments = JSON.parse(localStorage.getItem(`blog_comments_${slug}`) || '[]');
    if (titleEl) {
      titleEl.textContent = `Comments (${savedComments.length})`;
    }

    if (savedComments.length === 0) {
      listContainer.innerHTML = `<p style="font-size:14px; color:var(--text-muted); font-style:italic;">No comments yet. Be the first to share your thoughts!</p>`;
      return;
    }

    listContainer.innerHTML = savedComments.map(c => `
      <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); padding: 16px; border-radius: 12px; display: flex; gap: 12px; align-items: flex-start;">
        <div style="width: 38px; height: 38px; border-radius: 50%; background: var(--accent-teal); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px; flex-shrink: 0;">
          ${escapeHtml(c.name.charAt(0).toUpperCase())}
        </div>
        <div style="flex: 1;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
            <h5 style="font-size: 15px; font-weight: 700; color: var(--text-white); margin: 0;">${escapeHtml(c.name)}</h5>
            <span style="font-size: 12px; color: var(--text-muted);">${c.date}</span>
          </div>
          <p style="font-size: 14px; color: var(--text-muted); margin: 0; line-height: 1.5;">${escapeHtml(c.text)}</p>
        </div>
      </div>
    `).join('');
  };

  window.handleCommentSubmit = function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug') || '10-essential-video-editing-workflows-in-premiere-pro-after-effects';

    const nameInput = document.getElementById('comment-name');
    const emailInput = document.getElementById('comment-email');
    const textInput = document.getElementById('comment-text');

    if (!nameInput || !textInput) return;

    const newComment = {
      name: nameInput.value.trim(),
      email: emailInput ? emailInput.value.trim() : '',
      text: textInput.value.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    const savedComments = JSON.parse(localStorage.getItem(`blog_comments_${slug}`) || '[]');
    savedComments.unshift(newComment);
    localStorage.setItem(`blog_comments_${slug}`, JSON.stringify(savedComments));

    textInput.value = '';
    alert('Thank you! Your comment has been posted successfully.');
    renderComments(slug);
  };

  function escapeHtml(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  window.renderBlogDetailPage = function (slug) {
    const post = blogPostsData[slug] || blogPostsData['10-essential-video-editing-workflows-in-premiere-pro-after-effects'];
    if (!post) return;

    const currentLang = localStorage.getItem('site_lang') || 'en';
    const isBn = currentLang === 'bn';

    const title = isBn ? (post.titleBn || post.title) : post.title;
    const category = isBn ? (post.categoryBn || post.category) : post.category;
    const content = isBn ? (post.contentBn || post.content) : post.content;
    const takeaways = isBn ? (post.takeawaysBn || post.takeaways) : post.takeaways;

    document.title = `${title} — Atahar Noor Munna`;
    const titleEl = document.getElementById('detail-title');
    const catEl = document.getElementById('detail-category');
    const dateEl = document.getElementById('detail-date');
    const viewsEl = document.getElementById('detail-views');
    const imgEl = document.getElementById('detail-image');
    const contentEl = document.getElementById('detail-content');
    const takeawaysEl = document.getElementById('detail-takeaways');

    if (titleEl) titleEl.textContent = title;
    if (catEl) catEl.textContent = category.toUpperCase();
    if (dateEl) dateEl.textContent = post.date;
    if (viewsEl) viewsEl.textContent = post.views;
    if (imgEl) imgEl.src = post.image;
    if (contentEl) contentEl.innerHTML = content;

    if (takeawaysEl && takeaways) {
      takeawaysEl.innerHTML = takeaways.map(t => `<li style="margin-bottom:8px;">${t}</li>`).join('');
    }

    // Dynamic Social Meta Image & Title Update
    const fullImgUrl = `https://portfolio-atahar.pages.dev/${post.image}`;
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', fullImgUrl);
    let ogSecImg = document.querySelector('meta[property="og:image:secure_url"]');
    if (ogSecImg) ogSecImg.setAttribute('content', fullImgUrl);
    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', fullImgUrl);

    // Clean address bar URL so copying link from address bar copies slug.html URL
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', `${slug}.html`);
    }

    // Render Comments
    renderComments(slug);
  };

  window.renderProjectDetailPage = function (slug) {
    const proj = projectsData[slug] || projectsData['motivational-video-series-production-for-chirayat'];
    if (!proj) return;

    const currentLang = localStorage.getItem('site_lang') || 'en';
    const isBn = currentLang === 'bn';

    const title = isBn ? (proj.titleBn || proj.title) : proj.title;
    const category = isBn ? (proj.categoryBn || proj.category) : proj.category;
    const role = isBn ? (proj.roleBn || proj.role) : proj.role;
    const content = isBn ? (proj.contentBn || proj.content) : proj.content;

    document.title = `${title} — Project Case Study`;
    const titleEl = document.getElementById('project-title');
    const catEl = document.getElementById('project-category');
    const clientEl = document.getElementById('project-client');
    const roleEl = document.getElementById('project-role');
    const viewsEl = document.getElementById('project-views');
    const toolsEl = document.getElementById('project-tools');
    const imgEl = document.getElementById('project-image');
    const contentEl = document.getElementById('project-content');

    if (titleEl) titleEl.textContent = title;
    if (catEl) catEl.textContent = category.toUpperCase();
    if (clientEl) clientEl.textContent = proj.client;
    if (roleEl) roleEl.textContent = role;
    if (viewsEl) viewsEl.textContent = proj.views;
    if (toolsEl) toolsEl.textContent = proj.tools;
    if (imgEl) imgEl.src = proj.image;
    if (contentEl) contentEl.innerHTML = content;

    // Dynamic Social Meta Image & Title Update
    const fullImgUrl = `https://portfolio-atahar.pages.dev/${proj.image}`;
    let ogImg = document.querySelector('meta[property="og:image"]');
    if (ogImg) ogImg.setAttribute('content', fullImgUrl);
    let ogSecImg = document.querySelector('meta[property="og:image:secure_url"]');
    if (ogSecImg) ogSecImg.setAttribute('content', fullImgUrl);
    let twImg = document.querySelector('meta[name="twitter:image"]');
    if (twImg) twImg.setAttribute('content', fullImgUrl);

    // Clean address bar URL so copying link from address bar copies slug.html URL
    if (window.history && window.history.replaceState) {
      window.history.replaceState({}, '', `${slug}.html`);
    }
  };

  // --- Projects Filtering (projects.html) ---
  window.filterProjects = function (cat, btnEl) {
    const projects = document.querySelectorAll('#projects-grid .blog-card');
    projects.forEach(p => {
      if (cat === 'all' || p.getAttribute('data-category') === cat) {
        p.style.display = 'flex';
      } else {
        p.style.display = 'none';
      }
    });

    const tabs = document.querySelectorAll('.filter-bar .filter-btn');
    tabs.forEach(t => t.classList.remove('active'));
    
    if (btnEl) {
      btnEl.classList.add('active');
    } else if (window.event && window.event.currentTarget) {
      window.event.currentTarget.classList.add('active');
    } else if (window.event && window.event.target) {
      window.event.target.classList.add('active');
    }
  };

  // --- Frame Sequence Canvas Logic ---
  function getFramePath(index) {
    const frameNum = String(index + 1).padStart(3, '0');
    return `./ezgif-frame-${frameNum}.jpg`;
  }

  function preloadImages() {
    if (!canvas) return;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFramePath(i);
      img.onload = () => {
        loadedCount++;
        if (i === 0) {
          render();
        }
      };
      images.push(img);
    }
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    onScroll();
    render();
  }

  function render() {
    if (!canvas || !ctx) return;
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.max(0, Math.round(currentFrame))
    );
    const img = images[frameIndex];

    if (!img || !img.complete || img.naturalWidth === 0) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;

    // Full Aspect-Fill / Cover mode: Covers 100% of width and height on Desktop, Tablet & Mobile (Zero left/right gaps)
    const scale = Math.max(canvas.width / imgWidth, canvas.height / imgHeight);
    const drawWidth = imgWidth * scale;
    const drawHeight = imgHeight * scale;

    const drawX = (canvas.width - drawWidth) / 2;
    const drawY = (canvas.height - drawHeight) / 2;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
  }

  function updateAnimation() {
    if (!canvas) return;
    const diff = targetFrame - currentFrame;
    currentFrame += diff * 0.12;

    render();

    animationFrameId = requestAnimationFrame(updateAnimation);
  }

  function onScroll() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return;

    const scrollFraction = Math.max(0, Math.min(1, window.scrollY / maxScroll));
    targetFrame = scrollFraction * (TOTAL_FRAMES - 1);
  }

  // --- Active Nav Link Scroll Highlight ---
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id], footer[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSectionId = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        link.classList.remove('active');
        const dot = link.querySelector('.active-dot');
        if (dot) dot.remove();

        if (href === `#${currentSectionId}`) {
          link.classList.add('active');
          const activeDot = document.createElement('span');
          activeDot.className = 'active-dot';
          link.appendChild(activeDot);
        }
      }
    });
  }

  // --- Initialization ---
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', () => {
    onScroll();
    updateActiveNav();
  }, { passive: true });

  window.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    preloadImages();
    onScroll();
    initHeaderButtons();
    const savedLang = localStorage.getItem('site_lang') || 'en';
    applyLanguage(savedLang);
    if (canvas) {
      animationFrameId = requestAnimationFrame(updateAnimation);
    }
  });
})();
