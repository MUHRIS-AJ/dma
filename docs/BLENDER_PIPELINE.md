# 🐹 3D Hamster Mascot: Blender to Web Pipeline Guide
**Project:** Digitalmod Academy (Pvt) Ltd - 3D Mascot Web Experience  
**Target:** 60 FPS WebGL / Three.js / React Three Fiber

---

## 1. Character Architecture & Rigging Requirements

To achieve agency-grade fidelity in the browser, your 3D Hamster model must conform to the following specifications:

### Target Budget & Specs
- **Polygon Count:** 8,000 to 18,000 triangles (optimal balance of roundness and WebGL performance).
- **Draw Calls:** Maximum 2–3 draw calls (combine meshes where possible).
- **Textures:** 1K or 2K PBR Maps (Albedo/BaseColor, Normal, Roughness/Metallic in packed channels).
- **File Size:** Under **2.5 MB** with Draco compression.

### Armature & Bone Hierarchy
Name your armature bones according to this convention so Three.js can bind to them for procedural cursor tracking:
```text
Root
 └── Spine
      └── Chest
           ├── Neck
           │    └── Head
           │         ├── Eye_L
           │         ├── Eye_R
           │         ├── Ear_L
           │         ├── Ear_R
           │         └── Nose_Snout
           ├── Arm_L ──> Forearm_L ──> Paw_L
           └── Arm_R ──> Forearm_R ──> Paw_R
 ├── Thigh_L ──> Shin_L ──> Foot_L
 └── Thigh_R ──> Shin_R ──> Foot_R
```

---

## 2. Animation Clips & NLA Tracks

Export the 6 distinct animation clips as separate **NLA (Non-Linear Animation)** strips in Blender:

| Action Name | Duration | Description | Keyframe Focus |
| :--- | :--- | :--- | :--- |
| `idle` | 2.5s loop | Subtle breathing, ear twitch, nose twitch | Chest scale (1.0 to 1.03), Ear Z rotation |
| `wave` | 2.0s loop | Friendly paw greeting with slight head tilt | `Arm_R` elevated, rapid side-to-side rotation |
| `run` | 0.8s loop | Hamster wheel sprint cycle | Paws and feet alternating sinusoidal run cycle |
| `eating` | 1.8s loop | Holding sunflower seed, chewing cheek movement | Both paws at mouth, fast snout translation |
| `jump` | 1.4s one-shot | Anticipation crouch, explosive hop, triumph pose | Root Z elevation + paws thrown upward |
| `sleep` | 3.0s loop | Curled up body, slow rhythmic deep breathing | Root lowered, eyelids closed, slow chest scale |

### Exporting Multi-Clip GLTF from Blender
1. Open the **Dope Sheet** and switch mode to **Action Editor**.
2. Assign each animation action to the armature.
3. Click the **Push Down** button on each action to convert it into an **NLA Strip**.
4. Rename each NLA track to match the exact names: `idle`, `wave`, `run`, `eating`, `jump`, `sleep`.

---

## 3. Blender Export Settings

In Blender 3.6 LTS or 4.x:
1. Go to **File → Export → glTF 2.0 (.glb)**
2. In the right panel, configure:
   - **Format:** `glTF Binary (.glb)`
   - **Include:** Check `Selected Objects` (Armature and Meshes)
   - **Transform:** `+Y Up`
   - **Geometry:**
     - Check `Apply Modifiers`
     - Check `UVs`, `Normals`, `Tangents`
   - **Compression:**
     - Check `Draco mesh compression`
     - Compression Level: `7`
     - Position Quantization: `14`
     - Normal Quantization: `10`
     - Texture Coordinate Quantization: `12`
   - **Animation:**
     - Check `Animation`
     - Check `Group by NLA Track`
     - Check `Export Deformation Bones Only`

Place the exported file at:
```text
public/models/hamster.glb
```

---

## 4. Free Curated 3D Mascot Sources & Licenses

If you are sourcing an existing base model to re-rig:

1. **Kenney.nl (CC0 - Public Domain)**
   - Animal pack / Character assets
   - Commercial use allowed without attribution.
2. **Quaternius (CC0 - Public Domain)**
   - Stylized cute rigged creatures
   - Fully rigged with Blender source files.
3. **Sketchfab (CC-BY 4.0 / Standard License)**
   - Search: `Hamster Cute Stylized Rigged`
   - Filter by: `Downloadable` and `Rigged`.
   - Ensure attribution is preserved in project credits (`Mohomed Suhith / Digitalmod Academy`).
4. **Mixamo (Adobe Free License)**
   - Auto-rigging and 100+ character dance, wave, and locomotion clips.

---

## 5. Procedural Fallback Engine

This repository includes a **zero-dependency procedural 3D hamster mascot engine** built into `Hamster.tsx`. If no external `.glb` is provided, the procedural engine renders a fully rigged, expressive, stylized hamster with:
- Velvety Fresnel rim fur shader
- Glossy specular eyes with natural blinking
- Anatomical cursor look-at tracking
- Headset accessory in Digitalmod Academy brand colors (Yellow, Purple, Blue)
- Real-time prop generation (seed for eating, Zzz for sleeping)
- Click reaction particle bursts.
