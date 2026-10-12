import React, { useState, useEffect, useMemo } from 'react';
import { studioRecords, studioSystems } from '../../data/designs/studioRegistry.js';
import WindowDiagram from './WindowDiagram.jsx';
import DoorDiagram from './DoorDiagram.jsx';

/**
 * StudioDesignExplorer Component (DEVELOPMENT ONLY)
 * Full catalogue browser (78 catalogue layouts + 3 separate concepts = 81 total)
 * Features:
 * - Search by name, ID, or family
 * - Status filter: All, PARTIAL_3D (50), BLOCKED_BY_UNVERIFIED_SPEC (31)
 * - Deep-link by design ID (?design=<id>)
 * - 2D Panel diagram preview
 * - 3D showroom preview trigger
 * - Status badges & QA notes
 * - Operable sash listing and hardware breakdowns
 * - Strictly DEV-ONLY: returns null and renders nothing in production builds.
 * - Zero internal machine/diagnostics paths exposed.
 */
export default function StudioDesignExplorer({ onSelect, selectedId }) {
  // Production safeguard: hidden in production build
  if (!import.meta.env.DEV) {
    return null;
  }

  const [search, setSearch] = useState('');
  const [familyFilter, setFamilyFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [activeId, setActiveId] = useState(selectedId || 'upvc-casement:0');
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync activeId with selectedId prop if provided
  useEffect(() => {
    if (selectedId) {
      setActiveId(selectedId);
    }
  }, [selectedId]);

  // Deep-link resolution on mount: ?design=<id>
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const deepLinkedId = params.get('design');
      if (deepLinkedId) {
        const match = studioRecords.find((r) => r.id === deepLinkedId);
        if (match) {
          setActiveId(match.id);
          if (onSelect) {
            onSelect(match);
          }
        }
      }
    } catch (_) {}
  }, []);

  // Filtered designs
  const filteredRecords = useMemo(() => {
    return studioRecords.filter((record) => {
      // Family filter
      if (familyFilter && record.systemId !== familyFilter) {
        return false;
      }
      // Status filter
      if (statusFilter !== 'ALL' && record.status !== statusFilter) {
        return false;
      }
      // Search term
      if (search.trim()) {
        const q = search.trim().toLowerCase();
        const matchesId = record.id.toLowerCase().includes(q);
        const matchesName = record.name.toLowerCase().includes(q);
        const matchesSystem = record.systemId.toLowerCase().includes(q);
        const matchesProduct = record.product.toLowerCase().includes(q);
        if (!matchesId && !matchesName && !matchesSystem && !matchesProduct) {
          return false;
        }
      }
      return true;
    });
  }, [search, familyFilter, statusFilter]);

  // Currently inspected record
  const currentRecord = useMemo(() => {
    return studioRecords.find((r) => r.id === activeId) || studioRecords[0];
  }, [activeId]);

  // Selection handler (updates URL deep-link & triggers 3D studio selection)
  const handleSelectRecord = (record) => {
    setActiveId(record.id);
    if (onSelect) {
      onSelect(record);
    }
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('design', record.id);
      window.history.replaceState({}, '', url.toString());
    } catch (_) {}
  };

  // Copy deep-link URL
  const handleCopyLink = () => {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('design', currentRecord.id);
      navigator.clipboard.writeText(url.toString()).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      });
    } catch (_) {}
  };

  // Inspect operable sashes and panels
  const sashesInfo = useMemo(() => {
    if (!currentRecord || !currentRecord.design) return [];
    const d = currentRecord.design;
    const items = [];

    // Top panes (transoms)
    if (Array.isArray(d.topPanes)) {
      d.topPanes.forEach((p, idx) => {
        items.push({
          location: `Transom ${idx + 1}`,
          type: p.type === 'fixed' ? 'Fixed Glass' : p.type || 'Sash',
          operable: p.type !== 'fixed',
          details: p.hinge ? `${p.hinge}-hung` : p.type === 'slide' ? 'Sliding' : 'Stationary'
        });
      });
    }

    // Main panes
    if (Array.isArray(d.panes)) {
      d.panes.forEach((p, idx) => {
        const isDoor = currentRecord.type?.includes('door');
        const role = isDoor ? `Door Panel ${idx + 1}` : `Sash ${idx + 1}`;
        let motionType = 'Fixed Glass (Stationary)';
        let operable = false;

        if (p.type === 'slide') {
          motionType = 'Horizontal Sliding Sash';
          operable = true;
        } else if (p.type === 'tilt') {
          motionType = 'Tilt / Hopper Opening';
          operable = true;
        } else if (p.type === 'fold') {
          motionType = 'Bi-folding Articulated Panel';
          operable = true;
        } else if (p.hinge === 'left') {
          motionType = 'Side-Hung Casement (Left-Hinged)';
          operable = true;
        } else if (p.hinge === 'right') {
          motionType = 'Side-Hung Casement (Right-Hinged)';
          operable = true;
        } else if (p.hinge === 'top') {
          motionType = 'Top-Hung Awning Sash';
          operable = true;
        } else if (currentRecord.type === 'tilt-turn') {
          motionType = 'Tilt & Turn Dual-Action Sash';
          operable = true;
        }

        items.push({
          location: role,
          type: motionType,
          operable,
          details: operable ? 'User-operable 3D motion' : 'Fixed glazed pane'
        });
      });
    }

    // Bottom panes
    if (Array.isArray(d.bottomPanes)) {
      d.bottomPanes.forEach((p, idx) => {
        items.push({
          location: `Bottom Panel ${idx + 1}`,
          type: p.type === 'fixed' ? 'Fixed Glass' : p.type || 'Sash',
          operable: p.type !== 'fixed',
          details: p.hinge ? `${p.hinge}-hung` : 'Stationary'
        });
      });
    }

    // Bay/bow angles concept
    if (d.concept && Array.isArray(d.angles)) {
      d.angles.forEach((deg, idx) => {
        items.push({
          location: `Bay Facet ${idx + 1}`,
          type: `Structural Angle Post (${deg}°)`,
          operable: false,
          details: 'Fixed concept arrangement'
        });
      });
    }

    return items;
  }, [currentRecord]);

  // Hardware breakdown based on family and material
  const hardwareDetails = useMemo(() => {
    if (!currentRecord) return [];
    const isAlu = currentRecord.product === 'aluminium';
    const type = currentRecord.type;

    if (type.includes('casement') && !type.includes('door')) {
      return [
        { name: 'Friction Stay', spec: isAlu ? '18x2.5mm stainless arm (provisional alu mount)' : 'Constant-length stainless arm + jamb mount rosette' },
        { name: 'Casement Handle', spec: 'Zinc-diecast single / espagnolette drive handle' },
        { name: 'Locking System', spec: 'Multi-point espagnolette with adjustable mushroom cams' },
        { name: 'Corner Treatment', spec: '45° precision welded mitre seam on frame & sash' }
      ];
    } else if (type.includes('sliding') && !type.includes('door')) {
      return [
        { name: 'Sliding Handle', spec: 'Touch Lock dual-action flush mortise handle' },
        { name: 'Rollers', spec: 'Tandem precision ball-bearing bottom rollers' },
        { name: 'Guide Tracks', spec: isAlu ? 'Extruded aluminium integrated track' : 'Heavy-duty stainless track insert on uPVC rail' },
        { name: 'Weatherseals', spec: 'Fin-seal high-density wool pile interlocks' }
      ];
    } else if (type === 'tilt-turn') {
      return [
        { name: 'Drive Gearing', spec: 'Perimeter perimeter espagnolette with anti-mishandling device' },
        { name: 'Hinges & Stays', spec: 'Top scissor stay arm + bottom corner pivot hinge' },
        { name: 'Handle', spec: 'Dual-action 3-position security handle (90° turn / 180° tilt)' }
      ];
    } else if (type === 'door-fold') {
      return [
        { name: 'Carriage System', spec: 'Heavy-duty top & bottom articulated stainless carriages' },
        { name: 'Hinges', spec: 'Intermediate folding butt hinges with integrated pull-handles' },
        { name: 'Locks', spec: 'Shoot-bolt locks on slave panels + master lever cylinder lock' }
      ];
    } else if (type.includes('door')) {
      return [
        { name: 'Door Hardware', spec: 'Architectural lever handle set with euro-cylinder key lock' },
        { name: 'Hinges / Rollers', spec: type.includes('sliding') ? 'Heavy-duty tandem door rollers' : '3D-adjustable door butt hinges (120kg rated)' }
      ];
    } else if (type === 'bay-concepts') {
      return [
        { name: 'Bay Couplers', spec: 'Variable-angle reinforced aluminium/uPVC bay corner posts' },
        { name: 'Glazing', spec: 'Direct-glazed heavy-gauge uPVC frame profiles (concept)' }
      ];
    }

    return [{ name: 'Standard Architectural Hardware', spec: 'Provisional specification' }];
  }, [currentRecord]);

  const isDoor = currentRecord?.type?.includes('door');

  return (
    <details
      style={{
        margin: '20px 0',
        padding: '16px 20px',
        border: '1.5px solid #0284c7',
        borderRadius: '12px',
        background: '#f8fafc',
        boxShadow: '0 4px 12px rgba(2, 132, 199, 0.08)'
      }}
    >
      <summary
        style={{
          cursor: 'pointer',
          fontWeight: '700',
          fontSize: '0.95rem',
          color: '#0369a1',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          outline: 'none',
          userSelect: 'none'
        }}
      >
        <span
          style={{
            background: '#0284c7',
            color: '#ffffff',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '0.72rem',
            letterSpacing: '0.04em'
          }}
        >
          DEV ONLY
        </span>
        <span>Studio Design Explorer · 78 Catalogue Layouts + 3 Concepts (81 Total)</span>
      </summary>

      {/* FILTER & SEARCH BAR */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          margin: '16px 0 12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          background: '#ffffff',
          padding: '12px',
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}
      >
        <div style={{ flex: '1 1 240px', minWidth: '200px' }}>
          <input
            type="text"
            aria-label="Search designs"
            placeholder="Search by ID, name, or system (e.g. upvc-casement:4, French, 3-Track)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '0.85rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ minWidth: '180px' }}>
          <select
            aria-label="Filter by family"
            value={familyFilter}
            onChange={(e) => setFamilyFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '0.85rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="">All Families (9 Families)</option>
            {studioSystems.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.designs.length})
              </option>
            ))}
          </select>
        </div>

        <div style={{ minWidth: '160px' }}>
          <select
            aria-label="Filter by status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: '0.85rem',
              borderRadius: '6px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="ALL">All Statuses (81)</option>
            <option value="PARTIAL_3D">PARTIAL_3D (50 uPVC/Concept)</option>
            <option value="BLOCKED_BY_UNVERIFIED_SPEC">BLOCKED_BY_UNVERIFIED_SPEC (31 Alu)</option>
          </select>
        </div>

        <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '500' }}>
          Showing <strong>{filteredRecords.length}</strong> of 81 designs
        </div>
      </div>

      {/* TWO COLUMN WORKSPACE: BROWSER LIST + DETAILED CARD */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(280px, 340px) 1fr',
          gap: '16px',
          marginTop: '12px'
        }}
      >
        {/* LEFT COLUMN: SCROLLABLE DESIGN LIST */}
        <div
          style={{
            maxHeight: '480px',
            overflowY: 'auto',
            background: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            padding: '6px'
          }}
        >
          {filteredRecords.length === 0 ? (
            <div style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
              No matching designs found.
            </div>
          ) : (
            filteredRecords.map((r) => {
              const isSelected = activeId === r.id;
              const isPartial = r.status === 'PARTIAL_3D';

              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleSelectRecord(r)}
                  style={{
                    display: 'block',
                    width: '100%',
                    textAlign: 'left',
                    padding: '10px 12px',
                    margin: '3px 0',
                    borderRadius: '6px',
                    border: isSelected ? '1.5px solid #0284c7' : '1px solid #f1f5f9',
                    background: isSelected ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.84rem', color: '#0f172a' }}>{r.name}</strong>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: '700',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        background: isPartial ? '#fef3c7' : '#f1f5f9',
                        color: isPartial ? '#92400e' : '#475569'
                      }}
                    >
                      {isPartial ? 'PARTIAL' : 'BLOCKED'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '2px' }}>
                    <code>{r.id}</code> · {r.product.toUpperCase()} {r.source === 'recovered-glb' ? '· Recovered GLB' : ''}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* RIGHT COLUMN: ACTIVE DESIGN INSPECTION CARD */}
        {currentRecord && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
              padding: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}
          >
            {/* CARD HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', fontSize: '1.12rem', color: '#0f172a' }}>
                  {currentRecord.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <code style={{ fontSize: '0.78rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: '4px' }}>
                    {currentRecord.id}
                  </code>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: '700',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: currentRecord.status === 'PARTIAL_3D' ? '#fef3c7' : '#e2e8f0',
                      color: currentRecord.status === 'PARTIAL_3D' ? '#92400e' : '#334155'
                    }}
                  >
                    STATUS: {currentRecord.status}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Family: <strong>{currentRecord.systemId}</strong>
                  </span>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleSelectRecord(currentRecord)}
                  style={{
                    padding: '7px 14px',
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    background: '#0284c7',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  ✨ Load in 3D Showroom
                </button>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    padding: '7px 12px',
                    fontSize: '0.8rem',
                    fontWeight: '600',
                    background: '#f8fafc',
                    color: '#475569',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}
                >
                  {copiedLink ? '✓ Copied!' : '🔗 Deep Link'}
                </button>
              </div>
            </div>

            {/* 2D PANEL DIAGRAM PREVIEW */}
            <div
              style={{
                background: '#f8fafc',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b', marginBottom: '10px', textTransform: 'uppercase' }}>
                Technical Elevation Diagram
              </div>
              <div style={{ minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isDoor ? (
                  <DoorDiagram design={currentRecord.design} />
                ) : (
                  <WindowDiagram design={currentRecord.design} hideLabel={false} />
                )}
              </div>
            </div>

            {/* OPERABLE SASHES & HARDWARE GRID */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* OPERABLE SASHES */}
              <div
                style={{
                  background: '#f8fafc',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Operable Sashes & Layout ({sashesInfo.length})
                </div>
                <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {sashesInfo.map((sash, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '4px 6px',
                        background: '#ffffff',
                        borderRadius: '4px',
                        border: '1px solid #f1f5f9'
                      }}
                    >
                      <span style={{ fontWeight: '600', color: '#1e293b' }}>{sash.location}</span>
                      <span style={{ color: sash.operable ? '#0284c7' : '#64748b' }}>{sash.type}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HARDWARE SPECS */}
              <div
                style={{
                  background: '#f8fafc',
                  padding: '12px',
                  borderRadius: '6px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Hardware Specifications
                </div>
                <div style={{ maxHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {hardwareDetails.map((hw, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        padding: '4px 6px',
                        background: '#ffffff',
                        borderRadius: '4px',
                        border: '1px solid #f1f5f9'
                      }}
                    >
                      <strong style={{ color: '#0f172a' }}>{hw.name}: </strong>
                      <span style={{ color: '#64748b' }}>{hw.spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* QA NOTES & SPECIFICATION SUMMARY */}
            <div
              style={{
                fontSize: '0.76rem',
                color: '#475569',
                background: '#f1f5f9',
                padding: '10px 14px',
                borderRadius: '6px',
                borderLeft: '4px solid #0284c7',
                lineHeight: '1.5'
              }}
            >
              <strong>QA & Specification Note: </strong>
              Audited 2026-10-12 across 81 designs (zero collisions across 21 poses per operable sash). Verified 45° welded mitre seams on frame and sashes. Stainless friction stay jamb mount. Physical profiles, hardware dimensions, and architectural reveals remain provisional pending manufacturer CAD validation. Aluminium models utilize generic slim 42mm sections pending Uniframe engineering drawings.
            </div>
          </div>
        )}
      </div>
    </details>
  );
}
