import bpy, math, os, json

out_dir = r'D:\FSQ_website\public\models\rooms'
os.makedirs(out_dir, exist_ok=True)

def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)

def create_mat(name, color, roughness=0.5, metallic=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    if bsdf:
        bsdf.inputs['Base Color'].default_value = (*color, 1.0)
        bsdf.inputs['Roughness'].default_value = roughness
        bsdf.inputs['Metallic'].default_value = metallic
    return mat

# Coordinate mapping:
# Three.js: tx = X, ty = Y (UP), tz = Z (DEPTH into room)
# Blender:  X = tx, Y = -tz,     Z = ty (UP)
def add_box(name, tx, ty, tz, w, h, d, mat, bevel=0.0):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(tx, -tz, ty))
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = (w, d, h)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    if bevel > 0:
        b = obj.modifiers.new('Bevel', 'BEVEL')
        b.width = bevel
        b.segments = 2
        bpy.ops.object.modifier_apply(modifier=b.name)
    if mat:
        obj.data.materials.append(mat)
    for p in obj.data.polygons:
        p.use_smooth = True
    return obj

def add_cylinder(name, tx, ty, tz, r, h, mat, vertices=24):
    bpy.ops.mesh.primitive_cylinder_add(vertices=vertices, radius=r, depth=h, location=(tx, -tz, ty))
    obj = bpy.context.object
    obj.name = name
    if mat:
        obj.data.materials.append(mat)
    for p in obj.data.polygons:
        p.use_smooth = True
    return obj

def export_model(filename):
    filepath = os.path.join(out_dir, filename)
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format='GLB',
        use_selection=True,
        export_yup=True,
        export_apply=True
    )
    print(f"Exported: {filepath}")

# ==========================================
# 1. BAY SEATING (Matches Top Reference)
# ==========================================
def build_bay_seating():
    reset_scene()
    oak = create_mat('M_Honey_Oak', (0.68, 0.49, 0.33), roughness=0.45)
    linen = create_mat('M_Cream_Linen', (0.88, 0.84, 0.78), roughness=0.85)
    sage = create_mat('M_Sage_Green', (0.42, 0.52, 0.38), roughness=0.8)
    terracotta = create_mat('M_Terracotta', (0.65, 0.45, 0.35), roughness=0.75)
    ceramic = create_mat('M_White_Ceramic', (0.92, 0.92, 0.90), roughness=0.3)
    plant_mat = create_mat('M_Plant_Green', (0.25, 0.45, 0.22), roughness=0.4)

    # Curved Bench right beneath the window sill
    add_box('Bay_Bench_Base', 0.0, 0.21, 0.75, 2.8, 0.42, 0.70, oak, bevel=0.015)
    add_box('Bay_Bench_Cushion', 0.0, 0.48, 0.75, 2.74, 0.12, 0.66, linen, bevel=0.035)

    # Throw pillows tilted against window casing
    add_box('Bay_Pillow_Sage', -0.75, 0.65, 0.62, 0.45, 0.32, 0.16, sage, bevel=0.04)
    add_box('Bay_Pillow_Terra', 0.75, 0.65, 0.62, 0.45, 0.32, 0.16, terracotta, bevel=0.04)
    add_box('Bay_Bolster', 0.0, 0.60, 0.60, 0.65, 0.20, 0.20, linen, bevel=0.06)

    # Builtin illuminated wood shelving on left
    add_box('Shelf_Back', -2.4, 1.4, 0.85, 0.75, 2.5, 0.04, oak)
    for i in range(5):
        add_box(f'Shelf_{i}', -2.4, 0.35 + i * 0.48, 0.85, 0.71, 0.035, 0.38, oak)
        add_box(f'Books_{i}', -2.35, 0.50 + i * 0.48, 0.85, 0.28, 0.24, 0.24, terracotta)

    # Ceramic planter with palm fronds
    add_cylinder('Planter_Pot', -1.5, 0.22, 0.85, 0.18, 0.44, ceramic)
    for a in range(6):
        ang = a * math.pi / 3.0
        lx = -1.5 + math.cos(ang) * 0.22
        lz = 0.85 + math.sin(ang) * 0.22
        add_cylinder(f'Palm_Frond_{a}', lx, 0.55 + a * 0.04, lz, 0.045, 0.38, plant_mat)

    # Round coffee table with wood tray
    add_cylinder('Table_Top', 0.2, 0.38, 1.7, 0.44, 0.04, oak)
    add_cylinder('Table_Base', 0.2, 0.18, 1.7, 0.20, 0.36, oak)

    # Side framing linen curtains
    add_box('Curtain_Left', -2.0, 1.7, 0.25, 0.35, 3.4, 0.20, linen, bevel=0.05)
    add_box('Curtain_Right', 2.0, 1.7, 0.25, 0.35, 3.4, 0.20, linen, bevel=0.05)

    export_model('room_bay_seating.glb')

