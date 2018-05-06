function statusChangeCallback(response) {
	console.log('statusChangeCallback');
   	console.log(response);
	if (response.status === 'connected') {
		testAPI();
	} else if (response.status === 'not_authorized') {
		document.getElementById('status').innerHTML = 'We are not logged in.'
	} else {
		document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
	}
  }

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
	FB.init({
		appId      : 1266643933466040,
		xfbml      : true,
		version    : 'v3.0'
	});
	FB.AppEvents.logPageView();                                        
  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.


  FB.getLoginStatus(function(response) {
	statusChangeCallback(response);
  });

};

(function(d, s, id) {
	var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) return;
	js = d.createElement(s); js.id = id;
	js.src = 'https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v3.0&appId=168126427354074&autoLogAppEvents=1';
	fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

function testAPI() {
	console.log('Welcome!  Fetching your information.... ');
	FB.api('/me', function(response) {
		console.log('Successful login for: ' + response.name);
		document.getElementById('status').innerHTML =
		'Thanks for logging in, ' + response.name + '!';
	});
}





