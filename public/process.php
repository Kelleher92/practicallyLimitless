<?php
	include_once dirname(dirname(__file__)).'/sys/core/init.inc.php';

	if($_POST['token'] === $_SESSION['token']) {

		$action = $_POST['action'];

		if($action === '') {

		} 

		else if($action === '') {
			
		} 

		else {
			throw new Exception('Invalid request');
		}
	
  	} else {
  		throw new Exception('Invalid token');
  	}
?>