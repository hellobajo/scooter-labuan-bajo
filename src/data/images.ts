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
import fazzioImg from '../assets/images/FAZZIO.jpg';
import pcxImg from '../assets/images/PCX 150.jpg';
import vario150Img from '../assets/images/VARIO 150.jpg';
import vario160Img from '../assets/images/VARIO 160.jpg';

export const SCOOTER_IMAGES = {
  beat: beatImg,
  scoopy: scoopyImg,
  nmax: nmaxImg,
  fazzio: fazzioImg,
  pcx: pcxImg,
  vario150: vario150Img,
  vario160: vario160Img,  
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

// 6. Real-World Delivery & Happy Customers Gallery (Handover Photos)
// 💡 HOW TO REPLACE WITH YOUR OWN MANUAL JPG PHOTOS:
// 1. Copy your JPG image files into `/src/assets/images/` (e.g. `handover_1.jpg`, `handover_2.jpg`, etc.)
// 2. Import them at the top or replace the image assets below.
import handover1Img from '../assets/images/hand1.jpg';
import handover2Img from '../assets/images/hand2.jpg';
import handover3Img from '../assets/images/hand3.jpg';
import handover4Img from '../assets/images/hand4.jpg';
import handover5Img from '../assets/images/hand5.jpg';
import handover6Img from '../assets/images/hand6.jpg';

export const HANDOVER_GALLERY_IMAGES = [
  {
    id: 1,
    url: handover1Img,
    caption: {
      EN: 'Airport (LBJ) Instant Delivery',
      ZH: '科莫多机场 (LBJ) 快速交车',
      ID: 'Pengantaran Bandara Komodo (LBJ)',
    },
    location: 'Komodo International Airport (LBJ)'
  },
  {
    id: 2,
    url: handover2Img,
    caption: {
      EN: 'Luxury Villa Handover',
      ZH: '豪华别墅送车上门',
      ID: 'Pengantaran Villa & Resort',
    },
    location: 'Ayana Komodo Resort'
  },
  {
    id: 3,
    url: handover3Img,
    caption: {
      EN: 'Happy Sunset Roadtrip',
      ZH: '满意的日落骑行客户',
      ID: 'Pelanggan Happy Explore Sunset',
    },
    location: 'Sylvia Hill, Labuan Bajo'
  },
  {
    id: 4,
    url: handover4Img,
    caption: {
      EN: 'Clean & Well-Maintained Fleet',
      ZH: '保养良好的干净车队',
      ID: 'Armada Bersih & Terawat',
    },
    location: 'HelloBajo Garage'
  },
  {
    id: 5,
    url: handover5Img,
    caption: {
      EN: 'Hotel Lobby Delivery',
      ZH: '酒店大堂直接交车',
      ID: 'Pengantaran Lobi Hotel',
    },
    location: 'Meruorah Labuan Bajo'
  },
  {
    id: 6,
    url: handover6Img,
    caption: {
      EN: 'Waecicu Coastal Exploring',
      ZH: 'Waecicu 沿海风景骑行',
      ID: 'Eksplorasi Pantai Waecicu',
    },
    location: 'Waecicu Beach Area'
  }
];