# ==========================================
# 2. HILLSIDE LIVING (Matches Bottom Reference)
# ==========================================
def build_hillside_living():
    reset_scene()
    fabric = create_mat('M_Boucle_Fabric', (0.86, 0.83, 0.77), roughness=0.88)
    oak = create_mat('M_Natural_Oak', (0.64, 0.48, 0.34), roughness=0.5)
    marble = create_mat('M_White_Marble', (0.92, 0.90, 0.87), roughness=0.25)
    olive = create_mat('M_Olive_Velvet', (0.36, 0.44, 0.32), roughness=0.7)
    plant_mat = create_mat('M_Lush_Green', (0.22, 0.42, 0.20), roughness=0.45)

    # Contemporary L-Sectional Sofa
    add_box('Sofa_Main_Base', -1.0, 0.22, 1.8, 2.3, 0.44, 0.95, fabric, bevel=0.05)
    add_box('Sofa_Main_Back', -1.0, 0.65, 2.2, 2.3, 0.48, 0.25, fabric, bevel=0.06)
    add_box('Sofa_Chaise_Base', -1.8, 0.22, 2.5, 0.95, 0.44, 1.4, fabric, bevel=0.05)
    add_box('Sofa_Cushion_1', -0.5, 0.55, 2.0, 0.48, 0.38, 0.18, olive, bevel=0.05)
    add_box('Sofa_Cushion_2', -1.3, 0.55, 2.0, 0.48, 0.38, 0.18, fabric, bevel=0.05)

    # Fluted pedestal coffee table with marble top
    add_cylinder('Coffee_Table_Top', 0.55, 0.38, 1.55, 0.46, 0.04, marble)
    add_cylinder('Coffee_Table_Fluted_Base', 0.55, 0.18, 1.55, 0.32, 0.36, oak)

    # Table decor
    add_cylinder('Table_Vase', 0.55, 0.48, 1.55, 0.08, 0.16, create_mat('M_Ceramic', (0.9, 0.9, 0.88), 0.2))
    add_box('Table_Books', 0.42, 0.42, 1.50, 0.22, 0.05, 0.26, create_mat('M_Cover', (0.2, 0.25, 0.22), 0.6))

    # Olive Green Lounge Chair
    add_box('Chair_Seat', 2.0, 0.38, 1.45, 0.72, 0.16, 0.72, olive, bevel=0.04)
    add_box('Chair_Back', 2.0, 0.72, 1.75, 0.72, 0.55, 0.16, olive, bevel=0.04)
    add_box('Chair_Leg_1', 1.7, 0.18, 1.20, 0.05, 0.36, 0.05, oak)
    add_box('Chair_Leg_2', 2.3, 0.18, 1.20, 0.05, 0.36, 0.05, oak)
    add_box('Chair_Leg_3', 1.7, 0.18, 1.70, 0.05, 0.36, 0.05, oak)
    add_box('Chair_Leg_4', 2.3, 0.18, 1.70, 0.05, 0.36, 0.05, oak)

    # Potted Plant
    add_cylinder('Plant_Pot', 1.6, 0.25, 0.85, 0.18, 0.50, create_mat('M_Pot', (0.85, 0.82, 0.78), 0.4))
    for i in range(5):
        add_cylinder(f'Plant_Leaf_{i}', 1.6 + math.cos(i) * 0.15, 0.65 + i * 0.06, 0.85 + math.sin(i) * 0.15, 0.06, 0.35, plant_mat)

    export_model('room_hillside_living.glb')

