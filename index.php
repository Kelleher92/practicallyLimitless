<?php
	include_once './sys/core/init.inc.php';
?>

<!DOCTYPE html>
<html>
	<head>
	    <meta charset="utf-8">
	    <meta name="theme-color" content="#1d263b">
	    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">
	    <title></title>
	    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
		<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.1/css/all.css" integrity="sha384-O8whS3fhG2OnA5Kas0Y9l3cfpmYjapjI0E4theH4iuMD+pLhbf6JI0jIMfYcK3yZ" crossorigin="anonymous">
		<link rel="stylesheet" href="./public/css/global/global.css"> 
		<link rel="stylesheet" href="./public/css/lib/bootstrap.min.css">  
	</head>

	<body>
		<section id="root"></section>
		
		<input id="session-token" type="hidden" value="<?php echo $_SESSION['token']; ?>"/>
		<input id="login-token" type="hidden" value="<?php if(!isset($_SESSION['company']['id']) || !isset($_SESSION['company']['email']) || !isset($_SESSION['company']['name'])) {echo 'false';} else {echo 'true';} ?>"/>

		<script src="./public/js/home.js"></script>
	</body>
</html>