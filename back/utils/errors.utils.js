// // Gestion des erreurs diverses lors du signUp
// module.exports.signUpErrors = (err) => {
// 	let errors = { pseudo: '', email: '' };
// 	if (err.message.includes('pseudo')) errors.pseudo = 'Pseudo déjà utilisé';
// 	if (err.message.includes('email')) errors.email = 'Email déjà utilisé';

// 	return errors;
// };

// //  Gestion des erreurs diverses lors du signIn ---PROBLEME ?? a tester ---
// module.exports.signInErrors = (err) => {
// 	let errors = { email: '', password: '' };

// 	if (err.message.includes('email')) errors.email = 'Email inconnu';

// 	if (err.message.includes('password')) errors.password = 'Le mot de passe ne correspond pas';

// 	return errors;
// };
