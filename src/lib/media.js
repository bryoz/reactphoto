import path from 'node:path';
import fs from 'node:fs';

/**
 * Convert a relative media path to a URL slug.
 * e.g. "travel/new york city/katzs.jpg" → "travel/new-york-city/katzs"
 */
export function toSlug(relativePath) {
  return relativePath
    .replace(/\.[^.]+$/, '') // strip extension
    .replace(/\s+/g, '-')
    .toLowerCase();
}

/**
 * Given the result of import.meta.glob for media images,
 * build a structured list of images with metadata.
 */
export function buildImageList(imageModules) {
  return Object.entries(imageModules).map(([globPath, mod]) => {
    const relativePath = globPath.replace('/src/media/', '');
    const parts = relativePath.split('/');
    const fileName = parts.pop();
    const directory = parts.join('/');
    const name = fileName.replace(/\.[^.]+$/, '');
    const slug = toSlug(relativePath);

    return {
      globPath,
      relativePath,
      directory,
      name,
      slug,
      imageImport: mod.default,
    };
  });
}

/**
 * Derive all unique directories from a list of images.
 * Returns an array of { path, slug, name, depth } objects.
 */
export function getDirectoriesFromImages(images) {
  const dirSet = new Set();
  for (const img of images) {
    if (!img.directory) continue;
    const parts = img.directory.split('/');
    for (let i = 1; i <= parts.length; i++) {
      dirSet.add(parts.slice(0, i).join('/'));
    }
  }

  return [...dirSet].sort().map(dir => ({
    path: dir,
    slug: toSlug(dir),
    name: dir.split('/').pop(),
    depth: dir.split('/').length,
  }));
}

/**
 * Get top-level directories (depth 1).
 */
export function getTopLevelDirectories(images) {
  return getDirectoriesFromImages(images).filter(d => d.depth === 1);
}

/**
 * Get images belonging to a specific directory (not subdirectories).
 */
export function getImagesInDirectory(images, directory) {
  return images.filter(img => img.directory === directory);
}

/**
 * Get immediate child directories of a given directory.
 */
export function getChildDirectories(images, parentDir) {
  const allDirs = getDirectoriesFromImages(images);
  const parentDepth = parentDir ? parentDir.split('/').length : 0;

  return allDirs.filter(d => {
    if (parentDir) {
      return d.path.startsWith(parentDir + '/') && d.depth === parentDepth + 1;
    }
    return d.depth === 1;
  });
}

/**
 * Get the filesystem path for an image given its relative path.
 * Used for EXIF extraction.
 */
export function getMediaFilePath(relativePath) {
  return path.resolve(process.cwd(), 'src/media', relativePath);
}

/**
 * Get a representative thumbnail image for a directory.
 * Uses the first image found, searching subdirectories if needed.
 */
export function getThumbnailForDirectory(images, directory) {
  // First try direct images
  const direct = images.filter(img => img.directory === directory);
  if (direct.length > 0) return direct[0];

  // Then try subdirectory images
  const sub = images.filter(img => img.directory.startsWith(directory + '/'));
  if (sub.length > 0) return sub[0];

  return null;
}

/**
 * Sort images by file birthtime (newest first).
 */
export function sortByBirthtime(images) {
  return [...images].sort((a, b) => {
    try {
      const statA = fs.statSync(getMediaFilePath(a.relativePath));
      const statB = fs.statSync(getMediaFilePath(b.relativePath));
      return statB.birthtimeMs - statA.birthtimeMs;
    } catch {
      return 0;
    }
  });
}
