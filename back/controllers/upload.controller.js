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
	const fileName = req.body.pseudo + '.jpg';

	await pipeline(
		req.file.stream,
		fs.createWriteStream(`${__dirname}/../../front/groupomania/public/uploads/profil/${fileName}`)
	);

	try {
		await UserModel.update(
			{ picture: './uploads/profil/' + fileName },
			{ where: req.body.id },
			(err, docs) => {
				if (!err) return res.send(docs);
				else return res.status(500).send({ message: err });
			}
		);
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};
