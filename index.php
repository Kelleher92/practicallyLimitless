<?php
	include_once './sys/core/init.inc.php';
?>

<!DOCTYPE html>
<html>
	<head>
		<script async src="https://www.googletagmanager.com/gtag/js?id=UA-127070292-1"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', 'UA-127070292-1');
		</script> 
		<meta name="description=" content="Limitless is a platform at allows volunteers to search for opportunities in Ireland that help different charities. Based on your skills and experience, volunteers can find the best possible ways to help in organisations that suit them best">
		<meta charset="utf-8">
	    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
	    	<title>Limitless Volunteering</title>
	    	<link rel="icon" href="public/images/logo.ico">
	    	<link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
		<link rel="stylesheet" href="./public/css/lib/bootstrap.min.css">  
		<link rel="stylesheet" href="./public/css/global/global.css"> 
		<script src="https://js.stripe.com/v3/"></script>
		<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA8mT1Hzafi1MrAYe3xHABzF_VSdWbNZGk&libraries=places"> </script>
	</head>

	<body>
		<section id="root"></section>
		<div id="modal-root"></div>
		
		<input id="session-token" type="hidden" value="<?php echo $_SESSION['token']; ?>"/>
		<input id="login-token" type="hidden" value="<?php echo $_SESSION['user']['id']; ?>"/>

		<script src="./public/js/home.js"></script>
	</body>
</html>
