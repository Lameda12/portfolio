# 3D Model Assets

Place your GLTF/GLB model file here as `hero.glb`.

## Recommended Model Specifications

- **Format**: `.glb` (preferred) or `.gltf`
- **File Size**: Under 8-12 MB for optimal loading
- **Compression**: Use Draco or meshopt compression
- **Polycount**: Aim for 50k-200k triangles for web performance
- **Textures**: Use compressed formats (JPEG for color, PNG for alpha)
- **Centering**: Ensure model is centered at origin (0, 0, 0)

## Tools for Optimization

- [gltf-transform](https://gltf-transform.dev/) - Command-line tool for optimization
- [glTF Report](https://gltf.report/) - Analyze your glTF files
- [Blender](https://www.blender.org/) - Free 3D modeling and export

## Example Command for Optimization

```bash
npx gltf-transform optimize input.glb hero.glb --compress draco
```

Once you place `hero.glb` in this directory, the app will automatically load it.

