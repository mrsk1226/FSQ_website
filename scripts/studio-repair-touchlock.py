import bpy,math,os,json,hashlib
base=r'D:\Blender_UPVC\07_Web_3D_Studio'
folder=os.path.join(base,'01_Blender_Working','Studio_Recovery')
destination=os.path.join(folder,'FSQ_TouchLock_Visual_Recovery_v02.blend')
asset=os.path.join(base,'02_Validated_GLB','FSQ_TouchLock_Visual_Recovery_v02.glb')
assert not os.path.exists(destination) and not os.path.exists(asset),'Never overwrite versioned recovery assets'
bpy.ops.wm.open_mainfile(filepath=os.path.join(folder,'FSQ_TouchLock_Visual_Reference_v01.blend'))
def solid(name,outline,back,front,material):
    vertices=[(x,y,z) for y in (back,front) for x,z in outline];n=len(outline)
    faces=[tuple(range(n-1,-1,-1)),tuple(range(n,n*2))]+[(i,(i+1)%n,(i+1)%n+n,i+n) for i in range(n)]
    mesh=bpy.data.meshes.new(name);mesh.from_pydata(vertices,[],faces);mesh.update()
    obj=bpy.data.objects.new(name,mesh);bpy.context.collection.objects.link(obj);obj.data.materials.append(material)
    bpy.context.view_layer.objects.active=obj;obj.select_set(True)
    bpy.ops.object.mode_set(mode='EDIT');bpy.ops.mesh.select_all(action='SELECT');bpy.ops.mesh.normals_make_consistent(inside=False);bpy.ops.object.mode_set(mode='OBJECT');obj.select_set(False)
    return obj
def cube(name,x,y,z,w,d,h,mat):
    bpy.ops.mesh.primitive_cube_add(size=1,location=(x,y,z));o=bpy.context.object;o.name=name;o.dimensions=(w,d,h);bpy.ops.object.transform_apply(location=False,rotation=False,scale=True);o.data.materials.append(mat);return o
def subtract(obj,cutter):
    bpy.context.view_layer.objects.active=obj;modifier=obj.modifiers.new('Machined opening','BOOLEAN');modifier.operation='DIFFERENCE';modifier.solver='EXACT';modifier.object=cutter;bpy.ops.object.modifier_apply(modifier=modifier.name);bpy.data.objects.remove(cutter,do_unlink=True)
white=bpy.data.materials['M_TouchLock_White'];dark=bpy.data.materials['M_TouchLock_Pocket_Dark']
for side in ['Left','Right']:
    old=bpy.data.objects[f'TouchLock_{side}_Body'];bank=old.parent
    outline=[]
    for center,start in [(.082,0),(-.082,math.pi)]:
        for i in range(25):
            angle=start+i*math.pi/24;outline.append((.013*math.cos(angle),center+.013*math.sin(angle)))
    body=solid(f'TouchLock_{side}_RebuiltBody',outline,.0002,.002,white)
    subtract(body,cube('Pocket cutter',0,.001,0,.016,.02,.092,dark))
    for z in [-.070,.070]:
        bpy.ops.mesh.primitive_cylinder_add(vertices=32,radius=.0024,depth=.02,location=(0,.001,z),rotation=(math.pi/2,0,0));subtract(body,bpy.context.object)
    bevel=body.modifiers.new('Fine faceplate edge','BEVEL');bevel.width=.00025;bevel.segments=2
    bpy.context.view_layer.objects.active=body;bpy.ops.object.modifier_apply(modifier=bevel.name)
    parts=[body,cube('Pocket floor',0,-.0095,0,.016,.001,.092,dark)]
    for x in [-.0085,.0085]:parts.append(cube('Pocket wall',x,-.0046,0,.001,.01,.092,dark))
    for z in [-.0465,.0465]:parts.append(cube('Pocket end',0,-.0046,z,.018,.01,.001,dark))
    bpy.ops.object.select_all(action='DESELECT')
    for p in parts:p.select_set(True)
    bpy.context.view_layer.objects.active=body;bpy.ops.object.join()
    original_name=old.name;bpy.data.objects.remove(old,do_unlink=True);body.name=original_name;body.parent=bank
    # Recover the same neutral unlocked pose on both banks, independent of source timeline pose.
    bpy.data.objects[f'TouchLock_{side}_Actuator'].location.z=-.008
    bpy.data.objects[f'TouchLock_{side}_Latch'].location.x=-.005 if side=='Left' else .005
    bpy.data.objects[f'TouchLock_{side}_Keeper'].location.x=-.028 if side=='Left' else .028
    for obj in bank.children:
        if obj.type=='MESH':
            for polygon in obj.data.polygons:polygon.use_smooth=False
bpy.ops.wm.save_as_mainfile(filepath=destination)
bpy.ops.wm.open_mainfile(filepath=destination)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=asset,export_format='GLB',use_selection=True,export_yup=True,export_animations=False,export_apply=True)
evidence={'blend':destination,'asset':asset,'sha256':hashlib.sha256(open(asset,'rb').read()).hexdigest(),'status':'PROVISIONAL_VISUAL_REFERENCE','changed':'Rebuilt faceplate with rectangular through-pocket, backing cavity, screw bores and fine bevel; flat normals; both banks normalized to unlocked pose. Dimensions remain photograph-derived estimates.'}
bpy.ops.wm.read_factory_settings(use_empty=True);bpy.ops.import_scene.gltf(filepath=asset);evidence['reimport_meshes']=sum(o.type=='MESH' for o in bpy.context.scene.objects)
with open(os.path.join(base,'06_QA_Reports','Complete_Studio_Recovery','touchlock-recovery-v02.json'),'w') as f:json.dump(evidence,f,indent=2)
print('RECOVERY_OK',json.dumps(evidence))
