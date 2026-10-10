import fs from 'fs';
import * as T from 'three';
import { studioRecords, studioSystems } from '../src/data/designs/studioRegistry.js';
import { buildAssembly, applyMotion, disposeGroup } from '../src/components/design-diagrams/studioAssembly.js';

const qaDir = 'D:/Blender_UPVC/07_Web_3D_Studio/06_QA_Reports/Complete_Studio_Recovery';
if (!fs.existsSync(qaDir)) fs.mkdirSync(qaDir, { recursive: true });

console.log(`Starting M4 Audit of all ${studioRecords.length} records across ${studioSystems.length} systems...`);

const auditResults = [];
let passCount = 0;
let failCount = 0;

for (const record of studioRecords) {
  const result = {
    id: record.id,
    systemId: record.systemId,
    name: record.name,
    product: record.product,
    type: record.type,
    status: 'PARTIAL_3D',
    errors: []
  };

  try {
    const assembly = buildAssembly(record);
    const root = assembly.root;

    // 1. Mesh and node inspection
    let meshCount = 0;
    const roles = {};
    root.traverse(n => {
      if (n.isMesh) {
        meshCount++;
        const role = n.userData.role || 'unassigned';
        roles[role] = (roles[role] || 0) + 1;
      }
    });

    if (meshCount === 0) {
      result.errors.push('Zero meshes generated');
    }

    // 2. Bounding box check
    root.updateMatrixWorld(true);
    const box = new T.Box3().setFromObject(root);
    const size = box.getSize(new T.Vector3());
    if (isNaN(size.x) || isNaN(size.y) || isNaN(size.z) || size.x <= 0 || size.y <= 0) {
      result.errors.push(`Invalid bounding box: ${size.x} x ${size.y} x ${size.z}`);
    }

    // 3. Panel and track checks
    result.panelsCount = assembly.panels.length;
    result.tracksCount = assembly.tracks;
    result.motionsCount = assembly.motions.length;
    result.meshCount = meshCount;
    result.roles = roles;
    result.dimensions = [size.x, size.y, size.z];

    // 4. Kinematics evaluation
    const motionDetails = [];
    for (const m of assembly.motions) {
      const initialPos = m.node.position.clone();
      const initialRot = m.node.rotation.clone();

      // Test closed (target = 0, current = 0)
      m.target = 0;
      m.current = 0;
      applyMotion(m);
      root.updateMatrixWorld(true);
      const closedBox = new T.Box3().setFromObject(m.node);

      // Test open (target = 1, current = 1)
      m.target = 1;
      m.current = 1;
      applyMotion(m);
      root.updateMatrixWorld(true);
      const openBox = new T.Box3().setFromObject(m.node);

      const moved = initialPos.distanceTo(m.node.position) > 0.001 ||
                    Math.abs(initialRot.x - m.node.rotation.x) > 0.001 ||
                    Math.abs(initialRot.y - m.node.rotation.y) > 0.001 ||
                    Math.abs(initialRot.z - m.node.rotation.z) > 0.001;

      motionDetails.push({
        id: m.id,
        kind: m.kind,
        left: m.left,
        track: m.track,
        travel: m.travel,
        moved,
        closedCenter: closedBox.getCenter(new T.Vector3()).toArray(),
        openCenter: openBox.getCenter(new T.Vector3()).toArray()
      });

      if (!moved) {
        result.errors.push(`Motion ${m.id} (${m.kind}) failed to actuate`);
      }

      // Return to closed
      m.target = 0;
      m.current = 0;
      applyMotion(m);
    }
    result.motions = motionDetails;

    // Dispose
    disposeGroup(root);

    if (result.errors.length === 0) {
      result.status = 'PROVISIONAL'; // Procedural verified models
      passCount++;
    } else {
      result.status = 'FAIL';
      failCount++;
    }
  } catch (err) {
    result.errors.push(err.message);
    result.status = 'FAIL';
    failCount++;
  }

  auditResults.push(result);
}

const summary = {
  milestone: 'M4',
  timestamp: new Date().toISOString(),
  totalAudited: studioRecords.length,
  passed: passCount,
  failed: failCount,
  systemBreakdown: studioSystems.map(s => {
    const records = auditResults.filter(r => r.systemId === s.id);
    return {
      systemId: s.id,
      name: s.name,
      total: records.length,
      passed: records.filter(r => r.status === 'PROVISIONAL').length,
      failed: records.filter(r => r.status === 'FAIL').length
    };
  }),
  results: auditResults
};

fs.writeFileSync(`${qaDir}/m4-catalogue-audit.json`, JSON.stringify(summary, null, 2), 'utf8');
console.log(`\nM4 AUDIT COMPLETE: ${passCount} PASSED, ${failCount} FAILED out of ${studioRecords.length} records.`);
summary.systemBreakdown.forEach(s => {
  console.log(`  - ${s.name} (${s.systemId}): ${s.passed}/${s.total} PASSED`);
});
