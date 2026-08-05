// ==========================================================
// CENTRALIZED MEDIA ASSETS & CONFIGURATION
//
// 📖 HOW TO EDIT/UPDATE IMAGES IN THE FUTURE:
// 1. To replace an existing local image file:
//    - Place your new image file in `/public` or `/src/assets/images/`.
//    - Update the `import` statement below or point directly to URL string (e.g., 'https://...').
// 2. To change the logo:
//    - Replace `/public/logo.png` or update `SITE_LOGO` variable.
// ==========================================================

// 1. Site Logo & Brand Assets
export const SITE_LOGO = '/logo.png'; // Path to logo file in /public directory

// 2. Hero Background Image (Scenic Labuan Bajo coastline)
import scooterHeroBgLocal from '../assets/images/scooter_hero_1785763110302.jpg';
export const HERO_IMAGE = scooterHeroBgLocal;

// 3. Scooter Fleet Models (Local image assets)
import beatImg from '../assets/images/scooter_beat_1785763028729.jpg';
import scoopyImg from '../assets/images/scooter_scoopy_1785763049796.jpg';
import nmaxImg from '../assets/images/scooter_nmax_1785763064245.jpg';

export const SCOOTER_IMAGES = {
  beat: beatImg,
  scoopy: scoopyImg,
  nmax: nmaxImg,
};

// 4. Private Car Charter Cross-Promotion Image
import tourCarImg from '../assets/images/tourcar.jpg';
export const CAR_CHARTER_BANNER = tourCarImg;

// 5. Speedboat Daytour Banner Image
import speedboatImg from '../assets/images/speedboat.jpg';
export const SPEEDBOAT_BANNER = speedboatImg;

// 5. Popular Scooter Spot / Destination Addon Images
import goloMoriImg from '../assets/images/golomori.jpg';
import guaRangkoImg from '../assets/images/guarangko.jpg';
import bukitCintaImg from '../assets/images/3bukitcinta.jpg';
import waereboImg from '../assets/images/waerebo.jpg';

export const RIDING_DESTINATIONS = {
  goloMori: goloMoriImg,
  guaRangko: guaRangkoImg,
  bukitCinta: bukitCintaImg,
  waeRebo: waereboImg,
};

