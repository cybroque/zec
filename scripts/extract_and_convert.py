#!/usr/bin/env python3
"""
Extract base64-embedded images from photo-SVGs and convert to WebP.
Also converts large PNGs to WebP.
"""

import base64
import re
import subprocess
import sys
import os
from pathlib import Path

IMAGES_DIR = Path("/Users/nihal/work/zec/public/assets/images")
OUT_DIR = IMAGES_DIR  # Write WebPs to same dir

def extract_jpeg_from_svg(svg_path: Path) -> Path | None:
    """Extract the embedded JPEG from a photo-SVG and save as temp JPEG."""
    content = svg_path.read_text(encoding="utf-8", errors="ignore")
    match = re.search(r'(?:xlink:href|href)="data:image/(\w+);base64,([^"]+)"', content, re.DOTALL)
    if not match:
        print(f"  No embedded image found in {svg_path.name}")
        return None
    fmt = match.group(1)
    b64data = match.group(2).replace("\n", "").replace(" ", "")
    raw = base64.b64decode(b64data)
    tmp_path = svg_path.with_suffix(f".tmp.{fmt}")
    tmp_path.write_bytes(raw)
    print(f"  Extracted {fmt.upper()} from {svg_path.name}: {len(raw)//1024}KB")
    return tmp_path

def convert_to_webp(src: Path, dst: Path, quality: int = 82) -> bool:
    """Convert an image file to WebP using cwebp."""
    result = subprocess.run(
        ["cwebp", "-q", str(quality), "-mt", str(src), "-o", str(dst)],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        src_size = src.stat().st_size
        dst_size = dst.stat().st_size
        reduction = (1 - dst_size / src_size) * 100
        print(f"  ✓ {src.name} → {dst.name}: {src_size//1024}KB → {dst_size//1024}KB ({reduction:.0f}% smaller)")
        return True
    else:
        print(f"  ✗ Failed to convert {src.name}: {result.stderr[:200]}")
        return False

# ── Photo-SVGs to convert ──────────────────────────────────────────────────
photo_svgs = [
    # Rider profile images
    "rider1.svg", "rider2.svg", "rider3.svg", "rider4.svg", "rider5.svg",
    "rider6.svg", "rider7.svg", "rider8.svg", "rider9.svg",
    # ScrollCarousel images
    "r2.svg", "r3.svg", "r4.svg",
    # Hero images that are SVGs
    "about-hero.svg", "pro-hero.svg",
    # Program images
    "d1.svg", "d2.svg", "d3.svg", "d4.svg", "d6.svg", "d7.svg",
    # Season images
    "season1.svg", "season2.svg", "season3.svg",
    # Other photo-SVGs
    "r2.svg", "r3.svg", "r4.svg",
    "about-main.svg", "rider1.svg",
]

# Deduplicate
photo_svgs = list(dict.fromkeys(photo_svgs))

# ── Large PNGs to convert ──────────────────────────────────────────────────
large_pngs = [
    "hero_main.png",
    "beyond-hero.png",
    "riders-hero.png",
    "aboutimg.png",
    "summer-camp.png",
    "horse-training.png",
    "buy.png",
    "venue.png",
    "eque.png",
    "horse.png",
    "photo.png",
    "franchise.png",
    "boarding.png",
    "know-more.png",
    "h1.png",
    "h2.png",
]

print("=" * 60)
print("Converting photo-SVGs to WebP")
print("=" * 60)

converted_svgs = {}
for svg_name in photo_svgs:
    svg_path = IMAGES_DIR / svg_name
    if not svg_path.exists():
        print(f"  Skipping {svg_name} (not found)")
        continue
    
    webp_name = svg_path.stem + ".webp"
    webp_path = OUT_DIR / webp_name
    
    if webp_path.exists():
        print(f"  Skipping {svg_name} (WebP already exists)")
        converted_svgs[svg_name] = webp_name
        continue
    
    print(f"\nProcessing: {svg_name}")
    tmp_path = extract_jpeg_from_svg(svg_path)
    if tmp_path is None:
        # Try direct conversion (might be a real SVG that cwebp can handle)
        # Check if it's small enough to be a real SVG
        if svg_path.stat().st_size < 500_000:  # < 500KB = likely real SVG
            print(f"  Small SVG ({svg_path.stat().st_size//1024}KB) — keeping as-is")
        continue
    
    success = convert_to_webp(tmp_path, webp_path, quality=82)
    tmp_path.unlink()  # Clean up temp file
    
    if success:
        converted_svgs[svg_name] = webp_name

print("\n" + "=" * 60)
print("Converting large PNGs to WebP")
print("=" * 60)

converted_pngs = {}
for png_name in large_pngs:
    png_path = IMAGES_DIR / png_name
    if not png_path.exists():
        print(f"  Skipping {png_name} (not found)")
        continue
    
    webp_name = png_path.stem + ".webp"
    webp_path = OUT_DIR / webp_name
    
    if webp_path.exists():
        print(f"  Skipping {png_name} (WebP already exists)")
        converted_pngs[png_name] = webp_name
        continue
    
    print(f"\nConverting: {png_name}")
    success = convert_to_webp(png_path, webp_path, quality=85)
    
    if success:
        converted_pngs[png_name] = webp_name

print("\n" + "=" * 60)
print("SUMMARY — Image path replacements needed:")
print("=" * 60)
print("\nSVG → WebP:")
for old, new in converted_svgs.items():
    print(f"  /assets/images/{old}  →  /assets/images/{new}")
print("\nPNG → WebP:")
for old, new in converted_pngs.items():
    print(f"  /assets/images/{old}  →  /assets/images/{new}")
