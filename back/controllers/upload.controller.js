const UserModel = require('../models/User');
const fs = require('fs');
const token = require('../middlewares/auth.middleware');

module.exports.uploadProfil = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			UserModel.findOne({
				where: { id: decryptedUser },
			}).then((user) => {
				if (req.file) {
					newProfilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
				}
				if (user.picture && req.file) {
					const filename = user.picture.split('/uploads/')[1];
					if (filename !== 'random-user.png') {
						fs.unlink(`uploads/${filename}`, (err) => {
							if (err) console.log(err);
						});
					}
				}
				UserModel.update(
					{
						picture: newProfilePicture,
					},
					{ where: { id: req.body.id } }
				)
					.then(() =>
						res.status(200).json({ message: 'Utilisateur modifié', picture: newProfilePicture })
					)
					.catch(() => res.status(500).json({ error: 'Erreur serveur' }));
			});
		} else {
			res.status(400).json({ message: 'Utilisateur non authentifié' });
		}
	} catch (err) {
		console.log(err);
	}
};