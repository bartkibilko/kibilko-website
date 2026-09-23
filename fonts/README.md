# Fonts

Self-hosted, all licensed under the SIL Open Font License 1.1 (see `OFL.txt` in each folder):
Playfair Display, Source Serif 4, IBM Plex Sans, IBM Plex Mono.

Files are woff2 subsets converted from the upstream TTFs held in the profil repository
(`fonts/`): Basic Latin, Latin-1, Latin Extended-A/B, general punctuation, arrows, `€`.
All Polish diacritics (ąćęłńóśźż and capitals), „ ” — – … are present in every file,
including the italics. Regenerate with fonttools:

    pyftsubset X.ttf --unicodes="U+0020-007E,U+00A0-024F,U+2010-2027,U+2030-203A,U+20AC,U+2116,U+2190-2193,U+21A9,U+2212,U+2022" --flavor=woff2 --layout-features='*' --output-file=X.woff2
