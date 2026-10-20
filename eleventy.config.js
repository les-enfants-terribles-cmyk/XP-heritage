// Configuration du site XP Héritage (Eleventy 3)
import path from "node:path";
import markdownIt from "markdown-it";
import Image from "@11ty/eleventy-img";
import exifr from "exifr";

const mdLib = markdownIt({ html: true, typographer: true });

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  // Tous les articles, du plus récent au plus ancien
  eleventyConfig.addCollection("articles", (api) =>
    api.getFilteredByGlob("src/articles/*.md").sort((a, b) => b.date - a.date)
  );

  // Date en français : « 20 octobre 2026 »
  eleventyConfig.addFilter("dateFr", (d) =>
    new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
  );
  eleventyConfig.addFilter("dateIso", (d) => new Date(d).toISOString().slice(0, 10));
  eleventyConfig.addFilter("parRubrique", (items, slug) => items.filter((i) => i.data.rubrique === slug));
  eleventyConfig.addFilter("rubrique", (slug, list) => list.find((r) => r.slug === slug) || { nom: slug, slug });
  eleventyConfig.addFilter("range", (n) => Array.from({ length: n }, (_, i) => i));

  // Niveau du blog : un niveau tous les 5 articles
  eleventyConfig.addFilter("niveau", (n) => {
    const parNiveau = 5;
    const niveau = Math.floor(n / parNiveau) + 1;
    const dansNiveau = n % parNiveau;
    return { niveau, dansNiveau, parNiveau, reste: parNiveau - dansNiveau, pct: Math.round((dansNiveau / parNiveau) * 100) };
  });

  eleventyConfig.setLibrary("md", mdLib);
  const md = (txt) => mdLib.render(txt.trim());

  // Les mots de l'enfant : {% gamer %}…{% endgamer %}
  eleventyConfig.addPairedShortcode("gamer", function (content) {
    const nom = this.ctx?.site?.gamer || "Le gamer";
    return `<div class="voix-gamer"><span class="avatar" aria-hidden="true">${nom.charAt(0)}</span><div class="bulle"><span class="sr-only">${nom} : </span>${md(content)}</div></div>`;
  });

  // Le mot du parent : {% papa %}…{% endpapa %}
  eleventyConfig.addPairedShortcode("papa", function (content) {
    const nom = this.ctx?.site?.parent || "Papa";
    return `<aside class="voix-papa"><p class="voix-papa-titre">Le mot de ${nom}</p>${md(content)}</aside>`;
  });

  // Une image : {% image "dessin-wukong.jpg", "Texte alternatif", "Légende facultative" %}
  // Le fichier d'origine se met dans src/photos/. Il n'est JAMAIS publié : le site publie
  // seulement des copies redimensionnées, sans les données cachées (GPS, date, appareil).
  eleventyConfig.addAsyncShortcode("image", async function (fichier, alt, legende) {
    if (!fichier) return "";
    if (!alt) throw new Error(`image « ${fichier} » : il manque le texte alternatif (2e paramètre).`);
    const origine = path.join("src/photos", fichier);
    // Garde-fou : le dépôt GitHub est public, donc le fichier d'origine y est visible.
    const gps = await exifr.gps(origine).catch(() => null);
    if (gps && gps.latitude !== undefined) {
      throw new Error(
        `La photo « ${fichier} » contient une position GPS et le dépôt est public. ` +
        `Supprime-la du dépôt (y compris son historique si besoin), retire la localisation sur le téléphone ` +
        `(Partager > Options > Localisation désactivée), puis dépose à nouveau la photo.`
      );
    }
    const metadata = await Image(origine, {
      widths: [480, 800, 1200],
      formats: ["webp", "jpeg"],
      outputDir: "_site/assets/img/",
      urlPath: eleventyConfig.getFilter("url")("/assets/img/"),
    });
    const html = Image.generateHTML(metadata, {
      alt,
      sizes: "(min-width: 48rem) 42rem, 100vw",
      loading: "lazy",
      decoding: "async",
    });
    const cap = legende ? `<figcaption>${legende}</figcaption>` : "";
    return `<figure class="photo">${html}${cap}</figure>`;
  });

  return {
    pathPrefix: "/xp-heritage/",
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
