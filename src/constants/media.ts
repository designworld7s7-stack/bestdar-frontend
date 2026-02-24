// ملف نقي تماماً بدون أي استيرادات للسيرفر أو العميل
export const MEDIA_CONFIG = {
  bucket: 'project-images',
  getGalleryFolder: (slug: string) => slug?.trim().toLowerCase().replace(/-+$/, '') || '',
  getFloorFolder: (slug: string) => {
    const cleanSlug = slug?.trim().toLowerCase().replace(/-+$/, '') || '';
    return cleanSlug ? `${cleanSlug}-floorplans` : '';
  },
};