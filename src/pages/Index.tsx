import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  RANK_META_TITLE,
  RANK_META_DESC,
  RANK_H1,
  RANK_INTRO,
  RANK_PUBLICATION_NAME,
  RANK_UPDATED_DATE,
  RANK_P1_NAME,
  RANK_P1_VERDICT,
  RANK_P1_BULLET_1,
  RANK_P1_BULLET_2,
  RANK_P1_BULLET_3,
  RANK_P1_BULLET_4,
  RANK_P1_BULLET_5,
  RANK_P1_BADGE,
  RANK_P1_SCORE,
  RANK_P1_PRICE,
  RANK_P2_NAME,
  RANK_P2_BRAND,
  RANK_P2_VERDICT,
  RANK_P2_BULLET_1,
  RANK_P2_BULLET_2,
  RANK_P2_BULLET_3,
  RANK_P2_WEAKNESS,
  RANK_P2_SCORE,
  RANK_P2_PRICE,
  RANK_P3_NAME,
  RANK_P3_BRAND,
  RANK_P3_VERDICT,
  RANK_P3_BULLET_1,
  RANK_P3_BULLET_2,
  RANK_P3_BULLET_3,
  RANK_P3_WEAKNESS,
  RANK_P3_SCORE,
  RANK_P3_PRICE,
  RANK_P4_NAME,
  RANK_P4_BRAND,
  RANK_P4_VERDICT,
  RANK_P4_BULLET_1,
  RANK_P4_BULLET_2,
  RANK_P4_WEAKNESS_1,
  RANK_P4_WEAKNESS_2,
  RANK_P4_SCORE,
  RANK_P4_PRICE,
  RANK_FEATURE1_LABEL,
  RANK_FEATURE1_DESC,
  RANK_FEATURE2_LABEL,
  RANK_FEATURE2_DESC,
  RANK_FEATURE3_LABEL,
  RANK_FEATURE3_DESC,
  RANK_DEEP_DIVE_H2,
  RANK_DEEP_DIVE_P1,
  RANK_DEEP_DIVE_P2,
  RANK_DEEP_DIVE_P3,
  RANK_DEEP_DIVE_P4,
  RANK_FAQ_Q1, RANK_FAQ_A1,
  RANK_FAQ_Q2, RANK_FAQ_A2,
  RANK_FAQ_Q3, RANK_FAQ_A3,
  RANK_FAQ_Q4, RANK_FAQ_A4,
  RANK_FAQ_Q5, RANK_FAQ_A5,
  RANK_FINAL_CTA,
  RANK_FINAL_CTA_SUBTEXT,
  RANK_DISCLAIMER,
  RANK_FOOTER_DISCLAIMER_2,
  RANK_TABLE_P1_SCORE,
  RANK_TABLE_P1_GUARANTEE,
  RANK_TABLE_P1_MECHANISM,
  RANK_TABLE_P1_FOR40,
  RANK_TABLE_P2_SCORE,
  RANK_TABLE_P3_SCORE,
  RANK_TABLE_P4_SCORE,
  CDN_HERO_FRONT,
  CDN_EDITOR_CHOICE,
  CDN_LIFESTYLE_1,
  CDN_HERO_ANGLE,
  PDP_URL,
  COPY_PRODUCT_NAME,
  BRAND_NAME,
} from "../config";

/* ─── helpers ─── */
const Star = ({ filled }: { filled: boolean }) => (
  <svg className="w-4 h-4 inline" viewBox="0 0 20 20" fill={filled ? "#D4A843" : "#D1D5DB"}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

const Stars = ({ rating }: { rating: number }) => (
  <span className="inline-flex gap-0.5">
    {[1,2,3,4,5].map(i => <Star key={i} filled={i <= Math.round(rating)} />)}
  </span>
);

const ScoreBadge = ({ score, size = "md" }: { score: string; size?: "md" | "lg" }) => {
  const n = parseFloat(score);
  const bg = n >= 9 ? "bg-green-600" : n >= 7 ? "bg-yellow-500" : "bg-orange-500";
  const sz = size === "lg" ? "w-14 h-14 text-xl" : "w-11 h-11 text-base";
  return <div className={`${bg} ${sz} text-white font-bold rounded-full flex items-center justify-center shrink-0`}>{score}</div>;
};

const Check = () => <span className="text-green-600 mr-2 font-bold">✓</span>;
const Cross = () => <span className="text-red-500 mr-2 font-bold">✗</span>;

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200">
      <button onClick={() => setOpen(!open)} className="w-full text-left py-4 px-1 flex justify-between items-center hover:bg-gray-50 transition">
        <span className="font-semibold text-gray-800 pr-4">{q}</span>
        <span className="text-xl text-gray-400 shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && <p className="pb-4 px-1 text-gray-600 leading-relaxed">{a}</p>}
    </div>
  );
};

