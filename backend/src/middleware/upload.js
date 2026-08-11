// Fichier : src/middleware/upload.js
// Rôle : Configuration Multer pour l'upload de fichiers

import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { config } from '../config/index.js';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'photo') {
      cb(null, config.uploads.photos);
    } else if (file.fieldname === 'document') {
      cb(null, config.uploads.documents);
    } else {
      cb(new Error('Champ non supporté'), null);
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Format de fichier non supporté. Uniquement JPEG, PNG, WEBP.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 Mo
  fileFilter
});

export const uploadPhoto = upload.single('photo');
export const uploadDocument = upload.single('document');
