import { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  COPY_PRODUCT_NAME,
  BRAND_NAME,
  PDP_URL,
  CDN_HERO_FRONT,
  CDN_AD_OVERLAY,
  RANK_META_TITLE,
  RANK_META_DESC,
  RANK_PUBLICATION_NAME,
  RANK_UPDATED_DATE,
  RANK_H1,
  RANK_INTRO,
  RANK_P1_NAME,
  RANK_P1_VERDICT,
  RANK_P1_BULLET_1,
  RANK_P1_BULLET_2,
  RANK_P1_BULLET_3,
  RANK_P1_BULLET_4,
  RANK_P1_BULLET_5,
  RANK_P1_BADGE,
  RANK_P1_SCORE,
  RANK_P2_NAME,
  RANK_P2_BRAND,
  RANK_P2_VERDICT,
  RANK_P2_BULLET_1,
  RANK_P2_BULLET_2,
  RANK_P2_BULLET_3,
  RANK_P2_WEAKNESS,
  RANK_P2_SCORE,
  RANK_P3_NAME,
  RANK_P3_BRAND,
  RANK_P3_VERDICT,
  RANK_P3_BULLET_1,
  RANK_P3_BULLET_2,
  RANK_P3_BULLET_3,
  RANK_P3_WEAKNESS,
  RANK_P3_SCORE,
  RANK_P4_NAME,
  RANK_P4_BRAND,
  RANK_P4_VERDICT,
  RANK_P4_BULLET_1,
  RANK_P4_BULLET_2,
  RANK_P4_WEAKNESS_1,
  RANK_P4_WEAKNESS_2,
  RANK_P4_SCORE,
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
  RANK_P1_PRICE,
  RANK_TABLE_P1_GUARANTEE,
  RANK_TABLE_P1_MECHANISM,
  RANK_TABLE_P1_FOR40,
  RANK_TABLE_P1_DISCOUNT,
  RANK_TABLE_P2_SCORE,
  RANK_P2_PRICE,
  RANK_TABLE_P3_SCORE,
  RANK_P3_PRICE,
  RANK_TABLE_P4_SCORE,
  RANK_P4_PRICE,
} from "../config";

const COLORS = {
  primary: "#C4956A",
  cta: "#B85C38",
  headline: "#3D2B1F",
  body: "#4A3C31",
  bg: "#FAF6EE",
  bgDark: "#F3EDE1",
  green: "#2D6A4F",
  accent: "#7A5C40",
  gold: "#F4A40A",
  bestOverall: "#2D6A4F",
};

const Stars = ({ rating }: { rating: string }) => {
  const num = parseFloat(rating) || 0;
  const filled = Math.round((num / 10) * 5);
  return (
    <span style={{ color: COLORS.gold, fontSize: "20px" }}>
      {"★".repeat(Math.min(filled, 5))}{"☆".repeat(Math.max(5 - filled, 0))}
    </span>
  );
};

const CTAButton = ({ href, children, variant = "primary", small = false }: { href: string; children: React.ReactNode; variant?: "primary" | "secondary"; small?: boolean }) => (
  <a
    href={href}
    target={variant === "secondary" ? "_blank" : undefined}
    rel={variant === "secondary" ? "noopener noreferrer" : undefined}
    style={{
      display: "inline-block",
      background: variant === "primary" ? COLORS.cta : "#E5E7EB",
      color: variant === "primary" ? "#fff" : COLORS.body,
      fontFamily: "'DM Sans', sans-serif",
      fontWeight: 700,
      fontSize: small ? "14px" : "16px",
      padding: small ? "10px 20px" : "14px 32px",
      borderRadius: "9999px",
      textDecoration: "none",
      letterSpacing: "0.01em",
    }}
  >
    {children}
  </a>
);

