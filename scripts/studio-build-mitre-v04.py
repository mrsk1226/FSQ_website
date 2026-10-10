import bpy, json, os, hashlib, shutil

source_blend = r'D:\Blender_UPVC\07_Web_3D_Studio\01_Blender_Working\Studio_Recovery\FSQ_UPVC_Casement_2Open_Material_Validation_v03.blend'
target_blend = r'D:\Blender_UPVC\07_Web_3D_Studio\01_Blender_Working\Studio_Recovery\FSQ_UPVC_Casement_2Open_Material_Validation_v04.blend'
target_glb_dir = r'D:\Blender_UPVC\07_Web_3D_Studio\02_Validated_GLB'
target_glb = os.path.join(target_glb_dir, 'FSQ_UPVC_Casement_2Open_Material_v04_Web_r01.glb')
web_glb = r'D:\FSQ_website\public\models\FSQ_UPVC_Casement_2Open_Material_v04_Web_r01.glb'

print(f"Reading source blend: {source_blend}")
bpy.ops.wm.open_mainfile(filepath=source_blend)

# 1. Mitre Frame_Top
frame_top = bpy.data.objects['Frame_Top']
v = frame_top.data.vertices
v[0].co.x = -0.54
v[4].co.x = -0.54
v[1].co.x = 0.54
v[5].co.x = 0.54
frame_top.data.update()

# 2. Mitre Frame_Bottom
frame_bottom = bpy.data.objects['Frame_Bottom']
v = frame_bottom.data.vertices
v[3].co.x = -0.54
v[7].co.x = -0.54
v[2].co.x = 0.54
v[6].co.x = 0.54
frame_bottom.data.update()

# 3. Mitre Frame_Jamb_Left
frame_jamb_l = bpy.data.objects['Frame_Jamb_Left']
v = frame_jamb_l.data.vertices
v[3].co.z = 1.20
v[7].co.z = 1.20
v[0].co.z = 0.00
v[4].co.z = 0.00
frame_jamb_l.data.update()

# 4. Mitre Frame_Jamb_Right
frame_jamb_r = bpy.data.objects['Frame_Jamb_Right']
v = frame_jamb_r.data.vertices
v[2].co.z = 1.20
v[6].co.z = 1.20
v[1].co.z = 0.00
v[5].co.z = 0.00
frame_jamb_r.data.update()

# Create material for mitre seams
seam_mat = bpy.data.materials.get('M_Recovery_Mitre_Seam')
if not seam_mat:
    seam_mat = bpy.data.materials.new(name='M_Recovery_Mitre_Seam')
    seam_mat.use_nodes = True
    bsdf = seam_mat.node_tree.nodes.get('Principled BSDF')
    if bsdf:
        bsdf.inputs['Base Color'].default_value = (0.28, 0.30, 0.32, 1.0)
        bsdf.inputs['Roughness'].default_value = 0.85
        bsdf.inputs['Metallic'].default_value = 0.0

# Create thin mitre seam geometry on front and back faces of outer frame
frame_parent = bpy.data.objects['Frame_Outer_Casement']
seam_corners = [
    ('Top_Left', [(-0.6, -0.0301, 1.2), (-0.54, -0.0301, 1.14)], [(-0.6, 0.0301, 1.2), (-0.54, 0.0301, 1.14)]),
    ('Top_Right', [(0.6, -0.0301, 1.2), (0.54, -0.0301, 1.14)], [(0.6, 0.0301, 1.2), (0.54, 0.0301, 1.14)]),
    ('Bottom_Left', [(-0.6, -0.0301, 0.0), (-0.54, -0.0301, 0.06)], [(-0.6, 0.0301, 0.0), (-0.54, 0.0301, 0.06)]),
    ('Bottom_Right', [(0.6, -0.0301, 0.0), (0.54, -0.0301, 0.06)], [(0.6, 0.0301, 0.0), (0.54, 0.0301, 0.06)]),
]

