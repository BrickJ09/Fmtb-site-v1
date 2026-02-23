// products.js — generiert vom Admin-Panel
// 23.2.2026, 11:24:55

const PRODUCTS = [
  {
    "id": "fingerski-starter-set",
    "name": "BrickJ Fingerski kit",
    "category": "ski",
    "status": "sold-out",
    "priceUSD": 20,
    "priceCHF": 20,
    "priceEUR": 20,
    "stock": 10,
    "etsyLink": "https://www.ricardo.ch/de/a/fingerski-set-1310687260/",
    "etsyLabel": "Buy on Etsy",
    "description": "Finger-Ski Starter Set — only available in Switzerland.",
    "specs": [
      "Includes: 2x Fingerskis + 1x Kinkrail",
      "Color: Blue",
      "Material: PLA (3D-Printed)"
    ],
    "note": "Physical product — ships within Switzerland only.",
    "images": [
      "fingerski_starterkit/starterset_view_img.JPG",
      "fingerski_starterkit/starterset_on_kicker.JPEG",
      "fingerski_starterkit/fingerski_trick.JPEG",
      "fingerski_starterkit/blue_shaper_in_use.JPEG"
    ],
    "image": "COMING SOON.png",
    "link": "soon.html"
  },
  {
    "id": "fingerski-v2-blue",
    "name": "BrickJ Fingerski V2 — Blue",
    "category": "ski",
    "status": "available",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 15,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Printable finger ski files in blue. Comes included with the Starter Set.",
    "specs": [
      "Length: 9.5 cm",
      "Width: 2.8 cm",
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "blueski/blueskiV3_side.JPG",
      "blueski/blueskiis_frontleft.JPG",
      "blueski/blueskiis_top.JPG",
      "blueski/blueskiV3_taken_appart.JPG"
    ],
    "image": "C:\\dev\\Fmtb-site-v1\\fingerski_starterkit\\starterset_view_img.JPG",
    "link": "C:\\dev\\Fmtb-site-v1\\fingerski_starterset.html"
  },
  {
    "id": "fingerski-v2-pink",
    "name": "BrickJ Fingerski V2 — Pink",
    "category": "ski",
    "status": "available",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 15,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Printable finger ski files in pink.",
    "specs": [
      "Length: 9.5 cm",
      "Width: 2.8 cm",
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "pinkski/pinkskiis_front.JPG",
      "pinkski/pinkskiis_frontleft.JPG",
      "pinkski/pinkskiis_front_far_away.JPG"
    ]
  },
  {
    "id": "kinkrail-blue",
    "name": "Kinkrail — Blue",
    "category": "obstacle",
    "status": "available",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 8,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Ski rail with kink — blue. Comes included with the Starter Set.",
    "specs": [
      "Length: 17.8 cm",
      "Height: 4.9 – 7.3 cm",
      "Width: 5 cm",
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "bluekink/kinkrail_sideback.JPG",
      "bluekink/kinkrail_blue_sideback.JPG",
      "bluekink/kinkrail_blue_sideback2.JPG",
      "bluekink/kinkrail_blue_sidetop.JPG"
    ]
  },
  {
    "id": "sender",
    "name": "BrickJ_MTB Sender BJFR",
    "category": "mtb",
    "status": "sold-out",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Downhill Fingerbike — Sender style.",
    "specs": [
      "Scale: 1:10 approx.",
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "sender/Sendersidewide.JPEG",
      "sender/Senderside.JPEG",
      "sender/Senderfront.JPEG",
      "sender/Senderback.JPEG",
      "sender/Sendertop.JPEG"
    ]
  },
  {
    "id": "v10",
    "name": "BrickJ_MTB V10",
    "category": "mtb",
    "status": "sold-out",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Fingerbike — V10 downhill style.",
    "specs": [
      "Scale: 1:10 approx.",
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "v10/V10side1.JPEG",
      "v10/V10sideback.JPEG",
      "v10/V10front.JPEG"
    ]
  },
  {
    "id": "rollin",
    "name": "Roll-In",
    "category": "obstacle",
    "status": "available",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 5,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Roll-In ramp obstacle for your finger MTB setup.",
    "specs": [
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "rollin/Rollinwhole.JPEG",
      "rollin/Rollinside.JPEG",
      "rollin/Rollinsidewide.JPEG",
      "rollin/Rollinramp.JPEG"
    ]
  },
  {
    "id": "hardline-kicker",
    "name": "Hardline Step-Up Kicker",
    "category": "obstacle",
    "status": "available",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 5,
    "etsyLink": "",
    "etsyLabel": "Buy STL Files on Etsy",
    "description": "Hardline Step-Up Kicker — perfect for big tricks.",
    "specs": [
      "Files: STL + 3MF included"
    ],
    "note": "This product contains 3MF and STL files only — no physical product.",
    "images": [
      "mtbkicker/Kickersidetop.JPEG",
      "mtbkicker/Kickerback.JPEG",
      "mtbkicker/Kickerwhole.JPEG"
    ]
  },
  {
    "id": "session-9",
    "name": "BrickJ_MTB Session 9",
    "category": "mtb",
    "status": "soon",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Coming Soon",
    "description": "Coming soon.",
    "specs": [],
    "note": "",
    "images": [
      "COMING SOON.png"
    ]
  },
  {
    "id": "trickshot",
    "name": "BrickJ_MTB Trickshot",
    "category": "mtb",
    "status": "soon",
    "priceUSD": 2,
    "priceCHF": 1.8,
    "priceEUR": 1.9,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Coming Soon",
    "description": "Dirtjump Fingerbike — coming soon.",
    "specs": [],
    "note": "",
    "images": [
      "COMING SOON.png"
    ]
  },
  {
    "id": "starterkit-mtb",
    "name": "BrickJ_MTB Starterkit",
    "category": "kit",
    "status": "soon",
    "priceUSD": 4,
    "priceCHF": 3.6,
    "priceEUR": 3.8,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Coming Soon",
    "description": "Includes one Fingerbike and Hardline Kicker.",
    "specs": [],
    "note": "",
    "images": [
      "COMING SOON.png"
    ]
  },
  {
    "id": "advanced-kit",
    "name": "BrickJ_MTB Advanced-Kit",
    "category": "kit",
    "status": "soon",
    "priceUSD": 5,
    "priceCHF": 4.5,
    "priceEUR": 4.7,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Coming Soon",
    "description": "Includes one Fingerbike, Hardline Kicker and Roll-In.",
    "specs": [],
    "note": "",
    "images": [
      "COMING SOON.png"
    ]
  },
  {
    "id": "ultimate-kit",
    "name": "BrickJ_MTB Ultimate-Kit",
    "category": "kit",
    "status": "soon",
    "priceUSD": 9,
    "priceCHF": 8.1,
    "priceEUR": 8.5,
    "stock": 0,
    "etsyLink": "",
    "etsyLabel": "Coming Soon",
    "description": "Includes all Fingerbikes, Hardline Kicker and Roll-In.",
    "specs": [],
    "note": "",
    "images": [
      "COMING SOON.png"
    ]
  }
];

const LEGACY_MAP = {
  'V10.html':                   'v10',
  'Pink_bike_productpage.html': 'sender',
  'FingerskiV2_blue.html':      'fingerski-v2-blue',
  'FingerkiV2_pink.html':       'fingerski-v2-pink',
  'FingerskiV2_black.html':     'fingerski-v2-pink',
  'kinkrail_blue.html':         'kinkrail-blue',
  'kinkrail_pink.html':         'kinkrail-pink',
  'kinkrail_black.html':        'kinkrail-black',
  'fingerski_starterset.html':  'fingerski-starter-set',
  'mtb_rollin.html':            'rollin',
  'mtb_kicker.html':            'hardline-kicker',
  'Session-9.html':             'session-9',
};
