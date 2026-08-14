import { CraftProduct, VerificationRequest, ArtisanProfile, OrderItem } from '../types';

export const INITIAL_PRODUCTS: CraftProduct[] = [
  {
    id: 'prod-bagru-dupatta',
    certificateId: 'BG-2026-00142',
    name: 'Bagru Hand-Block Printed Dupatta',
    category: 'Dupatta',
    price: 1850,
    currency: '₹',
    isVerified: true,
    isGiTagged: true,
    giTagLabel: 'Registered (Bagru Prints)',
    origin: 'Bagru, Rajasthan',
    region: 'Rajasthan',
    material: '100% Organic Cotton (GOTS certified)',
    technique: 'Hand-carved wooden blocks + natural dye',
    craftingTime: '8 hours',
    description: 'Authentic hand-block printed stole crafted with centuries-old Chippa techniques using vegetable indigo, harda mordant, and hand-carved teak wood blocks. Every print irregularity is the mark of living heritage.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe-L81GGbKcxNjyUl49I2_WyZsnwWIk6ynY11kd18_4snjBJiCUVWQZSmNB5fb5kmRqJCk9M790aRrPH2PcMYikoTS1F2iK9PMpu1ZiVzZfv7zXxe7a351NeW9s5CM2NmT0ZrnY7NVNRTQ3_BFqQs8dea-2MjJUlmnQLjP7vyG8h7dOYp84sySH0M4cxWUxk2S8Xllo4Y-Cl5E_-Q2lfhH4p5DpLKQw8NXubFSdL_nuVhMpZ86KWuD',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBK5OQH7pOiClH1qrM9T2A2ByOa5Ts99db3O_f9O2mMw51LU4rl4jC4gcws8qIXXVM0HEeDP7kuO1h_0Ezmu5yLcGxmDvRIsIR-Wi2cFHfr1f7dBXOs6O645xR3DeHnWti1fu9H-GBEieWdBt5yzBc5iloDoTFyImjRI-Dfua2PUkWnKEuBkzZsnhOqNfgtUXAM6h69tp42fLfNnXD21VRPuZV3lVebs5ffKZ_LImN_8ipqPeum4QAs',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBXCp75zjCe20uYOwKBk1RijEtV2pip4vBgFmRt5jKKmEJ9zoIK2Es7ZZm-XDHafpJATDc0awGndJ5caEZ_JxCFYN5X6Q_Zi3P2wj6XGRIfOp7St1ld1vAr_YpGILUnC8_vA99GcI_E9K2faz9pcqj6PYXl9Z0fLcPKC6pPkY-4yBIGyM03ody8DTix_gIUniazymZOZ-xTJmRhD-XeCX59n7smHcwZJkkau9rJWB67rIaa_3D4PAO3',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSmXaAM8Yx1GaTLelCwLkSD6WWGvnlIwldgM59zvwHAcs7FdMBYoVqMOHbGizG9fJNNJn2E2VQfiFRT6JNxoxCFemGNPLPNOzlpiWcdBVmeWm_fz6bBYnML8_p71WirjNAs3m2sGPfZEkVg-IVhBoMYtNzjMFVJRzZ7t-BzhB1HajQ1osh6acx6F3AM1D3Z9ptSn9LxCeMDC2NSqNtkACqvqGBaJfFNQJjzBNXzdF7fM3bUwK9OPW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEM9nQL6CtC8-N7A8_POgvvbF3PGdk7NFRmq66NWhvCnPMxgsDGgoBjr8RB1bVwGueIOK7RD1v8CWfrPn6wPRbD4IfypEk0HFTDmVoI3_-3ouy0pH0hx-76XQmWz3A-qmPMgmU4bENu8NzHxcPTvGgb-WPKTSE7rWzV6uoRxagoStOwX8qBd_txbwqJeFwU_HqACuCy3JrRj64HfXox_ja_prg5sZMTHY0XXSi1T1I-iAiNM0pnfo3'
    ],
    artisanId: 'artisan-kamla-devi',
    artisanName: 'Kamla Devi',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfHUMy76PCs0qnla6u6p22nS8e3EAsxzhAG0gI7oISyAfUv_gTK8V25saDVPLJ16JxtZIaZFycc9NZjIaKTnWScHlVJWDNT4T-0nyLLtj_X_IiUEa-bVORyx12WqQrxe4QExYJAAV0V45C-dgy7i3uUfFpts6N8OGHZm99nQNhYw2gM4uG_o6mvFg8hANC2PT9k67laXgNVRQDxo48vvJeGCvmv_27bo9Lr60k4sHIQOcyFDkbeOQt',
    artisanExperience: '32 Years Experience',
    artisanBio: 'A third-generation block printer, Kamla Devi has dedicated her life to preserving the traditional Bagru motifs. Her deep understanding of natural dyes and the precise rhythm of the block pressing results in textiles that are not just beautiful, but carry the soul of the craft.',
    priceBreakdown: {
      artisan: 1450,
      logistics: 220,
      craftpass: 180,
      currency: '₹'
    },
    verificationChecks: [
      { id: '1', label: 'Artisan identity verified', icon: 'how_to_reg', verified: true },
      { id: '2', label: 'Craft verified', icon: 'texture', verified: true },
      { id: '3', label: 'Origin recorded', icon: 'location_on', verified: true },
      { id: '4', label: 'Handmade process declared', icon: 'front_hand', verified: true }
    ],
    timeline: [
      { step: 1, title: 'Artisan Registered', date: 'Feb 2024', icon: 'person_add', status: 'completed' },
      { step: 2, title: 'Craft Verified', date: 'Mar 2024', icon: 'approval', status: 'completed' },
      { step: 3, title: 'Product Registered', date: 'Aug 2026', icon: 'inventory_2', status: 'completed' },
      { step: 4, title: 'CraftPass Issued', date: 'Aug 2026', icon: 'workspace_premium', status: 'completed' },
      { step: 5, title: 'Customer Verified', date: 'Pending', icon: 'person_search', status: 'pending' }
    ],
    verificationDate: 'August 2026'
  },
  {
    id: 'prod-pokhran-vase',
    certificateId: 'PK-2026-00892',
    name: 'Pokhran Terracotta Vase',
    category: 'Pottery',
    price: 2200,
    currency: '₹',
    isVerified: true,
    isGiTagged: true,
    giTagLabel: 'GI Tagged',
    origin: 'Pokhran, Rajasthan',
    region: 'Rajasthan',
    material: 'Natural Pokhran Red Clay',
    technique: 'Wheel-thrown & incised geometric carving',
    craftingTime: '14 hours',
    description: 'Wheel-turned baked terracotta pitcher with hand-etched tribal geometric motifs fired in traditional open pit kilns. Rich in iron oxides for distinct reddish hue.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB3rULLeuszwHmqaXXT5m9ekHkW4-7uYPPpWZwWW2tcO0YbY_pJwEGAiopuVxwDEBuL0CSkeTnc81QGEHJTLsG3VYOZswb0xIRJGjQ_z4hWYPgxzI1aCnNoNAtll1-sM7yNo54PNnJoJVYIZZsVQi_f4zbPp3gXo6RopM6DNs0FLbhaOQFcjGnGAp_JRQLi9bYbwZmCDK4yd33TPuL8U5WEy72TyUckAPoBbAXnb8Fgq5SijyfjWTST',
    artisanId: 'artisan-collective-pokhran',
    artisanName: 'Artisan Collective',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUZr86cE79VrbJzYx2CSaOOk55G7abJHODDd5PWUqVgEMbuXVY8mzZhrLcbstKXdn6-rTj0XOesJZ3_P_ud_QlwEPBooAoANRkMQzp3ovTBSfMczlS6SzZAOhHeLckkH0SbquX5Jh1yx8ij4fvF1EH1fqPiBLZ6IqF55a4uujHpRZOX6ZkoTsP_kpSLzDvVVaD8FFg5_qpMSTtv97Vtw8ykt2NZilH0otBUBidosdmN7NbozSJhFRh',
    artisanExperience: '25+ Years Collective Guild',
    artisanBio: 'A community guild preserving the rare porous terracotta pottery tradition of the Thar desert, creating breathing water vessels and architectural decor pieces.',
    priceBreakdown: {
      artisan: 1720,
      logistics: 280,
      craftpass: 200,
      currency: '₹'
    },
    verificationChecks: [
      { id: '1', label: 'Artisan guild verified', icon: 'how_to_reg', verified: true },
      { id: '2', label: 'GI Tag certified', icon: 'location_on', verified: true },
      { id: '3', label: 'Kiln firing validated', icon: 'local_fire_department', verified: true },
      { id: '4', label: 'Eco-mineral clay tested', icon: 'eco', verified: true }
    ],
    timeline: [
      { step: 1, title: 'Guild Onboarded', date: 'Jan 2024', icon: 'group_add', status: 'completed' },
      { step: 2, title: 'GI Status Audited', date: 'May 2024', icon: 'verified', status: 'completed' },
      { step: 3, title: 'Batch Inspected', date: 'Jul 2026', icon: 'inventory_2', status: 'completed' },
      { step: 4, title: 'CraftPass Issued', date: 'Aug 2026', icon: 'workspace_premium', status: 'completed' },
      { step: 5, title: 'Collector Registered', date: 'Pending', icon: 'person_search', status: 'pending' }
    ],
    verificationDate: 'August 2026'
  },
  {
    id: 'prod-pashmina-shawl',
    certificateId: 'WL-2025-01003',
    name: 'Hand-loomed Pashmina Shawl',
    category: 'Textiles',
    price: 15000,
    currency: '₹',
    isVerified: true,
    isGiTagged: true,
    giTagLabel: 'GI Tagged',
    origin: 'Srinagar, Kashmir',
    region: 'Kashmir',
    material: '100% Raw Changthangi Capra Hircus Cashmere',
    technique: 'Hand-spun spinning wheel & handloom weave',
    craftingTime: '180 hours',
    description: 'Drape of pure mountain cashmere woven on traditional wooden looms in old Srinagar. Feathery lightness with incredible thermal insulation and hand-finished selvedge.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe31iSPQ1aVzowobk5ba1O1nBt7LvM2VQBZJbY5Uw0DHfezr1ZP_UhFX-ERelAhaP2YqX0BZfMt2BZ-geNbG_B_B0hSBOWgp2mqqlfI77ewcbPZnz5JYPbfOENkKw6MYC8Y__aVdQ2khfT_ykXfUgEwY3oRFdi05CB9CHyc_mu8BdAyRAGFd5ICK1CBmo_bFHEMBtyK9RJoPdpcDrjFFbKwMWDcgyZhPwYqURLSWijAIN5aURot8RG',
    artisanId: 'artisan-tariq-ahmad',
    artisanName: 'Tariq Ahmad',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1HKkg9WV87t5he9HiJQVaUUpJy8sLPtxt50PlGWvUfusqmJB4jVzmHmW8CG5nCrADLfNwFdHkhizFki4RyPPLQQHEIGJBIwlIdC2W1w5_2AqMO3_tE_xYQmg10B8L6XOyBHcxjg3qTOZMIBekkKvKS1AIPRBJ8b-kWXkJIQQ-F5dLGtoR2fuo-5s03nppIM8iPlF26opOBnVG_lXqxxJwSNrgXpgFgjFo7A9_L01nxK5yH3bMBb4N',
    artisanExperience: '40 Years Experience',
    artisanBio: 'Master weaver in Downtown Srinagar whose family has spun superfine Changthangi goat wool on wooden charkhas and pit looms for four generations.',
    priceBreakdown: {
      artisan: 12500,
      logistics: 1500,
      craftpass: 1000,
      currency: '₹'
    },
    verificationChecks: [
      { id: '1', label: 'Purity micron test: <15 micron', icon: 'biotech', verified: true },
      { id: '2', label: 'GI Pashmina certification', icon: 'workspace_premium', verified: true },
      { id: '3', label: 'Charkha spin authenticity', icon: 'rotate_right', verified: true },
      { id: '4', label: 'No synthetic blending certified', icon: 'check_circle', verified: true }
    ],
    timeline: [
      { step: 1, title: 'Artisan Registered', date: 'Nov 2023', icon: 'person_add', status: 'completed' },
      { step: 2, title: 'Wool Lab Testing', date: 'Feb 2024', icon: 'biotech', status: 'completed' },
      { step: 3, title: 'Weave Verification', date: 'Aug 2025', icon: 'approval', status: 'completed' },
      { step: 4, title: 'CraftPass Issued', date: 'Aug 2025', icon: 'workspace_premium', status: 'completed' },
      { step: 5, title: 'Delivered to Owner', date: 'Aug 2025', icon: 'inventory', status: 'completed' }
    ],
    verificationDate: 'August 2025'
  }
];