const Index = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const products = [
    {
      rank: 1,
      badge: "BEST OVERALL",
      name: RANK_P1_NAME,
      brand: BRAND_NAME,
      rating: RANK_P1_SCORE,
      image: CDN_HERO_FRONT,
      description: RANK_P1_VERDICT,
      pros: [RANK_P1_BULLET_1, RANK_P1_BULLET_2, RANK_P1_BULLET_3, RANK_P1_BULLET_4, RANK_P1_BULLET_5],
      cta: PDP_URL,
      ctaText: "Visit Site →",
      discountBadge: RANK_P1_BADGE,
      ourProduct: true,
    },
    {
      rank: 2,
      name: RANK_P2_NAME,
      brand: RANK_P2_BRAND,
      rating: RANK_P2_SCORE,
      image: null,
      description: RANK_P2_VERDICT,
      pros: [RANK_P2_BULLET_1, RANK_P2_BULLET_2, RANK_P2_BULLET_3],
      weakness: RANK_P2_WEAKNESS,
      cta: PDP_URL,
      ctaText: "Visit Site",
      ourProduct: false,
    },
    {
      rank: 3,
      name: RANK_P3_NAME,
      brand: RANK_P3_BRAND,
      rating: RANK_P3_SCORE,
      image: null,
      description: RANK_P3_VERDICT,
      pros: [RANK_P3_BULLET_1, RANK_P3_BULLET_2, RANK_P3_BULLET_3],
      weakness: RANK_P3_WEAKNESS,
      cta: "#",
      ctaText: "Visit Site",
      ourProduct: false,
    },
    {
      rank: 4,
      name: RANK_P4_NAME,
      brand: RANK_P4_BRAND,
      rating: RANK_P4_SCORE,
      image: null,
      description: RANK_P4_VERDICT,
      pros: [RANK_P4_BULLET_1, RANK_P4_BULLET_2],
      weakness: `${RANK_P4_WEAKNESS_1} ${RANK_P4_WEAKNESS_2}`,
      cta: "#",
      ctaText: "Visit Site",
      ourProduct: false,
    },
  ];

  const faqs = [
    { q: RANK_FAQ_Q1, a: RANK_FAQ_A1 },
    { q: RANK_FAQ_Q2, a: RANK_FAQ_A2 },
    { q: RANK_FAQ_Q3, a: RANK_FAQ_A3 },
    { q: RANK_FAQ_Q4, a: RANK_FAQ_A4 },
    { q: RANK_FAQ_Q5, a: RANK_FAQ_A5 },
  ];

  const features = [
    { icon: "🔬", label: RANK_FEATURE1_LABEL, desc: RANK_FEATURE1_DESC },
    { icon: "🕐", label: RANK_FEATURE2_LABEL, desc: RANK_FEATURE2_DESC },
    { icon: "🌿", label: RANK_FEATURE3_LABEL, desc: RANK_FEATURE3_DESC },
  ];

  const tableRows = [
    {
      product: `${RANK_P1_NAME} by ${BRAND_NAME}`,
      rating: RANK_TABLE_P1_SCORE,
      price: RANK_P1_PRICE,
      guarantee: RANK_TABLE_P1_GUARANTEE,
      mechanism: RANK_TABLE_P1_MECHANISM,
      for40: RANK_TABLE_P1_FOR40,
      discount: RANK_TABLE_P1_DISCOUNT,
      highlight: true,
    },
    {
      product: `${RANK_P2_NAME} by ${RANK_P2_BRAND}`,
      rating: RANK_TABLE_P2_SCORE,
      price: RANK_P2_PRICE,
      guarantee: "14-30 days",
      mechanism: "633nm + 830nm (wired)",
      for40: "⚠️ Durability complaints",
      discount: "None",
      highlight: false,
    },
    {
      product: `${RANK_P3_NAME} by ${RANK_P3_BRAND}`,
      rating: RANK_TABLE_P3_SCORE,
      price: RANK_P3_PRICE,
      guarantee: "14-30 days",
      mechanism: "633nm + 830nm (wired, no eye protection)",
      for40: "⚠️ Coverage gaps, heavy controller",
      discount: "None",
      highlight: false,
    },
    {
      product: `${RANK_P4_NAME} by ${RANK_P4_BRAND}`,
      rating: RANK_TABLE_P4_SCORE,
      price: RANK_P4_PRICE,
      guarantee: "14-30 days",
      mechanism: "Red + Blue LED (hard plastic)",
      for40: "❌ Hard plastic, uncomfortable",
      discount: "None",
      highlight: false,
    },
  ];

  return (
    <>
      <Helmet>
        <title>{RANK_META_TITLE}</title>
        <meta name="description" content={RANK_META_DESC} />
      </Helmet>

      <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.bg, color: COLORS.body, minHeight: "100vh" }}>

        {/* ADVERTISER DISCLOSURE BAR */}
        <div style={{ background: "#333", color: "#ccc", textAlign: "right", padding: "6px 24px", fontSize: "11px", letterSpacing: "0.06em" }}>
          <a href="#disclosure" style={{ color: "#aaa", textDecoration: "underline" }}>Advertiser Disclosure</a>
        </div>

        {/* MAGAZINE HEADER */}
        <header style={{ background: "#fff", borderBottom: `3px solid ${COLORS.primary}`, padding: "20px 24px", textAlign: "center" }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "28px", color: COLORS.headline, letterSpacing: "-0.03em" }}>
            {RANK_PUBLICATION_NAME}
          </div>
          <div style={{ fontSize: "12px", color: COLORS.accent, marginTop: "4px", letterSpacing: "0.06em" }}>
            UPDATED: {RANK_UPDATED_DATE} &nbsp;·&nbsp; EDITORIAL TEAM REVIEW
          </div>
        </header>

        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "40px 24px 80px" }}>

          {/* CATEGORY HEADLINE */}
          <h1 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(26px, 5vw, 40px)", color: COLORS.headline, textAlign: "center", marginBottom: "16px", lineHeight: 1.2 }}>
            {RANK_H1}
          </h1>

          {/* EDITORIAL INTRO */}
          <p style={{ fontSize: "17px", lineHeight: 1.8, color: COLORS.body, textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
            {RANK_INTRO}
          </p>

          {/* PRODUCT CARDS */}
          {products.map((product, i) => (
            <div
              key={i}
              style={{
                background: product.ourProduct ? "linear-gradient(135deg, #FFFAF5 0%, #F9F0E3 100%)" : "#fff",
                borderRadius: "20px",
                padding: "32px",
                marginBottom: "24px",
                border: product.ourProduct ? `2px solid ${COLORS.primary}` : "1px solid #E5DDD5",
                boxShadow: product.ourProduct ? "0 8px 32px rgba(196,149,106,0.15)" : "0 2px 12px rgba(0,0,0,0.05)",
                position: "relative",
              }}
            >
              {/* Rank badge */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px", flexWrap: "wrap" }}>
                <div style={{
                  background: product.ourProduct ? COLORS.cta : COLORS.bgDark,
                  color: product.ourProduct ? "#fff" : COLORS.accent,
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: "16px",
                  padding: "6px 16px",
                  borderRadius: "9999px",
                }}>
                  #{product.rank}
                </div>
                {product.badge && (
                  <div style={{ background: COLORS.bestOverall, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "13px", padding: "4px 12px", borderRadius: "9999px", letterSpacing: "0.05em" }}>
                    {product.badge}
                  </div>
                )}
                {product.discountBadge && (
                  <div style={{ background: COLORS.gold, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "12px", padding: "4px 12px", borderRadius: "9999px" }}>
                    🏷 {product.discountBadge}
                  </div>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: product.ourProduct ? "200px 1fr" : "120px 1fr", gap: "24px", alignItems: "start" }}>
                {/* Image */}
                <div>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={`${product.name} by ${product.brand}`}
                      style={{ width: "100%", borderRadius: "16px", boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
                    />
                  ) : (
                    <div style={{ background: COLORS.bgDark, borderRadius: "12px", padding: "24px", textAlign: "center", color: COLORS.accent, fontSize: "13px", minHeight: "80px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {product.brand}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", marginBottom: "8px" }}>
                    <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "20px", color: COLORS.headline, margin: 0 }}>
                      {product.name}
                    </h2>
                    <span style={{ fontSize: "14px", color: COLORS.accent }}>{product.brand}</span>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                    <Stars rating={product.rating} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: COLORS.headline }}>{product.rating}/10</span>
                  </div>

                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: COLORS.body, marginBottom: "16px" }}>{product.description}</p>

                  <div style={{ marginBottom: "16px" }}>
                    {product.pros.map((pro, j) => (
                      <div key={j} style={{ fontSize: "14px", lineHeight: 1.7, marginBottom: "6px", color: product.ourProduct ? "#1A4731" : COLORS.body }}>
                        {pro}
                      </div>
                    ))}
                  </div>

                  {product.weakness && (
                    <div style={{ background: "#FFF8F0", border: "1px solid #F4C07A", borderRadius: "8px", padding: "12px 16px", fontSize: "13px", lineHeight: 1.7, color: "#7A4F1A", marginBottom: "16px" }}>
                      {product.weakness}
                    </div>
                  )}

                  <CTAButton href={product.cta} variant={product.ourProduct ? "primary" : "secondary"} small={!product.ourProduct}>
                    {product.ctaText}
                  </CTAButton>
                </div>
              </div>
            </div>
          ))}

          {/* FEATURE HIGHLIGHT ROW */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", margin: "48px 0" }}>
            {features.map((feature, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "16px", padding: "28px 24px", textAlign: "center", border: `1px solid rgba(196,149,106,0.2)`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize: "36px", marginBottom: "12px" }}>{feature.icon}</div>
                <h3 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: COLORS.headline, marginBottom: "8px" }}>{feature.label}</h3>
                <p style={{ fontSize: "13px", lineHeight: 1.7, color: COLORS.body }}>{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* EDITORIAL DEEP DIVE */}
          <section style={{ background: "#fff", borderRadius: "20px", padding: "40px", border: "1px solid #E5DDD5", marginBottom: "40px" }}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 28px)", color: COLORS.headline, marginBottom: "24px" }}>
              {RANK_DEEP_DIVE_H2}
            </h2>
            {[RANK_DEEP_DIVE_P1, RANK_DEEP_DIVE_P2, RANK_DEEP_DIVE_P3, RANK_DEEP_DIVE_P4].map((para, i) => (
              <p key={i} style={{ fontSize: "16px", lineHeight: 1.85, color: COLORS.body, marginBottom: "20px" }}>{para}</p>
            ))}
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: "48px" }}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 28px)", color: COLORS.headline, marginBottom: "24px", textAlign: "center" }}>
              Frequently Asked Questions
            </h2>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(196,149,106,0.25)", marginBottom: 0 }}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "18px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px" }}
                >
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: "16px", color: COLORS.headline }}>{faq.q}</span>
                  <span style={{ fontSize: "22px", color: COLORS.primary, flexShrink: 0 }}>{activeFaq === i ? "−" : "+"}</span>
                </button>
                {activeFaq === i && (
                  <div style={{ padding: "0 0 18px", lineHeight: 1.8, color: COLORS.body, fontSize: "15px" }}>{faq.a}</div>
                )}
              </div>
            ))}
          </section>

          {/* COMPARISON TABLE */}
          <section style={{ marginBottom: "48px", overflowX: "auto" }}>
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 3vw, 28px)", color: COLORS.headline, marginBottom: "24px", textAlign: "center" }}>
              Full Product Comparison
            </h2>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", minWidth: "640px" }}>
              <thead>
                <tr style={{ background: COLORS.bgDark }}>
                  {["Product", "Rating", "Price", "Guarantee", "Anti-Aging Mechanism", "For 40+?", "Discount"].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, color: COLORS.headline, borderBottom: `2px solid ${COLORS.primary}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row, i) => (
                  <tr key={i} style={{ background: row.highlight ? "#FFF8EF" : (i % 2 === 0 ? "#fff" : COLORS.bgDark) }}>
                    <td style={{ padding: "12px 16px", fontWeight: row.highlight ? 700 : 400, color: row.highlight ? COLORS.headline : COLORS.body }}>{row.product}</td>
                    <td style={{ padding: "12px 16px", color: COLORS.gold, fontWeight: 600 }}>{row.rating}</td>
                    <td style={{ padding: "12px 16px" }}>{row.price}</td>
                    <td style={{ padding: "12px 16px", color: row.highlight ? COLORS.green : COLORS.body, fontWeight: row.highlight ? 700 : 400 }}>{row.guarantee}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px" }}>{row.mechanism}</td>
                    <td style={{ padding: "12px 16px", fontSize: "13px" }}>{row.for40}</td>
                    <td style={{ padding: "12px 16px", color: row.highlight ? COLORS.cta : COLORS.accent, fontWeight: row.highlight ? 700 : 400, fontSize: "13px" }}>{row.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* FINAL CTA */}
          <section style={{ background: `linear-gradient(135deg, ${COLORS.headline} 0%, #5C3D2E 100%)`, borderRadius: "24px", padding: "60px 40px", textAlign: "center", color: "#fff" }}>
            <img src={CDN_AD_OVERLAY} alt={COPY_PRODUCT_NAME} style={{ maxWidth: "180px", borderRadius: "16px", marginBottom: "24px" }} />
            <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 800, fontSize: "clamp(22px, 4vw, 32px)", marginBottom: "16px" }}>
              Ready to Try Our #1 Pick?
            </h2>
            <p style={{ fontSize: "17px", opacity: 0.9, marginBottom: "8px" }}>
              {RANK_FINAL_CTA}
            </p>
            <div style={{ margin: "24px 0 8px" }}>
              <div style={{ fontSize: "15px", opacity: 0.85, marginBottom: "8px" }}>→ Use code <strong>SECRET25</strong> for 25% off any bundle</div>
              <div style={{ fontSize: "15px", opacity: 0.85, marginBottom: "8px" }}>→ 30-Day Money-Back Guarantee + 1-Year Warranty</div>
              <div style={{ fontSize: "15px", opacity: 0.85, marginBottom: "24px" }}>→ Starting at $149 — same wavelengths as $400+ masks</div>
            </div>
            <a
              href={PDP_URL}
              style={{ display: "inline-block", background: COLORS.cta, color: "#fff", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "18px", padding: "18px 48px", borderRadius: "9999px", textDecoration: "none", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}
            >
              {RANK_FINAL_CTA_SUBTEXT}
            </a>
            <p style={{ fontSize: "13px", opacity: 0.6, marginTop: "20px" }}>
              Updated {RANK_UPDATED_DATE} | {RANK_PUBLICATION_NAME} Editorial Team
            </p>
          </section>

        </div>

        {/* FOOTER */}
        <footer id="disclosure" style={{ background: "#1A1A1A", color: "#9CA3AF", padding: "40px 24px", textAlign: "center" }}>
          <div style={{ maxWidth: "740px", margin: "0 auto" }}>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: "16px", color: "#fff", marginBottom: "12px" }}>{RANK_PUBLICATION_NAME}</p>
            <p style={{ fontSize: "12px", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 12px" }}>
              {RANK_DISCLAIMER}
            </p>
            <p style={{ fontSize: "12px", lineHeight: 1.8, maxWidth: "600px", margin: "0 auto 12px" }}>
              {RANK_FOOTER_DISCLAIMER_2}
            </p>
            <p style={{ fontSize: "12px" }}>
              © 2026 {RANK_PUBLICATION_NAME} | Updated {RANK_UPDATED_DATE}
            </p>
          </div>
        </footer>

      </div>
    </>
  );
};

export default Index;