for name, front_pts, back_pts in seam_corners:
    # Build a thin 0.6mm wide ribbon along the seam
    mesh = bpy.data.meshes.new(f'Frame_Mitre_Seam_{name}')
    dx = front_pts[1][0] - front_pts[0][0]
    dz = front_pts[1][2] - front_pts[0][2]
    length = (dx*dx + dz*dz)**0.5
    nx = -dz / length * 0.0004
    nz = dx / length * 0.0004
    
    verts = [
        # Front ribbon
        (front_pts[0][0] - nx, front_pts[0][1], front_pts[0][2] - nz),
        (front_pts[0][0] + nx, front_pts[0][1], front_pts[0][2] + nz),
        (front_pts[1][0] + nx, front_pts[1][1], front_pts[1][2] + nz),
        (front_pts[1][0] - nx, front_pts[1][1], front_pts[1][2] - nz),
        # Back ribbon
        (back_pts[0][0] - nx, back_pts[0][1], back_pts[0][2] - nz),
        (back_pts[0][0] + nx, back_pts[0][1], back_pts[0][2] + nz),
        (back_pts[1][0] + nx, back_pts[1][1], back_pts[1][2] + nz),
        (back_pts[1][0] - nx, back_pts[1][1], back_pts[1][2] - nz),
    ]
    faces = [(0, 1, 2, 3), (4, 7, 6, 5)]
    mesh.from_pydata(verts, [], faces)
    mesh.update()
    
    obj = bpy.data.objects.new(f'Frame_Mitre_Seam_{name}', mesh)
    obj.data.materials.append(seam_mat)
    bpy.context.collection.objects.link(obj)
    obj.parent = frame_parent

# Recalculate normals on modified frame objects
for obj in [frame_top, frame_bottom, frame_jamb_l, frame_jamb_r]:
    mesh = obj.data
    mesh.update()

# Save new versioned blend file
print(f"Saving new versioned file: {target_blend}")
bpy.ops.wm.save_as_mainfile(filepath=target_blend)

# Export GLB
bpy.context.scene.frame_set(1)
bpy.ops.object.select_all(action='DESELECT')
model = bpy.data.objects['FSQ_Window_Root']
selected = [model] + list(model.children_recursive)
for obj in selected:
    obj.select_set(True)
bpy.context.view_layer.objects.active = model

print(f"Exporting GLB to: {target_glb}")
os.makedirs(target_glb_dir, exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=target_glb,
    export_format='GLB',
    use_selection=True,
    export_yup=True,
    export_animations=True,
    export_animation_mode='NLA_TRACKS',
    export_force_sampling=True
)

with open(target_glb, 'rb') as f:
    d = f.read()

# Copy to web public directory
print(f"Copying to website public directory: {web_glb}")
shutil.copyfile(target_glb, web_glb)

g = json.loads(d[20:20 + int.from_bytes(d[12:16], 'little')])
evidence = {
    'source': target_blend,
    'asset': target_glb,
    'web_asset': web_glb,
    'sha256': hashlib.sha256(d).hexdigest(),
    'bytes': len(d),
    'meshes': len(g.get('meshes', [])),
    'nodes': len(g.get('nodes', [])),
    'animations': [a['name'] for a in g.get('animations', [])],
    'material_names': [m.get('name') for m in g.get('materials', [])],
    'note': 'v04 Double-casement recovery with true 45-degree mitred outer frame corners and visible mitre seams.'
}

# Re-import test
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=target_glb)
evidence['reimport_meshes'] = sum(o.type == 'MESH' for o in bpy.data.objects)
evidence['reimport_controllers'] = {
    n: list(bpy.data.objects[n].matrix_world.translation)
    for n in ['Sash_Left_Controller', 'Sash_Right_Controller', 'Handle_Left_Pivot', 'Handle_Right_Pivot']
    if n in bpy.data.objects
}

qa_json = r'D:\Blender_UPVC\07_Web_3D_Studio\06_QA_Reports\Complete_Studio_Recovery\v04_web_export.json'
with open(qa_json, 'w') as f:
    json.dump(evidence, f, indent=2)

print('V04_EXPORT_SUCCESS', json.dumps(evidence, indent=2))