export const INITIAL_VERIFICATION_REQUESTS: VerificationRequest[] = [
  {
    id: 'req-1',
    certificateId: 'BG-2026-00142',
    craftName: 'Bagru Block Printing',
    productName: 'Indigo Hand-Block Stole',
    artisanId: 'artisan-kamla-devi',
    artisanName: 'Kamla Devi',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvTV9zIyQ3IGlfWtrhID3sgZ-Cas3xIE1aC6n6GrlAQkscAHrwclJUp5nhsGq3T77f4KmHMbRyUeIBRfFi4obKc8Hy8wImfATn2KSv_tct4K9MGHCkmGKO4E5MqyZIMdEl9RyEEkZOepbJjNn4AGCurvNsqHv6n9nFimFenvFS3hZwdev2xZPTAZ_8bZWOAll3GO8fAj0V_mry-fCb-LwUFwhJy40I-3KUK77Lzc06Q3fspKdaQ6Ro',
    artisanRegNumber: 'ART-2018-492 (Active)',
    region: 'Bagru, Rajasthan, India',
    giTagRegistered: true,
    giTagName: 'Registered (Bagru Prints)',
    status: 'pending',
    submittedTimeAgo: '2 hrs ago',
    submissionDate: 'August 14, 2026',
    declaredMaterials: [
      '100% Organic Cotton (GOTS certified)',
      'Natural Indigo Dye',
      'Alum Mordant',
      'Harda (Myrobalan) Pre-treatment'
    ],
    declaredProcess: 'Traditional Dabu (mud resist) hand-block printing, natural vat dyeing, sun dried on open sandy riverbanks.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBXCp75zjCe20uYOwKBk1RijEtV2pip4vBgFmRt5jKKmEJ9zoIK2Es7ZZm-XDHafpJATDc0awGndJ5caEZ_JxCFYN5X6Q_Zi3P2wj6XGRIfOp7St1ld1vAr_YpGILUnC8_vA99GcI_E9K2faz9pcqj6PYXl9Z0fLcPKC6pPkY-4yBIGyM03ody8DTix_gIUniazymZOZ-xTJmRhD-XeCX59n7smHcwZJkkau9rJWB67rIaa_3D4PAO3',
    processImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtSmXaAM8Yx1GaTLelCwLkSD6WWGvnlIwldgM59zvwHAcs7FdMBYoVqMOHbGizG9fJNNJn2E2VQfiFRT6JNxoxCFemGNPLPNOzlpiWcdBVmeWm_fz6bBYnML8_p71WirjNAs3m2sGPfZEkVg-IVhBoMYtNzjMFVJRzZ7t-BzhB1HajQ1osh6acx6F3AM1D3Z9ptSn9LxCeMDC2NSqNtkACqvqGBaJfFNQJjzBNXzdF7fM3bUwK9OPW',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAEM9nQL6CtC8-N7A8_POgvvbF3PGdk7NFRmq66NWhvCnPMxgsDGgoBjr8RB1bVwGueIOK7RD1v8CWfrPn6wPRbD4IfypEk0HFTDmVoI3_-3ouy0pH0hx-76XQmWz3A-qmPMgmU4bENu8NzHxcPTvGgb-WPKTSE7rWzV6uoRxagoStOwX8qBd_txbwqJeFwU_HqACuCy3JrRj64HfXox_ja_prg5sZMTHY0XXSi1T1I-iAiNM0pnfo3'
    ],
    verifierNotes: '',
    checks: {
      artisanIdentity: false,
      originAndGi: true,
      processAndMaterials: false
    }
  },
  {
    id: 'req-2',
    certificateId: 'PT-2025-08911',
    craftName: 'Pochampally Ikat Saree',
    productName: 'Double Ikat Silk Saree',
    artisanId: 'artisan-ramesh-coop',
    artisanName: 'Ramesh Weaver Coop',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBUZr86cE79VrbJzYx2CSaOOk55G7abJHODDd5PWUqVgEMbuXVY8mzZhrLcbstKXdn6-rTj0XOesJZ3_P_ud_QlwEPBooAoANRkMQzp3ovTBSfMczlS6SzZAOhHeLckkH0SbquX5Jh1yx8ij4fvF1EH1fqPiBLZ6IqF55a4uujHpRZOX6ZkoTsP_kpSLzDvVVaD8FFg5_qpMSTtv97Vtw8ykt2NZilH0otBUBidosdmN7NbozSJhFRh',
    artisanRegNumber: 'WEAV-2021-081',
    region: 'Pochampally, Telangana, India',
    giTagRegistered: true,
    giTagName: 'Pochampally Ikat (GI #4)',
    status: 'needs_info',
    submittedTimeAgo: '1 day ago',
    submissionDate: 'August 13, 2026',
    declaredMaterials: ['Pure Mulberry Silk', 'Azo-free vegetable reactive dyes'],
    declaredProcess: 'Resist-dyed warp and weft yarns aligned on frame loom with mathematical precision.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDe-L81GGbKcxNjyUl49I2_WyZsnwWIk6ynY11kd18_4snjBJiCUVWQZSmNB5fb5kmRqJCk9M790aRrPH2PcMYikoTS1F2iK9PMpu1ZiVzZfv7zXxe7a351NeW9s5CM2NmT0ZrnY7NVNRTQ3_BFqQs8dea-2MjJUlmnQLjP7vyG8h7dOYp84sySH0M4cxWUxk2S8Xllo4Y-Cl5E_-Q2lfhH4p5DpLKQw8NXubFSdL_nuVhMpZ86KWuD',
    processImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCznciwuiy7bfALVdjN-H8xb_uyMs8GuKLob5PxZTmtN6xF5yXLy3ziiTfFSzO8vTwlpYloqyH0YHG08WGUl26tql9D02trygGGoygB_S6kJheMwbvOMNhVYkugaxmMlYmJOXMVaf6dfmOkkl-znuFjCGG2vVChqNm9O3pzVEzKWk9tOn8azl4KpPS01D3jA5m4e8mZQxSDHmP5rIFFWIyqTNcDhd_y8BgBGU6-sFwfRfOfxxog04T7'
    ],
    verifierNotes: 'Please provide high-resolution photo of the yarn tying alignment stage.',
    checks: {
      artisanIdentity: true,
      originAndGi: true,
      processAndMaterials: false
    }
  },
  {
    id: 'req-3',
    certificateId: 'WL-2025-01003',
    craftName: 'Kashmiri Pashmina',
    productName: 'Hand-loomed Pashmina Shawl',
    artisanId: 'artisan-tariq-ahmad',
    artisanName: 'Tariq Ahmad',
    artisanAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1HKkg9WV87t5he9HiJQVaUUpJy8sLPtxt50PlGWvUfusqmJB4jVzmHmW8CG5nCrADLfNwFdHkhizFki4RyPPLQQHEIGJBIwlIdC2W1w5_2AqMO3_tE_xYQmg10B8L6XOyBHcxjg3qTOZMIBekkKvKS1AIPRBJ8b-kWXkJIQQ-F5dLGtoR2fuo-5s03nppIM8iPlF26opOBnVG_lXqxxJwSNrgXpgFgjFo7A9_L01nxK5yH3bMBb4N',
    artisanRegNumber: 'KASH-2015-1102',
    region: 'Srinagar, Kashmir',
    giTagRegistered: true,
    giTagName: 'Kashmir Pashmina (GI #46)',
    status: 'verified',
    submittedTimeAgo: '2 days ago',
    submissionDate: 'August 12, 2026',
    declaredMaterials: ['100% Changthangi Goat Underfleece'],
    declaredProcess: 'Hand-carded, spun on Yender wheel, woven on wooden pit loom.',
    mainImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe31iSPQ1aVzowobk5ba1O1nBt7LvM2VQBZJbY5Uw0DHfezr1ZP_UhFX-ERelAhaP2YqX0BZfMt2BZ-geNbG_B_B0hSBOWgp2mqqlfI77ewcbPZnz5JYPbfOENkKw6MYC8Y__aVdQ2khfT_ykXfUgEwY3oRFdi05CB9CHyc_mu8BdAyRAGFd5ICK1CBmo_bFHEMBtyK9RJoPdpcDrjFFbKwMWDcgyZhPwYqURLSWijAIN5aURot8RG',
    processImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1HKkg9WV87t5he9HiJQVaUUpJy8sLPtxt50PlGWvUfusqmJB4jVzmHmW8CG5nCrADLfNwFdHkhizFki4RyPPLQQHEIGJBIwlIdC2W1w5_2AqMO3_tE_xYQmg10B8L6XOyBHcxjg3qTOZMIBekkKvKS1AIPRBJ8b-kWXkJIQQ-F5dLGtoR2fuo-5s03nppIM8iPlF26opOBnVG_lXqxxJwSNrgXpgFgjFo7A9_L01nxK5yH3bMBb4N'
    ],
    verifierNotes: 'Verified with official lab test #K-8991. Pure cashmere under 14.5 microns.',
    checks: {
      artisanIdentity: true,
      originAndGi: true,
      processAndMaterials: true
    }
  }
];

