const UserModel = require('../models/User');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

module.exports.uploadProfil = async (req, res) => {
	try {
		if (
			req.file.detectedMimeType != 'image/jpg' &&
			req.file.detectedMimeType != 'image/png' &&
			req.file.detectedMimeType != 'image/jpeg'
		)
			throw Error('invalid file');

		if (req.file.size > 500000) throw Error('max size');
	} catch (err) {
		// const errors = uploadErrors(err);
		return res.status(201).json('Crée');
	}
	let fileName = req.body.pseudo + '.jpg';

	await pipeline(
		req.file.stream,
		fs.createWriteStream(`${__dirname}/../../front/groupomania/public/uploads/profil/${fileName}`)
	);

	try {
		await UserModel.update(
			{ picture: './uploads/profil/' + fileName },
			{ where: { id: req.body.id } },
			res.status(201).json('Votre profil à bien été mis à jour')
		);
	} catch (err) {
		return res.status(500).send('Erreur lors de la modification du profil');
	}
};
