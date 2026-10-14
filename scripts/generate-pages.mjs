import fs from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';
import sharp from 'sharp';

// Run after Vite. This emits real static routes for crawlers, previews and JS-disabled visitors.
const root = process.cwd();
const output = path.join(root, 'dist');
const site = (process.env.SITE_URL || process.env.VITE_SITE_URL || 'https://digitalmodacademy.example').replace(/\/$/, '');
if (!/^https?:\/\//.test(site)) throw new Error('SITE_URL must be an absolute HTTP(S) URL.');
const source = await fs.readFile(path.join(root, 'src/premium/courses.ts'), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { courses } = await import(`data:text/javascript;base64,${Buffer.from(compiled).toString('base64')}`);
const faqSource = await fs.readFile(path.join(root, 'src/premium/faqs.ts'), 'utf8');
const faqCompiled = ts.transpileModule(faqSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { faqs } = await import(`data:text/javascript;base64,${Buffer.from(faqCompiled).toString('base64')}`);
const catalogSource = await fs.readFile(path.join(root, 'src/premium/catalog.ts'), 'utf8');
const catalogCompiled = ts.transpileModule(catalogSource, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText;
const { onlineCourses, departmentCourses } = await import(`data:text/javascript;base64,${Buffer.from(catalogCompiled).toString('base64')}`);
const template = await fs.readFile(path.join(output, 'index.html'), 'utf8');
const escape = (value) => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const json = value => JSON.stringify(value).replace(/</g, '\\u003c');
const organization = { '@type': 'EducationalOrganization', '@id': `${site}/#organization`, name: 'Digital MOD Academy', legalName: 'Digitalmod Academy (Pvt) Ltd', telephone: '+94784450088', url: `${site}/`, logo: `${site}/logo.png` };
const footer = `<footer><p>Digitalmod Academy (Pvt) Ltd · <a href="tel:+94784450088">+94 78 445 0088</a></p><p>Website developed by <a href="tel:0775551712">A.J.MUHRIS</a></p></footer>`;

function page({ title, description, canonical, og, content, schemas }) {
  let cleaned = template
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\b[^>]*(?:name=["'](?:description|keywords|twitter:[^"']*)["']|property=["']og:[^"']*["'])[^>]*>/gi, '')
    .replace(/<link\b[^>]*rel=["']canonical["'][^>]*>/gi, '')
    .replace(/<script\b[^>]*type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi, '');
  if (canonical !== `${site}/`) cleaned = cleaned.replace(/<link\b(?=[^>]*rel=["']preload["'])(?=[^>]*(?:href|imagesrcset)=["'][^"']*hero)[^>]*>/gi, '');
  const head = `<title>${escape(title)}</title>
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${escape(canonical)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Digital MOD Academy" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(site + og)}" />
    <meta property="og:image:width" content="1200" /><meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(description)}" />
    <meta name="twitter:image" content="${escape(site + og)}" />
    <script type="application/ld+json">${json({'@context':'https://schema.org','@graph':[organization,...schemas]})}</script>`;
  // Replace the entire body, preserving Vite entry scripts. Root content can contain nested divs.
  // This also makes repeated runs safe when the input already contains generated HTML.
  const body = cleaned.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '';
  const scripts = (body.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || []).join('\n');
  return cleaned.replace('</head>', `${head}</head>`).replace(/(<body\b[^>]*>)[\s\S]*?<\/body>/i, `$1<div id="root">${content}</div>${scripts}</body>`);
}

await fs.mkdir(path.join(output, 'og'), { recursive: true });
async function ogImage(slug, title, label) {
  const words = title.split(' '); const lines = [''];
  for (const word of words) { const last = lines.length - 1; if ((lines[last] + word).length > 22) lines.push(word + ' '); else lines[last] += word + ' '; }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g"><stop stop-color="#f5d547" stop-opacity=".35"/><stop offset="1" stop-color="#f5d547" stop-opacity="0"/></radialGradient></defs><rect width="1200" height="630" fill="#090a09"/><ellipse cx="1000" cy="220" rx="470" ry="440" fill="url(#g)"/><rect x="55" y="55" width="1090" height="520" rx="32" fill="#ffffff" fill-opacity=".025" stroke="#ffffff" stroke-opacity=".18"/><text x="96" y="124" fill="#f5d547" font-size="23" font-family="Arial" letter-spacing="4">DIGITAL MOD ACADEMY</text><text x="96" y="202" fill="#c2c5bb" font-size="20" font-family="Arial" letter-spacing="3">${escape(label.toUpperCase())}</text>${lines.map((line,i)=>`<text x="92" y="${300+i*77}" fill="#f5f5ed" font-size="66" font-weight="700" font-family="Arial">${escape(line.trim())}</text>`).join('')}<text x="96" y="527" fill="#c2c5bb" font-size="22" font-family="Arial">Learn Skills. Build Your Future.</text><circle cx="1051" cy="511" r="30" fill="#f5d547"/><path d="M1038 524l25-25m-25 0h25v25" stroke="#090a09" stroke-width="3" fill="none"/></svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(output, 'og', `${slug}.png`));
}

const urls = [`${site}/`];
for (const course of courses) {
  const canonical = `${site}/courses/${course.slug}/`;
  const directory = path.join(output, 'courses', course.slug);
  await fs.mkdir(directory, { recursive: true });
  await ogImage(course.slug, course.shortTitle, course.category + ' pathway');
  const content = `<header><a href="/">Digital MOD Academy</a></header><main><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/#courses">Courses</a> / ${escape(course.shortTitle)}</nav><h1>${escape(course.title)}</h1><p>${escape(course.description)}</p><h2>What will you create?</h2><p>${escape(course.outcome)}</p><h2>Your learning modules</h2><ol>${course.modules.map(m=>`<li>${escape(m)}</li>`).join('')}</ol><h2>Frequently asked questions</h2>${course.faq.map(f=>`<section><h3>${escape(f.question)}</h3><p>${escape(f.answer)}</p></section>`).join('')}<p>Curriculum is indicative. Confirm current intake, fees and teaching format with the academy.</p><a href="/#enroll">Enquire about ${escape(course.shortTitle)}</a></main>${footer}`;
  const schemas = [
    { '@type':'Course', '@id':canonical+'#course', name:course.title, description:course.description, url:canonical, provider:{'@id':organization['@id']}, teaches:course.modules },
    { '@type':'FAQPage', mainEntity:course.faq.map(f=>({'@type':'Question', name:f.question, acceptedAnswer:{'@type':'Answer',text:f.answer}})) },
    { '@type':'BreadcrumbList', itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${site}/`},{'@type':'ListItem',position:2,name:course.shortTitle,item:canonical}] }
  ];
  await fs.writeFile(path.join(directory,'index.html'), page({title:`${course.shortTitle} Course | Digital MOD Academy`,description:course.description,canonical,og:`/og/${course.slug}.png`,content,schemas}));
  urls.push(canonical);
}
await ogImage('academy', 'Build Your Future.', 'Learn Skills.');
const catalogArticles = (collection) => collection.map(course => `<article><h3>${escape(course.title)}</h3><p>${escape(course.category)}</p>${course.mode === 'online' ? `<p>${escape(course.duration)} · Fully online (proposed) · Proposed course fee: ${escape(course.fee)}</p>` : `<p>Proposed department fee: ${escape(course.fee)}. Confirm the fee for this course, duration, classroom or online arrangements and availability.</p>`}<a href="https://wa.me/94784450088?text=${encodeURIComponent(`Hello Digital MOD Academy! I am interested in ${course.enrollmentLabel}. Please confirm availability, curriculum, delivery and certificate recognition.`)}">Enquire about ${escape(course.title)}</a></article>`).join('');
const homeContent = `<header><a href="/">Digital MOD Academy</a><p>Learn Skills. Build Your Future.</p></header><main><h1>Learn Skills. Build Your Future.</h1><p>Explore the proposed course collection at Digitalmod Academy (Pvt) Ltd: 30 online certificates, 35 departmental IT courses and seven specialist digital pathways.</p><section id="academy-catalog"><h2>Explore the academy collection</h2><p>Fees, durations and delivery arrangements are proposed for planning. Confirm curriculum, availability and certificate recognition with the academy before enrolling. An enquiry is not a confirmed admission.</p><h3>30 online certificate courses</h3>${catalogArticles(onlineCourses)}<h3>35 departmental IT courses</h3>${catalogArticles(departmentCourses)}</section><section id="courses"><h2>Seven specialist digital pathways</h2>${courses.map(c=>`<article><h3><a href="/courses/${c.slug}/">${escape(c.title)}</a></h3><p>${escape(c.description)}</p></article>`).join('')}</section><section id="faq"><h2>Frequently asked questions</h2>${faqs.map(f=>`<section><h3>${escape(f.question)}</h3><p>${escape(f.answer)}</p></section>`).join('')}</section><section id="enroll"><h2>Start with a conversation</h2><p>Ask the academy about current intakes, learning formats and fees. WhatsApp opens a draft for you to review and send.</p><a href="https://wa.me/94784450088">Enquire on WhatsApp: +94 78 445 0088</a></section></main>${footer}`;
await fs.writeFile(path.join(output,'index.html'),page({title:'Digital MOD Academy | Learn Skills. Build Your Future.',description:'Explore 30 proposed online certificates and 35 IT courses at Digitalmod Academy. Compare proposed fees, discover learning pathways and enquire on WhatsApp.',canonical:`${site}/`,og:'/og/academy.png',content:homeContent,schemas:[{'@type':'FAQPage',mainEntity:faqs.map(f=>({'@type':'Question',name:f.question,acceptedAnswer:{'@type':'Answer',text:f.answer}}))}]}));
await fs.writeFile(path.join(output,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${escape(url)}</loc></url>`).join('')}</urlset>`);
await fs.writeFile(path.join(output,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
console.log(`Generated ${urls.length} static pages, 8 PNG social images, sitemap.xml and robots.txt for ${site}`);
if (site.includes('.example')) console.warn('Production gate: configure SITE_URL / VITE_SITE_URL with the verified public domain before deploying.');
