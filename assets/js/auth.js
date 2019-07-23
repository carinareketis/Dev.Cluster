$(() => {

	$("#btn-signUp").click((e) => {
		e.preventDefault();
		firebaseUser();
	});

	$("#btn-login").click((e) => {
		e.preventDefault();

		const email = $("#email-login").val();
		const password = $("#password-login").val();

		login(email, password);
		$("#form-login").val("");
	});	
});

const firebaseUser = () => {
	const name = $("#sign-Name").val();
	const email = $("#sign-Email").val();
	const password = $("#sign-Password").val();
	const confirmPassword = $("#sign-Confirm-Pass").val();
	
	creatUser(name, email, password, confirmPassword);
};

const creatUser = (name, email, password, confirmPassword ) => {
	if (password === confirmPassword) {
		auth.createUserWithEmailAndPassword(email, password).then(cred => {
			return db.collection("user").doc(cred.user.uid).set({
				email,
				name,
				message: []
			}).then(() => {
				window.location = "/feed.html?id=" + cred.user.uid;
			});
		}).catch((error) => {
			alert(error);
		});
	} else {
		alert('Verifique sua senha')
	};
}

const login = (email, password) => {
	auth.signInWithEmailAndPassword(email, password).then(cred => {
		console.log(cred);
		window.location = "/feed.html?id=" + cred.user.uid;
	}).catch((error) => {
		alert(error);
	});
};






