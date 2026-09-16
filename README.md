# A Journey to Complexity — Boccaletti 60

Static one-page site for the workshop in honor of Stefano Boccaletti's 60th birthday
(Hangzhou, October 20–22, and Changsha, October 23–24, 2026). No build step: GitHub Pages serves `index.html` as is.

## Layout

```
index.html            page content (program, speakers, organizers)
assets/css/style.css  design
assets/js/site.js     hero animation + photo fallback
assets/img/site/      stefano.jpg, venue.jpg, og.jpg (social preview, 1200×630)
assets/img/speakers/  one photo per speaker
assets/img/organizers/ one photo per organizer
```

## Photos

Files are matched by slug: lowercase, hyphenated, ASCII, `.jpg`
(e.g. `dong-uk-hwang.jpg`, `sebastian-contreras.jpg`, `zhongliang-zhao.jpg`).
Square crops around 400×400 px are enough for the cards. If a file is missing,
the card shows the person's initials instead, so partial uploads are fine.

## Editing the program

Each talk is one `<div class="talk">` in `index.html`; sessions are
`<p class="session">`. Edit the text and commit — Pages redeploys in about a minute.

## Publishing

Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
