# Validation

## Automated repository checks

Run:

```bash
npm test
```

The validator currently checks:

- required deployment/repository files;
- canonical app metadata and project-relative links;
- duplicate HTML element IDs;
- presence of the primary gel-analysis workflows;
- pinned TIFF decoder dependency;
- inline JavaScript syntax with Node.js;
- GitHub Pages workflow references to the expected static files.

## Functional checks completed for v1

The v1 application has been exercised with synthetic gel-like images to verify the primary workflow:

- image load;
- lane creation and repositioning;
- lane renaming and overlay labels;
- intensity profile generation;
- normalization and processing controls;
- ladder-line placement and calibration fit;
- annotated image, CSV, project JSON, and standalone HTML report generation.

## Validation gaps

The project does not yet include a browser automation suite or a reference dataset with expected numeric outputs across multiple browsers.

Future validation should include:

- fixed synthetic fixtures with known band positions and intensities;
- numeric regression tests for lane extraction, background correction, smoothing, peak detection, and calibration;
- cross-browser import tests for supported image formats;
- curated real-gel examples spanning common artifacts such as smiling, saturation, uneven background, low signal, and partial ladder visibility;
- comparison against an established densitometry workflow such as ImageJ/Fiji for representative lanes.
