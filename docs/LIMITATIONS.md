# Limitations

Gel Profile Studio is an analysis aid, not a validated clinical or diagnostic system.

## Quantitation

Agarose gel densitometry is generally semi-quantitative unless sample loading, staining, acquisition, background, linear dynamic range, and standards are controlled. Per-lane normalization is useful for shape comparison but removes absolute intensity relationships between lanes.

## Lane geometry

v1 assumes approximately vertical lanes and samples a constant-width vertical ROI. Strong lane curvature, smiling, tilted lanes, warped gels, or irregular migration can misalign bands with the ROI. Rotate the image when appropriate; curved-path tracing is not implemented in v1.

## Background

Local-flank and rolling-baseline correction are heuristic. Nearby bright material, neighboring lanes, uneven illumination, dust, saturated regions, or strong gel gradients can bias background estimates.

## Gel analysis area

The analysis rectangle can exclude non-gel borders and labels, improving normalization and background estimates, but its selection is a user judgment. It cannot correct a biologically inappropriate ROI, curved lanes, or uneven illumination within the selected area.

## Peak detection

Candidate peaks may merge unresolved bands, split noisy bands, or miss faint bands. Peak count should not be treated as an authoritative band count without image review.

## Ladder calibration

Automatic ladder matching is order-based and can be incorrect when marker bands are missing, saturated, unresolved, outside the analyzed field, or when the wrong ladder preset is selected. Always verify the marker identity and inspect the detected peak correspondence.

The log-linear migration model is an approximation and can be inaccurate at the extremes of a ladder's size range or under non-standard electrophoresis conditions.

## Image formats

Browser-native format support varies by browser. TIFF requires network access to load the pinned UTIF decoder unless that dependency is vendored locally. Multi-page TIFF handling is limited to the decoded image used by the application.

## Image depth

The current browser pipeline analyzes an 8-bit-per-channel raster representation. Higher-bit-depth source images may be reduced during browser/decoder conversion.

## Project persistence

Project JSON can become large because it may embed the source image. Very large images can increase memory use and export size.
