import bpy,json,os
base=r'D:\Blender_UPVC\07_Web_3D_Studio'
bpy.ops.wm.open_mainfile(filepath=os.path.join(base,'01_Blender_Working','Studio_Recovery','FSQ_UPVC_Casement_2Open_Material_Validation_v03.blend'))
bpy.context.scene.frame_set(1)
def pairs(obj):
    uv=obj.data.uv_layers.active
    return set(tuple(round(v,5) for v in [*(obj.matrix_world@obj.data.vertices[loop.vertex_index].co),*uv.data[loop.index].uv]) for loop in obj.data.loops)
source={o.name:pairs(o) for o in bpy.data.objects if o.type=='MESH' and any(s.material and s.material.name in ['M_Recovery_Frame_UPVC_White','M_Recovery_Sash_UPVC_White','M_Recovery_Bead_UPVC_White'] for s in o.material_slots)}
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=os.path.join(base,'02_Validated_GLB','FSQ_UPVC_Casement_2Open_Material_v03_Web_r01.glb'))
checks=[]
for name,original in source.items():
    obj=bpy.data.objects.get(name)
    actual=pairs(obj) if obj and obj.data.uv_layers.active else set()
    checks.append({'name':name,'sourceCornerValues':len(original),'importedCornerValues':len(actual),'sameWorldPositionAndUvValuesRounded1e5':actual==original})
with open(os.path.join(base,'06_QA_Reports','Complete_Studio_Recovery','v03-export-uv-comparison.json'),'w') as f:json.dump({'method':'Unique world-position and UV corner tuples, rounded to 0.00001; read-only fresh background processes. No profile modification or save.','checks':checks},f,indent=2)
print('UV_CHECK',json.dumps({'tested':len(checks),'failed':[x for x in checks if not x['sameWorldPositionAndUvValuesRounded1e5']]}))
