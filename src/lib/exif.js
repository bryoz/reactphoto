import exifr from 'exifr';

/**
 * Extract EXIF/IPTC metadata from an image file.
 * Returns null if EXIF data can't be read.
 */
export async function getExifData(filePath) {
  try {
    const data = await exifr.parse(filePath, {
      ifd0: { pick: ['Make', 'Model', 'ImageDescription'] },
      exif: { pick: ['ExposureTime', 'ApertureValue', 'ISO', 'FocalLength', 'Flash', 'LensMake', 'LensModel', 'DateTimeOriginal'] },
      iptc: { pick: ['Caption'] },
      mergeOutput: false,
    });

    if (!data) return null;

    const ifd0 = data.ifd0 || {};
    const exif = data.exif || {};
    const iptc = data.iptc || {};

    // Format shutter speed
    let shutter = null;
    if (exif.ExposureTime != null) {
      if (exif.ExposureTime < 1) {
        shutter = '1/' + Math.round(1 / exif.ExposureTime);
      } else {
        shutter = String(exif.ExposureTime);
      }
    }

    // Format date
    let dateTaken = null;
    if (exif.DateTimeOriginal) {
      const d = new Date(exif.DateTimeOriginal);
      if (!isNaN(d)) {
        dateTaken = d.toUTCString().replace(' GMT', '');
      }
    }

    return {
      camera: ifd0.Make && ifd0.Model ? `${ifd0.Make} ${ifd0.Model}` : null,
      lensMake: exif.LensMake || null,
      lensModel: exif.LensModel || null,
      focalLength: exif.FocalLength || null,
      shutter,
      aperture: exif.ApertureValue != null ? exif.ApertureValue.toFixed(2) : null,
      iso: exif.ISO || null,
      flash: exif.Flash != null ? (exif.Flash > 0 ? 'On' : 'Off') : null,
      description: ifd0.ImageDescription || iptc.Caption || null,
      dateTaken,
      isAppleLens: exif.LensMake === 'Apple',
    };
  } catch {
    return null;
  }
}
