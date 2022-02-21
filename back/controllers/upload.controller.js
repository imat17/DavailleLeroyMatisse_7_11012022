const UserModel = require('../models/User');
const fs = require('fs');
const token = require('../middlewares/auth.middleware');

module.exports.uploadProfil = async (req, res) => {
	const decryptedUser = token.getUserId(req);
	try {
		const User = await UserModel.findOne({ where: { id: decryptedUser } });
		if (User !== null) {
			if (req.file) {
				newProfilePicture = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
			}
			if (UserModel.picture) {
				const filename = UserModel.picture.split('/uploads')[1];
				fs.unlink(`uploads/${filename}`, (err) => {
					if (err) console.log(err);
					else {
						res.status(200).send("L'image à bien été supprimée");
					}
				});
			}
			await UserModel.update(
				{
					picture: newProfilePicture,
				},
				{ where: { id: req.body.id } }
			);
			res.status(201).send('Le profil à bien été modifié');
		} else {
			res.status(400).json({ message: 'Utilisateur non authentifié' });
		}
	} catch (err) {
		console.log(err);
	}
};