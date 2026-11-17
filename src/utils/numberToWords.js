// English Number to Words
const onesEn = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const tensEn = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertBelowThousandEn(n) {
  let str = '';
  if (n >= 100) {
    str += onesEn[Math.floor(n / 100)] + ' Hundred ';
    n %= 100;
  }
  if (n >= 20) {
    str += tensEn[Math.floor(n / 10)] + ' ';
    n %= 10;
  }
  if (n > 0) {
    str += onesEn[n] + ' ';
  }
  return str.trim();
}

export function numberToIndianWordsEn(num) {
  if (!num || isNaN(num) || num === 0) return 'Zero';
  num = Math.floor(Math.abs(Number(num)));
  let result = '';

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const remaining = num;

  if (crore > 0) result += convertBelowThousandEn(crore) + ' Crore ';
  if (lakh > 0) result += convertBelowThousandEn(lakh) + (lakh === 1 ? ' Lac ' : ' Lacs ');
  if (thousand > 0) result += convertBelowThousandEn(thousand) + ' Thousand ';
  if (remaining > 0) result += convertBelowThousandEn(remaining) + ' ';

  return `Rupees ${result.trim()} only`;
}

// Marathi Number to Words (मराठी अक्षरी)
const numbersMr = {
  0: 'शून्य', 1: 'एक', 2: 'दोन', 3: 'तीन', 4: 'चार', 5: 'पाच', 6: 'सहा', 7: 'सात', 8: 'आठ', 9: 'नऊ', 10: 'दहा',
  11: 'अकरा', 12: 'बारा', 13: 'तेरा', 14: 'चौदा', 15: 'पंधरा', 16: 'सोळा', 17: 'सतरा', 18: 'अठरा', 19: 'एकोणीस', 20: 'वीस',
  21: 'एकवीस', 22: 'बावीस', 23: 'तेवीस', 24: 'चोवीस', 25: 'पंचवीस', 26: 'सव्वीस', 27: 'सत्तावीस', 28: 'अठ्ठावीस', 29: 'एकोणतीस', 30: 'तीस',
  31: 'एकतीस', 32: 'बत्तीस', 33: 'तेहेतीस', 34: 'चौतीस', 35: 'पस्तीस', 36: 'छत्तीस', 37: 'सदतीस', 38: 'अडतीस', 39: 'एकेचाळीस', 40: 'चाळीस',
  41: 'एकचाळीस', 42: 'बेचाळीस', 43: 'त्रेचाळीस', 44: 'चव्वेचाळीस', 45: 'पंचेचाळीस', 46: 'शेहेचाळीस', 47: 'सत्तेचाळीस', 48: 'अठ्ठेचाळीस', 49: 'एकोणपन्नास', 50: 'पन्नास',
  60: 'साठ', 70: 'सत्तर', 80: 'ऐंशी', 90: 'नव्वद'
};

function getBelowHundredMr(n) {
  if (numbersMr[n]) return numbersMr[n];
  const t = Math.floor(n / 10) * 10;
  const o = n % 10;
  return `${numbersMr[t]} ${numbersMr[o]}`;
}

export function numberToIndianWordsMr(num) {
  if (!num || isNaN(num) || num === 0) return 'शून्य रुपये फक्त';
  num = Math.floor(Math.abs(Number(num)));
  let parts = [];

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = Math.floor(num / 100);
  const remaining = num % 100;

  if (crore > 0) parts.push(`${getBelowHundredMr(crore)} कोटी`);
  if (lakh > 0) parts.push(`${getBelowHundredMr(lakh)} लाख`);
  if (thousand > 0) parts.push(`${getBelowHundredMr(thousand)} हजार`);
  if (hundred > 0) parts.push(`${numbersMr[hundred]}शे`);
  if (remaining > 0) parts.push(getBelowHundredMr(remaining));

  return `${parts.join(' ')} रुपये फक्त`;
}

// Hindi Number to Words (हिंदी अक्षरी)
const numbersHi = {
  0: 'शून्य', 1: 'एक', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच', 6: 'छह', 7: 'सात', 8: 'आठ', 9: 'नौ', 10: 'दस',
  11: 'ग्यारह', 12: 'बारह', 13: 'तेरह', 14: 'चौदह', 15: 'पंद्रह', 16: 'सोलह', 17: 'सत्रह', 18: 'अठारह', 19: 'उन्नीस', 20: 'बीस',
  21: 'इक्कीस', 22: 'बाईस', 23: 'तेईस', 24: 'चौबीस', 25: 'पच्चीस', 26: 'छब्बीस', 27: 'सत्ताईस', 28: 'अट्ठाईस', 29: 'उनतीस', 30: 'तीस',
  31: 'इकत्तीस', 32: 'बत्तीस', 33: 'तैंतीस', 34: 'चौंतीस', 35: 'पैंतीस', 36: 'छत्तीस', 37: 'सैंतीस', 38: 'अड़तीस', 39: 'उनतालीस', 40: 'चालीस',
  41: 'इकतालीस', 42: 'बयालीस', 43: 'तैंतालीस', 44: 'चौवालीस', 45: 'पैंतालीस', 46: 'छियालीस', 47: 'सैंतालीस', 48: 'अड़तालीस', 49: 'उनचास', 50: 'पचास',
  60: 'साठ', 70: 'सत्तर', 80: 'अस्सी', 90: 'नब्बे'
};

function getBelowHundredHi(n) {
  if (numbersHi[n]) return numbersHi[n];
  const t = Math.floor(n / 10) * 10;
  const o = n % 10;
  return `${numbersHi[t]} ${numbersHi[o]}`;
}

export function numberToIndianWordsHi(num) {
  if (!num || isNaN(num) || num === 0) return 'शून्य रुपये मात्र';
  num = Math.floor(Math.abs(Number(num)));
  let parts = [];

  const crore = Math.floor(num / 10000000);
  num %= 10000000;
  const lakh = Math.floor(num / 100000);
  num %= 100000;
  const thousand = Math.floor(num / 1000);
  num %= 1000;
  const hundred = Math.floor(num / 100);
  const remaining = num % 100;

  if (crore > 0) parts.push(`${getBelowHundredHi(crore)} करोड़`);
  if (lakh > 0) parts.push(`${getBelowHundredHi(lakh)} लाख`);
  if (thousand > 0) parts.push(`${getBelowHundredHi(thousand)} हज़ार`);
  if (hundred > 0) parts.push(`${numbersHi[hundred]} सौ`);
  if (remaining > 0) parts.push(getBelowHundredHi(remaining));

  return `${parts.join(' ')} रुपये मात्र`;
}

export function numberToIndianWords(num, lang = 'en') {
  if (lang === 'mr') return numberToIndianWordsMr(num);
  if (lang === 'hi') return numberToIndianWordsHi(num);
  return numberToIndianWordsEn(num);
}
