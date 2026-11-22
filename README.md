# Minsun Cho — PhD Application Portfolio

A complete static website for GitHub Pages. It contains nine primary pages plus a co-authorship network page, shared responsive styling, lightweight custom SVG illustrations, and the supplied CV PDF. It uses no build tools, package installation, or external image services.

The page structure draws on the two reference portfolios: a concise research goal and profile, plus clear routes to current projects, publications, education, awards, and fellowships. The visual theme and all portfolio copy are tailored to Minsun's CV.

## Files

- `index.html` — About Me (home page)
- `research-projects.html`, `publications.html`, `collaborations.html`, `teaching.html`, `volunteer.html`, `awards.html`, `cv.html`, `me-time.html`, `contact.html` — separate pages
- `styles.css`, `script.js`, `collaborations.js` — shared styling and interactive co-authorship graph
- `assets/Minsun_Cho_CV.pdf` — embedded and downloadable CV
- `assets/images/` — original blue-white vector illustrations for each section

## Publish through GitHub (web browser only)

1. Download `github-portfolio.zip` and unzip it on your computer. Open the extracted `github-portfolio` folder. You should see `index.html`, the other `.html` pages, `styles.css`, `script.js`, `README.md`, and `assets/`. **Upload the contents of this folder, not the ZIP file and not the enclosing folder.**
2. Sign in at [github.com](https://github.com). Click the **+** in the top-right corner, then **New repository**.
3. Name the repository `phd-portfolio` (or another name you like). Set it to **Public**, leave **Add a README file** unchecked, and click **Create repository**.
4. On the new empty repository page, choose **uploading an existing file**. Drag in all the extracted files and folders: the ten `.html` files, `styles.css`, `script.js`, `collaborations.js`, `README.md`, and the complete `assets` folder. Keep the folder structure intact.
5. Scroll down to **Commit changes**. Keep the suggested message and click **Commit changes**.
6. Open the repository **Settings** tab. In the left sidebar, choose **Pages** under **Code and automation**.
7. Under **Build and deployment**, set **Source** to **Deploy from a branch**. Set **Branch** to `main` and folder to `/(root)`, then click **Save**.
8. Wait a few minutes, then refresh **Settings → Pages**. When GitHub shows the published address, open it. For a repository called `phd-portfolio`, the address is `https://YOUR-GITHUB-USERNAME.github.io/phd-portfolio/`.
9. Click each tab to make sure it opens. To make edits later, open a file in GitHub, click the pencil icon, edit, and **Commit changes**. For images or PDFs, use **Add file → Upload files** and preserve their paths.

### Optional personal-site URL

If you want the shorter address `https://YOUR-GITHUB-USERNAME.github.io/`, create the repository with the exact name `YOUR-GITHUB-USERNAME.github.io` instead of `phd-portfolio`; replace the placeholder with your actual GitHub username. Then follow the same upload and Pages steps.

## Before making the repository public

The CV PDF is included as requested and will be publicly viewable and downloadable. Review the PDF first: it contains the contact details in the original file, including a phone number. If you do not want those details public, make a redacted public CV PDF and replace `assets/Minsun_Cho_CV.pdf` before uploading.

The uploaded CV had no embedded photos, so the site uses original abstract SVG illustrations in the requested blue-white futuristic style rather than invented portraits or project screenshots. The “Me Time” page uses extracurricular interests named in the CV; replace its content if you want to share personal hobbies instead.

The collaboration graph is based on co-author lists in the CV's published papers, manuscript under review, and conference presentations. It shows names with the initials used in the CV; it does not infer affiliations or personal relationships. Publications and conference versions are counted as separate CV-listed outputs.