# ==========================================
# 3. MODERN BEDROOM (Matches Bedroom Reference)
# ==========================================
def build_modern_bedroom():
    reset_scene()
    oak = create_mat('M_Warm_Oak', (0.66, 0.47, 0.32), roughness=0.45)
    linen = create_mat('M_Linen_Bed', (0.87, 0.84, 0.80), roughness=0.88)
    headboard_mat = create_mat('M_Tufted_Headboard', (0.35, 0.33, 0.32), roughness=0.8)
    brass = create_mat('M_Brushed_Brass', (0.82, 0.68, 0.35), roughness=0.25, metallic=0.9)
    charcoal = create_mat('M_Charcoal', (0.22, 0.22, 0.24), roughness=0.6)

    # Platform Bed positioned naturally in the room
    add_box('Bed_Base', -1.3, 0.20, 2.0, 1.95, 0.35, 2.1, oak, bevel=0.02)
    add_box('Bed_Mattress', -1.3, 0.48, 2.0, 1.88, 0.28, 2.05, linen, bevel=0.05)
    add_box('Bed_Headboard', -1.3, 0.95, 3.0, 2.1, 1.25, 0.18, headboard_mat, bevel=0.04)

    # Bed pillows and accent cushion
    add_box('Pillow_L1', -1.7, 0.72, 2.8, 0.65, 0.18, 0.42, linen, bevel=0.06)
    add_box('Pillow_R1', -0.9, 0.72, 2.8, 0.65, 0.18, 0.42, linen, bevel=0.06)
    add_box('Pillow_Accent', -1.3, 0.68, 2.5, 0.50, 0.15, 0.30, charcoal, bevel=0.04)

    # Floating nightstand & pendant lamp
    add_box('Nightstand', -2.5, 0.25, 2.8, 0.55, 0.48, 0.45, oak, bevel=0.01)
    add_cylinder('Pendant_Shade', -2.5, 1.5, 2.8, 0.08, 0.22, brass)
    add_cylinder('Pendant_Cord', -2.5, 2.4, 2.8, 0.005, 1.6, brass)

    # Low window bench under window sill
    add_box('Bedroom_Window_Bench', 0.0, 0.22, 0.65, 2.0, 0.42, 0.55, oak, bevel=0.01)
    add_box('Bedroom_Bench_Cushion', 0.0, 0.48, 0.65, 1.96, 0.12, 0.52, linen, bevel=0.03)

    # Vertical Wood Slat Feature Wall on Right
    for s in range(16):
        add_box(f'Slat_{s}', 2.4 + s * 0.07, 1.7, 1.2, 0.035, 3.4, 0.035, oak)

    # Vanity table and stool
    add_box('Vanity_Desk', 2.8, 0.76, 2.0, 1.2, 0.06, 0.55, oak, bevel=0.01)
    add_box('Vanity_Leg_1', 2.3, 0.38, 2.0, 0.04, 0.76, 0.50, charcoal)
    add_box('Vanity_Leg_2', 3.3, 0.38, 2.0, 0.04, 0.76, 0.50, charcoal)
    add_cylinder('Vanity_Stool', 2.8, 0.24, 1.8, 0.22, 0.46, headboard_mat)

    export_model('room_modern_bedroom.glb')

# ==========================================
# 4. LUXURY LIVING
# ==========================================
def build_luxury_living():
    reset_scene()
    boucle = create_mat('M_Ivory_Boucle', (0.92, 0.90, 0.86), roughness=0.85)
    travertine = create_mat('M_Travertine', (0.88, 0.84, 0.78), roughness=0.35)
    leather = create_mat('M_Cognac_Leather', (0.55, 0.32, 0.18), roughness=0.45)
    brass = create_mat('M_Satin_Brass', (0.80, 0.68, 0.36), roughness=0.3, metallic=0.9)
    black_marble = create_mat('M_Nero_Marble', (0.15, 0.15, 0.16), roughness=0.2)

    # Curved Architectural Designer Sofa
    add_box('Luxury_Sofa_Seat', -1.1, 0.24, 1.7, 2.5, 0.45, 1.0, boucle, bevel=0.08)
    add_box('Luxury_Sofa_Back', -1.1, 0.68, 2.15, 2.5, 0.52, 0.28, boucle, bevel=0.08)
    add_box('Luxury_Arm_L', -2.3, 0.55, 1.7, 0.25, 0.42, 0.95, boucle, bevel=0.06)

    # Low Travertine Plinth Table
    add_box('Travertine_Table', 0.4, 0.18, 1.5, 1.4, 0.34, 0.75, travertine, bevel=0.01)
    add_cylinder('Marble_Bowl', 0.4, 0.38, 1.5, 0.16, 0.06, black_marble)

    # Cognac Leather Swivel Chair
    add_box('Swivel_Chair_Seat', 2.1, 0.36, 1.45, 0.78, 0.18, 0.78, leather, bevel=0.05)
    add_box('Swivel_Chair_Back', 2.1, 0.74, 1.80, 0.78, 0.60, 0.18, leather, bevel=0.05)
    add_cylinder('Swivel_Base', 2.1, 0.12, 1.45, 0.25, 0.24, brass)

    # Slender Arched Brass Floor Lamp
    add_cylinder('Lamp_Base', 2.4, 0.02, 2.2, 0.22, 0.03, brass)
    add_cylinder('Lamp_Pole', 2.4, 0.95, 2.2, 0.015, 1.9, brass)
    add_cylinder('Lamp_Shade', 2.1, 1.8, 1.9, 0.18, 0.14, brass)

    export_model('room_luxury_living.glb')

