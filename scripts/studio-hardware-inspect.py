import bpy,json
bpy.ops.wm.open_mainfile(filepath=r'D:\Blender_UPVC\07_Web_3D_Studio\01_Blender_Working\Studio_Recovery\FSQ_TouchLock_Visual_Reference_v01.blend')
for o in bpy.context.scene.objects:
 if o.type=='MESH':
  print('MESH',o.name,'verts',len(o.data.vertices),'polys',len(o.data.polygons),'mods',[(m.name,m.type) for m in o.modifiers],'smooth',sum(p.use_smooth for p in o.data.polygons),'scale',list(o.scale))
