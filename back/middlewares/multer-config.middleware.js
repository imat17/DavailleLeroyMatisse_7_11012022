const multer = require('multer');
const path = require('path');

// Configuration de Multer

const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'uploads');
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + path.extname(file.originalname));
	},
});

const upload = multer({
	storage: storage,
	fileFilter: (req, file, callback) => {
		const fileTypes = /jpeg|jpg|png|gif/;
		const mimType = fileTypes.test(file.mimetype);
		const extname = fileTypes.test(path.extname(file.originalname));

		if (mimType && extname) {
			return callback(null, true);
		}
		callback('Format invalide (autorisé : jpg/jpeg/gif/png');
	},
}).single('picture');

module.exports = upload;

// Profile

const storageProfile = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, 'profil');
	},
	filename: (req, file, callback) => {
		callback(null, Date.now() + path.extname(file.originalname));
	},
});

const uploadProfile = multer({
	storage: storageProfile,
	fileFilter: (req, file, callback) => {
		const fileTypes = /jpeg|jpg|png/;
		const mimType = fileTypes.test(file.mimetype);
		const extname = fileTypes.test(path.extname(file.originalname));

		if (mimType && extname) {
			return callback(null, true);
		}
		callback('Format invalide (autorisé : jpg/jpeg/png');
	},
}).single('picture');

module.exports = uploadProfile;
