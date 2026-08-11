// Fichier : shared/constants/provinces.js
// Rôle   : Liste des 26 provinces de la RDC avec leurs villes principales
//          et les coordonnées GPS des chefs-lieux (pour centrage carte par défaut)

/**
 * Structure d'une province :
 * - name : nom officiel de la province
 * - capital : chef-lieu
 * - coords : [latitude, longitude] du chef-lieu
 * - cities : liste des villes principales (incluant le chef-lieu)
 */
export const PROVINCES = [
  {
    name: 'Bas-Uele',
    capital: 'Buta',
    coords: [2.7833, 24.7333],
    cities: ['Buta', 'Aketi', 'Ango', 'Bambesa', 'Poko'],
  },
  {
    name: 'Équateur',
    capital: 'Mbandaka',
    coords: [0.0504, 18.2603],
    cities: ['Mbandaka', 'Bikoro', 'Bomongo', 'Ingende', 'Basankusu'],
  },
  {
    name: 'Haut-Katanga',
    capital: 'Lubumbashi',
    coords: [-11.6647, 27.4794],
    cities: ['Lubumbashi', 'Likasi', 'Kipushi', 'Kambove', 'Kasumbalesa'],
  },
  {
    name: 'Haut-Lomami',
    capital: 'Kamina',
    coords: [-8.7386, 25.0003],
    cities: ['Kamina', 'Kabongo', 'Kaniama', 'Malemba-Nkulu', 'Bukama'],
  },
  {
    name: 'Haut-Uele',
    capital: 'Isiro',
    coords: [2.7667, 27.6167],
    cities: ['Isiro', 'Dungu', 'Faradje', 'Niangara', 'Watsa', 'Wamba'],
  },
  {
    name: 'Ituri',
    capital: 'Bunia',
    coords: [1.5667, 30.2500],
    cities: ['Bunia', 'Mahagi', 'Aru', 'Djugu', 'Irumu', 'Mambasa'],
  },
  {
    name: 'Kasaï',
    capital: 'Tshikapa',
    coords: [-6.4167, 20.8000],
    cities: ['Tshikapa', 'Ilebo', 'Kamonia', 'Luebo', 'Mweka'],
  },
  {
    name: 'Kasaï Central',
    capital: 'Kananga',
    coords: [-5.8962, 22.4166],
    cities: ['Kananga', 'Demba', 'Dimbelenge', 'Kazumba', 'Luiza'],
  },
  {
    name: 'Kasaï Oriental',
    capital: 'Mbuji-Mayi',
    coords: [-6.1500, 23.6000],
    cities: ['Mbuji-Mayi', 'Kabinda', 'Katanda', 'Miabi', 'Tshilenge'],
  },
  {
    name: 'Kinshasa',
    capital: 'Kinshasa',
    coords: [-4.4419, 15.2663],
    cities: ['Kinshasa'],
  },
  {
    name: 'Kongo Central',
    capital: 'Matadi',
    coords: [-5.8167, 13.4500],
    cities: ['Matadi', 'Boma', 'Moanda', 'Mbanza-Ngungu', 'Lukala', 'Tshela'],
  },
  {
    name: 'Kwango',
    capital: 'Kenge',
    coords: [-4.8167, 17.0333],
    cities: ['Kenge', 'Bandundu', 'Feshi', 'Kahemba', 'Kasongo-Lunda'],
  },
  {
    name: 'Kwilu',
    capital: 'Kikwit',
    coords: [-5.0333, 18.8167],
    cities: ['Kikwit', 'Bulungu', 'Gungu', 'Idiofa', 'Mangai'],
  },
  {
    name: 'Lomami',
    capital: 'Kabinda',
    coords: [-6.1333, 24.4833],
    cities: ['Kabinda', 'Mwene-Ditu', 'Ngandajika', 'Lubao', 'Luilu'],
  },
  {
    name: 'Lualaba',
    capital: 'Kolwezi',
    coords: [-10.7167, 25.4667],
    cities: ['Kolwezi', 'Dilolo', 'Kapanga', 'Lubudi', 'Mutshatsha'],
  },
  {
    name: 'Mai-Ndombe',
    capital: 'Inongo',
    coords: [-1.9500, 18.2833],
    cities: ['Inongo', 'Bolobo', 'Kutu', 'Mushie', 'Nioki', 'Kiri'],
  },
  {
    name: 'Maniema',
    capital: 'Kindu',
    coords: [-2.9500, 25.9500],
    cities: ['Kindu', 'Kabambare', 'Kasongo', 'Pangi', 'Punia'],
  },
  {
    name: 'Mongala',
    capital: 'Lisala',
    coords: [1.4333, 21.5167],
    cities: ['Lisala', 'Bumba', 'Bongandanga', 'Mongala'],
  },
  {
    name: 'Nord-Kivu',
    capital: 'Goma',
    coords: [-1.6777, 29.2285],
    cities: ['Goma', 'Beni', 'Butembo', 'Rutshuru', 'Masisi', 'Walikale', 'Nyiragongo'],
  },
  {
    name: 'Nord-Ubangi',
    capital: 'Gbadolite',
    coords: [4.2833, 21.0167],
    cities: ['Gbadolite', 'Mobayi-Mbongo', 'Yakoma', 'Businga'],
  },
  {
    name: 'Sankuru',
    capital: 'Lusambo',
    coords: [-4.9667, 23.4333],
    cities: ['Lusambo', 'Lodja', 'Lubefu', 'Katako-Kombe', 'Kole'],
  },
  {
    name: 'Sud-Kivu',
    capital: 'Bukavu',
    coords: [-2.5083, 28.8608],
    cities: ['Bukavu', 'Uvira', 'Kabare', 'Walungu', 'Shabunda', 'Mwenga', 'Fizi', 'Kalehe'],
  },
  {
    name: 'Sud-Ubangi',
    capital: 'Gemena',
    coords: [3.2500, 19.7667],
    cities: ['Gemena', 'Kungu', 'Libenge', 'Budjala', 'Zongo'],
  },
  {
    name: 'Tanganyika',
    capital: 'Kalemie',
    coords: [-5.9333, 29.1833],
    cities: ['Kalemie', 'Kongolo', 'Manono', 'Moba', 'Nyunzu'],
  },
  {
    name: 'Tshopo',
    capital: 'Kisangani',
    coords: [0.5167, 25.2000],
    cities: ['Kisangani', 'Isangi', 'Opala', 'Ubundu', 'Yangambi', 'Basoko'],
  },
  {
    name: 'Tshuapa',
    capital: 'Boende',
    coords: [-0.2833, 20.8833],
    cities: ['Boende', 'Befale', 'Bokungu', 'Djolu', 'Ikela', 'Monkoto'],
  },
];

/**
 * Villes par défaut où l'application est lancée en priorité.
 * Coordonnées utilisées si la géolocalisation du navigateur est refusée.
 */
export const DEFAULT_CITIES = {
  goma: {
    name: 'Goma',
    province: 'Nord-Kivu',
    coords: [-1.6777, 29.2285],
  },
  bukavu: {
    name: 'Bukavu',
    province: 'Sud-Kivu',
    coords: [-2.5083, 28.8608],
  },
};

/**
 * Retourne la liste des villes pour une province donnée.
 * @param {string} provinceName — nom exact de la province
 * @returns {string[]} liste des villes, ou tableau vide si province inconnue
 */
export function getCitiesByProvince(provinceName) {
  const province = PROVINCES.find((p) => p.name === provinceName);
  return province ? province.cities : [];
}

/**
 * Retourne les coordonnées GPS du chef-lieu d'une province.
 * @param {string} provinceName — nom exact de la province
 * @returns {{ lat: number, lng: number } | null}
 */
export function getProvinceCoords(provinceName) {
  const province = PROVINCES.find((p) => p.name === provinceName);
  if (!province) return null;
  return { lat: province.coords[0], lng: province.coords[1] };
}
