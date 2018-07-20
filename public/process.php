<?php
	include_once dirname(dirname(__file__)).'/sys/core/init.inc.php';

	if($_POST['token'] === $_SESSION['token']) {

		$action = $_POST['action'];

		if($action === 'checkLoggedIn') {
			if(!isset($_SESSION['company']['id']) || !isset($_SESSION['company']['email']) || !isset($_SESSION['company']['name'])) {
				echo 'false';   
			}
			else {
				echo 'true';   
			}
		} 

		else if($action === 'registerCompany') {
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->registerCompany($data->name, $data->email, $data->address, $data->password);
			echo json_encode($res);
		} 

		else if($action === 'loginCompany') {
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->loginCompany($data->email, $data->password);	
			echo json_encode($res);
		}	

		else if($action === 'logoutCompany') {
			$admin = new Admin();
			$admin->logoutCompany();			
		} 	 	

		else if($action === 'activateCompany') { 
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->activateCompany($data->email, $data->token);		
			echo json_encode($res);
		} 
			
		else if($action === 'companyForgotPassword') { 
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->companyForgotPassword($data->email);		
			echo json_encode($res);
		} 

		else if($action === 'resetCompany') {
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->companyVerifyResetToken($data->email, $data->token);
			echo json_encode($res);
		} 

		else if($action === 'companyResetPassword') {
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->companyResetPassword($data->email, $data->password);
			echo json_encode($res);
		} 

		else {
			throw new Exception('Invalid request');
		}
	
  	} else {
  		throw new Exception('Invalid token');
  	}
?>