import sharp from 'sharp';
import { readdir, mkdir, writeFile, stat, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
const root = resolve(import.meta.dirname, '..');
const media = resolve(root, 'public/media');
const supplied = resolve(root, 'VIDEO/Video 2 Website hero background loop (8-10 sec)');
const input = resolve(supplied, (await readdir(supplied)).find(n => n.startsWith('Education_website_background_vid') && n.endsWith('.mp4')));
await mkdir(media, { recursive: true });
const run = (args) => new Promise((done, reject) => {
  const process = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-threads', '4', ...args], { stdio: 'inherit' });
  process.on('error', reject); process.on('exit', code => code ? reject(new Error(`ffmpeg ${code}`)) : done());
});
// Fold the opening half-second over the ending half-second. The output begins at
// source 0.5s and ends at source 0.5s, without an additional dip to black.
const grade = 'eq=contrast=1.065:brightness=-0.025:saturation=0.96:gamma=0.98,colorbalance=rs=0.008:bs=-0.006:rh=0.008:gh=0.005';
const filter = `[0:v]fps=30,${grade},format=yuv420p,split[a][b];[a]trim=start=0.5:end=10,setpts=PTS-STARTPTS[body];[b]trim=start=0:end=0.5,setpts=PTS-STARTPTS[head];[body][head]xfade=transition=fade:duration=0.5:offset=9,format=yuv420p[out]`;
await run(['-i', input, '-filter_complex_threads', '2', '-filter_complex', filter, '-map', '[out]', '-an', '-c:v', 'libx264', '-threads', '4', '-preset', 'fast', '-crf', '20', '-movflags', '+faststart', resolve(media, 'academy-1080.mp4')]);
const main = resolve(media, 'academy-1080.mp4');
await run(['-i', main, '-vf', 'scale=1280:720:flags=lanczos', '-an', '-c:v', 'libx264', '-threads', '4', '-preset', 'fast', '-crf', '28', '-maxrate', '1300k', '-bufsize', '2600k', '-movflags', '+faststart', resolve(media, 'academy-mobile.mp4')]);
await run(['-i', main, '-an', '-c:v', 'libvpx-vp9', '-threads', '4', '-b:v', '0', '-crf', '32', '-cpu-used', '4', '-row-mt', '1', resolve(media, 'academy-1080.webm')]);
await run(['-ss', '3', '-i', main, '-frames:v', '1', resolve(media, 'academy-poster.png')]);
for (const width of [768, 1600]) {
  await sharp(resolve(media, 'academy-poster.png')).resize(width).webp({ quality: 86 }).toFile(resolve(media, `academy-poster-${width}.webp`));
  await sharp(resolve(media, 'academy-poster.png')).resize(width).avif({ quality: 60 }).toFile(resolve(media, `academy-poster-${width}.avif`));
}
const story1 = resolve(root, 'source-assets/hero 1/ezgif-frame-025.png');
await sharp(story1).resize(1600).webp({ quality: 86 }).toFile(resolve(media, 'story-1.webp'));
let story2;
for (const folder of ['source-assets/hero 2', 'source-assets/hero 2 frames']) {
  try { const names = (await readdir(resolve(root, folder))).filter(n => /\.(png|jpe?g)$/i.test(n)).sort(); if (names.length) { story2 = resolve(root, folder, names[Math.floor(names.length / 2)]); break; } } catch {}
}
if (story2) await sharp(story2).resize(1600).webp({ quality: 86 }).toFile(resolve(media, 'story-2.webp'));
else { story2 = input + ' (frame at source ~3.5 seconds)'; await sharp(resolve(media, 'academy-poster.png')).resize(1600).webp({ quality: 86 }).toFile(resolve(media, 'story-2.webp')); }
const certDir = resolve(root, 'source-assets/sample cirtificates and videos');
const certificates = [
  { file: 'WhatsApp Image 2026-10-10 at 16.33.57 (1).jpeg', crop: { left: 0, top: 100, width: 720, height: 1000 }, alt: 'Digital MOD Academy rolled completion certificates with the academy crest' },
  { file: 'WhatsApp Image 2026-10-10 at 16.33.58 (2).jpeg', crop: { left: 0, top: 0, width: 720, height: 1040 }, alt: 'Gold and navy completion certificate rolls displaying Digital MOD Academy branding' },
  { file: 'WhatsApp Image 2026-10-10 at 16.34.00.jpeg', alt: 'A rolled Digital MOD Academy certificate of completion' },
];
for (const [i, cert] of certificates.entries()) {
  let pipeline = sharp(resolve(certDir, cert.file)).rotate();
  if (cert.crop) pipeline = pipeline.extract(cert.crop);
  await pipeline.resize({ width: 1000, withoutEnlargement: true }).modulate({ brightness: 1.055, saturation: 0.98 }).webp({ quality: 87 }).toFile(resolve(media, `certificate-${i + 1}.webp`));
}
const names = ['academy-1080.mp4', 'academy-mobile.mp4', 'academy-1080.webm', ...[768, 1600].flatMap(w => [`academy-poster-${w}.webp`, `academy-poster-${w}.avif`]), 'story-1.webp', 'story-2.webp', 'certificate-1.webp', 'certificate-2.webp', 'certificate-3.webp'];
const assets = await Promise.all(names.map(async name => ({ name, bytes: (await stat(resolve(media, name))).size })));
if (assets.find(a => a.name === 'academy-mobile.mp4').bytes >= 2_000_000) throw new Error('Mobile video exceeds 2 MB budget');
const manifest = { source: input, durationSeconds: 9.5, fps: 30, processing: 'Original supplied video, subtle FFmpeg color grade and 0.5-second boundary crossfade. No AI upscaling.', storySources: [story1, story2], certificates: certificates.map((c, i) => ({ ...c, output: `certificate-${i + 1}.webp`, note: 'Selected certificate rolls expose institutional branding, not recipient names. Not independent verification of accreditation.' })), assets };
await writeFile(resolve(media, 'academy-manifest.json'), JSON.stringify(manifest, null, 2));
console.log(JSON.stringify(manifest, null, 2));