export const ARTISAN_KAMLA_PROFILE: ArtisanProfile = {
  id: 'artisan-kamla-devi',
  name: 'Kamla Devi',
  craft: 'Bagru Hand-Block Printing',
  location: 'Bagru, Rajasthan, India',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfHUMy76PCs0qnla6u6p22nS8e3EAsxzhAG0gI7oISyAfUv_gTK8V25saDVPLJ16JxtZIaZFycc9NZjIaKTnWScHlVJWDNT4T-0nyLLtj_X_IiUEa-bVORyx12WqQrxe4QExYJAAV0V45C-dgy7i3uUfFpts6N8OGHZm99nQNhYw2gM4uG_o6mvFg8hANC2PT9k67laXgNVRQDxo48vvJeGCvmv_27bo9Lr60k4sHIQOcyFDkbeOQt',
  experienceYears: 32,
  bio: 'A third-generation block printer, Kamla Devi has dedicated her life to preserving traditional Bagru motifs. Her deep understanding of natural dyes and the precise rhythm of the block pressing results in textiles that are not just beautiful, but carry the soul of the craft.',
  productsCount: 12,
  verifiedCount: 12,
  status: 'Verified',
  giCertified: true,
  specialty: 'Dabu Mud Resist & Natural Indigo Vat Dyeing'
};

export const RECENT_ORDERS: OrderItem[] = [
  {
    id: 'ord-1',
    orderNumber: '#4092',
    productName: 'Block Print Saree',
    price: 4200,
    currency: '₹',
    date: 'Today, 11:20 AM',
    status: 'Processing',
    buyerName: 'Aarav Mehta'
  },
  {
    id: 'ord-2',
    orderNumber: '#4091',
    productName: 'Terracotta Vase',
    price: 1850,
    currency: '₹',
    date: 'Yesterday',
    status: 'In Transit',
    buyerName: 'Priya Sharma'
  },
  {
    id: 'ord-3',
    orderNumber: '#4088',
    productName: 'Indigo Dabu Dupatta',
    price: 1850,
    currency: '₹',
    date: '3 days ago',
    status: 'Delivered',
    buyerName: 'Devika Rao'
  }
];