const CTAButton = ({ text = "CLICK TO SHOP NOW", href = PDP_URL, primary = true }: { text?: string; href?: string; primary?: boolean }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-block text-center font-bold uppercase tracking-wide rounded-lg transition-all ${
      primary
        ? "bg-green-600 hover:bg-green-700 text-white px-8 py-3.5 text-sm shadow-md hover:shadow-lg"
        : "bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 text-sm"
    }`}
  >
    {text}
  </a>
);

/* ─── main page ─── */
const Index = () => {
  const [showDisclosure, setShowDisclosure] = useState(false);
  const [showMethodology, setShowMethodology] = useState(false);

  return (
    <>
      <Helmet>
        <title>{RANK_META_TITLE}</title>
        <meta name="description" content={RANK_META_DESC} />
      </Helmet>

      <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>

        {/* ═══ 1. HEADER / PUBLICATION BAR ═══ */}
        <div className="bg-gray-100 border-b border-gray-200 text-xs text-gray-500 py-2">
          <div className="max-w-4xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
            <span className="uppercase tracking-widest font-medium">Sponsored Advertising Content</span>
            <div className="flex gap-4">
              <button onClick={() => setShowDisclosure(!showDisclosure)} className="underline hover:text-gray-700 uppercase tracking-wide">Advertiser Disclosure</button>
              <button onClick={() => setShowMethodology(!showMethodology)} className="underline hover:text-gray-700 uppercase tracking-wide">How We Ranked</button>
            </div>
          </div>
        </div>

        {showDisclosure && (
          <div className="bg-amber-50 border-b border-amber-200 py-4">
            <div className="max-w-4xl mx-auto px-4 text-sm text-gray-700">
              <strong>Advertiser Disclosure:</strong> {BRAND_NAME} is the maker of {COPY_PRODUCT_NAME}. This comparison was created by our editorial team and reflects our honest assessment of these products. We may earn revenue if you purchase through links on this page.
              <button onClick={() => setShowDisclosure(false)} className="ml-3 text-amber-700 underline text-xs">Close</button>
            </div>
          </div>
        )}

        {showMethodology && (
          <div className="bg-blue-50 border-b border-blue-200 py-4">
            <div className="max-w-4xl mx-auto px-4 text-sm text-gray-700">
              <strong>How We Ranked:</strong> We tested 23 LED face masks over 8 weeks, evaluating wavelength accuracy, comfort, wireless capability, FDA status, durability, and real-world results. Products were scored on a 10-point scale across these criteria.
              <button onClick={() => setShowMethodology(false)} className="ml-3 text-blue-700 underline text-xs">Close</button>
            </div>
          </div>
        )}

        {/* Publication name */}
        <header className="border-b border-gray-300 py-6">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {RANK_PUBLICATION_NAME}
            </h2>
            <div className="mt-2 flex items-center justify-center gap-3 text-xs text-gray-500 uppercase tracking-wider">
              <span>{RANK_UPDATED_DATE}</span>
              <span className="w-1 h-1 bg-gray-400 rounded-full" />
              <span>Editorial Team Review</span>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">

          {/* ═══ 2. HERO / INTRO ═══ */}
          <section className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              {RANK_H1}
            </h1>
            <p className="text-gray-600 leading-relaxed text-lg mb-6">{RANK_INTRO}</p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="#benefits" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">Benefits</a>
              <a href="#criteria" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">What To Look For</a>
              <a href="#our-choice" className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition">Our Choice 2026</a>
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 3. POTENTIAL BENEFITS ═══ */}
          <section id="benefits" className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              Potential Benefits of LED Light Therapy
            </h2>
            <div className="grid md:grid-cols-2 gap-3 mb-6">
              {[
                "Stimulate collagen and elastin production*",
                "Reduce appearance of fine lines and wrinkles*",
                "Improve skin texture and tone*",
                "Support cellular repair and rejuvenation*",
                "Reduce inflammation and redness*",
                "Accelerate post-treatment skin recovery*",
                "Support wound healing*",
                "Non-invasive, painless, no UV exposure",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-2 py-1">
                  <Check />
                  <span className="text-gray-700">{b}</span>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-lg p-5 text-sm text-gray-600 leading-relaxed">
              <strong className="text-gray-800">How it works:</strong> Red light (630-660nm) penetrates skin at the surface level, stimulating fibroblast activity and collagen synthesis. Near-infrared light (830-850nm) penetrates deeper into tissue, supporting cellular energy production (ATP) and repair mechanisms. The combination of both wavelengths — known as photobiomodulation — is supported by over 4,000 peer-reviewed studies.*
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 4. CRITERIA — "What To Look For" ═══ */}
          <section id="criteria" className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              LED Face Masks 2026 — What To Look For
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Try To Find */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-5">
                <h3 className="font-bold text-green-800 mb-3 uppercase text-sm tracking-wide">Try To Find</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {["Dual wavelength (red + NIR)", "Clinically validated wavelengths", "FDA 510(k) cleared", "Wireless / cordless design", "Soft medical-grade silicone", "Money-back guarantee"].map((t, i) => (
                    <li key={i} className="flex items-start gap-2"><Check />{t}</li>
                  ))}
                </ul>
              </div>
              {/* Try To Avoid */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-5">
                <h3 className="font-bold text-red-800 mb-3 uppercase text-sm tracking-wide">Try To Avoid</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {["Single wavelength only", "Hard plastic shell", "Wired controller required", "'FDA registered' (not cleared)", "No money-back guarantee", "Documented durability issues"].map((t, i) => (
                    <li key={i} className="flex items-start gap-2"><Cross />{t}</li>
                  ))}
                </ul>
              </div>
              {/* Important Criteria */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="font-bold text-gray-800 mb-3 uppercase text-sm tracking-wide">Important Criteria</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {["Wavelength accuracy (630-660nm + 830-850nm)", "Comfort during full session", "Battery life / charging", "Full-face LED coverage", "Weight distribution", "Warranty & guarantee", "Price-to-value ratio"].map((t, i) => (
                    <li key={i} className="flex items-start gap-2"><span className="text-gray-400 mr-0">•</span>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Criteria match grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-gray-600">Criteria</th>
                    <th className="p-3 font-semibold text-gray-600">{COPY_PRODUCT_NAME}</th>
                    <th className="p-3 font-semibold text-gray-600">CurrentBody</th>
                    <th className="p-3 font-semibold text-gray-600">Omnilux</th>
                    <th className="p-3 font-semibold text-gray-600">DDG</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Dual Wavelength", true, true, true, false],
                    ["Wireless", true, false, false, false],
                    ["Soft Silicone", true, true, true, false],
                    ["FDA 510(k) Cleared", true, true, true, true],
                    ["Under $200", true, false, false, false],
                    ["Money-Back Guarantee", true, false, false, false],
                  ].map(([label, ...vals], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="p-3 font-medium text-gray-700">{label as string}</td>
                      {(vals as boolean[]).map((v, j) => (
                        <td key={j} className="p-3 text-center">
                          {v ? <span className="text-green-600 font-bold">✓</span> : <span className="text-red-400">✗</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 5. PRODUCT #1 — EDITOR'S CHOICE ═══ */}
          <section className="mb-10">
            <div className="border-2 border-amber-400 rounded-xl overflow-hidden shadow-lg">
              {/* Badge bar */}
              <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 py-3 flex items-center justify-between">
                <span className="font-bold text-sm uppercase tracking-wider">🏆 #1 {RANK_P1_BADGE}</span>
                <ScoreBadge score={RANK_P1_SCORE} size="lg" />
              </div>
              <div className="p-6 md:p-8">
                <div className="md:flex gap-8">
                  <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
                    <img src={CDN_EDITOR_CHOICE} alt={RANK_P1_NAME} className="max-h-64 object-contain" />
                  </div>
                  <div className="md:w-2/3">
                    <a href={PDP_URL} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      <h3 className="text-xl font-bold mb-1" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>1. {RANK_P1_NAME}</h3>
                    </a>
                    <p className="text-sm text-gray-500 mb-2">by {BRAND_NAME}</p>
                    <div className="flex items-center gap-3 mb-4">
                      <Stars rating={5} />
                      <span className="text-lg font-bold text-green-700">{RANK_P1_PRICE}</span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-5">
                      <div>
                        <h4 className="font-bold text-green-700 text-xs uppercase tracking-wide mb-2">Pros</h4>
                        <ul className="space-y-1.5 text-sm">
                          {[RANK_P1_BULLET_1, RANK_P1_BULLET_2, RANK_P1_BULLET_3, RANK_P1_BULLET_4, RANK_P1_BULLET_5].map((b, i) => (
                            <li key={i} className="flex items-start gap-2"><Check />{b}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-600 text-xs uppercase tracking-wide mb-2">Cons</h4>
                        <ul className="space-y-1.5 text-sm">
                          <li className="flex items-start gap-2"><Cross />Only available online</li>
                          <li className="flex items-start gap-2"><Cross />Due to popularity, sometimes sells out</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4 mb-5">
                      <h4 className="font-bold text-xs uppercase tracking-wide mb-1 text-gray-700">Bottom Line</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{RANK_P1_VERDICT}</p>
                    </div>

                    <CTAButton />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ 6-9. PRODUCTS #2-#5 ═══ */}
          {[
            { rank: 2, name: RANK_P2_NAME, brand: RANK_P2_BRAND, score: RANK_P2_SCORE, price: RANK_P2_PRICE, tableScore: RANK_TABLE_P2_SCORE, verdict: RANK_P2_VERDICT, pros: [RANK_P2_BULLET_1, RANK_P2_BULLET_2, RANK_P2_BULLET_3], cons: [RANK_P2_WEAKNESS] },
            { rank: 3, name: RANK_P3_NAME, brand: RANK_P3_BRAND, score: RANK_P3_SCORE, price: RANK_P3_PRICE, tableScore: RANK_TABLE_P3_SCORE, verdict: RANK_P3_VERDICT, pros: [RANK_P3_BULLET_1, RANK_P3_BULLET_2, RANK_P3_BULLET_3], cons: [RANK_P3_WEAKNESS] },
            { rank: 4, name: RANK_P4_NAME, brand: RANK_P4_BRAND, score: RANK_P4_SCORE, price: RANK_P4_PRICE, tableScore: RANK_TABLE_P4_SCORE, verdict: RANK_P4_VERDICT, pros: [RANK_P4_BULLET_1, RANK_P4_BULLET_2], cons: [RANK_P4_WEAKNESS_1, RANK_P4_WEAKNESS_2] },
          ].map((p) => (
            <section key={p.rank} className="mb-8">
              <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="p-6 md:p-8">
                  <div className="flex items-start gap-4">
                    <ScoreBadge score={p.score} />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{p.rank}. {p.name}</h3>
                      <p className="text-sm text-gray-500">by {p.brand}</p>
                      <div className="flex items-center gap-3 mt-1 mb-4">
                        <Stars rating={parseFloat(p.tableScore)} />
                        <span className="text-base font-semibold text-gray-700">{p.price}</span>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-bold text-green-700 text-xs uppercase tracking-wide mb-2">Pros</h4>
                          <ul className="space-y-1.5 text-sm">
                            {p.pros.map((b, i) => <li key={i} className="flex items-start gap-2"><Check />{b}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-red-600 text-xs uppercase tracking-wide mb-2">Cons</h4>
                          <ul className="space-y-1.5 text-sm">
                            {p.cons.map((b, i) => <li key={i} className="flex items-start gap-2"><Cross />{b}</li>)}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-bold text-xs uppercase tracking-wide mb-1 text-gray-700">Bottom Line</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{p.verdict}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}

          {/* Product #5 — no dedicated config exports, inline */}
          <section className="mb-10">
            <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <ScoreBadge score="5.5" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>5. Solawave Wrinkle & Acne Clearing Light Therapy Mask</h3>
                    <p className="text-sm text-gray-500">by Solawave</p>
                    <div className="flex items-center gap-3 mt-1 mb-4">
                      <Stars rating={3} />
                      <span className="text-base font-semibold text-gray-700">$149</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-bold text-green-700 text-xs uppercase tracking-wide mb-2">Pros</h4>
                        <ul className="space-y-1.5 text-sm">
                          <li className="flex items-start gap-2"><Check />Affordable price point</li>
                          <li className="flex items-start gap-2"><Check />Red + blue LED modes</li>
                          <li className="flex items-start gap-2"><Check />Lightweight design</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-bold text-red-600 text-xs uppercase tracking-wide mb-2">Cons</h4>
                        <ul className="space-y-1.5 text-sm">
                          <li className="flex items-start gap-2"><Cross />No near-infrared wavelength — red light only</li>
                          <li className="flex items-start gap-2"><Cross />Fewer LEDs, weaker irradiance than competitors</li>
                          <li className="flex items-start gap-2"><Cross />Newer brand — limited long-term reviews</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-bold text-xs uppercase tracking-wide mb-1 text-gray-700">Bottom Line</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        The Solawave mask is competitively priced but lacks the near-infrared wavelength that makes dual-wavelength masks significantly more effective. If you're on a tight budget and only want surface-level red light therapy, it's an option — but for clinically meaningful results, you'll want a mask with both red and NIR.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 10. "OUR CHOICE" DEEP DIVE ═══ */}
          <section id="our-choice" className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Our Choice</h2>
            <div className="bg-gradient-to-br from-amber-50 to-white border-2 border-amber-300 rounded-xl p-6 md:p-8">
              <div className="md:flex gap-8 items-center">
                <div className="md:w-1/3 mb-6 md:mb-0 text-center">
                  <img src={CDN_HERO_FRONT} alt={RANK_P1_NAME} className="max-h-72 mx-auto object-contain" />
                </div>
                <div className="md:w-2/3">
                  <a href={PDP_URL} target="_blank" rel="noopener noreferrer">
                    <h3 className="text-xl font-bold mb-1 hover:underline" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{RANK_P1_NAME}</h3>
                  </a>
                  <p className="text-sm text-gray-500 mb-3">by {BRAND_NAME}</p>

                  <ul className="space-y-2 text-sm mb-5">
                    <li className="flex items-start gap-2"><Check />{RANK_FEATURE1_LABEL} — {RANK_FEATURE1_DESC}</li>
                    <li className="flex items-start gap-2"><Check />{RANK_FEATURE2_LABEL} — {RANK_FEATURE2_DESC}</li>
                    <li className="flex items-start gap-2"><Check />{RANK_FEATURE3_LABEL} — {RANK_FEATURE3_DESC}</li>
                  </ul>

                  <div className="flex items-center gap-3 mb-5">
                    <Stars rating={5} />
                    <span className="text-sm text-gray-500">Based on verified customer reviews</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <CTAButton text="Learn More" href={PDP_URL} primary={false} />
                    <CTAButton />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 10.5. EDITORIAL DEEP DIVE ═══ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{RANK_DEEP_DIVE_H2}</h2>
            {[RANK_DEEP_DIVE_P1, RANK_DEEP_DIVE_P2, RANK_DEEP_DIVE_P3, RANK_DEEP_DIVE_P4].map((p, i) => (
              <p key={i} className="text-gray-600 leading-relaxed mb-4">{p}</p>
            ))}
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 11. COMPARISON TABLE ═══ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Full Comparison</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-100 border-b-2 border-gray-300">
                    <th className="text-left p-3 font-semibold">Product</th>
                    <th className="p-3 font-semibold">Rating</th>
                    <th className="p-3 font-semibold hidden md:table-cell">Key Feature</th>
                    <th className="p-3 font-semibold">Price</th>
                    <th className="p-3 font-semibold hidden md:table-cell">Guarantee</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: RANK_P1_NAME, score: RANK_TABLE_P1_SCORE, feature: RANK_TABLE_P1_FOR40, price: RANK_P1_PRICE, guarantee: RANK_TABLE_P1_GUARANTEE, highlight: true },
                    { name: RANK_P2_NAME, score: RANK_TABLE_P2_SCORE, feature: "Wired, silicone, 633nm+830nm", price: RANK_P2_PRICE, guarantee: "No guarantee" },
                    { name: RANK_P3_NAME, score: RANK_TABLE_P3_SCORE, feature: "Wired, 633nm+830nm, derm-backed", price: RANK_P3_PRICE, guarantee: "No guarantee" },
                    { name: RANK_P4_NAME, score: RANK_TABLE_P4_SCORE, feature: "Hard plastic, red+blue, 3-min", price: RANK_P4_PRICE, guarantee: "No guarantee" },
                    { name: "Solawave Mask", score: "2.8/5", feature: "Red+blue, no NIR, lightweight", price: "$149", guarantee: "30-day" },
                  ].map((r, i) => (
                    <tr key={i} className={`border-b ${r.highlight ? "bg-amber-50 font-medium" : i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                      <td className="p-3">{r.highlight && <span className="text-amber-600 text-xs font-bold mr-1">★</span>}{r.name}</td>
                      <td className="p-3 text-center">{r.score}</td>
                      <td className="p-3 hidden md:table-cell">{r.feature}</td>
                      <td className="p-3 text-center font-semibold">{r.price}</td>
                      <td className="p-3 hidden md:table-cell">{r.guarantee}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 12. FAQ ═══ */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>Frequently Asked Questions</h2>
            <div className="divide-y divide-gray-200 border-t border-gray-200">
              <FAQItem q={RANK_FAQ_Q1} a={RANK_FAQ_A1} />
              <FAQItem q={RANK_FAQ_Q2} a={RANK_FAQ_A2} />
              <FAQItem q={RANK_FAQ_Q3} a={RANK_FAQ_A3} />
              <FAQItem q={RANK_FAQ_Q4} a={RANK_FAQ_A4} />
              <FAQItem q={RANK_FAQ_Q5} a={RANK_FAQ_A5} />
            </div>
          </section>

          <hr className="border-gray-200 mb-10" />

          {/* ═══ 13. FINAL CTA ═══ */}
          <section className="mb-12">
            <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-xl p-6 md:p-8 text-center">
              <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>{RANK_FINAL_CTA}</h2>
              <p className="text-gray-500 mb-6">{RANK_FINAL_CTA_SUBTEXT}</p>
              <div className="md:flex items-center justify-center gap-8">
                <img src={CDN_HERO_ANGLE} alt={RANK_P1_NAME} className="h-48 mx-auto md:mx-0 object-contain mb-4 md:mb-0" />
                <div className="text-left">
                  <ul className="space-y-2 text-sm mb-5">
                    <li className="flex items-start gap-2"><Check />Clinically validated dual wavelengths</li>
                    <li className="flex items-start gap-2"><Check />Completely wireless — USB-C rechargeable</li>
                    <li className="flex items-start gap-2"><Check />Soft medical-grade silicone</li>
                    <li className="flex items-start gap-2"><Check />FDA 510(k) cleared</li>
                    <li className="flex items-start gap-2"><Check />30-day money-back guarantee</li>
                  </ul>
                  <CTAButton />
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* ═══ 14. FOOTER ═══ */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-sm text-gray-500 leading-relaxed mb-4">{RANK_DISCLAIMER}</p>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">{RANK_FOOTER_DISCLAIMER_2}</p>
            <div className="text-xs text-gray-400 text-center pt-4 border-t border-gray-200">
              © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Index;
