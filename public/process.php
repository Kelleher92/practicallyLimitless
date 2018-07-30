<?php
	include_once dirname(dirname(__file__)).'/sys/core/init.inc.php';

	if($_POST['token'] === $_SESSION['token']) {

		$action = $_POST['action'];

		if($action === 'checkLoggedIn') {
			if(empty($_SESSION['company']['id']) || empty($_SESSION['company']['email']) || empty($_SESSION['company']['name'])) {
				echo json_encode(array(
    				'result' => false,
    				'companyId' => null
				));  
			}
			else { 
				echo json_encode(array(
	    			'result' => true,
	    			'companyId' => $_SESSION['company']['id']
				));
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
			echo $admin->logoutCompany();			
		} 

		else if($action === 'fetchCompany') {
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->fetchCompany($data->companyId);	
			echo json_encode($res);
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

		else if($action === 'processPayment') {
			$data = json_decode($_POST['data']);
			$admin = new Admin();
			$res = $admin->processPayment($data->token, $data->amount);
			echo json_encode($res);
		} 

		else {
			throw new Exception('Invalid request');
		}
	
  	} else {
  		throw new Exception('Invalid token');
  	}
?>