import { useState, useEffect } from 'react';

export interface SiteImages {
  // Brand
  headerLogoUrl: string;
  headerSloganText: string;

  // Hero Section
  heroSlideMilan: string;
  heroSlideField: string;
  heroSlideTraining: string;

  // Two Paths
  twoPathsConsultancy: string;
  twoPathsCourses: string;

  // SSGI Motion Image
  ssgiMotionImage: string;

  // Our Story
  ourStoryImage: string;

  // About Section
  aboutImage: string;

  // How It Works
  howItWorks1: string;
  howItWorks2: string;

  // Contact Section
  contactImage: string;
}

export const DEFAULT_SITE_IMAGES: SiteImages = {
  headerLogoUrl: '', // empty means use native SVG vector logo
  headerSloganText: 'Costruiamo Sistemi che trasformano la compliance in Valore aggiunto',

  heroSlideMilan: '/hero-milan.jpg',
  heroSlideField: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  heroSlideTraining: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&w=1200&q=80',

  twoPathsConsultancy: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1000&q=80',
  twoPathsCourses: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1000&q=80',

  // High-tech industrial automated facility for SSGI motion backdrop
  ssgiMotionImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',

  // Historic / industrial engineering evolution for Our Story
  ourStoryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',

  // Certified safety engineers on site (fixed working URL)
  aboutImage: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=1000&q=80',

  howItWorks1: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
  howItWorks2: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80',

  contactImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=800&q=80',
};

const STORAGE_KEY = 'em_safety_site_images_v1';

export function getStoredImages(): SiteImages {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SITE_IMAGES, ...parsed };
    }
  } catch (e) {
    console.warn('Failed to parse stored images:', e);
  }
  return DEFAULT_SITE_IMAGES;
}

export function saveStoredImages(images: SiteImages): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
    window.dispatchEvent(new CustomEvent('em_safety_images_updated', { detail: images }));
  } catch (e) {
    console.error('Failed to save images to localStorage:', e);
  }
}

export function resetStoredImages(): SiteImages {
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('em_safety_images_updated', { detail: DEFAULT_SITE_IMAGES }));
  } catch (e) {
    console.error('Failed to reset images:', e);
  }
  return DEFAULT_SITE_IMAGES;
}

export function useSiteImages(): [SiteImages, (newImages: SiteImages) => void, () => void] {
  const [images, setImages] = useState<SiteImages>(getStoredImages());

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<SiteImages>;
      if (customEvent.detail) {
        setImages(customEvent.detail);
      } else {
        setImages(getStoredImages());
      }
    };

    window.addEventListener('em_safety_images_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('em_safety_images_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const updateImages = (newImages: SiteImages) => {
    saveStoredImages(newImages);
    setImages(newImages);
  };

  const resetImages = () => {
    const defaults = resetStoredImages();
    setImages(defaults);
  };

  return [images, updateImages, resetImages];
}
