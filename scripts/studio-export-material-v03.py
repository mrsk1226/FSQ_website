import bpy,json,os,hashlib
root=r'D:\Blender_UPVC\07_Web_3D_Studio'
target=os.path.join(root,'02_Validated_GLB','FSQ_UPVC_Casement_2Open_Material_v03_Web_r01.glb')
assert not os.path.exists(target),'Version already exists; do not overwrite'
bpy.context.scene.frame_set(1)
bpy.ops.object.select_all(action='DESELECT')
model=bpy.data.objects['FSQ_Window_Root']
selected=[model]+list(model.children_recursive)
for obj in selected:obj.select_set(True)
bpy.context.view_layer.objects.active=model
bpy.ops.export_scene.gltf(filepath=target,export_format='GLB',use_selection=True,export_yup=True,export_animations=True,export_animation_mode='NLA_TRACKS',export_force_sampling=True)
with open(target,'rb') as f:d=f.read()
g=json.loads(d[20:20+int.from_bytes(d[12:16],'little')])
evidence={'source':bpy.data.filepath,'asset':target,'sha256':hashlib.sha256(d).hexdigest(),'bytes':len(d),'meshes':len(g.get('meshes',[])),'nodes':len(g.get('nodes',[])),'animations':[a['name'] for a in g.get('animations',[])],'material_names':[m.get('name') for m in g.get('materials',[])],'note':'White base export with refined profile UVs. Eleven finish definitions are delivered separately, not embedded material variants.'}
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=target)
evidence['reimport_meshes']=sum(o.type=='MESH' for o in bpy.data.objects)
evidence['reimport_controllers']={n:list(bpy.data.objects[n].matrix_world.translation) for n in ['Sash_Left_Controller','Sash_Right_Controller','Handle_Left_Pivot','Handle_Right_Pivot']}
evidence['uv_layers']={o.name:[u.name for u in o.data.uv_layers] for o in bpy.data.objects if o.type=='MESH' and ('Profile' in o.name or o.name.startswith('Frame_'))}
with open(os.path.join(root,'06_QA_Reports','Complete_Studio_Recovery','v03_web_export.json'),'w') as f:json.dump(evidence,f,indent=2)
print('STUDIO_EXPORT_OK',json.dumps(evidence))
