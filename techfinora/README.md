# Techfinora

Marketing website for Techfinora, an IT company (software, cloud, security, AI). Built on the
[Tailone](https://themewagon.com/themes/tailone/) Tailwind CSS one-page template (MIT).

```bash
npm install
npm start          # dev server on http://localhost:3100
npm run build      # minified assets into dist/
```

Content lives in `index.html`. After changing Tailwind classes, regenerate CSS with
`npx tailwindcss -c tailwind.config.js -i src/tailwind/tailwindcss.css -o src/css/style.css`
and then `npm run build`.
