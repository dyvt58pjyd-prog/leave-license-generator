export const sampleCommercialAgreement = {
  agreementPlace: 'KHAMGAON',
  executionDate: '2026-12-01',
  propertyType: 'Commercial', // 'Commercial' or 'Residential'
  propertyLabel: 'SAID SHOP/PREMISES',
  purpose: 'Gymnasium',
  durationMonths: 11,
  startDate: '2026-12-01',
  endDate: '2027-10-31',
  possessionDate: '2026-12-01',
  
  // Licensor (Owner)
  licensor: {
    fullName: 'Saurabh Satish Dude',
    age: 33,
    occupation: 'Business',
    address: 'R/o. Khamgaon, Tq. Khamgaon, Dist. Buldana',
    aadhaarNumber: '4314 3954 2599',
    panNumber: ''
  },
  
  // Licensee 1 (Deep Sunil Sapkal)
  licensee: {
    fullName: 'Deep Sunil Sapkal',
    age: 25,
    occupation: 'Business',
    address: 'R/o. Khamgaon, Tq. Khamgaon, Dist. Buldana',
    aadhaarNumber: '5203 0120 3979',
    panNumber: ''
  },

  // Second Licensee (Gauravsingh Darshansingh Thakur)
  secondLicensee: {
    enabled: true,
    fullName: 'Gauravsingh Darshansingh Thakur',
    age: 26,
    occupation: 'Business',
    address: 'R/o. Khamgaon, Tq. Khamgaon, Dist. Buldana',
    aadhaarNumber: '',
    panNumber: ''
  },
  
  // Property details
  property: {
    location: 'Ghatpuri Naka Khamgaon, Tq. Khamgaon, Dist. Buldana',
    surveyNo: '68/5',
    naOrderDetails: 'converted for non-agricultural purpose vide order dt. 15/06/1996 passed by Upper Collector Buldana in Rev. Case No. NAP-34/Khamgaon/05/1996-97 and amended Rev. Case No. MRC-81/Khamgaon/14/2013-14, decided on dt. 10/03/2014',
    layoutPlotNo: '3',
    plotArea: '111.30 sq.mtrs',
    buildingName: 'R.K. Sankul',
    unitNumber: 'Commercial Shop No. 29',
    unitArea: '3200.00 sq.fts',
    floor: 'First Floor',
    boundaries: {
      east: 'Shop No. 17 and Passage',
      west: 'Plot No. 2',
      north: 'Ghatpuri Road',
      south: '9 Mtr. Road'
    }
  },
  
  // Financial terms
  financials: {
    monthlyRent: 41000,
    rentDueDay: 5, // 5th of each English calendar month
    securityDeposit: 123000,
    depositRefundDays: '7-10', // Deposit returned within 7-10 days of taking possession back
    gracePeriodDays: 7, // 7 days grace period for payment
    lateRentPenaltyPerDay: 100, // Replaced absurd ₹3,000/day with reasonable ₹100/day
    overstayDamagesPerDay: 2500, // Balanced overstay damages
    noticePeriodDays: 60, // 2 months notice instead of 15 days so gym members/business can transition
    breachNoticeDays: 15, // 15 days cure notice before termination
    lockInPeriodMonths: 6, // 6 months minimum lock-in where Licensor cannot terminate without cause
    renewalEscalationPct: 5, // Capped 5% rent increase on renewal
    electricityBorneBy: 'Licensee',
    municipalTaxesBorneBy: 'Licensor',
    taxReimbursementInterestPct: 1
  },

  // Pro-Licensee Protections (Customized for Gymnasium business)
  licenseeProtections: {
    enabled: true,
    simultaneousDepositRefund: true, // Deposit refunded within 7-10 days of handing back possession; failing which licensor pays 18% p.a. interest
    rightOfRenewal: true, // Gym gets first right of renewal with pre-agreed escalation
    rightToInstallAndRemoveFixtures: true, // Licensee can install gym machines, rubber mats, mirrors, AC, signboards and take them back
    electricalLoadGuarantee: true, // Licensor warrants adequate commercial 3-phase electricity and signs NOC for load enhancement / trade license
    signboardRight: true, // Right to put signage / neon board on facade/entrance
    inspectionNotice: true, // Owner must give 24h prior appointment (protects privacy of gym members)
    structuralRepairsByOwner: true, // Licensor handles roof leakage, external walls, drainage
    forceMajeureRentWaiver: true // Pandemic/government mandated closure rent suspension
  },

  stampPaperSpace: false
};

export const sampleResidentialAgreement = {
  agreementPlace: 'PUNE',
  executionDate: '2026-12-01',
  propertyType: 'Residential',
  propertyLabel: 'SAID FLAT/PREMISES',
  purpose: 'Residential Purpose with family',
  durationMonths: 11,
  startDate: '2026-12-01',
  endDate: '2027-10-31',
  possessionDate: '2026-12-01',
  
  licensor: {
    fullName: 'Rajesh Madhavrao Patil',
    age: 48,
    occupation: 'Service',
    address: 'Flat No. 402, Green Acres, Baner, Pune - 411045',
    aadhaarNumber: '3456 7890 1234',
    panNumber: 'ABCDE1234F'
  },
  
  licensee: {
    fullName: 'Amit Suresh Sharma',
    age: 31,
    occupation: 'Software Engineer',
    address: 'Permanent Add: H.No. 45, Civil Lines, Nagpur - 440001',
    aadhaarNumber: '7890 1234 5678',
    panNumber: 'FGHIJ5678K'
  },

  secondLicensee: {
    enabled: false,
    fullName: '',
    age: '',
    occupation: '',
    address: '',
    aadhaarNumber: '',
    panNumber: ''
  },
  
  property: {
    location: 'Baner, Pune, Taluka Haveli, Dist. Pune',
    surveyNo: 'Survey No. 45/2/1',
    naOrderDetails: 'duly sanctioned layout and residential building sanction by PMC',
    layoutPlotNo: 'Plot No. 12',
    plotArea: '550.00 sq.mtrs',
    buildingName: 'Green Meadows CHS Ltd',
    unitNumber: 'Flat No. B-504 (2 BHK)',
    unitArea: '950 sq.fts built-up',
    floor: '5th Floor',
    boundaries: {
      east: 'Internal Society Road',
      west: 'Flat No. B-503',
      north: 'Garden and Clubhouse',
      south: 'Lift Lobby and Staircase'
    }
  },
  
  financials: {
    monthlyRent: 28000,
    rentDueDay: 5,
    securityDeposit: 60000,
    depositRefundDays: '7-10',
    gracePeriodDays: 5,
    lateRentPenaltyPerDay: 100,
    overstayDamagesPerDay: 1500,
    noticePeriodDays: 30,
    breachNoticeDays: 15,
    lockInPeriodMonths: 6,
    renewalEscalationPct: 5,
    electricityBorneBy: 'Licensee',
    municipalTaxesBorneBy: 'Licensor',
    taxReimbursementInterestPct: 1
  },

  licenseeProtections: {
    enabled: true,
    simultaneousDepositRefund: true,
    rightOfRenewal: true,
    rightToInstallAndRemoveFixtures: false,
    electricalLoadGuarantee: false,
    signboardRight: false,
    inspectionNotice: true,
    structuralRepairsByOwner: true,
    forceMajeureRentWaiver: true
  },

  stampPaperSpace: false
};
