# Contributing

Contributions should preserve the core product principle: fast, transparent agarose gel profiling without turning the application into an opaque image-processing pipeline.

## Before opening a pull request

1. Run `npm test`.
2. Open `index.html` directly in a browser and exercise the affected workflow.
3. Test at least one normal raster image and, for import changes, the relevant additional format.
4. Keep analysis transformations explicit and reversible where practical; do not silently alter source image pixels.
5. Document any new scientific assumption, calibration model, marker preset, or default in `docs/METHODS.md` or `docs/LIMITATIONS.md`.
6. Marker/ladder presets should be sourced from manufacturer documentation and record the exact fragment sizes used.
7. Do not commit unpublished, confidential, patient-identifiable, or proprietary scientific data.

## Architecture

`index.html` is the canonical application and release artifact. Runtime code, styling, and the primary application UI remain in this file to preserve simple static deployment and direct local use.

`scripts/validate.mjs` performs structural, metadata, dependency, DOM-ID, and JavaScript syntax checks without a build step.

## Scientific behavior

Changes to densitometry, background correction, peak detection, ladder matching, or calibration should include:

- the intended analytical behavior;
- expected failure modes;
- a synthetic or non-sensitive test case where practical;
- documentation of assumptions and any thresholds introduced.
