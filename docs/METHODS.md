# Methods

## Image handling

Gel Profile Studio analyzes the decoded pixel raster at its native dimensions. Browser-native image formats are decoded by the browser. TIFF files use UTIF 3.1.0 loaded on demand.

The displayed gel may be scaled for the viewport, but lane coordinates and calculations are mapped to native image pixels.

## Gel analysis area

The adjustable gel analysis rectangle is stored in native image pixels and defaults to the full decoded image. Pixels outside this non-destructive ROI remain visible but are excluded from image intensity statistics, whole-image normalization, lane migration sampling, local-flank background sampling, saturation estimates, and ladder peak/calibration processing. Lane migration coordinates begin at the ROI top edge. Users remain responsible for selecting a biologically appropriate gel field.

## Lane sampling

A lane is represented by a vertical centerline and a user-selected odd-numbered ROI width. For each image row, grayscale intensity is averaged across the ROI width. This produces a one-dimensional migration profile while reducing sensitivity to single-pixel noise and small horizontal band irregularities.

The current implementation assumes lanes are approximately vertical. Images can be rotated in 90° increments before profiling.

## Signal polarity

Two signal conventions are available:

- **Bright bands**: higher grayscale intensity is treated as stronger signal.
- **Dark bands / inverted gel**: grayscale intensity is inverted so darker bands produce stronger signal.

## Background correction

The application provides three modes:

- **None**: use the sampled lane profile directly.
- **Local flanks**: estimate local background from regions adjacent to the lane and subtract it from the lane signal.
- **Rolling baseline**: estimate a slowly varying baseline along migration distance and subtract it from the profile.

Negative corrected values are constrained to the valid display/analysis range.

## Smoothing

Optional moving-window smoothing is applied along migration distance using the selected pixel window. Smoothing is intended for visualization and peak stabilization, not for restoring unresolved bands.

## Normalization

Profiles can be displayed as:

- **Per lane**: scaled relative to the maximum signal within each lane.
- **Whole image**: scaled against the image-wide intensity range used by the application.
- **Raw 0–255**: grayscale-domain signal values after the selected polarity/correction pipeline.

Normalization changes display/comparison scale; it does not make lane loading quantitatively equivalent.

## Peak detection

Candidate bands are detected as local maxima in the processed one-dimensional profile using a prominence/sensitivity threshold. Peak lists are aids for inspection and ladder matching; they are not a substitute for manual review of poorly resolved, saturated, curved, or low-signal bands.

## DNA ladder calibration

A lane can be designated as a DNA ladder and assigned a built-in or custom set of fragment sizes ordered from largest to smallest.

The application detects candidate ladder peaks and pairs an ordered subset of observed migration positions with expected marker sizes. It fits a linear model between migration distance and `log10(fragment size in bp)`. The fitted relationship is then used to estimate fragment sizes for positions in other lane profiles.

The fit reports R² and is explicitly marked for review. Agarose migration is only approximately log-linear over a finite size range and depends on gel percentage, voltage, buffer, conformation, staining, run distance, and imaging conditions.

## Saturation and clipping

The application estimates the fraction of lane pixels near the clipping limits of the 8-bit grayscale domain. This is a warning indicator: saturated acquisition can destroy quantitative relationships even when the displayed bands remain visually distinct.

## Export

Exports record lane labels, positions, settings, calibration status, candidate peaks, and source metadata where available. Project JSON can include the source image as a data URL to support reopening the analysis.
