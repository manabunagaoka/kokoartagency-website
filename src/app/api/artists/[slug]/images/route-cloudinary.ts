import { NextRequest, NextResponse } from 'next/server';

// Base Cloudinary URL for your account
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/djp2leb00/image/upload`;

const ARTIST_IMAGE_DATA: Record<string, {
  images: string[];
  videos: Array<{ id: string; filename: string; title: string }>;
}> = {
  "anna-hrachovec": {
    images: [
      "1computercat_computer600.jpg", "2hanginthere_text600b.gif", "3kokoandpuff600.jpg", 
      "4knittinggnome600.gif", "5bud_river600.jpg", "6catsidedown_text600.gif", 
      "7catsideup_text600.gif", "8dogsnbooks_yellowframe600.jpg", "9sunspin600.gif", 
      "10HHA2025_600.gif", "11peeweedance600.gif", "12votevstrump600c.gif", 
      "13spongebob_mail.jpg", "14slimer.jpg", "15staypuft_frontwhite.jpg", 
      "16balls_postcard600.jpg", "17matryoshcats_arch600.jpg", "18toucans.png", 
      "19otto_likeness600.jpg", "20jumbognome_postcard600.jpg"
    ],
    videos: []
  },
  "chico-hayasaki": {
    images: [
      "1woman_アジザイ.jpg", "2woman_無題.jpg", "3woman_f01.jpg", "4woman_fourseasons.jpg", 
      "5WB_woman_blackdress.jpg", "6beauty01.jpeg", "7beauty03.jpeg", "8butterflyheels.jpg", 
      "9flower_cosmos.jpg", "10flowers02.jpg", "11flowers04.jpg", "12fashion_shoes01.jpeg", 
      "13fashion_shoes02.jpeg", "14fashion_shoes03.jpeg", "15Valentino.jpg", 
      "16salondeperfume_isetan.jpg", "17WB_woman_feerique.jpg", "18WB_woman_ootd.jpg", 
      "19woman_beauty.jpg", "20apartment.jpg"
    ],
    videos: []
  },
  "chris-long": {
    images: [
      "1Raincoat.jpg", "2Big_Bag.jpg", "3Bike.png", "4Blu_Tie.jpg", "5ChrisLong1.jpg", 
      "6ChrisLong5.jpg", "7NYT_Takeout.jpg", "8Pizza_Oven.jpg", "9Gyosas.jpg", "10Seize.png", 
      "11S_Glasses.png", "12Sun_Hat.jpg", "13Sleep.png", "14Smoothie.jpg", "15-1Coffee.png", 
      "15-2Coat_2.png", "16Window.png", "17Z_Air_Bnb.jpg", "18Beach.png", "19Shop.png", 
      "20Patterns_Chris_Long3.jpg"
    ],
    videos: []
  },
  "dominique-corbasson": {
    images: [
      "1unspecified-2.jpg", "2DC33-Nottingham-Castle-jpg.jpg", "3Summer_3107b.jpg", 
      "4Spring_3104b.jpg", "5corbasson-picadilly-busses-49-61cm.jpg", "6DC37-south-coast-of-England-jpg.jpg", 
      "7DC40.j-Notting-hill-jpg.jpg", "8bouquiniste-2tif.jpg", "9CORBASSON-Angel-Island-49x63.5cm.jpg", 
      "10DCorbasson16-Argile-street-.jpg", "11Petit-Prince-Palais-Royal.jpg", "12unspecified-3.jpg", 
      "13Big-Ben-couleurpg.jpg", "14Royal-blackhealth-of-London-42-59-cm.jpg", "15Skye-island-42-38-cm.jpg", 
      "16St-Abbs-38-44-cm.jpg", "17tower-bridge-51-68-cm.jpg", "18Autumn_3105.jpg", 
      "19place-vendome-1.jpg", "20Westminster-abbey-43-47-cm.jpg"
    ],
    videos: []
  },
  "eveline-tarunadjaja": {
    images: [
      "01_ET_Rose.jpg", "02_ET_Harlequin.jpg", "03_ET_Birdie.jpg", "04_ET_Hebe.jpg", 
      "05_ET_JackofSpade.jpg", "06_ET_sundown.jpg", "07_ET_dorothy.jpg", "08-1_ET_grocery.jpg", 
      "08-2_ET_magazine.jpg", "09_ET_Heathers.jpg", "10_ET_Thelma.jpg", "11_ET_BHA01.jpg", 
      "12_ETpattern_coral.jpg", "13_ET_Allium.jpg", "14.jpg", "15_ET_Scales.jpg", 
      "16_ET_sleepingbeauty.jpg", "17_ET_redriding.jpg", "18-1babyitscoldoutside_72.png", 
      "18_ET_harlequin.jpg", "19_ETpattern_roses.jpg"
    ],
    videos: []
  },
  "francois-avril": {
    images: [
      "1.Castel_1737-cor.jpeg", "2White_Cliff_II_1723-cor.jpeg", "03-1.jpeg", 
      "04_Evening-Francois-Avril-2013-c-Courtesy-Galerie-Huberty-Breyne.jpeg", 
      "05.Franaois-Avril-Lyrisme-I-Acrylique-sur-toile-2015-c-crCdit-Franaois-Avril.jpeg", 
      "06Grand-Park-Ave.jpeg", "07スクリーンショット-2020-02-03-11.22.10.jpeg", 
      "08スクリーンショット-2020-02-03-11.22.36.jpeg", "09StDenis-calques.jpeg", 
      "10Paris-Plages-2012-B1-1.jpeg", "11Paris-Plages-2012-C1.jpeg", "12Paris-Plages-2012-D1-1.jpeg", 
      "13Pike-and-Rose.jpeg", "14avril_villebleue.jpeg", "15Avril-29front.jpeg", 
      "16Blocks-of-flats21-700x456.jpeg", "17.RainyDayVIII_4910.jpeg", "18yellow-cabs.jpeg", 
      "19john-lobb-800madison-1.jpeg", "20_.jpeg"
    ],
    videos: []
  },
  "gisela-goppel": {
    images: [
      "gg_11.jpg", "gg_12.jpg", "gg_26.jpg", "gg_27.jpg", "gg_3.jpg", "gg_31.jpeg", 
      "gg_32.jpeg", "gg_33jpg.jpeg", "gg_37.jpg", "gg_38.jpg", "gg_39.jpeg", 
      "gg_40.jpg", "gg_5.jpg", "gg_6.jpg", "gg_beauty_2.jpg", "gg_beauty_9.jpg", 
      "gg_watercolor_2.jpg", "gg_watercolor_3.jpg", "gg_watercolor_5.jpg", "gg_watercolor_6.jpg"
    ],
    videos: []
  },
  "jeffrey-fulvimari": {
    images: [
      "1.jpeg", "2.jpeg", "3BALLOON.jpeg", "4IMG_1464_Cropped.jpg", "5IMG_1469_cropped.jpg", 
      "6FULVIMARI wedding1 (dragged).jpg", "7IMG_2928.jpg", "8Screen shot 2017-08-10 at 4.11.46 PM.jpg", 
      "9FASHION Spring-Summer 2020b.jpeg", "10unspecified-11.jpg", "11unspecified-10.jpg", 
      "12IMG_1763.jpg", "13IMG_6338.JPG", "14IMG_6340.JPG", "15TUNE IN TUNE OUT color2 12.jpg", 
      "16T-SHIRT-stripe5a.jpg", "17Screen shot 2018-03-07 at 6.43.28 PM.jpg", 
      "18Screen shot 2018-03-07 at 6.44.08 PM.jpg", "19Screen shot 2018-03-07 at 6.44.46 PM.jpg", 
      "20FUTURE BRIGHT2 1.jpeg"
    ],
    videos: []
  },
  "kana-kobayashi": {
    images: [
      "01_original.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpeg", "06_haruhata.jpg", 
      "07.jpg", "08.jpeg", "09.jpg", "10_シマウマとリズム.jpg", "11_cats.jpg", 
      "12.jpg", "13.jpg", "14.jpeg", "15.jpg", "16_cover_kadokawa_kana_k.jpg", 
      "17_misaki.png", "18.jpg", "19.jpeg", "20カケラ集め.jpg"
    ],
    videos: []
  },
  "kenzo-minami": {
    images: [
      "1_INFINITY-N.W.N.C.950H.D4KENZOMINAMI2012.jpg", "2_Kenzo_for_Veuve_Clicquot_pdf 3.jpg", 
      "3_999_NOCTURNAL.Crop2CWC_WEB©KENZOMINAMI20111.png", "4Mural_Kenzo_Minami1.jpg", 
      "5_Abstract_Kenzo9.jpg", "6Abstract_Kenzo2.jpg", "7-1_Kenzo_for_Veuve_Clicquot_pdf 5.jpg", 
      "7Collage_Kenzo4.jpg", "8Abstract_Kenzo6.jpg", "9Abstract_Kenzo1.jpg", 
      "10Digitizer.01.825pxlWIDEKENZOMINAMI2010_1270.jpeg", "11Abstract_Kenzo8.png", 
      "12Collage_Kenzo2.jpg", "13Collage_Kenzo3.jpg", "14Abstract_Kenzo3.jpg", 
      "15Collage_Kenzo1.jpg", "16Abstract_Kenzo4.jpg", "17Abstract_Kenzo7.jpg", 
      "18Abstract_Kenzo5.jpg", "19Abstract_Kenzo4.png"
    ],
    videos: []
  },
  "lisa-grue": {
    images: [
      "01-Lisa-grue-best-mom-high.jpg", "02-Lisa-grue-pattern-highres.jpg", 
      "03-lisa-grue-friendship-book-high.jpg", "04-summerwillbeback_•_Instagram_photos_and_videos 2.jpg", 
      "05-Lisa-grue-frame-high.jpeg", "06-Lisa-grue-women-high.jpg", "07-Lisa-grue-high.gif", 
      "08-Lisa-grue-faceshape-high.jpg", "09-Lisa-grue-fashion-high.jpeg", 
      "10-PEnJ-2gbax2PZ_aoSMDt5Wlu4UBl7DNHnq59FF3rINA,IgRqQb5Jb9z7dYsOJBFDM4BDySNPWpHxqWIqATHs_Qo.jpg", 
      "11-Lisa-grue-embroidery-1-high.jpeg", "12-Lisa-grue-fashion-higfh.jpg", 
      "13-Lisa-grue-styleguide-hugh.jpg", "14-Lisa-grue-faceshape-1-high.jpg", 
      "15-lisagrue-dukales-dream-high.jpg", "16-Lisa-grue-christmas-high.jpg", 
      "17-Lisa-grue-christmas-high.jpg", "18pattern-love-1.jpeg", "19-Lisa_416-86.jpeg", 
      "20-lisagrue-one-dream-high.jpeg"
    ],
    videos: []
  },
  "lulu": {
    images: [
      "1LULU1.jpg", "2LULU3.jpg", "3LULU7.jpg", "4LULU2.jpg", "5LULU4.jpg", "6LULU11.jpg", 
      "7IMG_2406.png", "8LULU13.jpg", "9LULU19.jpg", "10LULU25.jpg", "11LULU22.jpg", 
      "12LULU24.jpg", "13LULU6.jpg", "14LULU26.jpg", "15LULU23.jpg", "16LULU17.jpg", 
      "17LULU10.jpg", "18vitra-a.png", "19LULU18.jpg", "20LULU16.jpg"
    ],
    videos: []
  },
  "marcus-oakley": {
    images: [
      "Sealstrand_marcus oakleyjpg.jpg", "Sheep_marcus oakley.jpg", "The Wynd_marcus oakleyjpg.jpg", 
      "bedheadss_marcus_oakley_jpg.jpg", "birds_marcus oakleyjpg.jpg", "boat trip_marcus oakleyjpg.jpg", 
      "brick car_marcus_oakley_.jpg", "busker dog_marcus oakleyjpg.jpg", "caterpillar._marcus_oakley_jpg.jpg", 
      "cats_marcus_oakley_.jpg", "cup&spoon_marcus oakley.jpg", "elephant_marcus oakley.jpg", 
      "friends_marcus oakley.jpg", "ghost_marcus oakley.jpg", "girl&cat_OAKLEY.jpg", 
      "handplant_marcus oakley.jpg", "heads_marcus oakley.jpg", "livingroom_marcus oakley.jpg", 
      "pot plant_marcus oakley.jpg", "standing_marcus oakleystanding.jpg"
    ],
    videos: []
  },
  "masaki-ryo": {
    images: [
      "0-1Bouquet_1 .png", "0-2Bouquet_2.png", "1b-caspari-2-1.jpg", "2dog-mr-16.png", 
      "3dog-mr-18.png", "4_8-DI-MR-202212.jpeg", "5Cat&interior.png", "6-1Cat&DressingTable.png", 
      "6-2a-valentine-7.jpg", "7ShoesShop.png", "8-1Spring.png", "8-2Greenhouse.png", 
      "9JapanesePark.png", "10Christmas-5.jpg", "11-1a-dogs-16.jpg", "11-2cat-mr-3.png", 
      "12a-acce-1.jpg", "13a-acce-2.jpg", "14a-acce-10.jpg", "15Mansion.png"
    ],
    videos: []
  },
  "masayuki-ogisu": {
    images: [
      "4A46D11F-2DDD-4F3B-A8AF-6EFC073E7595.JPG", "8B71E1A4-4107-4777-8D07-4EEEEB0093B6.JPG", 
      "81E1921C-2C18-4ACD-8B1C-3041F1846B6E.JPG", "A7A95255-3C63-437B-812E-ACA3D890FFBB.JPG", 
      "FDA57A0E-3B9E-48E5-822F-DFDA639BB540.JPG", "IMG_2219.jpg", "IMG_3059.jpg", 
      "IMG_3217.jpg", "IMG_4344.jpg", "IMG_4894.jpg", "IMG_5063.jpg", "IMG_5108.jpg", 
      "IMG_9279.jpg", "スクリーンショット 2022-11-09 10.19.31.PNG", "名称未設定のアートワーク 3.JPG", 
      "名称未設定のアートワーク 4.JPG", "名称未設定のアートワーク 6.JPG", "名称未設定のアートワーク 7.JPG", 
      "名称未設定のアートワーク 9.JPG", "名称未設定のアートワーク.JPG"
    ],
    videos: []
  },
  "miho-s": {
    images: [
      "MihoS_ColorsOfAutum.jpg", "MihoS_Earth.jpg", "MihoS_EcoCaratWall_Design01.png", 
      "MihoS_EcoCaratWall_Design02.png", "MihoS_EcoCaratWall_Design03.jpg", "MihoS_HapiHapi_Winter.png", 
      "MihoS_ILoveDTM.png", "MihoS_ImCuterThanThatGirl.jpg", "MihoS_IngressDarsanaPrime_Image.jpg", 
      "MihoS_IngressRecursionPrime_Image.jpg", "MihoS_LSMB_CVket_poster.jpg", "MihoS_MissMissionDay_MAG18.jpg", 
      "MihoS_MissMissionDay_Taipei.png", "MihoS_TwinkleStar.jpg", "Miho_S.jpg", 
      "Organic_Miho_S1.jpg", "Organic_Miho_S2.png", "Organic_Miho_S3.png", 
      "Vector_Miho_S5.png", "Wreith_Of_Water.jpg"
    ],
    videos: []
  },
  "stina-persson": {
    images: [
      "1AOP_stinapersson.GIF", "2may.jpg", "3STELLA_Stinapersson.jpg", 
      "4NATURALHAIR_GREEN_STINAPERSSON copy 2.jpg", "5DENIM_stinapersson.png", 
      "6BLUE_Stinapersson.jpg", "7UNHCR_StinaPerssonjpg.jpg", "8BALLY_stinapersson.jpg", 
      "10Chantecaille_Stinapersson.jpg", "12negroni_stinapersson.jpg", "13OCEAN_stinapersson.jpg", 
      "14april_24.jpg", "15dots.jpg", "16LIPS_stinapersson.png", "17VOGUE_GERMANY_Stinapersson.jpg", 
      "18FLoral_Stinapersson.jpg", "19ROYAL_OPERA_stinapersson.gif", "20desert_LANDSCAPE_05.jpg"
    ],
    videos: [
      { id: "stina-persson-11fragrance_stinapersson", filename: "11fragrance_stinapersson.mp4", title: "11fragrance Stinapersson" },
      { id: "stina-persson-9Bloom_stinapersson", filename: "9Bloom_stinapersson.mov", title: "9Bloom Stinapersson" }
    ]
  },
  "superdeux": {
    images: [
      "1SUPERDEUX_New_KOKOArtAgency23.png", "2SUPERDEUX_New_KOKOArtAgency27.png", 
      "3Screen Shot 2022-02-17 at 10.19.54 AM.png", "4SUperdeux_KOKOArtAgency22.png", 
      "5deux_k7.jpg", "6SUPERDEUX_New_KOKOArtAgency2.png", "7SUPERDEUX_New_KOKOArtAgency3.png", 
      "8rolitodeux-1.jpg", "9Screen Shot 2021-05-20 at 9.49.43 AM.png", 
      "11 Shot 2021-05-20 at 9.50.19 AM.png", "12SUPERDEUX_New_KOKOArtAgency13.jpeg", 
      "13SUPERDEUX_New_KOKOArtAgency10.jpeg", "14Screen Shot 2021-09-09 at 11.44.21 AM.png", 
      "15Screen Shot 2021-09-09 at 11.44.28 AM.png", "16go_with_the_flow.PNG", 
      "17Screen Shot 2021-05-20 at 9.52.33 AM.png", "18SUPERDEUX_New_KOKOArtAgency6.png", 
      "19SUPERDEUX_New_KOKOArtAgency4.png", "20suspicious.png"
    ],
    videos: [
      { id: "superdeux-10introducing_yung_palmer_01_1", filename: "10introducing_yung_palmer_01_1.mp4", title: "10introducing Yung Palmer 01 1" }
    ]
  },
  "tina-berning": {
    images: [
      "1FLORENCE2.jpg", "2CATHAY_2_K3.jpg", "3RUSTY_3.jpg", "4hatshepsut Kopie.jpg", 
      "5MARIA_TOORPAKAI_1.jpg", "6JEANNE_BARET.jpg", "7NewlyCroppedHighRes_JEKYLL_COVER_SEPERATED 2 copy.jpg", 
      "8MERET_PAINT.gif", "9PILI_1.jpg", "10IsleMcElroy_600px.jpg", "11Day3.gif", 
      "12page345_FINE_WEB.jpg", "13Screen Shot 2022-03-03 at 11.56.57 AM.jpg", 
      "14Screenshot 2023-02-20 at 1.23.35 PM.png", "15TinaBurning.jpg", 
      "16Screenshot 2025-01-27 at 9.22.22 PM.png", "17SOPHIA_SMITH_TB_600px.jpg", 
      "18THOMAS_MANN_600px.jpg", "19unspecified copy.jpg", "20TARPE.jpg"
    ],
    videos: []
  },
  "tomoto": {
    images: [
      "1-Bird and Flowers.jpg", "2_WB_DXE_2025_tomoto_1.jpg", "3-Berry with cupcakes.jpg", 
      "4-Dango.jpg", "5-Hello March.png", "6-Sheep with Flowers.png", "7-Halloween Cat.jpg", 
      "8-Halloween Friends.jpg", "9-Screenshot 2025-08-12 at 4.27.09 PM.png", 
      "10-Honda_Calendar_11.jpg", "11-Honda_Calendar_05.jpg", "12-Kiehl's.jpg", 
      "13-Macaron.jpg", "14-tomoto_Donkey.jpg", "15-Watermelon.jpg", "16-Mudpuppy Puzzle.png", 
      "17-horoscope_all_tomoto.jpg", "18-TOMOTO.png", "19-WB_PrintBook_tomoto_4.jpg", 
      "20-Floral Heart.jpg"
    ],
    videos: []
  }
};

// Helper function to generate Cloudinary URL from filename
function generateCloudinaryUrl(artistSlug: string, filename: string): string {
  // Remove file extension for Cloudinary public_id
  const publicId = filename.replace(/\.[^/.]+$/, "");
  // Generate optimized Cloudinary URL
  return `${CLOUDINARY_BASE_URL}/c_limit,h_800,w_800,q_auto:good/koko-art-agency/artists/${artistSlug}/${publicId}`;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const artistData = ARTIST_IMAGE_DATA[slug];
    
    if (!artistData) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    const images = artistData.images.map((filename, idx) => ({
      id: `${slug}-${idx + 1}`,
      url: generateCloudinaryUrl(slug, filename),
      filename,
      title: filename.split('.')[0],
    }));

    const videos = artistData.videos.map((video) => ({
      id: video.id,
      url: `/videos/artists/${slug}/${video.filename}`, // Videos still served locally for now
      filename: video.filename,
      title: video.title,
      type: 'video'
    }));

    return NextResponse.json({
      images,
      videos,
      total: images.length + videos.length
    });
    
  } catch (error) {
    console.error('Error getting artist images:', error);
    return NextResponse.json({ error: 'Failed to get artist images' }, { status: 500 });
  }
}
