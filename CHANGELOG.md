# Changelog

## 1.0.10

- Declare `data/` in the package's own `flutter: assets:` section, so consuming
  apps bundle all tractates (~7 MB) automatically with no asset declarations of
  their own. Note this is all-or-nothing: apps depending on this version always
  bundle the full set.

## 1.0.9

- Publish to pub.dev as a static-asset package: the full Mishnah text as JSON
  files in `lib/data/`, one per tractate (63 tractates), keyed by perek and mishna.
- Tractate list sourced from Sefaria.
