# Digitalmod Academy

The current Digitalmod Academy website is a responsive static website written in plain HTML, CSS and vanilla JavaScript. It includes a gold glass interface, a video hero, 30 proposed online certificate courses, a WhatsApp enrolment enquiry form, light/dark/system themes, replayable scroll motion and a custom 404 page.

- **Website:** [muhris-aj.github.io/dma](https://muhris-aj.github.io/dma/)
- **Published files and editing guide:** [docs/](docs/README.md)

## Publish

GitHub Pages serves the docs folder on the main branch. No build or package installation is needed. Changes publish automatically after pushing to main.

In repository **Settings > Pages**, use **Deploy from a branch**, **main**, **/docs**. The included .nojekyll file makes Pages serve the finished files directly.

## Preview locally

The files use the project prefix /dma/. Map /dma/ to the docs folder in your HTTP server, or make a temporary copy of docs named dma inside a separate preview directory, run python -m http.server 8000 from that parent directory, and open http://localhost:8000/dma/. Opening HTML through file:// is unsupported.

## Content

Course fees and durations are proposed planning figures. Confirm the curriculum, delivery, final fees and certificate recognition before advertising confirmed intakes. The form prepares a WhatsApp enquiry for the visitor to review and send; it does not process payments or store confirmed registrations.

Website developed by **A.J. Muhris** - [WhatsApp +94 77 555 1712](https://wa.me/94775551712).

## Earlier development files

The root src, scripts, package.json and framework configuration are preserved from an earlier React/3D prototype. They are not used by the current GitHub Pages deployment. Existing technical guides in docs may describe that prototype; use docs/README.md for the current website.
