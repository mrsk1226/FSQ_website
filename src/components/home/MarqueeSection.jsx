import React, { useState } from "react";

export const MarqueeSection = () => {
  const [activeImage, setActiveImage] = useState(null);

  const workItems = [
    { img: "work-upvc.png", tag: "Premium", title: "uPVC Windows" },
    { img: "work-aluminium.png", tag: "Modern", title: "Aluminium Frames" },
    { img: "work-sliding.png", tag: "Elegant", title: "Sliding Doors" },
    { img: "work-bedroom.png", tag: "Luxury", title: "Bedroom Design" },
    { img: "work-kitchen.png", tag: "Contemporary", title: "Kitchen Interiors" },
    { img: "work-living.png", tag: "Sophisticated", title: "Living Spaces" },
    { img: "work-headboard.png", tag: "Custom", title: "Comfort Suite" },
    { img: "work-galley.png", tag: "Efficient", title: "Modular Kitchen" },
    { img: "work-wood.png", tag: "Natural", title: "Wood Finish" },
    { img: "work-island.png", tag: "Modern", title: "Island Hub" },
    { img: "work-grey.png", tag: "Sleek", title: "Architectural Grey" }
  ];

  const handleCardClick = (item) => {
    setActiveImage(item);
  };

  const handleCloseLightbox = () => {
    setActiveImage(null);
  };

  const handleNext = () => {
    if (!activeImage) return;
    const currentIndex = workItems.findIndex(i => i.img === activeImage.img);
    const nextIndex = (currentIndex + 1) % workItems.length;
    setActiveImage(workItems[nextIndex]);
  };

  const handlePrev = () => {
    if (!activeImage) return;
    const currentIndex = workItems.findIndex(i => i.img === activeImage.img);
    const prevIndex = (currentIndex - 1 + workItems.length) % workItems.length;
    setActiveImage(workItems[prevIndex]);
  };

  return (
    <section
      style={{
        padding: "95px 0",
        background: "#ffffff",
        overflow: "hidden"
      }}
    >
      <div className="wrap center" style={{ marginBottom: "42px" }}>
        <span className="badge">Our Work</span>
        <h2 className="section-title">
          Transforming Spaces with <span className="text-gradient">Premium Design.</span>
        </h2>
        <p className="section-copy" style={{ margin: "0 auto" }}>
          Explore our real installations across uPVC windows, architectural aluminium systems, and bespoke modular interiors.
        </p>
      </div>

      {/* Infinite Horizontal Marquee Track */}
      <div className="marquee-outer">
        <div className="marquee-track">
          {/* First set of 11 cards */}
          <div className="marquee-set">
            {workItems.map((item, idx) => (
              <div
                key={`m1-${idx}`}
                className="marquee-card"
                onClick={() => handleCardClick(item)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <img src={`/assets/${item.img}`} alt={item.title} loading="lazy" />
                <div className="marquee-card-overlay">
                  <span className="story-badge">{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>

          {/* Duplicate set for seamless continuous infinite marquee loop */}
          <div className="marquee-set" aria-hidden="true">
            {workItems.map((item, idx) => (
              <div
                key={`m2-${idx}`}
                className="marquee-card"
                onClick={() => handleCardClick(item)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title}`}
              >
                <img src={`/assets/${item.img}`} alt={item.title} loading="lazy" />
                <div className="marquee-card-overlay">
                  <span className="story-badge">{item.tag}</span>
                  <h3>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Lightbox Modal */}
      {activeImage && (
        <div
          className="lightbox-modal"
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Project Lightbox"
        >
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="lightbox-close-btn"
              onClick={handleCloseLightbox}
              aria-label="Close image"
            >
              &times;
            </button>
            <button
              className="lightbox-nav-btn lightbox-prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              &#8249;
            </button>
            <button
              className="lightbox-nav-btn lightbox-next"
              onClick={handleNext}
              aria-label="Next image"
            >
              &#8250;
            </button>
            <img src={`/assets/${activeImage.img}`} alt={activeImage.title} />
            <div className="lightbox-caption">
              <span className="badge-light" style={{ display: "inline-block", padding: "4px 12px", borderRadius: "99px", fontSize: "0.72rem", marginBottom: "6px" }}>
                {activeImage.tag}
              </span>
              <h3 style={{ fontSize: "1.3rem", fontWeight: "600", margin: "4px 0 0" }}>
                {activeImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .marquee-outer {
          overflow: hidden;
          width: 100%;
          position: relative;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: infiniteMarquee 40s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        .marquee-set {
          display: flex;
          gap: 20px;
          padding-right: 20px;
        }
        .marquee-card {
          position: relative;
          width: 310px;
          height: 400px;
          flex-shrink: 0;
          overflow: hidden;
          border-radius: 18px;
          cursor: pointer;
          background: #d8e2e8;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .marquee-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 50px rgba(13, 33, 48, 0.18);
        }
        .marquee-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }
        .marquee-card:hover img {
          transform: scale(1.05);
        }
        .marquee-card-overlay {
          position: absolute;
          inset: 45% 0 0;
          background: linear-gradient(transparent, rgba(10, 27, 39, 0.92));
          color: #ffffff;
          padding: 22px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .story-badge {
          align-self: flex-start;
          padding: 5px 12px;
          background: linear-gradient(135deg, #0d6eaa, #2196f3);
          border-radius: 99px;
          font-family: 'Inter', sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: #ffffff;
          text-transform: uppercase;
        }
        .marquee-card h3 {
          font-family: 'Outfit', sans-serif;
          margin: 8px 0 0;
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
        }
        @keyframes infiniteMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 576px) {
          .marquee-card { width: 260px; height: 340px; }
        }
      `}</style>
    </section>
  );
};

export default MarqueeSection;