# ==========================================
# 5. APARTMENT LIVING
# ==========================================
def build_apartment_living():
    reset_scene()
    slate = create_mat('M_Slate_Fabric', (0.38, 0.44, 0.50), roughness=0.8)
    oak = create_mat('M_Light_Oak', (0.72, 0.56, 0.40), roughness=0.45)
    steel = create_mat('M_Black_Steel', (0.18, 0.18, 0.20), roughness=0.4, metallic=0.8)
    white = create_mat('M_Matte_White', (0.92, 0.92, 0.92), roughness=0.5)

    # Urban Modern Sofa
    add_box('Urban_Sofa_Base', -1.2, 0.22, 1.6, 2.2, 0.42, 0.88, slate, bevel=0.04)
    add_box('Urban_Sofa_Back', -1.2, 0.62, 1.98, 2.2, 0.46, 0.22, slate, bevel=0.05)
    for lx in [-2.2, -0.2]:
        for lz in [1.25, 1.95]:
            add_cylinder(f'Leg_{lx}_{lz}', lx, 0.08, lz, 0.025, 0.16, oak)

    # Nesting Coffee Tables
    add_cylinder('Nest_Table_1', 0.15, 0.38, 1.5, 0.38, 0.03, oak)
    add_cylinder('Nest_Base_1', 0.15, 0.18, 1.5, 0.03, 0.36, steel)
    add_cylinder('Nest_Table_2', 0.65, 0.32, 1.7, 0.28, 0.03, white)
    add_cylinder('Nest_Base_2', 0.65, 0.15, 1.7, 0.03, 0.30, steel)

    # Low Media Credenza
    add_box('Credenza', 2.6, 0.32, 1.7, 1.4, 0.55, 0.45, oak, bevel=0.01)

    # Potted Monstera Plant
    add_cylinder('Monstera_Pot', 1.5, 0.22, 0.85, 0.16, 0.42, white)
    for i in range(4):
        add_cylinder(f'Leaf_{i}', 1.5 + math.cos(i) * 0.18, 0.6 + i * 0.08, 0.85 + math.sin(i) * 0.18, 0.08, 0.32, create_mat(f'M_Monstera_{i}', (0.2, 0.42, 0.2), 0.4))

    export_model('room_apartment_living.glb')

# ==========================================
# 6. HOME OFFICE
# ==========================================
def build_home_office():
    reset_scene()
    dark_oak = create_mat('M_Smoked_Oak', (0.35, 0.26, 0.20), roughness=0.45)
    steel = create_mat('M_Dark_Steel', (0.16, 0.16, 0.18), roughness=0.35, metallic=0.85)
    leather = create_mat('M_Black_Leather', (0.18, 0.18, 0.20), roughness=0.55)
    brass = create_mat('M_Antique_Brass', (0.75, 0.62, 0.32), roughness=0.3, metallic=0.9)
    screen = create_mat('M_Monitor_Glass', (0.05, 0.05, 0.06), roughness=0.1)

    # Executive Desk
    add_box('Desk_Top', -1.5, 0.74, 1.6, 1.7, 0.05, 0.82, dark_oak, bevel=0.01)
    add_box('Desk_Leg_L', -2.25, 0.36, 1.6, 0.06, 0.72, 0.75, steel)
    add_box('Desk_Leg_R', -0.75, 0.36, 1.6, 0.06, 0.72, 0.75, steel)

    # Curved monitor setup
    add_box('Monitor_Panel', -1.5, 1.10, 1.45, 0.75, 0.42, 0.03, screen)
    add_cylinder('Monitor_Stem', -1.5, 0.88, 1.42, 0.02, 0.24, steel)
    add_cylinder('Monitor_Base', -1.5, 0.77, 1.45, 0.12, 0.015, steel)

    # Executive Task Chair
    add_box('Chair_Cushion', -1.5, 0.46, 2.2, 0.54, 0.10, 0.52, leather, bevel=0.03)
    add_box('Chair_High_Back', -1.5, 0.82, 2.45, 0.52, 0.65, 0.08, leather, bevel=0.03)
    add_cylinder('Chair_Column', -1.5, 0.22, 2.2, 0.035, 0.42, steel)

    # Architectural Task Lamp
    add_cylinder('Lamp_Base', -2.0, 0.78, 1.4, 0.09, 0.02, brass)
    add_cylinder('Lamp_Arm', -2.0, 0.95, 1.45, 0.01, 0.35, brass)

    # Bookcase Tower on Right
    add_box('Bookcase_Tower', 2.2, 1.15, 1.1, 0.85, 2.3, 0.38, dark_oak, bevel=0.01)
    for i in range(5):
        add_box(f'Bookcase_Shelf_{i}', 2.2, 0.35 + i * 0.45, 1.1, 0.81, 0.03, 0.36, dark_oak)

    export_model('room_home_office.glb')

