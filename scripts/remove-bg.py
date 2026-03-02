#!/usr/bin/env python3
"""Remove backgrounds from product images using rembg (U2-Net AI model)."""

import os
import io
from pathlib import Path
from rembg import remove
from PIL import Image

# Redirect model cache to storage
os.environ["U2NET_HOME"] = "/media/ddarji/storage/.cache/u2net"

PRODUCTS_DIR = Path("public/products")

IMAGES = [
    "book-tracker-product.jpg",
    "robot-watch-stand-product.jpg",
    "ps5-tower-gaming.jpg",
    "desk-organizer-product.jpg",
]

MAX_DIM = 1024  # Max dimension for web optimization

for fname in IMAGES:
    src = PRODUCTS_DIR / fname
    dst = PRODUCTS_DIR / fname.replace(".jpg", "-transparent.png")
    print(f"Processing {src} -> {dst}")

    with open(src, "rb") as f:
        input_data = f.read()

    output_data = remove(input_data)

    # Optimize: resize to max dimension for web
    img = Image.open(io.BytesIO(output_data))
    max_dim = max(img.size)
    if max_dim > MAX_DIM:
        scale = MAX_DIM / max_dim
        new_size = (int(img.width * scale), int(img.height * scale))
        img = img.resize(new_size, Image.LANCZOS)

    img.save(dst, "PNG", optimize=True)
    size_kb = dst.stat().st_size // 1024
    print(f"  Saved {dst} ({img.width}x{img.height}, {size_kb} KB)")

print("\nDone! All transparent PNGs generated.")
