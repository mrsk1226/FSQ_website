import React from "react";
import { motion } from "framer-motion";

export const TestimonialsSection = () => {
  const reviews = [
    {
      name: "Kathiresan Krishnasamy",
      source: "Google Review",
      text: "After considering many other brand options, price, quality, finish, hardware and colour, I decided to go with Four Square windows. I am really happy and pleased after installation."
    },
    {
      name: "Subash J",
      source: "Facebook Review",
      text: "Very good approach. I like the material and services. The employee Hari's approach and explanations are very good. Thank you, Four Square."
    },
    {
      name: "Varadhu DVR",
      source: "Google Review",
      text: "I’d recommend Four Square not just for their high-quality window systems, but also for their service. The team understood our requirements, suggested well and assembled the windows neatly and on time."
    },
    {
      name: "Navena B.N.",
      source: "Google Review",
      text: "Four Square is simply amazing. Providing uPVC windows with a 20-year warranty is such a great one. Glad to recommend this profile — you can expect awesome service and satisfaction."
    },
    {
      name: "Ramamurthy",
      source: "Google Review",
      text: "Very excellent product and good service."
    },
    {
      name: "Mohamed Musthafa",
      source: "Google Review",
      text: "Profile and hardware both are excellent."
    }
  ];

  return (
    <section style={{ padding: "95px 0", background: "#f5f0eb" }}>
      <div className="wrap">
        <div className="center" style={{ marginBottom: "44px" }}>
          <span className="badge">Client Experiences</span>
          <h2 className="section-title">
            Trusted by Homeowners Across <span className="text-gradient">Tamil Nadu</span>
          </h2>
          <p className="section-copy" style={{ margin: "0 auto" }}>
            Real experiences from clients who entrusted their homes, villas, and commercial spaces to Four Square.
          </p>
        </div>

        {/* Static Multi-Card Grid with Framer Motion */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "24px"
          }}
          className="reviews-grid-wrap"
        >
          {reviews.map((r, idx) => {
            const initials = r.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("");
            return (
              <motion.article
                key={idx}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1], delay: idx * 0.12 }}
                whileHover={{ y: -8 }}
                style={{
                  background: "#ffffff",
                  padding: "32px 28px",
                  borderRadius: "14px",
                  border: "1px solid #dfe7ec",
                  boxShadow: "0 10px 30px rgba(13, 33, 48, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "box-shadow 0.3s ease"
                }}
                className="review-box"
              >
                <div>
                  <div style={{ color: "#f4b400", fontSize: "1.1rem", letterSpacing: "0.15em", marginBottom: "14px" }}>
                    ★★★★★
                  </div>
                  <blockquote
                    style={{
                      fontSize: "0.92rem",
                      lineHeight: "1.7",
                      color: "#4a5c6a",
                      margin: "0 0 20px",
                      fontStyle: "normal"
                    }}
                  >
                    “{r.text}”
                  </blockquote>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #0d6eaa, #2196f3)",
                      color: "#ffffff",
                      fontWeight: "700",
                      fontSize: "0.85rem",
                      display: "grid",
                      placeItems: "center",
                      flexShrink: 0
                    }}
                  >
                    {initials}
                  </div>
                  <div>
                    <strong style={{ display: "block", color: "#1a2a3a", fontSize: "0.88rem" }}>
                      {r.name}
                    </strong>
                    <span style={{ fontSize: "0.72rem", color: "#7a8b99" }}>
                      {r.source}
                    </span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <style>{`
        .review-box:hover {
          box-shadow: 0 18px 45px rgba(13, 33, 48, 0.12);
        }
        @media (max-width: 992px) {
          .reviews-grid-wrap { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 576px) {
          .reviews-grid-wrap { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
