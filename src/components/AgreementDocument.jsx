import React from 'react';
import { numberToIndianWords } from '../utils/numberToWords';
import { formatDateIndian, getMonthYearString } from '../utils/dateUtils';

export default function AgreementDocument(props) {
  const agreement = props?.agreement || props || {};
  const {
    agreementPlace = 'KHAMGAON',
    executionDate = '2026-12-01',
    purpose = 'Gymnasium',
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

  const rentInWords = numberToIndianWords(financials?.monthlyRent || 0);
  const depositInWords = numberToIndianWords(financials?.securityDeposit || 0);
  const formattedStartDate = formatDateIndian(startDate);
  const formattedEndDate = formatDateIndian(endDate);
  const formattedPossessionDate = formatDateIndian(possessionDate || startDate);
  const formattedExecDate = formatDateIndian(executionDate);
  const monthYearStr = getMonthYearString(executionDate);

  const execParts = (executionDate || '').split('-');
  const execDay = execParts[2] ? parseInt(execParts[2], 10) : '____';

  const isProLicensee = licenseeProtections?.enabled;
  const hasSecondLicensee = secondLicensee?.enabled && secondLicensee?.fullName;

  return (
    <div id="printable-agreement" className={`a4-sheet bg-white text-black legal-font leading-relaxed text-justify max-w-4xl mx-auto ${stampPaperSpace ? 'pt-48' : ''}`}>
      {stampPaperSpace && (
        <div className="no-print border-2 border-dashed border-amber-300 bg-amber-50 p-4 text-center text-amber-800 text-sm mb-8 font-sans">
          📜 <strong>Stamp Paper Margin Active:</strong> Top spacing left clear so Page 1 prints neatly below the header of your physical Government Stamp Paper.
        </div>
      )}

      {/* Official Statutory Header */}
      <div className="text-center mb-6">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-1">
          Government of Maharashtra — Registration & Stamps Department (IGR Model Format)
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-wider underline uppercase legal-heading mb-1">
          LEAVE AND LICENSE AGREEMENT
        </h1>
        <p className="text-xs sm:text-sm font-bold text-slate-800">
          [FORMULATED UNDER SECTION 55 OF THE MAHARASHTRA RENT CONTROL ACT, 1999]
        </p>
        <p className="font-semibold text-sm sm:text-base mt-3 border-t border-b border-slate-300 py-1.5">
          THIS AGREEMENT OF LEAVE & LICENCE is made and entered into at{' '}
          <span className="font-bold uppercase underline">{agreementPlace || 'KHAMGAON'}</span> on{' '}
          <span className="font-bold">{execDay}</span> day of{' '}
          <span className="font-bold">{monthYearStr}</span>
        </p>
      </div>

      {/* Parties Block */}
      <div className="space-y-4 mb-6 text-sm sm:text-base">
        <div className="text-center font-bold text-xs uppercase tracking-wider text-slate-700">
          :- DETAILS OF THE PARTIES :-
        </div>
        
        {/* Licensor */}
        <div className="pl-4 border-l-4 border-indigo-500 bg-slate-50/80 p-3 rounded avoid-break">
          <p className="font-bold text-base text-slate-900">{licensor.fullName || '[LICENSOR NAME]'},</p>
          <p>Age about: <strong>{licensor.age || '__'} years</strong>, Occ.: <strong>{licensor.occupation || 'Business'}</strong></p>
          <p>Permanent Address: {licensor.address || '[Permanent Address]'}</p>
          <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
            {licensor.aadhaarNumber && <span>Aadhaar No.: <strong>{licensor.aadhaarNumber}</strong></span>}
            {licensor.panNumber && <span>PAN No.: <strong>{licensor.panNumber}</strong></span>}
          </div>
          <p className="mt-2 text-xs uppercase tracking-wider font-semibold text-indigo-900">
            hereinafter called the <strong>LICENSOR</strong> (Which expression unless repugnant to the context shall mean and include his heirs, executors, administrators and assigns) of the <strong>FIRST PART</strong>.
          </p>
        </div>

        <div className="text-center font-bold italic text-slate-600">And</div>

        {/* Licensees */}
        {hasSecondLicensee ? (
          <div className="space-y-3">
            {/* Licensee 1 */}
            <div className="pl-4 border-l-4 border-emerald-600 bg-emerald-50/50 p-3 rounded avoid-break">
              <span className="inline-block text-[11px] font-bold text-emerald-800 uppercase tracking-wide bg-emerald-100/80 px-2 py-0.5 rounded mb-1">
                LICENSEE 1
              </span>
              <p className="font-bold text-base text-slate-900">{licensee.fullName || '[LICENSEE 1 NAME]'},</p>
              <p>Age about: <strong>{licensee.age || '__'} years</strong>, Occ.: <strong>{licensee.occupation || 'Business / Gymnasium Operator'}</strong></p>
              <p>Permanent Address: {licensee.address || '[Permanent Address]'}</p>
              <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
                {licensee.aadhaarNumber && <span>Aadhaar No.: <strong>{licensee.aadhaarNumber}</strong></span>}
                {licensee.panNumber && <span>PAN No.: <strong>{licensee.panNumber}</strong></span>}
              </div>
            </div>

            {/* Licensee 2 */}
            <div className="pl-4 border-l-4 border-teal-600 bg-teal-50/50 p-3 rounded avoid-break">
              <span className="inline-block text-[11px] font-bold text-teal-800 uppercase tracking-wide bg-teal-100/80 px-2 py-0.5 rounded mb-1">
                LICENSEE 2
              </span>
              <p className="font-bold text-base text-slate-900">{secondLicensee.fullName || '[LICENSEE 2 NAME]'},</p>
              <p>Age about: <strong>{secondLicensee.age || '__'} years</strong>, Occ.: <strong>{secondLicensee.occupation || 'Business / Gymnasium Operator'}</strong></p>
              <p>Permanent Address: {secondLicensee.address || '[Permanent Address]'}</p>
              <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
                {secondLicensee.aadhaarNumber && <span>Aadhaar No.: <strong>{secondLicensee.aadhaarNumber}</strong></span>}
                {secondLicensee.panNumber && <span>PAN No.: <strong>{secondLicensee.panNumber}</strong></span>}
              </div>
            </div>

            <p className="mt-2 text-xs uppercase tracking-wider font-semibold text-emerald-900 p-2 bg-emerald-50/50 rounded border border-emerald-200">
              hereinafter jointly and severally called the <strong>LICENSEES</strong> (Which expression unless repugnant to the context shall mean and include their respective heirs, legal representatives and assigns) of the <strong>OTHER PART</strong>.
            </p>
          </div>
        ) : (
          <div className="pl-4 border-l-4 border-emerald-600 bg-emerald-50/50 p-3 rounded avoid-break">
            <p className="font-bold text-base text-slate-900">{licensee.fullName || '[LICENSEE NAME]'},</p>
            <p>Age about: <strong>{licensee.age || '__'} years</strong>, Occ.: <strong>{licensee.occupation || 'Business / Gymnasium Operator'}</strong></p>
            <p>Permanent Address: {licensee.address || '[Permanent Address]'}</p>
            <div className="flex flex-wrap gap-4 mt-1 font-mono text-xs text-slate-700">
              {licensee.aadhaarNumber && <span>Aadhaar No.: <strong>{licensee.aadhaarNumber}</strong></span>}
              {licensee.panNumber && <span>PAN No.: <strong>{licensee.panNumber}</strong></span>}
            </div>
            <p className="mt-2 text-xs uppercase tracking-wider font-semibold text-emerald-900">
              hereinafter called the <strong>LICENSEE</strong> (Which expression unless repugnant to the context shall mean and include his heirs, legal representatives and assigns) of the <strong>OTHER PART</strong>.
            </p>
          </div>
        )}
      </div>

      {/* Official Schedule of Property */}
      <div className="my-6 avoid-break border-2 border-slate-800 p-4 rounded-lg bg-slate-50/50">
        <h2 className="text-center font-bold tracking-wider uppercase text-base underline mb-3 text-slate-900">
          -: SCHEDULE OF THE LICENSED PROPERTY :-
        </h2>
        <p className="text-xs text-slate-600 text-center mb-3">
          (As required under Sections 21 and 22 of the Registration Act, 1908)
        </p>

        <div className="text-sm space-y-2 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div>• <strong>District / Registration District:</strong> Buldana</div>
            <div>• <strong>Taluka / Sub-Registrar Office:</strong> Khamgaon</div>
            <div>• <strong>Village / Revenue Area:</strong> Khamgaon</div>
            <div>• <strong>Local Municipal Body:</strong> Khamgaon Municipal Council</div>
            <div>• <strong>Field Survey No. / CTS No.:</strong> 68/5</div>
            <div>• <strong>Layout Plot No.:</strong> 3 (admeasuring 111.30 sq.mtrs)</div>
            <div>• <strong>Building / Apartment Name:</strong> "R.K. Sankul"</div>
            <div>• <strong>Unit / Floor No.:</strong> First Floor, Commercial Shop No. 29</div>
            <div className="col-span-2">• <strong>Built-up / Carpet Area:</strong> 3200.00 sq.fts (approx. 297.28 sq.mtrs)</div>
            <div className="col-span-2">• <strong>Non-Agricultural (NA) Order:</strong> {property.naOrderDetails}</div>
          </div>

          {/* Boundaries Table */}
          <div className="mt-3">
            <p className="font-bold text-xs uppercase mb-1">Boundaries of the Premises (Four Sides):</p>
            <div className="border border-slate-800 text-xs sm:text-sm">
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">East</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.east || 'Shop No. 17 and Passage'}</div>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">West</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.west || 'Plot No. 2'}</div>
              </div>
              <div className="grid grid-cols-4 border-b border-slate-800">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">North</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.north || 'Ghatpuri Road'}</div>
              </div>
              <div className="grid grid-cols-4">
                <div className="font-bold p-1.5 bg-slate-200 border-r border-slate-800">South</div>
                <div className="col-span-3 p-1.5">{property.boundaries?.south || '9 Mtr. Road'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recitals */}
      <div className="space-y-3 mb-6 text-sm sm:text-base">
        <p>
          <strong>WHEREAS,</strong> the LICENSOR is the exclusive absolute owner, seized and possessed of the licensed property described in the Schedule above, free from all mortgages, charges, litigation, or encumbrances, and has full right to grant the licence.
        </p>
        <p>
          <strong>AND WHEREAS,</strong> {hasSecondLicensee ? 'the LICENSEES have' : 'the LICENSEE has'} approached the Licensor with a request to grant leave and licence to occupy and use the said property for <strong>{purpose || 'Gymnasium & Fitness Club'}</strong> for a period of {durationMonths} months commencing from <strong>Dt.{formattedStartDate} To {formattedEndDate}</strong>, which request the Licensor has accepted.
        </p>
      </div>

      <div className="text-center font-bold tracking-wider my-5 text-base border-t-2 border-b-2 border-slate-800 py-1.5 bg-slate-100 uppercase">
        NOW THIS AGREEMENT WITNESSETH AS UNDER:
      </div>

      {/* Structured Maharashtra Legal Clauses */}
      <div className="space-y-5 text-sm sm:text-base">
        
        {/* Clause 1: Term */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">1. PERIOD & TERM OF LICENCE</h3>
          <p>
            The Licensor hereby grants leave and licence to the Licensee to occupy and use the licensed premises for a fixed term of <strong>{durationMonths} months</strong> commencing from <strong>Dt.{formattedStartDate} To {formattedEndDate}</strong>. Permissive possession of the premises has been delivered by the Licensor to the Licensee on <strong>Dt.{formattedPossessionDate}</strong>.
          </p>
          <p className="mt-1 text-xs sm:text-sm text-slate-700">
            Upon expiry of the licence period or its determination, the Licensee shall peacefully hand back vacant possession of the premises to the Licensor after removing all gym machinery, mirrors, and fixtures.
          </p>
        </div>

        {/* Clause 2: License Fee / Rent */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">2. MONTHLY LICENSE FEE & GRACE PERIOD</h3>
          <p>
            The Licensee shall pay to the Licensor a monthly license fee of <strong>Rs. {Number(financials.monthlyRent).toLocaleString('en-IN')}/- ({rentInWords})</strong> in advance on or before the <strong>{financials.rentDueDay}th day</strong> of each English calendar month.
          </p>
          {isProLicensee ? (
            <p className="mt-2 text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              <strong>Grace Period & Balanced Late Charge:</strong> The Licensee shall be entitled to a grace period of <strong>7 days</strong> from the due date. Thereafter, late interest shall be payable @ <strong>Rs. {financials.lateRentPenaltyPerDay || 100}/- per day</strong> of default under Section 74 of the Indian Contract Act, 1872. The Licensor shall serve a 15-day prior written cure notice before initiating any termination for non-payment.
            </p>
          ) : (
            <p className="mt-1">Late payment penalty of Rs. {financials.lateRentPenaltyPerDay}/- per day shall apply.</p>
          )}
        </div>

        {/* Clause 3: Deposit */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">3. REFUNDABLE SECURITY DEPOSIT & 7-10 DAYS REFUND</h3>
          <p>
            The Licensee has deposited an interest-free refundable security deposit of <strong>Rs. {Number(financials.securityDeposit).toLocaleString('en-IN')}/- ({depositInWords})</strong> with the Licensor.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              <strong>Deposit Refund within 7 to 10 Days Guarantee:</strong> The Licensor covenants and agrees that upon taking back possession of the premises or <strong>strictly within 7 to 10 days of taking possession back</strong>, the entire Security Deposit of Rs. {Number(financials.securityDeposit).toLocaleString('en-IN')}/- shall be refunded in full to the Licensee without any unjustified deductions. If the Licensor delays refunding the deposit beyond 10 days of possession handover, the Licensor shall pay penal interest @ 18% per annum, and the Licensee shall have the legal right to retain permissive physical occupation rent-free until the deposit is refunded in full.
            </p>
          )}
        </div>

        {/* Clause 4: Permitted Use & Fixtures */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">4. PERMITTED PURPOSE & RIGHT TO REMOVE TRADE FIXTURES</h3>
          <p>
            The premises shall be used exclusively for <strong>{purpose || 'Gymnasium'}</strong> and allied fitness activities.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              <strong>Statutory Protection under Section 60(b) of Indian Easements Act:</strong> The Licensor grants permission to the Licensee to install gym machinery, weights, rubber flooring/mats, wall mirrors, temporary partitions, soundproofing, and air conditioners. The Licensee shall have the unhindered right to dismantle and remove all such trade machinery, mirrors, and equipment upon vacation without hindrance from the Licensor.
            </p>
          )}
          {isProLicensee && licenseeProtections?.signboardRight && (
            <p className="mt-2 text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              <strong>Signboard & Branding Rights:</strong> The Licensee shall have the right to display glow-sign / LED nameplates and branding boards on the building facade and entrance without additional charges.
            </p>
          )}
        </div>

        {/* Clause 5: Power & NOC */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">5. 3-PHASE ELECTRICITY & OWNER'S NOC</h3>
          <p>
            The Licensee shall pay the actual metered electricity consumption charges.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              <strong>Power Warranty & Gumasta Assistance:</strong> The Licensor warrants that the premises has an active commercial 3-phase connection adequate for gymnasium loads. The Licensor agrees to provide No-Objection Certificates (NOC), property tax receipts, and documents required by the Licensee for obtaining Shop & Establishment (Gumasta) registration under the Maharashtra Shops Act, 2017, GST, or load extension within 7 days of request.
            </p>
          )}
        </div>

        {/* Clause 6: Taxes */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">6. MUNICIPAL TAXES & STRUCTURAL REPAIRS</h3>
          <p>
            All property taxes, local cesses, and non-agricultural assessments payable to the Khamgaon Municipal Council under the Maharashtra Municipal Councils Act, 1965 shall be solely borne by the Licensor. Structural repairs, roof leakages, and common plumbing lines shall be promptly repaired by the Licensor at his own cost.
          </p>
        </div>

        {/* Clause 7: Inspection Privacy */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">7. INSPECTION & PATRON PRIVACY</h3>
          {isProLicensee ? (
            <p className="text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              To safeguard the privacy and safety of gymnasium members and patrons, inspection by the Licensor shall take place only during normal daytime business hours, strictly after giving at least <strong>24 hours prior written appointment</strong>, accompanied by the Licensee or his manager.
            </p>
          ) : (
            <p>The Licensor may inspect the premises at reasonable times.</p>
          )}
        </div>

        {/* Clause 8: No Subletting */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">8. NO SUB-LETTING OR ASSIGNMENT</h3>
          <p>
            The Licensee shall not sublet, assign, or part with possession of the premises to any third party.
          </p>
        </div>

        {/* Clause 9: Renewal */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">9. RIGHT OF RENEWAL (FIRST OPTION TO RENEW)</h3>
          <p>
            The licence shall automatically expire on <strong>Dt.{formattedEndDate}</strong>.
          </p>
          {isProLicensee && (
            <p className="mt-2 text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              <strong>Renewal Option (Capped at 5%):</strong> Recognizing the substantial capital investments made by the Licensee in setting up the gymnasium, the Licensee shall have the <strong>first right of refusal and option to renew</strong> for subsequent terms with rent escalation not exceeding <strong>{financials.renewalEscalationPct || 5}%</strong>.
            </p>
          )}
        </div>

        {/* Clause 10: Lock-in & Notice */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">10. LOCK-IN PERIOD & NOTICE OF TERMINATION</h3>
          {isProLicensee ? (
            <p className="text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              Both parties agree to a mutual Lock-In period of <strong>{financials.lockInPeriodMonths || 6} months</strong>. Post lock-in, either party may terminate by serving <strong>{financials.noticePeriodDays || 60} days' prior written notice</strong>. Any unilateral early termination clause on 15 days' notice stands omitted. Upon completion of notice period, possession shall be handed over and the deposit refunded within 7-10 days as stipulated.
            </p>
          ) : (
            <p>Either party may terminate by giving {financials.noticePeriodDays} days' prior written notice.</p>
          )}
        </div>

        {/* Clause 11: Nature of Licence */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">11. NATURE OF LICENCE UNDER INDIAN EASEMENTS ACT, 1882</h3>
          <p>
            This agreement is granted strictly as a permissive Leave and Licence under Section 52 of the Indian Easements Act, 1882. Juridical possession and ownership shall remain with the Licensor. Nothing herein shall be construed as creating any lease, tenancy, or sub-tenancy.
          </p>
        </div>

        {/* Clause 12: Force Majeure */}
        {isProLicensee && licenseeProtections?.forceMajeureRentWaiver && (
          <div className="avoid-break">
            <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">12. FORCE MAJEURE & CLOSURE RELIEF</h3>
            <p className="text-slate-900 bg-amber-50/60 p-2.5 rounded border-l-4 border-amber-600 text-xs sm:text-sm">
              If the gymnasium is prevented from operating due to government lockdowns, pandemics, fire, or acts of God, the license fee shall remain suspended or proportionately abated under Section 56 of the Indian Contract Act, 1872.
            </p>
          </div>
        )}

        {/* Clause 13: Competent Authority */}
        <div className="avoid-break">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">13. JURISDICTION & COMPETENT AUTHORITY</h3>
          <p>
            Any dispute arising under this agreement shall be subject to the jurisdiction of the Competent Authority appointed under the Maharashtra Rent Control Act, 1999 and the Civil Courts at Khamgaon, Dist. Buldana.
          </p>
        </div>

        {/* Clause 14: Registration */}
        <div className="avoid-break border-t border-slate-300 pt-3">
          <h3 className="font-bold underline mb-1 uppercase text-xs tracking-wider">14. REGISTRATION UNDER SECTION 55 & STAMP DUTY COMPLIANCE</h3>
          <p>
            <strong>Mandatory Registration:</strong> As per Section 55(1) and 55(2) of the Maharashtra Rent Control Act, 1999, this agreement shall be registered with the Joint Sub-Registrar, Khamgaon (or through IGR Maharashtra e-Registration). The statutory responsibility to effect registration lies upon the Licensor.
          </p>
          <p className="mt-1">
            <strong>Stamp Duty under Article 36A:</strong> Stamp duty payable under Article 36A of Schedule I of the Maharashtra Stamp Act, 1958 (0.25%) and registration fees shall be shared equally (50-50%) or as mutually agreed.
          </p>
        </div>
      </div>

      {/* Execution Witness Footer */}
      <div className="mt-10 pt-6 border-t-2 border-slate-700 text-sm avoid-break">
        <p className="mb-6 font-semibold text-justify">
          IN WITNESS WHEREOF the Licensor and the Licensee(s) have signed and executed this agreement on the day, month, and year first hereinabove written at <strong>{agreementPlace}</strong> in the presence of the following witnesses.
        </p>

        <div className={`grid ${hasSecondLicensee ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-2'} gap-6 my-8`}>
          <div>
            <div className="h-16 border-b border-slate-700"></div>
            <p className="mt-2 font-bold">{licensor.fullName || 'Saurabh Satish Dude'}</p>
            <p className="text-xs uppercase text-slate-600 font-bold">LICENSOR (OWNER)</p>
          </div>
          <div>
            <div className="h-16 border-b border-slate-700"></div>
            <p className="mt-2 font-bold">{licensee.fullName || 'Deep Sunil Sapkal'}</p>
            <p className="text-xs uppercase text-slate-600 font-bold">
              {hasSecondLicensee ? 'LICENSEE 1' : 'LICENSEE (YOU)'}
            </p>
          </div>
          {hasSecondLicensee && (
            <div>
              <div className="h-16 border-b border-slate-700"></div>
              <p className="mt-2 font-bold">{secondLicensee.fullName || 'Gauravsingh Darshansingh Thakur'}</p>
              <p className="text-xs uppercase text-slate-600 font-bold">LICENSEE 2 (CO-LICENSEE)</p>
            </div>
          )}
        </div>

        {/* Witnesses */}
        <div className="mt-8">
          <p className="font-bold uppercase tracking-wider text-xs mb-3 text-slate-700">WITNESSES:</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p className="font-semibold text-xs text-slate-600 mb-1">1] WITNESS 1:</p>
              <div className="h-12 border-b border-slate-400"></div>
              <p className="text-xs mt-1 text-slate-500">Name: __________________________________</p>
              <p className="text-xs mt-1 text-slate-500">Address: __________________________________</p>
            </div>
            <div>
              <p className="font-semibold text-xs text-slate-600 mb-1">2] WITNESS 2:</p>
              <div className="h-12 border-b border-slate-400"></div>
              <p className="text-xs mt-1 text-slate-500">Name: __________________________________</p>
              <p className="text-xs mt-1 text-slate-500">Address: __________________________________</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
