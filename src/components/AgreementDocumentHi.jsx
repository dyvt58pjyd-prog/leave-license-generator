import React from 'react';
import { numberToIndianWordsHi } from '../utils/numberToWords';
import { formatDateIndian } from '../utils/dateUtils';

export default function AgreementDocumentHi(props) {
  const agreement = props?.agreement || props || {};
  const {
    agreementPlace = 'खामगाँव',
    executionDate = '2026-12-01',
    purpose = 'व्यायामशाला एवं फिटनेस क्लब',
    durationMonths = 11,
    startDate = '2026-12-01',
    endDate = '2027-10-31',
    possessionDate = '2026-12-01',
    licensor = {},
    licensee = {},
    secondLicensee = {},
    property = {},
    financials = {},
    licenseeProtections = {},
    stampPaperSpace = false
  } = agreement;

  const rentInWords = numberToIndianWordsHi(financials?.monthlyRent || 0);
  const depositInWords = numberToIndianWordsHi(financials?.securityDeposit || 0);
  const formattedStartDate = formatDateIndian(startDate);
  const formattedEndDate = formatDateIndian(endDate);
  const formattedPossessionDate = formatDateIndian(possessionDate || startDate);
  const formattedExecDate = formatDateIndian(executionDate);

  const execParts = (executionDate || '').split('-');
  const execDay = execParts[2] ? parseInt(execParts[2], 10) : '____';

  const isProLicensee = licenseeProtections?.enabled;
  const hasSecondLicensee = secondLicensee?.enabled && secondLicensee?.fullName;

  return (
    <div id="printable-agreement" className={`a4-sheet bg-white text-black devanagari-font leading-relaxed text-justify max-w-4xl mx-auto ${stampPaperSpace ? 'pt-48' : ''}`}>
      {stampPaperSpace && (
        <div className="no-print border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-center text-amber-800 text-sm mb-8 font-sans">
          📜 <strong>स्टाम्प पेपर मार्जिन:</strong> पेज 1 पर फिजिकल नॉन-ज्यूडिशियल स्टाम्प पेपर की प्रिंटिंग हेतु ऊपरी स्थान छोड़ा गया है।
        </div>
      )}

      {/* Official Maharashtra Statutory Header */}
      <div className="text-center mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-1">
          महाराष्ट्र शासन पंजीयन एवं मुद्रांक विभाग (IGR महाराष्ट्र अधिकृत प्रारूप)
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide underline uppercase mb-1">
          लीव एंड लाइसेंस इकरारनामा (समझौता पत्र)
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-800">
          [महाराष्ट्र रेंट कंट्रोल एक्ट, 1999 की धारा 55 एवं भारतीय सुखाधिकार अधिनियम, 1882 की धारा 52 के अंतर्गत विहित वैधानिक प्रारूप]
        </p>
        <p className="font-semibold text-xs sm:text-sm mt-3 border-t border-b border-slate-300 py-1.5">
          यह लीव एंड लाइसेंस इकरारनामा आज दिनांक <span className="font-bold underline">{execDay}</span> को, स्थान{' '}
          <span className="font-bold underline uppercase">{agreementPlace || 'खामगाँव'}</span> पर निम्नलिखित पक्षों के मध्य निष्पादित किया गया:
        </p>
      </div>

      {/* Parties Block */}
      <div className="space-y-4 mb-6 text-sm sm:text-base">
        <div className="text-center font-bold text-xs uppercase tracking-wider text-slate-700">
          :- पक्षकारों का वैधानिक विवरण :-
        </div>

        {/* Licensor */}
        <div className="pl-4 border-l-4 border-indigo-600 bg-slate-50/90 p-3 rounded avoid-break">
          <p className="font-bold text-base text-slate-900">{licensor.fullName || '[लाइसेंसर का नाम]'},</p>
          <p className="text-xs sm:text-sm">उम्र लगभग: <strong>{licensor.age || '__'} वर्ष</strong>, व्यवसाय: <strong>{licensor.occupation || 'व्यापार'}</strong></p>
          <p className="text-xs sm:text-sm">स्थाई पता: {licensor.address || '[पता]'}</p>
          <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
            {licensor.aadhaarNumber && <span>आधार नं.: <strong>{licensor.aadhaarNumber}</strong></span>}
            {licensor.panNumber && <span>पैन नं.: <strong>{licensor.panNumber}</strong></span>}
          </div>
          <p className="mt-2 text-xs font-bold text-indigo-950 uppercase">
            -- जिन्हें इस इकरारनामे में आगे "अनुज्ञापक / लाइसेंसर" (LICENSOR - प्रथम पक्ष) कहा गया है, जिस संज्ञा में उनके उत्तराधिकारी, निष्पादक, व्यवस्थापक एवं अभिहस्तांकित सम्मिलित होंगे।
          </p>
        </div>

        <div className="text-center font-bold italic text-slate-600">एवं (AND)</div>

        {/* Licensees */}
        {hasSecondLicensee ? (
          <div className="space-y-3">
            {/* Licensee 1 */}
            <div className="pl-4 border-l-4 border-emerald-600 bg-emerald-50/60 p-3 rounded avoid-break">
              <span className="inline-block text-[11px] font-bold text-emerald-800 uppercase tracking-wide bg-emerald-100/80 px-2 py-0.5 rounded mb-1">
                अनुज्ञप्तिधारी (लाइसेंसी क्र. 1)
              </span>
              <p className="font-bold text-base text-slate-900">{licensee.fullName || '[लाइसेंसी क्र. 1 का नाम]'},</p>
              <p className="text-xs sm:text-sm">उम्र लगभग: <strong>{licensee.age || '__'} वर्ष</strong>, व्यवसाय: <strong>{licensee.occupation || 'व्यापार / व्यायामशाला संचालक'}</strong></p>
              <p className="text-xs sm:text-sm">स्थाई पता: {licensee.address || '[पता]'}</p>
              <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
                {licensee.aadhaarNumber && <span>आधार नं.: <strong>{licensee.aadhaarNumber}</strong></span>}
                {licensee.panNumber && <span>पैन नं.: <strong>{licensee.panNumber}</strong></span>}
              </div>
            </div>

            {/* Licensee 2 */}
            <div className="pl-4 border-l-4 border-teal-600 bg-teal-50/60 p-3 rounded avoid-break">
              <span className="inline-block text-[11px] font-bold text-teal-800 uppercase tracking-wide bg-teal-100/80 px-2 py-0.5 rounded mb-1">
                अनुज्ञप्तिधारी (लाइसेंसी क्र. 2)
              </span>
              <p className="font-bold text-base text-slate-900">{secondLicensee.fullName || '[लाइसेंसी क्र. 2 का नाम]'},</p>
              <p className="text-xs sm:text-sm">उम्र लगभग: <strong>{secondLicensee.age || '__'} वर्ष</strong>, व्यवसाय: <strong>{secondLicensee.occupation || 'व्यापार / व्यायामशाला संचालक'}</strong></p>
              <p className="text-xs sm:text-sm">स्थाई पता: {secondLicensee.address || '[पता]'}</p>
              <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
                {secondLicensee.aadhaarNumber && <span>आधार नं.: <strong>{secondLicensee.aadhaarNumber}</strong></span>}
                {secondLicensee.panNumber && <span>पैन नं.: <strong>{secondLicensee.panNumber}</strong></span>}
              </div>
            </div>

            <p className="mt-2 text-xs font-bold text-emerald-950 uppercase p-2 bg-emerald-50/50 rounded border border-emerald-200">
              -- जिन्हें इस इकरारनामे में आगे संयुक्त व व्यक्तिगत रूप से "अनुज्ञप्तिधारी / लाइसेंसी" (LICENSEES - द्वितीय पक्ष) कहा गया है, जिस संज्ञा में उनके उत्तराधिकारी, विधिक प्रतिनिधि व भागीदार सम्मिलित होंगे।
            </p>
          </div>
        ) : (
          <div className="pl-4 border-l-4 border-emerald-600 bg-emerald-50/60 p-3 rounded avoid-break">
            <p className="font-bold text-base text-slate-900">{licensee.fullName || '[लाइसेंसी का नाम]'},</p>
            <p className="text-xs sm:text-sm">उम्र लगभग: <strong>{licensee.age || '__'} वर्ष</strong>, व्यवसाय: <strong>{licensee.occupation || 'व्यापार / व्यायामशाला संचालक'}</strong></p>
            <p className="text-xs sm:text-sm">स्थाई पता: {licensee.address || '[पता]'}</p>
            <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
              {licensee.aadhaarNumber && <span>आधार नं.: <strong>{licensee.aadhaarNumber}</strong></span>}
              {licensee.panNumber && <span>पैन नं.: <strong>{licensee.panNumber}</strong></span>}
            </div>
            <p className="mt-2 text-xs font-bold text-emerald-950 uppercase">
              -- जिन्हें इस इकरारनामे में आगे "अनुज्ञप्तिधारी / लाइसेंसी" (LICENSEE - द्वितीय पक्ष) कहा गया है, जिस संज्ञा में उनके उत्तराधिकारी, विधिक प्रतिनिधि व भागीदार सम्मिलित होंगे।
            </p>
          </div>
        )}
      </div>

      {/* Official Schedule of Property */}
      <div className="my-6 avoid-break border-2 border-slate-800 p-4 rounded-lg bg-slate-50/70">
        <h2 className="text-center font-bold tracking-wider text-sm sm:text-base underline uppercase mb-1 text-slate-900">
          -: संपत्ति की वैधानिक अनुसूची (SCHEDULE OF THE PROPERTY) :-
        </h2>
        <p className="text-[11px] text-slate-600 text-center mb-3">
          (पंजीयन अधिनियम, 1908 की धारा 21 एवं 22 के अनुसार संपत्ति का पूर्ण वस्तुनिष्ठ विवरण)
        </p>

        <div className="text-xs sm:text-sm space-y-2 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>• <strong>पंजीयन जिला:</strong> बुलढाणा (Buldana)</div>
            <div>• <strong>तहसील व उप-पंजीयक कार्यालय:</strong> खामगाँव (Khamgaon)</div>
            <div>• <strong>गाँव / नगर:</strong> खामगाँव</div>
            <div>• <strong>स्थानीय निकाय:</strong> खामगाँव नगर परिषद</div>
            <div>• <strong>खेत सर्वे नं. / भूमापन नं.:</strong> 68/5</div>
            <div>• <strong>लेआउट प्लॉट नं.:</strong> 3 (रकबा 111.30 वर्ग मीटर)</div>
            <div>• <strong>भवन का नाम:</strong> "आर.के. संकुल" ("R.K. Sankul")</div>
            <div>• <strong>तल एवं यूनिट नं.:</strong> प्रथम तल, व्यावसायिक दुकान नं. 29</div>
            <div className="col-span-2">• <strong>निर्मित / कारपेट क्षेत्रफल:</strong> 3200.00 वर्ग फीट (लगभग 297.28 वर्ग मीटर)</div>
            <div className="col-span-2">• <strong>अकृषि (NA) आदेश विवरण:</strong> {property.naOrderDetails}</div>
          </div>

          {/* Boundaries Table */}
          <div className="mt-3">
            <p className="font-bold text-xs uppercase mb-1 text-slate-800">संपत्ति की स्पष्ट चतुःसीमा (Four Boundaries):</p>
            <div className="border border-slate-800 text-xs sm:text-sm">
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">पूर्व (East)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.east || 'दुकान नं. 17 एवं गलियारा'}</div>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">पश्चिम (West)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.west || 'प्लॉट नं. 2'}</div>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">उत्तर (North)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.north || 'घाटपुरी रोड'}</div>
              </div>
              <div className="grid grid-cols-4">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">दक्षिण (South)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.south || '9 मीटर रोड'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recitals */}
      <div className="space-y-3 mb-6 text-xs sm:text-sm">
        <p>
          <strong>चूँकि (WHEREAS),</strong> अनुज्ञापक (लाइसेंसर) उपरोक्त वर्णित संपत्ति के एकमात्र विधिक व अनन्य स्वामी हैं तथा उक्त संपत्ति समस्त बंधक, भार, बैंक ऋण, कुर्की व न्यायालयीन वादों से सर्वथा मुक्त है तथा उन्हें उक्त संपत्ति का लाइसेंस देने का पूर्ण अधिकार प्राप्त है।
        </p>
        <p>
          <strong>एवं चूँकि (AND WHEREAS),</strong> {hasSecondLicensee ? 'अनुज्ञप्तिधारी (लाइसेंसी 1 एवं लाइसेंसी 2)' : 'अनुज्ञप्तिधारी (लाइसेंसी)'} ने उक्त दुकान परिसर को <strong>{purpose || 'व्यायामशाला एवं फिटनेस क्लब (Gymnasium & Fitness Club)'}</strong> संचालित करने हेतु 11 माह की अवधि के लिए दिनांक <strong>{formattedStartDate}</strong> से लीव एंड लाइसेंस पर देने का निवेदन किया, जिसे लाइसेंसर ने स्वीकार कर लिया है।
        </p>
      </div>

      <div className="text-center font-bold tracking-wider my-5 text-sm sm:text-base border-t-2 border-b-2 border-slate-800 py-1.5 bg-slate-100 uppercase">
        अतः अब यह इकरारनामा निम्नलिखित वैधानिक नियमों एवं शर्तों पर निष्पादित किया जाता है (NOW THIS AGREEMENT WITNESSETH AS UNDER):
      </div>

      {/* Structured Clauses */}
      <div className="space-y-5 text-xs sm:text-sm">
        
        {/* Clause 1: Term & Juridical Possession */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            1. लाइसेंस अवधि एवं विधिक कब्ज़ा (TERM OF LICENCE & POSSESSION)
          </h3>
          <p>
            लाइसेंसर द्वारा लाइसेंसी को उक्त दुकान परिसर <strong>दिनांक {formattedStartDate} से दिनांक {formattedEndDate} तक</strong> कुल <strong>{durationMonths} माह की निश्चित अवधि</strong> के लिए मात्र उपभोग का अनुमति पत्र (Bare Licence) प्रदान किया गया है।
          </p>
          <p className="mt-1">
            <strong>विधिक कब्ज़ा स्पष्टीकरण:</strong> उक्त संपत्ति का विधिक व न्यायिक स्वामित्व एवं कब्ज़ा (Juridical Possession and Ownership) सदैव लाइसेंसर के पास ही रहेगा। लाइसेंसी को केवल व्यायामशाला संचालन हेतु परिसर में प्रवेश व उपयोग का सशर्त तात्कालिक अधिकार (Permissive Occupation) दिनांक <strong>{formattedPossessionDate}</strong> को सौंपा गया है। लाइसेंस अवधि समाप्त होने पर लाइसेंसी अपनी मशीनरी व साज-सज्जा सुरक्षित हटाकर शांतिपूर्वक परिसर का कब्ज़ा लाइसेंसर को सौंपेगा।
          </p>
        </div>

        {/* Clause 2: License Fee & Grace Period */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            2. मासिक लाइसेंस शुल्क एवं रियायती अवधि (COMPENSATION / LICENSE FEE)
          </h3>
          <p>
            लाइसेंसी प्रति माह <strong>रु. {Number(financials.monthlyRent).toLocaleString('en-IN')}/- ({rentInWords})</strong> लाइसेंस शुल्क प्रत्येक अंग्रेजी महीने की <strong>{financials.rentDueDay} तारीख तक</strong> अग्रिम रूप से भुगतान करेगा।
          </p>
          {isProLicensee ? (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>7 दिन का ग्रेस पीरियड व संतुलित विलंब शुल्क:</strong> नियत तारीख के बाद 7 दिन का रियायती समय रहेगा। इसके बाद विलंब होने पर केवल <strong>रु. {financials.lateRentPenaltyPerDay || 100}/- प्रतिदिन</strong> का प्रभार देय होगा। 15 दिन की पूर्व लिखित नोटिस दिए बिना लाइसेंसर इकरारनामा रद्द नहीं कर सकेगा।
            </p>
          ) : (
            <p className="mt-1">विलंब होने पर रु. {financials.lateRentPenaltyPerDay}/- प्रतिदिन विलंब शुल्क देय होगा।</p>
          )}
        </div>

        {/* Clause 3: Deposit Refund Guarantee within 7-10 days */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            3. ब्याजमुक्त सुरक्षा जमानत राशि एवं कब्ज़ा वापसी पर 7-10 दिनों में रिफंड (REFUNDABLE SECURITY DEPOSIT)
          </h3>
          <p>
            लाइसेंसी ने लाइसेंसर को ब्याजमुक्त सुरक्षा जमा राशि के रूप में <strong>रु. {Number(financials.securityDeposit).toLocaleString('en-IN')}/- ({depositInWords})</strong> प्रदान की है।
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>कब्ज़ा वापस लेते समय 7 से 10 दिनों में जमानत राशि वापसी का अनिवार्य बंधन (Deposit Return within 7-10 Days):</strong> लाइसेंस अवधि समाप्त होने पर अथवा इकरारनामा निरस्त होने पर, लाइसेंसर द्वारा परिसर का वास्तविक कब्ज़ा वापस लेते समय या <strong>कब्ज़ा वापस लेने के अधिकतम 7 से 10 दिनों के भीतर (Strictly within 7 to 10 days of taking possession back) पूरी अमानत राशि रु. {Number(financials.securityDeposit).toLocaleString('en-IN')}/- बिना किसी मनमानी कटौती के लाइसेंसी को वापस लौटाना विधिक रूप से अनिवार्य रहेगा</strong>। सामान्य टूट-फूट अथवा रंगाई-पुताई के बहाने कोई अनाधिकृत कटौती नहीं की जाएगी। यदि लाइसेंसर कब्ज़ा वापस लेने के 10 दिनों के भीतर जमानत राशि वापस करने में विलंब करता है, तो उसे वार्षिक 18% की दर से दंडात्मक ब्याज देना होगा, तथा पूरी राशि प्राप्त होने तक लाइसेंसी को परिसर में निःशुल्क रहने एवं उपयोग करने का विधिक अधिकार प्राप्त रहेगा।
            </p>
          )}
        </div>

        {/* Clause 4: Permitted Purpose & Trade Fixtures */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            4. व्यवसायिक उपयोग एवं जिम मशीनरी हटाने का अधिकार (TRADE FIXTURES)
          </h3>
          <p>
            उक्त परिसर का उपयोग केवल <strong>{purpose || 'व्यायामशाला / जिम (Gymnasium)'}</strong> एवं संबंधित फिटनेस गतिविधियों हेतु ही किया जाएगा।
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>भारतीय सुखाधिकार अधिनियम, 1882 की धारा 60(ख) का संरक्षण:</strong> लाइसेंसी को परिसर में जिम मशीनें, वेट्स, रबर मैटिंग, बड़े दर्पण (मिरर्स), साउंड सिस्टम, एसी एवं अस्थायी पार्टिशन लगाने की पूर्ण अनुमति है। यह समस्त मशीनरी लाइसेंसी की चल संपत्ति है, जिसे अवधि समाप्त होने पर बिना भवन को क्षति पहुंचाए सुरक्षित निकाल लेने का पूर्ण अधिकार लाइसेंसी के पास रहेगा।
            </p>
          )}
          {isProLicensee && licenseeProtections?.signboardRight && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>साइनबोर्ड व ब्रांडिंग:</strong> इमारत के मुख्य द्वार व बाहरी हिस्से पर जिम का एलईडी/ग्लो-साइन बोर्ड निःशुल्क लगाने का अधिकार रहेगा।
            </p>
          )}
        </div>

        {/* Clause 5: Electricity & NOC */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            5. विद्युत प्रभार एवं अनापत्ति प्रमाण पत्र (ELECTRICITY & NOC)
          </h3>
          <p>
            लाइसेंसी प्रत्यक्ष उपयोग किए गए विद्युत उपभोग का भुगतान मीटर रीडिंग अनुसार करेगा।
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>3-फेज लोड गारंटी व गुमास्ता अनापत्ति:</strong> लाइसेंसर आश्वस्त करता है कि परिसर में जिम संचालन हेतु उपयुक्त 3-फेज व्यावसायिक विद्युत कनेक्शन उपलब्ध है। महाराष्ट्र दुकान एवं स्थापना अधिनियम, 2017 (गुमास्ता लाइसेंस), जीएसटी पंजीयन अथवा विद्युत लोड हेतु आवश्यक अनापत्ति प्रमाण पत्र (NOC) लाइसेंसर अनुरोध के 7 दिनों में उपलब्ध कराने हेतु बाध्य रहेगा।
            </p>
          )}
        </div>

        {/* Clause 6: Taxes & Repairs */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            6. स्थानीय कर एवं संरचनात्मक मरम्मत (MUNICIPAL TAXES & STRUCTURAL REPAIRS)
          </h3>
          <p>
            नगर परिषद के समस्त संपत्ति कर, मुख्य जल कर एवं अकृषि कर का दायित्व पूरी तरह लाइसेंसर का रहेगा। छत का रिसाव, मुख्य सीवर लाइन एवं संरचनात्मक क्षति की मरम्मत लाइसेंसर अपने व्यय पर 10 दिनों में कराएगा।
          </p>
        </div>

        {/* Clause 7: Inspection Privacy */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            7. परिसर निरीक्षण व गोपनीयता (INSPECTION PRIVACY)
          </h3>
          {isProLicensee ? (
            <p className="text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              व्यायामशाला में आने वाले सदस्यों की सुरक्षा व निजता को ध्यान में रखते हुए, लाइसेंसर द्वारा परिसर का निरीक्षण केवल कार्य समय में, न्यूनतम <strong>24 घंटे की पूर्व लिखित सूचना</strong> देकर तथा लाइसेंसी अथवा उनके प्रतिनिधि की उपस्थिति में ही किया जा सकेगा।
            </p>
          ) : (
            <p>लाइसेंसर उचित समय पर परिसर का निरीक्षण कर सकेगा।</p>
          )}
        </div>

        {/* Clause 8: No Subletting */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            8. शिकमी किराएदारी पर रोक (NO SUBLETTING)
          </h3>
          <p>
            लाइसेंसी उक्त परिसर किसी अन्य व्यक्ति को उप-किराए पर नहीं देगा और न ही लाइसेंस अधिकारों का अंतरण करेगा।
          </p>
        </div>

        {/* Clause 9: Renewal */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            9. नवीनीकरण का प्रथम अधिकार (RIGHT OF RENEWAL - OPTION CONTRACT)
          </h3>
          <p>
            यह लाइसेंस दिनांक <strong>{formattedEndDate}</strong> को स्वतः समाप्त हो जाएगा।
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>अधिकतम 5% किराया वृद्धि सीमा:</strong> जिम स्थापना में हुए भारी पूंजीगत निवेश को देखते हुए, अवधि समाप्त होने पर नवीनीकरण का <strong>प्रथम अधिकार (First Option to Renew)</strong> लाइसेंसी का होगा, तथा किराया वृद्धि <strong>अधिकतम {financials.renewalEscalationPct || 5}%</strong> से अधिक नहीं होगी।
            </p>
          )}
        </div>

        {/* Clause 10: Lock-in & Notice */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            10. लॉक-इन अवधि एवं समाप्ति की सूचना (LOCK-IN PERIOD & TERMINATION)
          </h3>
          {isProLicensee ? (
            <p className="text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              प्रारंभिक <strong>{financials.lockInPeriodMonths || 6} माह की लॉक-इन अवधि</strong> रहेगी जिसमें कोई भी पक्ष बिना कारण अनुबंध समाप्त नहीं करेगा। इसके पश्चात अनुबंध समाप्त करने हेतु दोनों पक्षों को <strong>{financials.noticePeriodDays || 60} दिन की लिखित पूर्व सूचना</strong> देना अनिवार्य होगा। पूर्व सूचना अवधि समाप्त होने पर लाइसेंसी कब्ज़ा सौंपेगा एवं लाइसेंसर 7 से 10 दिनों में अमानत राशि वापस करेगा।
            </p>
          ) : (
            <p>कोई भी पक्ष {financials.noticePeriodDays} दिन की लिखित सूचना देकर अनुबंध समाप्त कर सकेगा।</p>
          )}
        </div>

        {/* Clause 11: Nature of Licence */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            11. विधिक प्रकृति (NATURE OF LICENCE)
          </h3>
          <p>
            यह समझौता भारतीय सुखाधिकार अधिनियम, 1882 की धारा 52 के अंतर्गत केवल व्यक्तिगत उपभोग का लाइसेंस है। इससे कोई किराएदारी या पट्टा अधिकार उत्पन्न नहीं होता है।
          </p>
        </div>

        {/* Clause 12: Force Majeure */}
        {isProLicensee && licenseeProtections?.forceMajeureRentWaiver && (
          <div className="avoid-break">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
              12. अप्रत्याशित घटना व सरकारी प्रतिबंध (FORCE MAJEURE)
            </h3>
            <p className="text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              महामारी, सरकारी लॉकडाउन अथवा प्राकृतिक आपदा के कारण जिम संचालन बाधित होने पर, भारतीय अनुबंध अधिनियम, 1872 की धारा 56 के तहत लाइसेंस शुल्क आनुपातिक रूप से स्थगित रहेगा।
            </p>
          </div>
        )}

        {/* Clause 13: Jurisdiction */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            13. सक्षम प्राधिकारी एवं क्षेत्राधिकार (JURISDICTION)
          </h3>
          <p>
            विवाद की स्थिति में महाराष्ट्र रेंट कंट्रोल एक्ट, 1999 की धारा 40 के अधीन नियुक्त <strong>सक्षम प्राधिकारी (Competent Authority)</strong> तथा सिविल न्यायालय खामगाँव (जिला बुलढाणा) का क्षेत्राधिकार मान्य होगा।
          </p>
        </div>

        {/* Clause 14: Registration */}
        <div className="avoid-break border-t border-slate-300 pt-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            14. धारा 55 अंतर्गत अनिवार्य पंजीयन (STATUTORY REGISTRATION)
          </h3>
          <p>
            महाराष्ट्र रेंट कंट्रोल एक्ट, 1999 की धारा 55 के तहत इस अनुबंध का उप-पंजीयक खामगाँव के कार्यालय में पंजीयन अनिवार्य है, जिसका विधिक दायित्व लाइसेंसर (मालिक) का रहेगा। मुद्रांक शुल्क (0.25%) व पंजीयन शुल्क दोनों पक्ष परस्पर 50-50% अनुपात में वहन करेंगे।
          </p>
        </div>

        {/* Clause 15: General Provisions */}
        <div className="avoid-break border-t border-slate-300 pt-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            15. सामान्य विधिक प्रावधान (GENERAL PROVISIONS)
          </h3>
          <p>
            <strong>अ) पूर्ण समझौता (Entire Agreement):</strong> यह अनुबंध दोनों पक्षों के मध्य अंतिम समझौता है।<br/>
            <strong>ब) पृथक्करणीयता (Severability):</strong> किसी एक शर्त के विधिक रूप से अमान्य होने पर भी शेष सभी शर्तें पूर्णतः प्रभावी रहेंगी।<br/>
            <strong>ग) मूल प्रतियां (Counterparts):</strong> यह अनुबंध मूल प्रतियों में निष्पादित किया गया है, जो विधिक रूप से समान रूप से मान्य रहेंगी।
          </p>
        </div>
      </div>

      {/* Signatures */}
      <div className="mt-10 pt-6 border-t-2 border-slate-700 text-xs sm:text-sm avoid-break">
        <p className="mb-6 font-semibold text-justify">
          इसके साक्ष्य स्वरूप दोनों पक्षों ने इस इकरारनामे की सभी शर्तों को पढ़कर व समझकर आज दिनांक <strong>{formattedExecDate}</strong> को स्थान <strong>{agreementPlace}</strong> पर निम्नलिखित साक्षियों के समक्ष हस्ताक्षर किए।
        </p>

        <div className={`grid ${hasSecondLicensee ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'} gap-6 my-8`}>
          <div>
            <div className="h-16 border-b border-slate-700"></div>
            <p className="mt-2 font-bold">{licensor.fullName || 'सौरभ सतीश दुधे'}</p>
            <p className="text-xs text-slate-600 font-bold uppercase">अनुज्ञापक (LICENSOR / मालिक)</p>
          </div>
          <div>
            <div className="h-16 border-b border-slate-700"></div>
            <p className="mt-2 font-bold">{licensee.fullName || 'दीप सुनील सपकाळ'}</p>
            <p className="text-xs text-slate-600 font-bold uppercase">
              {hasSecondLicensee ? 'अनुज्ञप्तिधारी 1 (LICENSEE 1)' : 'अनुज्ञप्तिधारी (LICENSEE)'}
            </p>
          </div>
          {hasSecondLicensee && (
            <div>
              <div className="h-16 border-b border-slate-700"></div>
              <p className="mt-2 font-bold">{secondLicensee.fullName || 'गौरवसिंह दर्शनसिंह ठाकुर'}</p>
              <p className="text-xs text-slate-600 font-bold uppercase">अनुज्ञप्तिधारी 2 (LICENSEE 2)</p>
            </div>
          )}
        </div>

        {/* Witnesses */}
        <div className="mt-8">
          <p className="font-bold uppercase tracking-wider text-xs mb-3 text-slate-700">साक्षीगण (WITNESSES):</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-xs text-slate-600 mb-1">1) साक्षी 1:</p>
              <div className="h-12 border-b border-slate-400"></div>
              <p className="text-xs mt-1 text-slate-500">नाम: __________________________________</p>
              <p className="text-xs mt-1 text-slate-500">पता: __________________________________</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-slate-600 mb-1">2) साक्षी 2:</p>
              <div className="h-12 border-b border-slate-400"></div>
              <p className="text-xs mt-1 text-slate-500">नाम: __________________________________</p>
              <p className="text-xs mt-1 text-slate-500">पता: __________________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
