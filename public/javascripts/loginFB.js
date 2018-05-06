// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
	FB.init({
		appId      : 1266643933466040,
		xfbml      : true,
		version    : 'v3.0'
	});
	FB.AppEvents.logPageView();
};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0&appId=168126427354074&autoLogAppEvents=1';
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

	function checkLoginState() {
		FB.getLoginStatus(function(response) {
			if (response.status === 'connected') {
				document.getElementById('status').innerHTML = 'We are connected.';
				document.getElementById('login').style.visibility = 'hidden';
			} else if (response.status === 'not_authorized') {
				document.getElementById('status').innerHTML = 'We are not logged in.'
			} else {
				document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
				FB.login(function(response) {
					if (response.authResponse) {
					 console.log('Welcome!  Fetching your information.... ');
					 FB.api('/me', function(response) {
					   console.log('Good to see you, ' + response.name + '.');
					 });
					} else {
					 console.log('User cancelled login or did not fully authorize.');
					}
				});
			}
		});
	  }

// login with facebook with extra permissions
function loginFB() {
	FB.login(function(response) {
		if (response.status === 'connected') {
			document.getElementById('status').innerHTML = 'We are connected.';
			document.getElementById('login').style.visibility = 'hidden';
		} else if (response.status === 'not_authorized') {
			document.getElementById('status').innerHTML = 'We are not logged in.'
		} else {
			document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
		}
	}, {scope: 'email'});
}

// getting basic user info
function getInfo() {
	FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id'}, function(response) {
		document.getElementById('status').innerHTML = response.id;
	});
}

function checkLoginState() {
	FB.getLoginStatus(function(response) {
		FB.login(function(response) {
			if (response.authResponse) {
			 console.log('Welcome!  Fetching your information.... ');
			 FB.api('/me', function(response) {
			   console.log('Good to see you, ' + response.name + '.');
			 });
			} else {
			 console.log('User cancelled login or did not fully authorize.');
			}
		});
	});
}



