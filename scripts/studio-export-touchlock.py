import bpy,os,json,hashlib
base=r'D:\Blender_UPVC\07_Web_3D_Studio'
source=r'D:\Blender_UPVC\03_Blender_Models\Prominance_Optima_2Track_Phase3F_Dual_TouchLock_QA.blend'
blend=os.path.join(base,'01_Blender_Working','Studio_Recovery','FSQ_TouchLock_Visual_Reference_v01.blend')
asset=os.path.join(base,'02_Validated_GLB','FSQ_TouchLock_Visual_Reference_v01.glb')
assert not os.path.exists(blend) and not os.path.exists(asset),'Do not overwrite versioned assets'
bpy.ops.wm.read_factory_settings(use_empty=True)
names=[f'TouchLock_{side}_{part}' for side in ['Left','Right'] for part in ['Body','Actuator','Latch','Keeper']]
with bpy.data.libraries.load(source,link=False) as (src,dst):
    assert all(n in src.objects for n in names)
    dst.objects=names
objects=list(dst.objects)
for obj in objects:
    bpy.context.collection.objects.link(obj)
bpy.context.view_layer.update()
evidence={'source':source,'source_sha256':hashlib.sha256(open(source,'rb').read()).hexdigest(),'status':'VISUAL_REFERENCE_PROVISIONAL_DIMENSIONS','original':{}}
for side in ['Left','Right']:
    body=bpy.data.objects[f'TouchLock_{side}_Body']
    anchor=body.matrix_world.translation.copy()
    bank=bpy.data.objects.new(f'TouchLock_{side}_Template',None);bpy.context.collection.objects.link(bank)
    for part in ['Body','Actuator','Latch','Keeper']:
        obj=bpy.data.objects[f'TouchLock_{side}_{part}']
        world=obj.matrix_world.copy();evidence['original'][obj.name]={'dimensions':list(obj.dimensions),'world':list(world.translation),'materials':[s.material.name for s in obj.material_slots if s.material]}
        obj.animation_data_clear();obj.parent=None;obj.matrix_world=world;obj.location-=anchor;obj.parent=bank
        obj.hide_set(False);obj.hide_viewport=False;obj.hide_render=False
        if part=='Body':evidence['original'][obj.name]['local_bounds']=[[min(v.co[i] for v in obj.data.vertices),max(v.co[i] for v in obj.data.vertices)] for i in range(3)]
# Appended dependency objects are never linked to the exported scene.
bpy.ops.wm.save_as_mainfile(filepath=blend)
bpy.ops.wm.open_mainfile(filepath=blend)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=asset,export_format='GLB',use_selection=True,export_yup=True,export_animations=False,export_apply=True)
evidence['blend']=blend;evidence['glb']=asset;evidence['sha256']=hashlib.sha256(open(asset,'rb').read()).hexdigest()
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=asset)
evidence['reimport_meshes']=sum(o.type=='MESH' for o in bpy.context.scene.objects)
evidence['reimport_nodes']=[o.name for o in bpy.context.scene.objects]
with open(os.path.join(base,'06_QA_Reports','Complete_Studio_Recovery','touchlock-export.json'),'w') as f:json.dump(evidence,f,indent=2)
print('TOUCHLOCK_EXPORT_OK',json.dumps(evidence))
