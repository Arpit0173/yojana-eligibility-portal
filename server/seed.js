const mongoose = require('mongoose');
require('dotenv').config();
const Scheme = require('./models/Scheme');

const schemes = [
  {
    name: 'PM Kisan Samman Nidhi',
    nameHi: 'पीएम किसान सम्मान निधि',
    description: 'Income support of ₹6,000 per year to all farmer families across the country in three equal installments of ₹2,000 each every four months.',
    descriptionHi: 'देश भर के सभी किसान परिवारों को हर चार महीने में ₹2,000 की तीन समान किस्तों में प्रति वर्ष ₹6,000 की आय सहायता।',
    category: 'Agriculture',
    minAge: 18, maxAge: 65, maxIncome: 200000,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2019-02-24'),
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    benefits: '₹6,000 per year in three installments',
    website: 'https://pmkisan.gov.in', popular: true
  },
  {
    name: 'Sukanya Samriddhi Yojana',
    nameHi: 'सुकन्या समृद्धि योजना',
    description: 'A small savings scheme for the girl child. Accounts can be opened for girls below 10 years of age with attractive interest rates and tax benefits.',
    descriptionHi: 'बालिकाओं के लिए एक छोटी बचत योजना।',
    category: 'Women Welfare',
    minAge: 0, maxAge: 10, maxIncome: 0,
    gender: 'Female', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2015-01-22'),
    ministry: 'Ministry of Finance',
    benefits: 'High interest savings account with tax benefits under 80C',
    website: 'https://www.india.gov.in/sukanya-samriddhi-yojna', popular: true
  },
  {
    name: 'PM Ujjwala Yojana',
    nameHi: 'पीएम उज्ज्वला योजना',
    description: 'Provides free LPG connections to women from BPL households to safeguard their health.',
    descriptionHi: 'बीपीएल परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन प्रदान करता है।',
    category: 'Women Welfare',
    minAge: 18, maxAge: 60, maxIncome: 200000,
    gender: 'Female', states: ['All'], categories: ['SC', 'ST', 'OBC'],
    status: 'active', launchDate: new Date('2016-05-01'),
    ministry: 'Ministry of Petroleum and Natural Gas',
    benefits: 'Free LPG connection with first refill and stove',
    website: 'https://www.pmujjwalayojana.com', popular: true
  },
  {
    name: 'Ayushman Bharat - PMJAY',
    nameHi: 'आयुष्मा�� भारत - पीएमजेएवाई',
    description: 'Health insurance scheme providing coverage of ₹5 lakh per family per year for hospitalization.',
    descriptionHi: 'स्वास्थ��य बीमा योजना जो अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का कवरेज प्रदान करती है।',
    category: 'Health',
    minAge: 0, maxAge: 100, maxIncome: 500000,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2018-09-23'),
    ministry: 'Ministry of Health and Family Welfare',
    benefits: '₹5 lakh health coverage per family per year',
    website: 'https://pmjay.gov.in', popular: true
  },
  {
    name: 'PM Awas Yojana',
    nameHi: 'पीएम आवास योजना',
    description: 'Affordable housing for the urban and rural poor with interest subsidy on home loans.',
    descriptionHi: 'गृह ऋण पर ब्याज सब्सिडी के साथ शहरी और ग्रामीण गरीबों के लिए किफायती आवास।',
    category: 'Housing',
    minAge: 21, maxAge: 65, maxIncome: 600000,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2015-06-25'),
    ministry: 'Ministry of Housing and Urban Affairs',
    benefits: 'Interest subsidy up to ₹2.67 lakh on home loans',
    website: 'https://pmaymis.gov.in', popular: true
  },
  {
    name: 'Atal Pension Yojana',
    nameHi: 'अटल पेंशन योजना',
    description: 'Guaranteed minimum pension scheme for unorganized sector workers aged 18-40.',
    descriptionHi: 'असंगठित क्षेत्र के 18-40 आयु के श्रमिकों के लिए गारंटीकृत न्यूनतम पेंशन योजना।',
    category: 'Pension',
    minAge: 18, maxAge: 40, maxIncome: 500000,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2015-06-01'),
    ministry: 'Ministry of Finance',
    benefits: 'Guaranteed pension of ₹1,000-5,000/month after 60',
    website: 'https://www.npscra.nsdl.co.in', popular: false
  },
  {
    name: 'PM Mudra Yojana',
    nameHi: 'पीएम मुद्रा योजना',
    description: 'Provides loans up to ₹10 lakh to small/micro enterprises for income-generating activities.',
    descriptionHi: 'आय-सृजन गतिविधियों के लिए छोटे/सूक्ष्म उद्यमों को ₹10 लाख तक का ऋण।',
    category: 'Startup',
    minAge: 18, maxAge: 65, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2015-04-08'),
    ministry: 'Ministry of Finance',
    benefits: 'Collateral-free loans up to ₹10 lakh',
    website: 'https://www.mudra.org.in', popular: true
  },
  {
    name: 'Startup India',
    nameHi: 'स्टार्टअप इंडिया',
    description: 'Flagship initiative for startups with tax exemptions, easy compliance, and funding support.',
    descriptionHi: 'स्टार्टअप के लिए कर छूट, आसान अनुपालन और फंडिंग सहायता की प्रमुख पहल।',
    category: 'Startup',
    minAge: 18, maxAge: 50, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2016-01-16'),
    ministry: 'DPIIT',
    benefits: 'Tax exemptions, self-certification, funding support',
    website: 'https://www.startupindia.gov.in', popular: true
  },
  {
    name: 'PM Jan Dhan Yojana',
    nameHi: 'पीएम जन धन योजना',
    description: 'Financial inclusion ensuring access to banking, insurance and pension for every household.',
    descriptionHi: 'प्रत्येक परिवार के लिए बैंकिंग, बीमा और पेंशन तक पहुंच सुनिश्चित करने वाली वित्तीय समावेशन योजना।',
    category: 'Financial Inclusion',
    minAge: 10, maxAge: 65, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2014-08-28'),
    ministry: 'Ministry of Finance',
    benefits: 'Zero balance account, RuPay card, ₹2 lakh insurance',
    website: 'https://pmjdy.gov.in', popular: true
  },
  {
    name: 'Beti Bachao Beti Padhao',
    nameHi: 'बेटी बचाओ बेटी पढ़ाओ',
    description: 'Aims to promote education and empowerment of the girl child.',
    descriptionHi: 'बालिकाओं की शिक्षा और सशक्तिकरण को बढ़ावा देने का लक्ष्य।',
    category: 'Education',
    minAge: 0, maxAge: 18, maxIncome: 0,
    gender: 'Female', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2015-01-22'),
    ministry: 'Ministry of Women and Child Development',
    benefits: 'Educational support and awareness programs',
    website: 'https://wcd.nic.in/bbbp-schemes', popular: false
  },
  {
    name: 'National Pension Scheme',
    nameHi: 'राष्ट्रीय पेंशन योजना',
    description: 'Voluntary retirement savings scheme for all citizens aged 18-65.',
    descriptionHi: '18-65 वर्ष की आयु के सभी नागरिकों के लिए स्वैच्छिक सेवानिवृत्ति बचत योजना।',
    category: 'Pension',
    minAge: 18, maxAge: 65, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2004-01-01'),
    ministry: 'Ministry of Finance',
    benefits: 'Tax benefits under 80CCD, market-linked returns',
    website: 'https://www.npscra.nsdl.co.in', popular: false
  },
  {
    name: 'Stand Up India',
    nameHi: 'स्टैंड अप इंडिया',
    description: 'Bank loans between ₹10 lakh and ₹1 crore to SC/ST and women entrepreneurs.',
    descriptionHi: 'एससी/एसटी और महिला उद्यमियों को ₹10 लाख से ₹1 करोड़ के बीच बैंक ऋण।',
    category: 'Startup',
    minAge: 18, maxAge: 65, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['SC', 'ST'],
    status: 'active', launchDate: new Date('2016-04-05'),
    ministry: 'Ministry of Finance',
    benefits: 'Bank loans ₹10 lakh to ₹1 crore',
    website: 'https://www.standupmitra.in', popular: false
  },
  {
    name: 'PM Vishwakarma Yojana',
    nameHi: 'पीएम विश्वकर्मा योजना',
    description: 'Upcoming scheme to support traditional artisans with skill upgradation and credit support.',
    descriptionHi: 'पारंपरिक कारीगरों को कौशल उन्नयन और ऋण सहायता के साथ समर्थन करने की आगामी योजना।',
    category: 'Skill Development',
    minAge: 18, maxAge: 65, maxIncome: 300000,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'upcoming', launchDate: new Date('2024-09-17'),
    ministry: 'Ministry of MSME',
    benefits: 'Skill training, tool kits, loans up to ₹3 lakh',
    website: '', popular: false
  },
  {
    name: 'PM Surya Ghar Yojana',
    nameHi: 'पीएम सूर्य घर योजना',
    description: 'Rooftop solar scheme providing free electricity up to 300 units per month.',
    descriptionHi: 'प्रति माह 300 यूनिट ��क मुफ्त बिजली प्रदान करने वाली रूफटॉप सोलर योजना।',
    category: 'Energy',
    minAge: 18, maxAge: 100, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'upcoming', launchDate: new Date('2025-03-01'),
    ministry: 'Ministry of New and Renewable Energy',
    benefits: 'Free electricity up to 300 units/month, solar panel subsidy',
    website: '', popular: false
  },
  {
    name: 'Agnipath Scheme',
    nameHi: 'अग्निपथ योजना',
    description: 'Short-term recruitment scheme for Indian Armed Forces with attractive financial package.',
    descriptionHi: 'भारतीय सशस्त्र बलों के लिए आकर्षक वित्तीय पैकेज के साथ अल्पकालिक भर्ती योजना।',
    category: 'Defence',
    minAge: 17, maxAge: 23, maxIncome: 0,
    gender: 'All', states: ['All'], categories: ['All'],
    status: 'active', launchDate: new Date('2022-06-14'),
    ministry: 'Ministry of Defence',
    benefits: '₹11.71 lakh Seva Nidhi package after 4 years',
    website: 'https://agnipathvayu.cdac.in', popular: true
  }
];

async function seedDB() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/yojana-portal';
    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await Scheme.deleteMany({});
    console.log('🗑️  Cleared existing schemes');
    
    await Scheme.insertMany(schemes);
    console.log(`✅ Seeded ${schemes.length} schemes successfully`);
    
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed Error:', err.message);
    process.exit(1);
  }
}

seedDB();