# ==========================================
# 7. GARDEN LIVING
# ==========================================
def build_garden_living():
    reset_scene()
    teak = create_mat('M_Teak_Wood', (0.58, 0.40, 0.26), roughness=0.5)
    rope = create_mat('M_Woven_Rope', (0.75, 0.70, 0.62), roughness=0.8)
    stone = create_mat('M_Cast_Stone', (0.78, 0.76, 0.72), roughness=0.6)
    plant_mat = create_mat('M_Tropical_Green', (0.22, 0.45, 0.18), roughness=0.4)
    terracotta = create_mat('M_Terracotta_Pot', (0.68, 0.46, 0.34), roughness=0.7)

    # Pair of Teak Indoor-Outdoor Lounge Armchairs
    for idx, cx in enumerate([-1.5, -0.3]):
        add_box(f'Lounge_Seat_{idx}', cx, 0.36, 1.5, 0.72, 0.14, 0.72, rope, bevel=0.04)
        add_box(f'Lounge_Back_{idx}', cx, 0.72, 1.85, 0.72, 0.55, 0.12, rope, bevel=0.04)
        add_box(f'Lounge_Frame_L_{idx}', cx - 0.38, 0.45, 1.5, 0.06, 0.62, 0.85, teak, bevel=0.01)
        add_box(f'Lounge_Frame_R_{idx}', cx + 0.38, 0.45, 1.5, 0.06, 0.62, 0.85, teak, bevel=0.01)

    # Stone Drum Coffee Table
    add_cylinder('Stone_Table', -0.9, 0.22, 1.35, 0.32, 0.44, stone)

    # Tropical Plant Cluster on Right
    add_cylinder('Pot_1', 1.5, 0.28, 0.85, 0.22, 0.56, terracotta)
    add_cylinder('Pot_2', 2.0, 0.20, 1.15, 0.18, 0.40, terracotta)
    for p in range(7):
        ang = p * math.pi / 3.5
        add_cylinder(f'Tropical_Leaf_{p}', 1.5 + math.cos(ang) * 0.25, 0.75 + p * 0.06, 0.85 + math.sin(ang) * 0.25, 0.07, 0.50, plant_mat)

    # Low Teak Patio Bench on Right
    add_box('Patio_Bench', 2.6, 0.24, 1.8, 1.4, 0.44, 0.55, teak, bevel=0.02)

    export_model('room_garden_living.glb')

build_bay_seating()
build_hillside_living()
build_modern_bedroom()
build_luxury_living()
build_apartment_living()
build_home_office()
build_garden_living()

license_data = {
    "license": "CC0 1.0 Universal (Public Domain Dedication)",
    "creator": "Four Square Fenestration 3D Studio Architecture",
    "description": "Procedural realistic architectural furniture and decor asset library for 7 interior rooms",
    "coordinateSystem": "Three.js (+X right, +Y up, +Z into room)",
    "rooms": [
        "room_bay_seating.glb",
        "room_hillside_living.glb",
        "room_modern_bedroom.glb",
        "room_luxury_living.glb",
        "room_apartment_living.glb",
        "room_home_office.glb",
        "room_garden_living.glb"
    ]
}

with open(os.path.join(out_dir, 'LICENSE.json'), 'w') as f:
    json.dump(license_data, f, indent=2)

print("ALL_ROOM_MODELS_REBUILT_SUCCESSFULLY")
