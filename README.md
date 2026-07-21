# Gel Profile Studio

Local-first agarose gel lane densitometry in the browser.

Gel Profile Studio turns gel images into lane intensity profiles without requiring a desktop image-analysis package or server upload. Click a lane to create a narrow vertical ROI, compare normalized or raw profiles, apply lightweight background correction and smoothing, calibrate migration distance against a DNA ladder, and export annotated results and reproducible project data.

Live app: https://matteobroketa.github.io/Gel-Profile-Studio/

## Core capabilities

- **Fast lane profiling** — click a lane to create a vertical ROI; drag to reposition and adjust lane width globally.
- **Intensity profiles** — per-lane, whole-image, or raw 0–255 normalization with bright- or dark-band polarity.
- **Noise handling** — optional smoothing plus local-flank or rolling-baseline background correction.
- **Lane annotation** — rename lanes and render labels directly along the gel image.
- **DNA ladder calibration** — place a ladder lane, choose a built-in or custom marker set, detect peaks, and fit migration distance against `log10(bp)`.
- **Scientific review cues** — clipping/saturation estimates, candidate peak detection, calibration fit quality, and explicit warnings around semi-quantitative interpretation.
- **Portable output** — standalone HTML report, profile CSV, annotated PNG, and reloadable project JSON.
- **Broad browser image support** — PNG, JPEG, WebP, GIF, BMP, AVIF where supported by the browser; TIFF is decoded on demand.

## Privacy and scientific data

The application is a static, local-first web app. Gel images are processed in the browser and are not uploaded to an application server.

TIFF support loads a pinned UTIF decoder from jsDelivr only when a TIFF file is opened. The application also contains links to external scientific references. Users working with confidential, regulated, or otherwise sensitive data should review institutional policy and third-party network dependencies before use.

## Run locally

No build step is required.

1. Clone or download the repository.
2. Open `index.html` in a modern browser.

For a local HTTP server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Validate

Node.js 20+ is sufficient; there are no runtime npm dependencies.

```bash
npm test
```

The validator checks the static app structure, required metadata and workflows, duplicate DOM IDs, external dependency pinning, and inline JavaScript syntax.

## GitHub Pages

The repository includes `.github/workflows/pages.yml`. Push to `main`, then configure **Settings → Pages → Source** to **GitHub Actions**. The workflow validates the app and deploys the static files to GitHub Pages.

Expected project URL:

`https://matteobroketa.github.io/Gel-Profile-Studio/`

## Analysis method

See [`docs/METHODS.md`](docs/METHODS.md) for the implemented lane-profile, correction, peak-detection, and ladder-calibration approach.

## Limitations

See [`docs/LIMITATIONS.md`](docs/LIMITATIONS.md). Gel densitometry is generally semi-quantitative unless acquisition, background, dynamic range, loading, and calibration are controlled. Automatic ladder matching should always be reviewed against the actual marker used and the gel image.

## Validation

See [`docs/VALIDATION.md`](docs/VALIDATION.md) for current automated checks and validation gaps.

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## Citation

Citation metadata is provided in [`CITATION.cff`](CITATION.cff).

## License

MIT © 2026 Matteo Broketa. See [`LICENSE`](LICENSE).
