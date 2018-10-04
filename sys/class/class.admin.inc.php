<?php

	class Admin extends DB_Connect{
		private $ROOT = null;
		private $_expirationPeriod = 3;
		private $_saltLength = 7;

		public function __construct($db = NULL, $saltLength = NULL) {
			parent::__construct($db);
			$this->ROOT = $_SERVER['SERVER_NAME'];
			if(is_int($saltLength)) {
				$this->_saltLength = $saltLength;
			}
		}

		public function registerCompany($name, $email, $address, $password, $geoCoor) {
			if($_POST['action'] != 'registerCompany') {
				return "Invalid action supplied for registerCompany.";
			}

			$uname = $this->sanitizeValue($name);
			$email = $this->sanitizeValue($email);
			$address = $this->sanitizeValue($address);
			$pword = $this->sanitizeValue($password);
			$geoCoor = $this->sanitizeValue($geoCoor); 

			$userhash = $this->_getHashFromPassword($pword);
			$token = $this->generateToken($email);
			$companyId = md5($email.time());
			
			$res = new Response_Obj();
		
			if($this->isUniqueForCompanies('email', $email)) {
				$query ="INSERT INTO company". "(companyId, name, email, address, password, tempActivationToken, tokenSent, geoCoor) ";
				$values = "values ('$companyId', '$uname', '$email', '$address', '$userhash', '$token', now(), '$geoCoor')";

				try {
				    $this->insertQuery($query . $values);		

				    $mh = new Mailer();
				    $mh->sendVerificationEmail($email, $this->generateVefificationLink($email, $token));

				    $res->responseCode = 200;
				    $res->message = "Your registration was successful. Check your inbox!";
			    }
				catch(PDOException $e) {
				    $this->getDb()->rollback();
				    $res->responseCode = 400;
				    $res->message = "Error: " . $e->getMessage();
			    }
			}
			else {
				$res->responseCode = 400;
				$res->message = "The e-mail address you used was already registered. Please try again with another!";
			}		

			return $res;	
		}

		public function registerUser($name, $email, $password, $geoCoor) {
			if($_POST['action'] != 'registerUser') {
				return "Invalid action supplied for registerUser.";
			}

			$uname = $this->sanitizeValue($name);
			$email = $this->sanitizeValue($email);
			$pword = $this->sanitizeValue($password);
			$geoCoor = $this->sanitizeValue($geoCoor); 

			$userhash = $this->_getHashFromPassword($pword);
			$token = $this->generateToken($email);
			$userId = md5($email.time());

			$res = new Response_Obj();
		
			if($this->isUniqueForUsers('email', $email)) {
				$query ="INSERT INTO users". "(userId, name, email, password, tempActivationToken, tokenSent, geoCoor) ";
				$values = "values ('$userId', '$name', '$email', '$userhash', '$token', now(), '$geoCoor')";

				try {
				    $this->insertQuery($query . $values);		

				    $mh = new Mailer();
				    $mh->sendVerificationEmail($email, $this->generateUserVefificationLink($email, $token));

				    $res->responseCode = 200;
				    $res->message = "Your registration was successful. Check your inbox!";
			    }
				catch(PDOException $e) {
				    $this->getDb()->rollback();
				    $res->responseCode = 400;
				    $res->message = "Error: " . $e->getMessage();
			    }
			}
			else {
				$res->responseCode = 400;
				$res->message = "The e-mail address you used was already registered. Please try again with another!";
			}		

			return $res;	
		}

		public function updateCompany($companyId, $name, $address, $geoCoor, $number, $blurb) {
			if($_POST['action'] != 'updateCompany') {
				return "Invalid action supplied for updateCompany.";
			}

			$companyId = $this->sanitizeValue($companyId);
			$name = $this->sanitizeValue($name);
			$address = $this->sanitizeValue($address);
			$geoCoor = $this->sanitizeValue($geoCoor);
			$number = $this->sanitizeValue($number);
			$blurb = $this->sanitizeValue($blurb);
			
			$res = new Response_Obj();
		
			$sql = "UPDATE `company` SET `name` = '$name', `address` = '$address', `geoCoor` = '$geoCoor', `number` = '$number', `blurb` = '$blurb' WHERE `companyId` = '$companyId'";

			try {
				$this->insertQuery($sql);		

				$res->responseCode = 200;
				$res->message = "Details updated successfully.";
			}
			catch(PDOException $e) {
				$this->getDb()->rollback();
				$res->responseCode = 400;
				$res->message = "Error: " . $e->getMessage();
			}

			return $res;	
		}

		public function updateUser($companyId, $name, $skills, $geoCoor, $number, $blurb) {
			if($_POST['action'] != 'updateUser') {
				return "Invalid action supplied for updateUser.";
			}

			$companyId = $this->sanitizeValue($companyId);
			$name = $this->sanitizeValue($name);
			$skills = $this->sanitizeValue($skills);
			$geoCoor = $this->sanitizeValue($geoCoor);
			$number = $this->sanitizeValue($number);
			$blurb = $this->sanitizeValue($blurb);
			
			$res = new Response_Obj();
		
			$sql = "UPDATE `users` SET `name` = '$name', `skills` = '$skills', `geoCoor` = '$geoCoor', `number` = '$number', `blurb` = '$blurb' WHERE `userId` = '$companyId'";

			try {
				$this->insertQuery($sql);		

				$res->responseCode = 200;
				$res->message = "Details updated successfully.";
			}
			catch(PDOException $e) {
				$this->getDb()->rollback();
				$res->responseCode = 400;
				$res->message = "Error: " . $e->getMessage();
			}

			return $res;	
		}

		public function updateCompanyLogo($companyId, $logo) {
			if($_POST['action'] != 'updateCompanyLogo') {
				return "Invalid action supplied for updateCompanyLogo.";
			}

			$companyId = $this->sanitizeValue($companyId);
			$logo = $this->sanitizeValue($logo);
			
			$res = new Response_Obj();
		
			$sql = "UPDATE `company` SET `logo` = '$logo' WHERE `companyId` = '$companyId'";

			try {
				$this->insertQuery($sql);		

				$res->responseCode = 200;
				$res->message = "Details updated successfully.";
			}
			catch(PDOException $e) {
				$this->getDb()->rollback();
				$res->responseCode = 400;
				$res->message = "Error: " . $e->getMessage();
			}

			return $res;	
		}

		public function loginCompany($userName, $password) {
			if($_POST['action'] != 'loginCompany') {
				return "Invalid action supplied for loginCompany.";
			}

			$userName = $this->sanitizeValue($userName);
			$password = $this->sanitizeValue($password);

			$sql = "SELECT
				`id`, `companyId`, `name`, `email`, `password`, `isActivated`
				FROM `company`
				WHERE
				`email` = '$userName' 
				LIMIT 1";

			$results = $this->query($sql);

			$res = new Response_Obj();

			if(!isset($results) || empty($results)) {
				$res->responseCode = 400;
				$res->message = "Your username is not recognised.";
			} else {
				$user = $results[0];

				if(!boolVal($user['isActivated'])) {
					$res->responseCode = 400;
					$res->message = 'Your account is not activated yet. Please check your email.';
				}
				else{
					$hash = $user['password'];

					if(password_verify($password, $hash)) {
						$_SESSION['user'] = array(
							'id' => $user['companyId'],
							'name' => $user['name'],
							'email' => $user['email']
						);
						$res->responseCode = 200;
						$res->message = 'Login successful.';
						$res->data = $user['companyId'];
					} else {
						$res->responseCode = 400;
						$res->message = 'Your username and password combination is invalid.';
					}
				}
			}

			return $res;
		}

		public function loginUser($userName, $password) {
			if($_POST['action'] != 'loginUser') {
				return "Invalid action supplied for loginUser.";
			}

			$userName = $this->sanitizeValue($userName);
			$password = $this->sanitizeValue($password);

			$sql = "SELECT
				`id`, `userId`, `name`, `email`, `password`, `isActivated`
				FROM `users`
				WHERE
				`email` = '$userName' 
				LIMIT 1";

			$results = $this->query($sql);

			$res = new Response_Obj();

			if(!isset($results) || empty($results)) {
				$res->responseCode = 400;
				$res->message = "Your username is not recognised.";
			} else {
				$user = $results[0];

				if(!boolVal($user['isActivated'])) {
					$res->responseCode = 400;
					$res->message = 'Your account is not activated yet. Please check your email.';
				}
				else{
					$hash = $user['password'];

					if(password_verify($password, $hash)) {
						$_SESSION['user'] = array(
							'id' => $user['userId'],
							'name' => $user['name'],
							'email' => $user['email']
						);
						$res->responseCode = 200;
						$res->message = 'Login successful.';
						$res->data = $user['userId'];
					} else {
						$res->responseCode = 400;
						$res->message = 'Your username and password combination is invalid.';
					}
				}
			}

			return $res;
		}

		private function companyVerifyEmail($email) {
			$email = $this->sanitizeValue($email);

			$sql = "SELECT `email` FROM `company` WHERE `email` = '$email' LIMIT 1";

			$user = $this->query($sql);

			$res = new Response_Obj();

			if(empty($user)) {
				$res->message = 'E-mail ok.';
				$res->responseCode = 200;
			} else {
				$res->message = 'E-mail already registered.';
				$res->responseCode = 400;
			}

			return $res;
		}

		private function userVerifyEmail($email) {
			$email = $this->sanitizeValue($email);

			$sql = "SELECT `email` FROM `users` WHERE `email` = '$email' LIMIT 1";

			$user = $this->query($sql);

			$res = new Response_Obj();

			if(empty($user)) {
				$res->message = 'E-mail ok.';
				$res->responseCode = 200;
			} else {
				$res->message = 'E-mail already registered.';
				$res->responseCode = 400;
			}

			return $res;
		}


		public function logoutCompany() {
			if($_POST['action'] != 'logoutCompany') {
				echo "Invalid action supplied for logoutCompany.";
			}

			$_SESSION['user'] = array(
				'id' => '',
				'name' => '',
				'email' => ''
			);

			echo 'Log out complete.';
		}


		public function logoutUser() {
			if($_POST['action'] != 'logoutUser') {
				echo "Invalid action supplied for logoutUser.";
			}

			$_SESSION['user'] = array(
				'id' => '',
				'name' => '',
				'email' => ''
			);

			echo 'Log out complete.';
		}

		public function fetchCompany($companyId) {
			if($_POST['action'] != 'fetchCompany') {
				return "Invalid action supplied for fetchCompany.";
			}

			$companyId = $this->sanitizeValue($companyId);

			$sql = "SELECT
				`name`, `email`, `address`, `logo`, `geoCoor`, `number`, `blurb` 
				FROM `company`
				WHERE `companyId` = '$companyId'";

			$company = $this->query($sql);

			$sql = "SELECT
				`id`, `offerName`, `requirements`, `expiryDate` 
				FROM `offer`
				WHERE `companyId` = '$companyId'
				ORDER BY `expiryDate`";

			$offers = $this->query($sql);
			$expiredOffers = array();
			
			foreach($offers as $key => $value) {
			    if($value["expiryDate"] < date('Y-m-d')) {
			        $expiredOffers[] = $value;
			        unset($offers[$key]);
			    }
			}
			
			$res = new Response_Obj();

			if(!empty($company)) {
				$res->message = 'Successful fetch.';
				$res->responseCode = 200;
				$res->data = array(
					'company' => $company[0], 
					'currentOffers' => array_values($offers), 
					'expiredOffers' => array_values($expiredOffers)
				);
			} else {
				$res->message = 'No company found.';
				$res->responseCode = 400;
			}

			return $res;
		}

		public function fetchUser($companyId) {
			if($_POST['action'] != 'fetchUser') {
				return "Invalid action supplied for fetchCompany.";
			}

			$companyId = $this->sanitizeValue($companyId);

			$sql = "SELECT
				`name`, `email`, `address`, `logo`, `geoCoor`, `number`, `blurb`,`skills` 
				FROM `users`
				WHERE `userId` = '$companyId'";

			$user = $this->query($sql);

			$sql = "SELECT
				`id`, `offerName`, `requirements`, `expiryDate` 
				FROM `offer`
				WHERE `companyId` = '$companyId'
				ORDER BY `expiryDate`";

			$offers = $this->query($sql);
			$expiredOffers = array();
			
			foreach($offers as $key => $value) {
			    if($value["expiryDate"] < date('Y-m-d')) {
			        $expiredOffers[] = $value;
			        unset($offers[$key]);
			    }
			}
			
			$res = new Response_Obj();

			if(!empty($user)) {
				$res->message = 'Successful fetch.';
				$res->responseCode = 200;
				$res->data = array(
					'user' => $user[0], 
					'currentOffers' => array_values($offers), 
					'expiredOffers' => array_values($expiredOffers)
				);
			} else {
				$res->message = 'No user found.';
				$res->responseCode = 400;
			}

			return $res;
		}

		private function fetchCompanyForActivation($email, $token) {
			if(!isset($email) || !isset($token)) {
				exit('Invalid request');
			}

			$sql = "SELECT
				`id`, `email`, `isActivated`, `tempActivationToken`, `tokenSent`, `isActivationTokenExpired` 
				FROM `company`
				WHERE `email` = '$email' AND `tempActivationToken` = '$token' 
				LIMIT 1";

			$company = $this->query($sql);

			return empty($company) ? null : $company[0];
		}

		private function fetchUserForActivation($email, $token) {
			if(!isset($email) || !isset($token)) {
				exit('Invalid request');
			}

			$sql = "SELECT
				`id`, `email`, `isActivated`, `tempActivationToken`, `tokenSent`, `isActivationTokenExpired` 
				FROM `users`
				WHERE `email` = '$email' AND `tempActivationToken` = '$token' 
				LIMIT 1";

			$user = $this->query($sql);

			return empty($user) ? null : $user[0];
		}

		public function activateCompany($email, $token) {
			if($_POST['action'] != 'activateCompany') {
				return "Invalid action supplied for activateCompany.";
			}
			
			$email = $this->sanitizeValue($email);
			$token = $this->sanitizeValue($token);
			$company= $this->fetchCompanyForActivation($email, $token);
			
			$res = new Response_Obj();

			if(!(isset($company)) || $company['isActivationTokenExpired'] || $this->isTokenExpired($company['tokenSent'], $this->_expirationPeriod)) {
				$res->responseCode = 400;
				$res->message = "Session expired.";
			} else{
				$sql = "UPDATE `company` SET `isActivated` = 1, `isActivationTokenExpired` = 1 WHERE `email` = '$email' and tempActivationToken = '$token'";
				$this->insertQuery($sql);
				$res->responseCode = 200;
				$res->message = "Activated.";
			}

			return $res;
		}


		public function activateUser($email, $token) {
			if($_POST['action'] != 'activateUser') {
				return "Invalid action supplied for activateUser.";
			}
			
			$email = $this->sanitizeValue($email);
			$token = $this->sanitizeValue($token);
			$user= $this->fetchUserForActivation($email, $token);
			
			$res = new Response_Obj();

			if(!(isset($user)) || $user['isActivationTokenExpired'] || $this->isTokenExpired($user['tokenSent'], $this->_expirationPeriod)) {
				$res->responseCode = 400;
				$res->message = "Session expired.";
			} else{
				$sql = "UPDATE `users` SET `isActivated` = 1, `isActivationTokenExpired` = 1 WHERE `email` = '$email' and tempActivationToken = '$token'";
				$this->insertQuery($sql);
				$res->responseCode = 200;
				$res->message = "Activated.";
			}

			return $res;
		}

		

		public function uploadCompanyLogo($companyId, $image, $imageName) {
			$companyId = $this->sanitizeValue($companyId);

			// Upload image to cloudinary and get image url as response.
			require 'Cloudinary/Cloudinary.php';
			require 'Cloudinary/Uploader.php';
			require 'Cloudinary/Api.php';
			
			\Cloudinary::config(array( 
				"cloud_name" => "dxdhcnwlz", 
				"api_key" => "874773625734141", 
				"api_secret" => "bsUwGDNKK-DphD8Q1Rqwu0wD6mo" 
			));

			$image_url = \Cloudinary\Uploader::upload($image, array("folder" => $companyId."/", "public_id" => $imageName, "resource_type" => "auto", "width"=>128, "height"=>128, "crop"=>"fill"));					

			// save image url to company database
			$res = new Response_Obj();
			$res->responseCode = 200;
			$res->message = $image_url;

			return $res;
		}

		public function companyForgotPassword($email) {
			if($_POST['action'] != 'companyForgotPassword') {
				return "Invalid action supplied for companyForgotPassword.";
			}

			$email = $this->sanitizeValue($email);
			$token = $this->generateToken($email);

			$res = new Response_Obj();

			if(($this->companyVerifyEmail($email)->responseCode == 400)) {
				$sql = "UPDATE `company` SET `tempResetToken` = '$token', `resetTokenSent` = now(), `isResetTokenExpired` = 0 WHERE `email` = '$email'";

				try {
				   	$this->insertQuery($sql);

				    $mh = new Mailer();
					$mh->sendResetPasswordEmail($email, $this->generateResetLink($email, $token));

					$res->message = 'Reset password was successful. Check your inbox!';
					$res->responseCode = 200;
			    }
				catch(PDOException $e) {
				    $this->getDb()->rollback();
				    $res->message = "Error: " . $e->getMessage();
					$res->responseCode = 400;
			    }
			}
			else {
				$res->message = "The e-mail address you used was not recognised. Please try again!";
				$res->responseCode = 400;
			}	

			return $res;		
		}

		public function userForgotPassword($email) {
			if($_POST['action'] != 'userForgotPassword') {
				return "Invalid action supplied for userForgotPassword.";
			}

			$email = $this->sanitizeValue($email);
			$token = $this->generateToken($email);

			$res = new Response_Obj();

			if(($this->userVerifyEmail($email)->responseCode == 400)) {
				$sql = "UPDATE `users` SET `tempResetToken` = '$token', `resetTokenSent` = now(), `isResetTokenExpired` = 0 WHERE `email` = '$email'";

				try {
				   	$this->insertQuery($sql);

				    $mh = new Mailer();
					$mh->sendResetPasswordEmail($email, $this->generateUserResetLink($email, $token));

					$res->message = 'Reset password was successful. Check your inbox!';
					$res->responseCode = 200;
			    }
				catch(PDOException $e) {
				    $this->getDb()->rollback();
				    $res->message = "Error: " . $e->getMessage();
					$res->responseCode = 400;
			    }
			}
			else {
				$res->message = "The e-mail address you used was not recognised. Please try again!";
				$res->responseCode = 400;
			}	

			return $res;		
		}

		public function companyResetPassword($email, $password) {
			if($_POST['action'] != 'companyResetPassword') {
				return "Invalid action supplied for companyResetPassword.";
			}

			$email = $this->sanitizeValue($email);
			$password = $this->sanitizeValue($password);
			$userhash = $this->_getHashFromPassword($password);
		
			$query = "UPDATE `company` SET `password` = '$userhash' WHERE `email` = '$email'";
						
			$res = new Response_Obj();

			try {
			    $this->insertQuery($query);

				$res->message = 'Reset password was successful.';
				$res->responseCode = 200;
		    }
			catch(PDOException $e) {
			    $this->getDb()->rollback();
			    $res->message = "Error: " . $e->getMessage();
				$res->responseCode = 400;
		    }			

		    return $res;
		}

		public function userResetPassword($email, $password) {
			if($_POST['action'] != 'userResetPassword') {
				return "Invalid action supplied for userResetPassword.";
			}

			$email = $this->sanitizeValue($email);
			$password = $this->sanitizeValue($password);
			$userhash = $this->_getHashFromPassword($password);
		
			$query = "UPDATE `users` SET `password` = '$userhash' WHERE `email` = '$email'";
						
			$res = new Response_Obj();

			try {
			    $this->insertQuery($query);

				$res->message = 'Reset password was successful.';
				$res->responseCode = 200;
		    }
			catch(PDOException $e) {
			    $this->getDb()->rollback();
			    $res->message = "Error: " . $e->getMessage();
				$res->responseCode = 400;
		    }			

		    return $res;
		}

		public function companyVerifyResetToken($email, $token) {
			if($_POST['action'] != 'resetCompany') {
				return "Invalid action supplied for companyVerifyResetToken.";
			}
			
			$email = $this->sanitizeValue($email);
			$token = $this->sanitizeValue($token);

			$company = $this->fetchCompanyForReset($email, $token);
			$res = new Response_Obj();

			if(!isset($company) || $company['isResetTokenExpired'] || !$company['isActivated'] || $this->isTokenExpired($company['resetTokenSent'], $this->_expirationPeriod)) {
				$res->message = 'Company or token invalid.';
				$res->responseCode = 400;
			} else {
				$sql = "UPDATE `company` SET `isResetTokenExpired` = 1 WHERE `email` = '$email' and `tempResetToken` = '$token'";
				$this->insertQuery($sql);
				$res->message = 'Company and token valid.';
				$res->responseCode = 200;
			}

			return $res;
		}

		public function userVerifyResetToken($email, $token) {
			if($_POST['action'] != 'resetUser') {
				return "Invalid action supplied for userVerifyResetToken.";
			}
			
			$email = $this->sanitizeValue($email);
			$token = $this->sanitizeValue($token);

			$user = $this->fetchUserForReset($email, $token);
			$res = new Response_Obj();

			if(!isset($user) || $user['isResetTokenExpired'] || !$user['isActivated'] || $this->isTokenExpired($user['resetTokenSent'], $this->_expirationPeriod)) {
				$res->message = 'User or token invalid.';
				$res->responseCode = 400;
			} else {
				$sql = "UPDATE `users` SET `isResetTokenExpired` = 1 WHERE `email` = '$email' and `tempResetToken` = '$token'";
				$this->insertQuery($sql);
				$res->message = 'User and token valid.';
				$res->responseCode = 200;
			}

			return $res;
		}

		public function fetchCompanyForReset($email, $token) {
			if(!isset($email) || !isset($token)) {
				exit('Invalid request');
			}

			$sql = "SELECT
				`id`, `email`, `isActivated`, `tempResetToken`, `resetTokenSent`, `isResetTokenExpired` 
				FROM `company`
				WHERE `email` = '$email' AND `tempResetToken` = '$token' 
				LIMIT 1";

			$company = $this->query($sql);

			return empty($company) ? null : $company[0];
		}

		public function fetchUserForReset($email, $token) {
			if(!isset($email) || !isset($token)) {
				exit('Invalid request');
			}

			$sql = "SELECT
				`id`, `email`, `isActivated`, `tempResetToken`, `resetTokenSent`, `isResetTokenExpired` 
				FROM `users`
				WHERE `email` = '$email' AND `tempResetToken` = '$token' 
				LIMIT 1";

			$user = $this->query($sql);

			return empty($user) ? null : $user[0];
		}

		private function generateVefificationLink($email, $token) {
			if(!$email || !$token) {
				throw new Exception('missing key info');
				exit();
			}
			return $this->ROOT."/verify?email=".$email."&token=".$token;
		}

		private function generateUserVefificationLink($email, $token) {
			if(!$email || !$token) {
				throw new Exception('missing key info');
				exit();
			}
			return $this->ROOT."/user-verify?email=".$email."&token=".$token;
		}

		private function generateToken($email) {
			return hash('sha256', time().uniqid($email, true), false);
		}

		private function generateResetLink($email, $token) {
			if(!$email || !$token) {
				throw new Exception('missing key info');
				exit();
			}

			return $this->ROOT."/reset?email=".$email."&token=".$token;
		}

		private function generateUserResetLink($email, $token) {
			if(!$email || !$token) {
				throw new Exception('missing key info');
				exit();
			}

			return $this->ROOT."/user-reset?email=".$email."&token=".$token;
		}

		private function isTokenExpired($sentTime, $limit) {
			$today = new DateTime('now');
			$sentDate  = new DateTime($sentTime);
			$diff = $today->diff($sentDate)->days;

			return $diff >= $limit;
		}

		private function _getHashFromPassword($string) {
			return password_hash($string, PASSWORD_DEFAULT, ['cost' => 12]);		
		}

		public function sanitizeValue($val) {
			if(empty($val)) return '';

			return htmlentities(strip_tags(trim($val)), ENT_QUOTES);
		}

		public function isUniqueForCompanies($field, $value) {
		 	$allowedFields = ['name', 'email'];

		 	if(in_array($field, $allowedFields)) {
				$sql = "SELECT 
					`name`, `email` 
					from
					`company` 
					where ". $field ."=". "'".$value. "'";

				return empty($this->query($sql));
		 	}
		 	return false;
		}

		public function isUniqueForUsers($field, $value) {
		 	$allowedFields = ['name', 'email'];

		 	if(in_array($field, $allowedFields)) {
				$sql = "SELECT 
					`name`, `email` 
					from
					`users` 
					where ". $field ."=". "'".$value. "'";

				return empty($this->query($sql));
		 	}
		 	return false;
		}

		public function query($q) {
			try {
				$stmt = $this->db->prepare($q);
				$stmt->execute();
				$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
				$stmt->closeCursor();
				return $results;
			} catch (Exception $e) {
				die ($e->getMessage());
			}
		}

		public function insertQuery($q) {
			try {
				$stmt = $this->db->prepare($q);
				$stmt->execute();
				$stmt->closeCursor();
			} catch (Exception $e) {
				die ($e->getMessage());
			}
		}
	}
?>
