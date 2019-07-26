$(document).ready(() => {	

	$("#logout").click((e) => {
		e.preventDefault();
		logout();
	});

	auth.onAuthStateChanged((user) => {
		if (user) {	
			const userId = user.uid;
			console.log(userId)										
			takeUserCollection(user, userId);	
		} else {
			console.log(user);			
		}
	});
});

function logout() {
	auth.signOut().then(() => {
		window.location = "/index.html";
	});	
};

