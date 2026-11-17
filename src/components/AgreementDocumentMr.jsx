import React from 'react';
import { numberToIndianWordsMr } from '../utils/numberToWords';
import { formatDateIndian } from '../utils/dateUtils';

export default function AgreementDocumentMr(props) {
  const agreement = props?.agreement || props || {};
  const {
    agreementPlace = 'खामगाव',
    executionDate = '2026-12-01',
    purpose = 'व्यायामशाळा व फिटनेस क्लब',
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

  const rentInWords = numberToIndianWordsMr(financials?.monthlyRent || 0);
  const depositInWords = numberToIndianWordsMr(financials?.securityDeposit || 0);
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
          📜 <strong>मुद्रांक जागा (Stamp Paper Margin Active):</strong> पहिल्या पानावर मूळ सरकारी स्टॅम्प पेपर छापण्यासाठी वरील जागा रिकामी सोडण्यात आली आहे.
        </div>
      )}

      {/* Official Maharashtra Statutory Header */}
      <div className="text-center mb-6">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-600 mb-1">
          महाराष्ट्र शासन नोंदणी व मुद्रांक विभाग (IGR महाराष्ट्र अधिकृत प्रारूप)
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wide underline uppercase mb-1">
          लिव्ह अँड लायसन्स करारनामा
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-800">
          [महाराष्ट्र भाडे नियंत्रण अधिनियम, १९९९ चे कलम ५५ व भारतीय सुविधाधिकार अधिनियम, १८८२ चे कलम ५२ अन्वये विहित नमुन्यातील कायदेशीर करारनामा]
        </p>
        <p className="font-semibold text-xs sm:text-sm mt-3 border-t border-b border-slate-300 py-1.5">
          हा लिव्ह अँड लायसन्स करारनामा आज दिनांक <span className="font-bold underline">{execDay}</span> रोजी, ठिकाण{' '}
          <span className="font-bold underline uppercase">{agreementPlace || 'खामगाव'}</span> येथे खालील पक्षांमध्ये निष्पादित करण्यात आला:
        </p>
      </div>

      {/* Parties Block */}
      <div className="space-y-4 mb-6 text-sm sm:text-base">
        <div className="text-center font-bold text-xs uppercase tracking-wider text-slate-700">
          :- पक्षकारांचा वैधानिक तपशील :-
        </div>

        {/* Licensor */}
        <div className="pl-4 border-l-4 border-indigo-600 bg-slate-50/90 p-3 rounded avoid-break">
          <p className="font-bold text-base text-slate-900">{licensor.fullName || '[लायसेन्सरचे नाव]'},</p>
          <p className="text-xs sm:text-sm">वय सुमारे: <strong>{licensor.age || '__'} वर्षे</strong>, व्यवसाय: <strong>{licensor.occupation || 'व्यापार'}</strong></p>
          <p className="text-xs sm:text-sm">कायमचा पत्ता: {licensor.address || '[पत्ता]'}</p>
          <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
            {licensor.aadhaarNumber && <span>आधार क्र.: <strong>{licensor.aadhaarNumber}</strong></span>}
            {licensor.panNumber && <span>पॅन क्र.: <strong>{licensor.panNumber}</strong></span>}
          </div>
          <p className="mt-2 text-xs font-bold text-indigo-950 uppercase">
            -- ज्यांचा उल्लेख या करारनाम्यात पुढे "परवाना देणारे / लायसेन्सर" (LICENSOR - प्रथम पक्ष) असा केला आहे, ज्या संज्ञेमध्ये त्यांचे वारस, मुखत्यार, व्यवस्थापक, वारसदार व अभिहस्तांकित यांचा समावेश असेल.
          </p>
        </div>

        <div className="text-center font-bold italic text-slate-600">आणि (AND)</div>

        {/* Licensees */}
        {hasSecondLicensee ? (
          <div className="space-y-3">
            {/* Licensee 1 */}
            <div className="pl-4 border-l-4 border-emerald-600 bg-emerald-50/60 p-3 rounded avoid-break">
              <span className="inline-block text-[11px] font-bold text-emerald-800 uppercase tracking-wide bg-emerald-100/80 px-2 py-0.5 rounded mb-1">
                परवाना घेणारे (लायसेंसी क्र. १)
              </span>
              <p className="font-bold text-base text-slate-900">{licensee.fullName || '[लायसेंसी क्र. १ चे नाव]'},</p>
              <p className="text-xs sm:text-sm">वय सुमारे: <strong>{licensee.age || '__'} वर्षे</strong>, व्यवसाय: <strong>{licensee.occupation || 'व्यापार / व्यायामशाळा संचालक'}</strong></p>
              <p className="text-xs sm:text-sm">कायमचा पत्ता: {licensee.address || '[पत्ता]'}</p>
              <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
                {licensee.aadhaarNumber && <span>आधार क्र.: <strong>{licensee.aadhaarNumber}</strong></span>}
                {licensee.panNumber && <span>पॅन क्र.: <strong>{licensee.panNumber}</strong></span>}
              </div>
            </div>

            {/* Licensee 2 */}
            <div className="pl-4 border-l-4 border-teal-600 bg-teal-50/60 p-3 rounded avoid-break">
              <span className="inline-block text-[11px] font-bold text-teal-800 uppercase tracking-wide bg-teal-100/80 px-2 py-0.5 rounded mb-1">
                परवाना घेणारे (लायसेंसी क्र. २)
              </span>
              <p className="font-bold text-base text-slate-900">{secondLicensee.fullName || '[लायसेंसी क्र. २ चे नाव]'},</p>
              <p className="text-xs sm:text-sm">वय सुमारे: <strong>{secondLicensee.age || '__'} वर्षे</strong>, व्यवसाय: <strong>{secondLicensee.occupation || 'व्यापार / व्यायामशाळा संचालक'}</strong></p>
              <p className="text-xs sm:text-sm">कायमचा पत्ता: {secondLicensee.address || '[पत्ता]'}</p>
              <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
                {secondLicensee.aadhaarNumber && <span>आधार क्र.: <strong>{secondLicensee.aadhaarNumber}</strong></span>}
                {secondLicensee.panNumber && <span>पॅन क्र.: <strong>{secondLicensee.panNumber}</strong></span>}
              </div>
            </div>

            <p className="mt-2 text-xs font-bold text-emerald-950 uppercase p-2 bg-emerald-50/50 rounded border border-emerald-200">
              -- ज्यांचा उल्लेख या करारनाम्यात पुढे संयुक्तपणे व वैयक्तिकरित्या "परवाना घेणारे / लायसेंसी" (LICENSEES - द्वितीय पक्ष) असा केला आहे, ज्या संज्ञेमध्ये त्यांचे वारस, व्यवस्थापक, कायदेशीर प्रतिनिधी व भागीदार यांचा समावेश असेल.
            </p>
          </div>
        ) : (
          <div className="pl-4 border-l-4 border-emerald-600 bg-emerald-50/60 p-3 rounded avoid-break">
            <p className="font-bold text-base text-slate-900">{licensee.fullName || '[लायसेंसीचे नाव]'},</p>
            <p className="text-xs sm:text-sm">वय सुमारे: <strong>{licensee.age || '__'} वर्षे</strong>, व्यवसाय: <strong>{licensee.occupation || 'व्यापार / व्यायामशाळा संचालक'}</strong></p>
            <p className="text-xs sm:text-sm">कायमचा पत्ता: {licensee.address || '[पत्ता]'}</p>
            <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
              {licensee.aadhaarNumber && <span>आधार क्र.: <strong>{licensee.aadhaarNumber}</strong></span>}
              {licensee.panNumber && <span>पॅन क्र.: <strong>{licensee.panNumber}</strong></span>}
            </div>
            <p className="mt-2 text-xs font-bold text-emerald-950 uppercase">
              -- ज्यांचा उल्लेख या करारनाम्यात पुढे "परवाना घेणारे / लायसेंसी" (LICENSEE - द्वितीय पक्ष) असा केला आहे, ज्या संज्ञेमध्ये त्यांचे वारस, व्यवस्थापक, कायदेशीर प्रतिनिधी व भागीदार यांचा समावेश असेल.
            </p>
          </div>
        )}
      </div>

      {/* Official Schedule of Property (मिळकतीचे वैधानिक परिशिष्ट) */}
      <div className="my-6 avoid-break border-2 border-slate-800 p-4 rounded-lg bg-slate-50/70">
        <h2 className="text-center font-bold tracking-wider text-sm sm:text-base underline uppercase mb-1 text-slate-900">
          -: मिळकतीचे अधिकृत वैधानिक परिशिष्ट / अनुसूची :-
        </h2>
        <p className="text-[11px] text-slate-600 text-center mb-3">
          (नोंदणी अधिनियम, १९०८ चे कलम २१ व २२ अन्वये परवाना दिलेल्या जागेचा संपूर्ण वस्तुनिष्ठ तपशील)
        </p>

        <div className="text-xs sm:text-sm space-y-2 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>• <strong>नोंदणी जिल्हा:</strong> बुलढाणा (Buldana)</div>
            <div>• <strong>तालुका व दुय्यम निबंधक कार्यालय:</strong> खामगाव (Khamgaon)</div>
            <div>• <strong>गाव / महसुली क्षेत्र:</strong> खामगाव</div>
            <div>• <strong>स्थानिक स्वराज्य संस्था:</strong> खामगाव नगर परिषद</div>
            <div>• <strong>शेत सर्व्हे क्र. / भूमापन क्र.:</strong> ६८/५</div>
            <div>• <strong>लेआऊट प्लॉट क्र.:</strong> ३ (क्षेत्रफळ १११.३० चौ.मी.)</div>
            <div>• <strong>इमारतीचे नाव:</strong> "आर. के. संकुल" ("R.K. Sankul")</div>
            <div>• <strong>मजला व युनिट क्र.:</strong> पहिला मजला, व्यावसायिक दुकान क्र. २९</div>
            <div className="col-span-2">• <strong>बांधकाम / चटई क्षेत्रफळ (Carpet Area):</strong> ३२००.०० चौ.फूट (अंदाजे २९७.२८ चौ.मी.)</div>
            <div className="col-span-2">• <strong>बिगरशेती (NA) आदेश:</strong> {property.naOrderDetails}</div>
          </div>

          {/* Boundaries Table */}
          <div className="mt-3">
            <p className="font-bold text-xs uppercase mb-1 text-slate-800">मिळकतीची स्पष्ट चतुःसीमा (Four Boundaries):</p>
            <div className="border border-slate-800 text-xs sm:text-sm">
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">पूर्व (East)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.east || 'दुकान क्र. १७ व पॅसेज'}</div>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">पश्चिम (West)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.west || 'प्लॉट क्र. २'}</div>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">उत्तर (North)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.north || 'घाटपुरी रोड'}</div>
              </div>
              <div className="grid grid-cols-4">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">दक्षिण (South)</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.south || '९ मीटर रस्ता'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recitals */}
      <div className="space-y-3 mb-6 text-xs sm:text-sm">
        <p>
          <strong>ज्याअर्थी (WHEREAS),</strong> परवाना देणारे (लायसेन्सर) हे वर नमूद केलेल्या संपूर्ण मिळकतीचे एकमेव निरंक व पूर्ण मालक असून सदर मिळकत सर्व प्रकारचे गहाण, बोजा, लीन, बँक कर्ज, शासकीय जप्ती किंवा न्यायालयीन दाव्यांपासून पूर्णपणे मुक्त आहे आणि सदर जागा तात्पुरत्या परवान्याने देण्याचा त्यांना पूर्ण कायदेशीर अधिकार आहे.
        </p>
        <p>
          <strong>आणि ज्याअर्थी (AND WHEREAS),</strong> {hasSecondLicensee ? 'परवाना घेणारे (लायसेंसी १ व लायसेंसी २)' : 'परवाना घेणारे (लायसेंसी)'} यांनी सदर दुकान मिळकत <strong>{purpose || 'व्यायामशाळा व फिटनेस क्लब (Gymnasium & Fitness Club)'}</strong> चालविण्यासाठी तात्पुरत्या स्वरूपात ११ महिन्यांच्या मुदतीकरिता दिनांक <strong>{formattedStartDate}</strong> पासून लिव्ह अँड लायसन्स तत्त्वावर देण्याची विनंती केली व लायसेन्सरने ती मान्य केली आहे.
        </p>
      </div>

      <div className="text-center font-bold tracking-wider my-5 text-sm sm:text-base border-t-2 border-b-2 border-slate-800 py-1.5 bg-slate-100 uppercase">
        म्हणून आता हा करारनामा खालील वैधानिक अटी व शर्तींनुसार साक्ष देतो (NOW THIS AGREEMENT WITNESSETH AS UNDER):
      </div>

      {/* Maharashtra Act Structured Clauses */}
      <div className="space-y-5 text-xs sm:text-sm">
        
        {/* Clause 1: Term & Juridical Possession */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            १. परवाना मुदत व कायदेशीर ताबा (TERM OF LICENCE & POSSESSION)
          </h3>
          <p>
            लायसेन्सरने लायसेंसीस सदर दुकान मिळकत <strong>दिनांक {formattedStartDate} पासून ते दिनांक {formattedEndDate} पर्यंत</strong> एकूण <strong>{durationMonths} महिन्यांच्या कालावधीसाठी</strong> निव्वळ वैयक्तिक वापराचा परवाना (Bare Licence to enter and use) म्हणून दिली आहे.
          </p>
          <p className="mt-1">
            <strong>कायदेशीर ताबा स्पष्टीकरण:</strong> सदर मिळकतीचा कायदेशीर व न्यायिक ताबा (Juridical Possession and Ownership) सर्वस्वी लायसेन्सरकडेच अबाधित राहील. लायसेंसीस केवळ वरील व्यायामशाळा चालविण्यासाठी जागेत प्रवेश करण्याचा व वापरण्याचा सशर्त तात्पुरता परवाना (Permissive Occupation) दिनांक <strong>{formattedPossessionDate}</strong> रोजी देण्यात आला आहे. मुदत समाप्तीनंतर किंवा करार समाप्त झाल्यावर लायसेंसी आपली सर्व मशनरी व साहित्य काढून घेऊन जागेचा ताबा शांततेने लायसेन्सरकडे सोपवेल.
          </p>
        </div>

        {/* Clause 2: Rent & Grace Period */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            २. मासिक परवाना शुल्क व सवलत कालावधी (COMPENSATION / LICENSE FEE)
          </h3>
          <p>
            लायसेंसीने लायसेन्सरला दरमहा परवाना शुल्क <strong>रु. {Number(financials.monthlyRent).toLocaleString('en-IN')}/- ({rentInWords})</strong> दर इंग्रजी महिन्याच्या <strong>{financials.rentDueDay} तारखेपर्यंत</strong> आगाऊ देणे बंधनकारक राहील.
          </p>
          {isProLicensee ? (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>७ दिवसांचा सवलत कालावधी व वाजवी विलंब आकार:</strong> भाडे भरण्यासाठी देय तारखेपासून ७ दिवसांचा विनाशुल्क सवलत कालावधी (Grace Period) राहील. त्यानंतर उशीर झाल्यास भारतीय करार कायदा, १८७२ च्या कलम ७४ अन्वये दररोज <strong>रु. {financials.lateRentPenaltyPerDay || 100}/-</strong> इतका वाजवी विलंब आकार देय राहील. थकीत रकमेबाबत १५ दिवसांची लेखी नोटीस दिल्याशिवाय लायसेन्सरला करार रद्द करता येणार नाही.
            </p>
          ) : (
            <p className="mt-1">
              उशीर झाल्यास दररोज रु. {financials.lateRentPenaltyPerDay}/- विलंब शुल्क राहील.
            </p>
          )}
        </div>

        {/* Clause 3: Deposit Refund Guarantee within 7-10 days */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ३. बिनव्याजी सुरक्षा अनामत ठेव व ताबा परत घेताना ७-१० दिवसांत परतफेड (REFUNDABLE SECURITY DEPOSIT)
          </h3>
          <p>
            परवाना घेणारे (लायसेंसी) यांनी परवाना देणारे (लायसेन्सर) यांजकडे <strong>रु. {Number(financials.securityDeposit).toLocaleString('en-IN')}/- ({depositInWords})</strong> बिनव्याजी परतफेडपात्र सुरक्षा अनामत ठेव (Refundable Security Deposit) म्हणून जमा केली आहे.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>ताबा परत घेताना ७ ते १० दिवसांत अनामत परतफेडीचे बंधन (Deposit Return within 7-10 Days):</strong> मुदत संपल्यावर अथवा करार समाप्त झाल्यावर लायसेन्सरने जागेचा प्रत्यक्ष ताबा परत घेताना किंवा <strong>ताबा परत घेतल्यानंतर जास्तीत जास्त ७ ते १० दिवसांच्या आत (Strictly within 7 to 10 days of taking possession back) संपूर्ण अनामत रक्कम रु. {Number(financials.securityDeposit).toLocaleString('en-IN')}/- लायसेंसीस बिनकपात परत करणे कायदेशीररीत्या बंधनकारक राहील</strong>. सामान्य झीज (Normal wear and tear) किंवा रंगकामाच्या बहाण्याने कोणतीही अनाधिकृत कपात करण्यास लायसेन्सरला सक्त मनाई राहील. जर लायसेन्सरने ताबा परत घेतल्यानंतर १० दिवसांच्या आत अनामत रक्कम परत करण्यास विलंब केला, तर संपूर्ण रकमेवर वार्षिक १८% दराने दंडनीय व्याज देण्यास लायसेन्सर बांधील राहील, तसेच संपूर्ण अनामत रक्कम परत मिळेपर्यंत लायसेंसीस जागेचा विनाभाडे ताबा ठेवण्याचा व वापरण्याचा पूर्ण कायदेशीर अधिकार राहील.
            </p>
          )}
        </div>

        {/* Clause 4: Permitted Use & Fixture Removal */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ४. अधिकृत वापर व जिम फिक्स्चर्स काढून नेण्याचा वैधानिक हक्क (TRADE FIXTURES)
          </h3>
          <p>
            सदर जागेचा वापर केवळ <strong>{purpose || 'व्यायामशाळा / जिम (Gymnasium)'}</strong> व तदनुषंगिक फिटनेस कार्यासाठीच राहील.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>भारतीय सुविधाधिकार अधिनियम, १८८२ चे कलम ६०(ब) नुसार संरक्षण:</strong> लायसेंसीला जागेमध्ये जिम मशनरी, वजन उपकरणे, डंबेल स्टँड्स, रबर फ्लोअरिंग मॅट्स, मोठे आरसे, तात्पुरते पार्टिशन्स, साउंड सिस्टीम व एअर कंडिशनर्स बसविण्याची पूर्ण परवानगी आहे. ही सर्व मशनरी व साहित्य लायसेंसीची वैयक्तिक जंगम मालमत्ता असून, करार संपल्यावर स्वतःच्या खर्चाने बसविलेली ही सर्व सामग्री व आरसे कोणतीही संरचनात्मक मोडतोड न करता सुरक्षितपणे काढून नेण्याचा पूर्ण व अनिर्बंध अधिकार लायसेंसीला राहील.
            </p>
          )}
          {isProLicensee && licenseeProtections?.signboardRight && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>नामफलक व दिशादर्शक बोर्ड:</strong> इमारतीच्या दर्शनी भागावर व मुख्य प्रवेशद्वारावर व्यायामशाळेचा ग्लो-साइन / एलईडी नामफलक व दिशादर्शक फलक कोणत्याही अतिरिक्त शुल्काशिवाय लावण्याचा लायसेंसीस पूर्ण अधिकार राहील.
            </p>
          )}
        </div>

        {/* Clause 5: 3-Phase Electricity & NOC */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ५. ३-फेज वीज, पाणी व लायसेन्सरचे ना-हरकत प्रमाणपत्र (ELECTRICITY & OWNER NOC)
          </h3>
          <p>
            लायसेंसी प्रत्यक्ष वापरलेल्या विजेचे बिल मीटर रीडिंगप्रमाणे भरेल.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>३-फेज वीज भार व गुमास्ता संमतीपत्र (NOC):</strong> जागेमध्ये व्यायामशाळेच्या उपकरणांसाठी पुरेसा ३-फेज व्यावसायिक वीज भार असल्याचे लायसेन्सर हमी देतो. महाराष्ट्र दुकाने व आस्थापना अधिनियम, २०१७ (गुमास्ता परवाना), जीएसटी नोंदणी, विद्युत भार वाढवणे किंवा शासकीय अनुमतीसाठी आवश्यक असलेले ना-हरकत प्रमाणपत्र (NOC) व कर पावत्या मागितल्यापासून ७ दिवसांत देण्यास लायसेन्सर कायदेशीररीत्या बांधील राहील.
            </p>
          )}
        </div>

        {/* Clause 6: Municipal Taxes */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ६. स्थानिक स्वराज्य संस्था कर व संरचना दुरुस्ती (MUNICIPAL TAXES & STRUCTURAL REPAIRS)
          </h3>
          <p>
            महाराष्ट्र नगरपरिषद, नगरपंचायती व औद्योगिक नगरी अधिनियम, १९६५ अन्वये सर्व प्रकारचा मालमत्ता कर, पाणीपट्टी (मुख्य देणी), बिगरशेती कर व इमारत देखभाल खर्च पूर्णपणे लायसेन्सर भरेल. छताची गळती, स्लॅब दुरुस्ती व मुख्य ड्रेनेज लाईनची दुरुस्ती लायसेन्सर स्वतःच्या खर्चाने सूचना मिळताच १० दिवसांत करून देईल.
          </p>
        </div>

        {/* Clause 7: Inspection Privacy */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ७. जागेची पाहणी व सभासदांच्या गोपनीयतेचे रक्षण (INSPECTION & PATRON PRIVACY)
          </h3>
          {isProLicensee ? (
            <p className="text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              व्यायामशाळेतील महिला व पुरुष सदस्यांची गोपनीयता आणि सुरक्षितता जपण्यासाठी, जागेची पाहणी केवळ व्यावसायिक कामकाजाच्या वेळेत आणि किमान <strong>२४ तास आधी लेखी पूर्वसूचना (Appointment) देऊन</strong>, लायसेंसी अथवा त्यांच्या व्यवस्थापकांच्या उपस्थितीतच करता येईल.
            </p>
          ) : (
            <p>लायसेन्सर वाजवी वेळी जागेची पाहणी करू शकेल.</p>
          )}
        </div>

        {/* Clause 8: No Subletting */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ८. पोटभाडेकरू करण्यास सक्त मनाई (NO SUBLETTING)
          </h3>
          <p>
            लायसेंसी सदर जागा इतर कोणालाही पोटभाड्याने देणार नाही किंवा करारातील हक्क त्रयस्थ व्यक्तीस हस्तांतरित करणार नाही.
          </p>
        </div>

        {/* Clause 9: Right of Renewal */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ९. करार नूतनीकरणाचा प्रथम अधिकार (RIGHT OF RENEWAL - OPTION CONTRACT)
          </h3>
          <p>
            सदर कराराची मुदत दिनांक <strong>{formattedEndDate} रोजी</strong> संपुष्टात येईल.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              <strong>कमाल ५% भाडेवाढ मर्यादा:</strong> व्यायामशाळा उभारणीचा मोठा भांडवली खर्च व सदस्य वर्ग लक्षात घेऊन, मुदत संपल्यावर पुढील १ ते २ टर्म्ससाठी (११ ते २२ महिने) करार वाढवून घेण्याचा <strong>प्रथम अधिकार (First Option to Renew)</strong> लायसेंसीला राहील, आणि अशा वेळी भाडेवाढ <strong>जास्तीत जास्त {financials.renewalEscalationPct || 5}%</strong> पेक्षा जास्त असणार नाही. लायसेंसीस प्रथम नकार अधिकार (Right of First Refusal) दिल्याशिवाय लायसेन्सर ही जागा इतर कोणासही देणार नाही.
            </p>
          )}
        </div>

        {/* Clause 10: Lock-in & Notice */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            १०. लॉक-इन कालावधी व समाप्तीची नोटीस (LOCK-IN PERIOD & TERMINATION)
          </h3>
          {isProLicensee ? (
            <p className="text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              उभय पक्षांमध्ये सुरुवातीचा <strong>{financials.lockInPeriodMonths || 6} महिन्यांचा लॉक-इन कालावधी</strong> राहील, ज्यादरम्यान कोणताही पक्ष विनाकारण करार रद्द करणार नाही. लॉक-इन संपल्यानंतर करार मुदतीपूर्वी संपवायचा असल्यास दोन्ही बाजूंना <strong>{financials.noticePeriodDays || 60} दिवसांची लेखी पूर्वसूचना</strong> देणे आवश्यक राहील. (लायसेन्सरची एकतर्फी १५ दिवसांची नोटीस पूर्णपणे रद्द करण्यात आली आहे). नोटीस कालावधी समाप्तीनंतर लायसेंसी ताबा परत करेल व लायसेन्सर वर नमूद केल्याप्रमाणे ७ ते १० दिवसांत अनामत रक्कम परत देईल.
            </p>
          ) : (
            <p>कोणत्याही पक्षास करार संपवायचा असल्यास {financials.noticePeriodDays} दिवसांची लेखी नोटीस द्यावी लागेल.</p>
          )}
        </div>

        {/* Clause 11: Nature of Licence */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            ११. परवान्याचे स्वरूप व निर्वेध ताबा (NATURE OF LICENCE & QUIET ENJOYMENT)
          </h3>
          <p>
            सदर करार हा भारतीय सुविधाधिकार अधिनियम, १८८२ च्या कलम ५२ अन्वये निव्वळ व्यक्तिगत वापराचा परवाना असून जागेची कायदेशीर मालकी लायसेन्सरकडेच राहील व यामुळे कोणताही भाडेपट्टा किंवा कायमचा कुळहक्क निर्माण होत नाही. लायसेंसी वेळेवर परवाना शुल्क देत असेपर्यंत लायसेंसीस जागेचा व सामाईक जिन्याचा शांततेने व निर्वेधपणे वापर करण्याचा पूर्ण अधिकार राहील.
          </p>
        </div>

        {/* Clause 12: Force Majeure */}
        {isProLicensee && licenseeProtections?.forceMajeureRentWaiver && (
          <div className="avoid-break">
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
              १२. आपत्कालीन परिस्थिती व शासकीय बंदी (FORCE MAJEURE)
            </h3>
            <p className="text-slate-900 bg-amber-50/70 p-2.5 rounded border-l-4 border-amber-600">
              शासकीय आदेश, महामारी, लॉकडाऊन किंवा नैसर्गिक आपत्तीमुळे व्यायामशाळा बंद ठेवणे भाग पडल्यास, भारतीय संविदा अधिनियम, १८७२ च्या कलम ५६ च्या तत्त्वानुसार त्या कालावधीपुरते परवाना शुल्क माफ किंवा प्रमाणशीर कमी करण्यात येईल.
            </p>
          </div>
        )}

        {/* Clause 13: Competent Authority Jurisdiction */}
        <div className="avoid-break">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            १३. सक्षम प्राधिकारी व न्यायालयीन अधिकारक्षेत्र (JURISDICTION)
          </h3>
          <p>
            सदर कराराबाबत कोणताही वाद किंवा मतभेद उद्भवल्यास महाराष्ट्र भाडे नियंत्रण अधिनियम, १९९९ मधील कलम ४० अन्वये नियुक्त <strong>सक्षम प्राधिकारी (Competent Authority, Rent Control Act)</strong> तथा दिवाणी न्यायालय, खामगाव (जिल्हा बुलढाणा) यांचे अधिकारक्षेत्र राहील.
          </p>
        </div>

        {/* Clause 14: Registration & Stamp Duty Compliance */}
        <div className="avoid-break border-t border-slate-300 pt-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            १४. महाराष्ट्र भाडे नियंत्रण कायदा कलम ५५ व मुद्रांक कायदा कलम ३६-अ अन्वये नोंदणी
          </h3>
          <p>
            <strong>कलम ५५ अन्वये नोंदणीचे कायदेशीर बंधन:</strong> महाराष्ट्र भाडे नियंत्रण अधिनियम, १९९९ चे कलम ५५(१) व ५५(२) अन्वये हा करार दुय्यम निबंधक कार्यालय, खामगाव (किंवा IGR महाराष्ट्र ई-नोंदणी प्रणालीद्वारे) नोंदणीकृत करणे अनिवार्य असून नोंदणी करून घेण्याची कायदेशीर मुख्य जबाबदारी लायसेन्सर (मालक) यांची राहील.
          </p>
          <p className="mt-1">
            <strong>मुद्रांक शुल्क व नोंदणी फी:</strong> महाराष्ट्र मुद्रांक अधिनियम, १९५८ चे अनुसूची १ मधील अनुच्छेद ३६-अ अन्वये देय मुद्रांक शुल्क (०.२५%) व नोंदणी फी उभय पक्षांनी परस्पर संमतीने ५०-५०% प्रमाणात समान अथवा ठरल्याप्रमाणे खर्च करावयाचा आहे.
          </p>
        </div>

        {/* Clause 15: General Provisions */}
        <div className="avoid-break border-t border-slate-300 pt-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-800 underline mb-1">
            १५. सामान्य विधिक तरतुदी (GENERAL PROVISIONS)
          </h3>
          <p>
            <strong>अ) संपूर्ण करारनामा (Entire Agreement):</strong> हा करारनामा उभय पक्षांमधील अंतिम व संपूर्ण समझोता असून यापूर्वीच्या सर्व तोंडी वा लेखी चर्चांचे यात विलीनीकरण झाले आहे.
          </p>
          <p className="mt-1">
            <strong>ब) अंश पृथक्करणीयता (Severability):</strong> या करारातील कोणतीही एक अट कायद्याने अवैध ठरल्यास, उर्वरित सर्व अटी व शर्ती पूर्णपणे वैध व बंधनकारक राहतील.
          </p>
          <p className="mt-1">
            <strong>क) मूळ प्रती (Counterparts):</strong> हा करारनामा मूळ प्रतींमध्ये तयार करण्यात आला असून, सर्व प्रती कायदेशीररीत्या समान वैध राहतील.
          </p>
        </div>
      </div>

      {/* Execution Witness Footer */}
      <div className="mt-10 pt-6 border-t-2 border-slate-700 text-xs sm:text-sm avoid-break">
        <p className="mb-6 font-semibold text-justify">
          याची साक्ष म्हणून उभय पक्षांनी या करारनाम्यातील सर्व अटी व शर्ती काळजीपूर्वक वाचून, समजून घेऊन, कोणत्याही दबावाशिवाय व पूर्ण शुद्धीत आज दिनांक <strong>{formattedExecDate}</strong> रोजी ठिकाण <strong>{agreementPlace}</strong> येथे खालील साक्षीदारांसमक्ष आपापल्या सह्या केल्या आहेत.
        </p>

        <div className={`grid ${hasSecondLicensee ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'} gap-6 my-8`}>
          <div>
            <div className="h-16 border-b border-slate-700"></div>
            <p className="mt-2 font-bold">{licensor.fullName || 'सौरभ सतीश दुधे'}</p>
            <p className="text-xs text-slate-600 font-bold uppercase">परवाना देणारे (LICENSOR / मालक)</p>
          </div>
          <div>
            <div className="h-16 border-b border-slate-700"></div>
            <p className="mt-2 font-bold">{licensee.fullName || 'दीप सुनील सपकाळ'}</p>
            <p className="text-xs text-slate-600 font-bold uppercase">
              {hasSecondLicensee ? 'परवाना घेणारे १ (LICENSEE 1)' : 'परवाना घेणारे (LICENSEE)'}
            </p>
          </div>
          {hasSecondLicensee && (
            <div>
              <div className="h-16 border-b border-slate-700"></div>
              <p className="mt-2 font-bold">{secondLicensee.fullName || 'गौरवसिंग दर्शनसिंग ठाकूर'}</p>
              <p className="text-xs text-slate-600 font-bold uppercase">परवाना घेणारे २ (LICENSEE 2)</p>
            </div>
          )}
        </div>

        {/* Witnesses */}
        <div className="mt-8">
          <p className="font-bold uppercase tracking-wider text-xs mb-3 text-slate-700">साक्षीदार (WITNESSES):</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-xs text-slate-600 mb-1">१) साक्षीदार १:</p>
              <div className="h-12 border-b border-slate-400"></div>
              <p className="text-xs mt-1 text-slate-500">नाव: __________________________________</p>
              <p className="text-xs mt-1 text-slate-500">पत्ता: __________________________________</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-slate-600 mb-1">२) साक्षीदार २:</p>
              <div className="h-12 border-b border-slate-400"></div>
              <p className="text-xs mt-1 text-slate-500">नाव: __________________________________</p>
              <p className="text-xs mt-1 text-slate-500">पत्ता: __________________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
