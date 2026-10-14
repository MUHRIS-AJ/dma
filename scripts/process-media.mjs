import sharp from 'sharp';
import { mkdir, stat, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dir = resolve(root, 'public/media');
const source = resolve(dir, 'hero-source.png');
await mkdir(dir, { recursive: true });
const metadata = await sharp(source).metadata();
for (const width of [768, 1600, 2400]) {
  await sharp(source).resize({ width }).avif({ quality: 58, effort: 5 }).toFile(resolve(dir, `hero-${width}.avif`));
  await sharp(source).resize({ width }).webp({ quality: 84, effort: 5 }).toFile(resolve(dir, `hero-${width}.webp`));
}
await sharp(source).resize(3840, 2160, { fit: 'cover' }).png().toFile(resolve(dir, 'hero-master-4k.png'));
function ffmpeg(args) {
  return new Promise((resolvePromise, reject) => {
    const p = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { cwd: root, stdio: 'inherit' });
    p.on('error', reject);
    p.on('exit', code => code === 0 ? resolvePromise() : reject(new Error(`ffmpeg exited ${code}`)));
  });
}
// One periodic cosine cycle: equal position and zero velocity at both loop boundaries.
// This is a motion treatment of a still, not native moving 3D footage or AI upscaling.
const motion = "scale=2400:-2,zoompan=z='1.015+0.015*(1-cos(2*PI*on/192))':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=192:s=1920x1080:fps=24,format=yuv420p";
await ffmpeg(['-i', source, '-vf', motion, '-frames:v', '192', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '22', '-movflags', '+faststart', resolve(dir, 'hero-1080.mp4')]);
const input = resolve(dir, 'hero-1080.mp4');
await ffmpeg(['-i', input, '-vf', 'scale=1280:720', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '27', '-maxrate', '1800k', '-bufsize', '3600k', '-movflags', '+faststart', resolve(dir, 'hero-mobile.mp4')]);
await ffmpeg(['-i', input, '-an', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-deadline', 'good', '-cpu-used', '4', '-row-mt', '1', resolve(dir, 'hero-1080.webm')]);
await ffmpeg(['-i', input, '-an', '-c:v', 'libx265', '-preset', 'fast', '-crf', '26', '-tag:v', 'hvc1', '-x265-params', 'log-level=error:pools=4', '-movflags', '+faststart', resolve(dir, 'hero-1080-h265.mp4')]);
await ffmpeg(['-i', input, '-vf', 'scale=3840:2160:flags=lanczos', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '23', '-movflags', '+faststart', resolve(dir, 'hero-4k-h264.mp4')]);
await ffmpeg(['-i', input, '-vf', 'scale=3840:2160:flags=lanczos', '-an', '-c:v', 'libx265', '-preset', 'ultrafast', '-crf', '26', '-tag:v', 'hvc1', '-x265-params', 'log-level=error:pools=4', '-movflags', '+faststart', resolve(dir, 'hero-4k-h265.mp4')]);
const names = ['hero-768.avif', 'hero-1600.avif', 'hero-2400.avif', 'hero-768.webp', 'hero-1600.webp', 'hero-2400.webp', 'hero-mobile.mp4', 'hero-1080.mp4', 'hero-1080.webm', 'hero-1080-h265.mp4', 'hero-4k-h264.mp4', 'hero-4k-h265.mp4'];
const assets = await Promise.all(names.map(async name => ({ name, bytes: (await stat(resolve(dir, name))).size })));
if (assets.find(x => x.name === 'hero-mobile.mp4').bytes >= 4_000_000) throw new Error('Mobile video exceeds the 4 MB budget');
await writeFile(resolve(dir, 'manifest.json'), JSON.stringify({ source: { width: metadata.width, height: metadata.height }, durationSeconds: 8, fps: 24, note: 'Still-image camera animation. 4K files are conventional Lanczos enlargement, not native 4K detail or AI super-resolution.', assets }, null, 2));
console.log(JSON.stringify(assets, null, 2));
