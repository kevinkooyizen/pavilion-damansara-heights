import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Sticky header
  const header = document.getElementById('header');
  const backToTop = document.getElementById('backToTop');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
      backToTop.classList.add('show');
    } else {
      header.classList.remove('scrolled');
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll Reveal Observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve after revealing so it doesn't replay on every scroll up/down
        // observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.scroll-reveal').forEach((el) => {
    observer.observe(el);
  });

  // Translations
  const translations = {
    ja: {
      nav_about: "概要",
      nav_facilities: "施設",
      nav_floorplans: "間取り図",
      nav_location: "所在地",
      nav_articles: "記事",
      nav_book: "内覧予約",
      nav_call: "📞 今すぐ電話",
      hero_badge: "● インペリアル・レジデンシズ",
      hero_title: "新時代へ<br>パビリオンと共に",
      hero_desc: "人生のあらゆる贅沢を玄関口で体験してください。16エーカーの永久地権マスタープランの中で、比類なき利便性と洗練された生活が融合します。",
      hero_action1: "プライベート内覧を予約 →",
      hero_action2: "📞 詳細はお電話で",
      about_subtitle: "最高の住所",
      about_title: "統合された暮らしの頂点",
      about_desc1: "インペリアル・レジデンシズは機能性と豪華さを融合させ、パビリオン・ダマンサラ・ハイツで最も格式高い住宅タワーとして聳え立ちます。",
      about_desc2: "マレーシアのエリート層、業界リーダー、そして富裕層家庭から高い評価を受け、その独占性、威信、そして比類なき利便性が認められています。",
      about_feat1: "パビリオン・コンシェルジュサービス",
      about_feat2: "パビリオン・ライフスタイルモール直結",
      about_feat3: "パビリオン・ダマンサラ・ハイツMRT駅",
      about_feat4: "戦略的な永久地権マスタープラン",
      stats_h3: "1M+",
      stats_p: "平方フィートのエンターテインメント・レジャー・ショッピング施設",
      amenities_sub: "アーティストインプレッション",
      amenities_title: "格調高き到着体験",
      amenities_desc: "広大なポルテコシェールから天高くそびえる吹き抜けロビーまで、インペリアル・レジデンスのすべての細部は、帰宅のたびに特別な瞬間を感じられるよう丁寧に設計されています。",
      facilities_title: "施設ギャラリー",
      lvl6_title: "レベル 6: 中庭",
      lvl6_feat1: "温水ラッププール",
      lvl6_feat2: "キッズプール",
      lvl6_feat3: "ハーブガーデン",
      lvl50_title: "レベル 50: スカイ施設",
      lvl50_feat1: "スカイテラス",
      lvl50_feat2: "フィットネスセンター",
      lvl50_feat3: "個室ダイニングルーム",
      floorplan_sub: "洗練された世界",
      floorplan_title: "間取り図",
      h2_title: "タイプ H2 / H2A",
      h2_bed: "4,090 sq. ft. | 4 続き部屋ベッドルーム",
      h2_desc: "ラナイ、スタジオエリア、ウェット/ドライキッチン完備。",
      h1_title: "タイプ H1 / H1A",
      h1_bed: "3,380 sq. ft. | 3 続き部屋ベッドルーム",
      h1_desc: "スタジオとラナイを備え、広々とした生活空間を最適化。",
      loc_sub: "すべての中心地",
      loc_title: "所在地・アクセス",
      trans_title: "交通アクセス",
      trans1: "MRTダマンサラ・ハイツ（400m）",
      trans2: "KLセントラル（2駅先）",
      trans3: "KLIAエクスプレス直通",
      form_title: "お問い合わせ・内覧予約",
      form_name: "名前",
      form_email: "メールアドレス",
      form_btn: "登録を完了する",
      footer_desc: "統合された暮らしの頂点。<br>ダマンサラ・ハイツ、KL。",
      ql_title: "クイックリンク",
      contact_title: "お問い合わせ",
      contact1: "<span style=\"color: var(--gold)\">📍</span> ブキ・ダマンサラ、KL",
      contact2: "<span style=\"color: var(--gold)\">📞</span> +603 1234 5678"
    },
    en: {
      nav_about: "Overview",
      nav_facilities: "Facilities",
      nav_floorplans: "Floor Plans",
      nav_location: "Location",
      nav_articles: "Insights",
      nav_book: "Book Viewing",
      nav_call: "📞 Call Now",
      hero_badge: "● IMPERIAL RESIDENCES",
      hero_title: "INTO THE NEW<br>WITH PAVILION",
      hero_desc: "Experience every luxury of life right at your doorstep. Imperial Residences merges unparalleled convenience and refined living within a 16-acre freehold masterplan.",
      hero_action1: "Book Private Viewing →",
      hero_action2: "📞 Call For More Info",
      about_subtitle: "THE PREFERRED ADDRESS",
      about_title: "THE HEIGHT OF INTEGRATED LIVING",
      about_desc1: "Imperial Residences merges functionality with luxury to stand as the most prestigious residential tower in Pavilion Damansara Heights.",
      about_desc2: "Highly regarded by Malaysia's elite, industry leaders, and affluent families, recognized for its exclusivity, prestige, and unparalleled convenience.",
      about_feat1: "Pavilion Concierge Services",
      about_feat2: "Seamless Connection to Pavilion Lifestyle Mall",
      about_feat3: "Pavilion Damansara Heights MRT Station",
      about_feat4: "Strategic Freehold Masterplan",
      stats_h3: "1M+",
      stats_p: "sq. ft. of entertainment, leisure & shopping",
      amenities_sub: "ARTIST'S IMPRESSION",
      amenities_title: "A GRAND ARRIVAL EXPERIENCE",
      amenities_desc: "From the expansive porte-cochère to the soaring double-volume lobby, every detail at Imperial Residences is meticulously designed to create a sense of occasion each time you return home.",
      facilities_title: "Facilities & Gallery",
      lvl6_title: "Level 6: The Courtyard",
      lvl6_feat1: "Heated Lap Pool",
      lvl6_feat2: "Kids Pool",
      lvl6_feat3: "Herb Garden",
      lvl50_title: "Level 50: Sky Facilities",
      lvl50_feat1: "Sky Terrace",
      lvl50_feat2: "Fitness Centre",
      lvl50_feat3: "Private Dining Room",
      floorplan_sub: "A World of Refinement",
      floorplan_title: "Floor Layouts",
      h2_title: "Type H2 / H2A",
      h2_bed: "4,090 sq. ft. | 4 Ensuite Bedrooms",
      h2_desc: "Features Lanai, Studio Area, Wet/Dry Kitchen.",
      h1_title: "Type H1 / H1A",
      h1_bed: "3,380 sq. ft. | 3 Ensuite Bedrooms",
      h1_desc: "Features Studio + Lanai, optimized for spacious living.",
      loc_sub: "In the Heart of Everything",
      loc_title: "Location & Connectivity",
      trans_title: "Transportation",
      trans1: "MRT Damansara Heights (400m)",
      trans2: "KL Sentral (2 stops away)",
      trans3: "KLIA Express Access",
      form_title: "Register Your Interest",
      form_name: "Name",
      form_email: "Email",
      form_btn: "Submit Registration",
      footer_desc: "The Height of Integrated Living.<br>Damansara Heights, KL.",
      ql_title: "QUICK LINKS",
      contact_title: "CONTACT US",
      contact1: "<span style=\"color: var(--gold)\">📍</span> Bukit Damansara, KL",
      contact2: "<span style=\"color: var(--gold)\">📞</span> +603 1234 5678"
    }
  };

  // Language Dropdown
  const dropdown = document.querySelector('.dropdown');
  const langBtn = document.querySelector('.lang-btn');
  const langItems = document.querySelectorAll('.dropdown-content a');

  function setLanguage(lang) {
    const dict = translations[lang];
    if (!dict) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      if (dict[key]) {
        el.placeholder = dict[key];
      }
    });
  }

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('show');
  });

  window.addEventListener('click', () => {
    if (dropdown.classList.contains('show')) {
      dropdown.classList.remove('show');
    }
  });

  langItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const text = item.textContent;
      const lang = item.getAttribute('data-lang');
      langBtn.innerHTML = text + ' ▾';
      setLanguage(lang);
    });
  });
});
