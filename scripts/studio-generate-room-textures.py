import bpy, math, random

def create_texture(name, path, generator):
    width, height = 1024, 1024
    img = bpy.data.images.new(name, width, height)
    pixels = [0.0] * (width * height * 4)
    generator(pixels, width, height)
    img.pixels = pixels
    img.filepath_raw = path
    img.file_format = 'PNG'
    img.save()
    bpy.data.images.remove(img)
    print(f"Generated texture: {path}")

# 1. Floor Oak Parquet
def gen_oak_parquet(pixels, w, h):
    # 8 horizontal planks
    plank_h = h // 8
    for y in range(h):
        plank_idx = y // plank_h
        in_plank_y = y % plank_h
        edge = 1.0 if (in_plank_y > 1 and in_plank_y < plank_h - 2) else 0.4
        for x in range(w):
            sub_plank_x = (x + (plank_idx * 317)) % (w // 2)
            sub_edge = 0.5 if sub_plank_x < 2 else 1.0
            
            # wood grain sine waves + noise
            grain = 0.5 + 0.5 * math.sin(x * 0.08 + math.sin(y * 0.15) * 4.0)
            micro = ((x * 17 + y * 31) % 97) / 97.0 * 0.08
            
            # base wood tone
            base_r = 0.68 + (plank_idx % 3) * 0.03 + micro
            base_g = 0.49 + (plank_idx % 3) * 0.02 + micro * 0.7
            base_b = 0.33 + (plank_idx % 3) * 0.015 + micro * 0.5
            
            factor = (0.85 + 0.15 * grain) * edge * sub_edge
            idx = (y * w + x) * 4
            pixels[idx] = min(1.0, base_r * factor)
            pixels[idx+1] = min(1.0, base_g * factor)
            pixels[idx+2] = min(1.0, base_b * factor)
            pixels[idx+3] = 1.0

# 2. Floor Marble Stone
def gen_marble_stone(pixels, w, h):
    tile_size = w // 2
    for y in range(h):
        tile_y = y % tile_size
        edge_y = 0.6 if (tile_y < 2 or tile_y > tile_size - 3) else 1.0
        for x in range(w):
            tile_x = x % tile_size
            edge_x = 0.6 if (tile_x < 2 or tile_x > tile_size - 3) else 1.0
            
            # soft marble veining
            v1 = math.sin(x * 0.02 + math.cos(y * 0.015) * 5.0)
            v2 = math.cos(y * 0.025 + math.sin(x * 0.02) * 4.0)
            vein = 0.5 + 0.25 * v1 + 0.25 * v2
            vein_line = 1.0 - math.exp(-abs(v1 - 0.2) * 12.0) * 0.18
            
            r = 0.90 * vein_line * (0.95 + 0.05 * vein) * edge_x * edge_y
            g = 0.86 * vein_line * (0.95 + 0.05 * vein) * edge_x * edge_y
            b = 0.81 * vein_line * (0.95 + 0.05 * vein) * edge_x * edge_y
            
            idx = (y * w + x) * 4
            pixels[idx] = r
            pixels[idx+1] = g
            pixels[idx+2] = b
            pixels[idx+3] = 1.0

# 3. Floor Dark Herringbone
def gen_dark_herringbone(pixels, w, h):
    for y in range(h):
        for x in range(w):
            pattern = (int((x + y * 0.5) * 0.04) % 2) ^ (int((x - y * 0.5) * 0.04) % 2)
            grain = 0.5 + 0.5 * math.sin(x * 0.12 + y * 0.04)
            noise = ((x * 19 + y * 29) % 73) / 73.0 * 0.06
            
            shade = (0.24 if pattern else 0.28) + noise
            r = shade * (0.9 + 0.1 * grain)
            g = shade * 0.8 * (0.9 + 0.1 * grain)
            b = shade * 0.65 * (0.9 + 0.1 * grain)
            
            idx = (y * w + x) * 4
            pixels[idx] = r
            pixels[idx+1] = g
            pixels[idx+2] = b
            pixels[idx+3] = 1.0

# 4. Wall Warm Plaster
def gen_warm_plaster(pixels, w, h):
    for y in range(h):
        for x in range(w):
            m1 = math.sin(x * 0.05) * math.cos(y * 0.05)
            m2 = math.sin(x * 0.11 + 1.2) * math.sin(y * 0.09)
            noise = ((x * 43 + y * 67) % 101) / 101.0 * 0.03
            val = 0.92 + 0.04 * (m1 + m2) * 0.5 + noise
            
            idx = (y * w + x) * 4
            pixels[idx] = val
            pixels[idx+1] = val * 0.97
            pixels[idx+2] = val * 0.93
            pixels[idx+3] = 1.0

# 5. Wool Rug
def gen_wool_rug(pixels, w, h):
    for y in range(h):
        for x in range(w):
            loop_x = math.sin(x * 0.4)
            loop_y = math.sin(y * 0.4)
            loops = 0.5 + 0.25 * loop_x + 0.25 * loop_y
            grain = ((x * 37 + y * 53) % 89) / 89.0 * 0.08
            val = (0.82 + 0.1 * loops + grain)
            
            idx = (y * w + x) * 4
            pixels[idx] = val
            pixels[idx+1] = val * 0.96
            pixels[idx+2] = val * 0.88
            pixels[idx+3] = 1.0

# 6. Neutral Linen Fabric
def gen_neutral_linen(pixels, w, h):
    for y in range(h):
        for x in range(w):
            weave = (math.sin(x * 0.8) + math.sin(y * 0.8)) * 0.06
            noise = ((x * 23 + y * 41) % 67) / 67.0 * 0.04
            val = 0.85 + weave + noise
            
            idx = (y * w + x) * 4
            pixels[idx] = val
            pixels[idx+1] = val * 0.94
            pixels[idx+2] = val * 0.86
            pixels[idx+3] = 1.0

create_texture('floor_oak_parquet', r'D:\FSQ_website\public\textures\rooms\floor_oak_parquet.png', gen_oak_parquet)
create_texture('floor_marble_stone', r'D:\FSQ_website\public\textures\rooms\floor_marble_stone.png', gen_marble_stone)
create_texture('floor_dark_herringbone', r'D:\FSQ_website\public\textures\rooms\floor_dark_herringbone.png', gen_dark_herringbone)
create_texture('wall_plaster_warm', r'D:\FSQ_website\public\textures\rooms\wall_plaster_warm.png', gen_warm_plaster)
create_texture('rug_wool_weave', r'D:\FSQ_website\public\textures\rooms\rug_wool_weave.png', gen_wool_rug)
create_texture('fabric_linen_neutral', r'D:\FSQ_website\public\textures\rooms\fabric_linen_neutral.png', gen_neutral_linen)
print('ALL_TEXTURES_GENERATED')
