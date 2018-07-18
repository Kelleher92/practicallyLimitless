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

		public function registerCompany($name, $email, $address, $password) {
			if($_POST['action'] != 'registerCompany') {
				return "Invalid action supplied for registerCompany.";
			}

			$uname = $this->sanitizeValue($name);
			$email = $this->sanitizeValue($email);
			$address = $this->sanitizeValue($address);
			$pword = $this->sanitizeValue($password);

			$userhash = $this->_getHashFromPassword($pword);
			$token = $this->generateToken($email);
			$companyId = md5($email.time());
		
			if($this->isUniqueForCompanies('email', $email)) {
				$query ="INSERT INTO company". "(companyId, name, email, address, password, tempActivationToken, tokenSent) ";
				$values = "values ('$companyId', '$uname', '$email', '$address', '$userhash', '$token', now())";

				try {
				    $this->getDb()->beginTransaction();
					$this->getDb()->exec($query . $values);		
				    $this->getDb()->commit();

				    $mh = new Mail_Handler();
					$mh->sendVerificationEmail($email, $this->generateVefificationLink($email, $token));

					echo "Your registration was successful. Check your inbox!";
			    }
				catch(PDOException $e) {
				    $this->getDb()->rollback();
				    echo "Error: " . $e->getMessage();
			    }
			}
			else {
				echo "The e-mail address you used was already registered. Please try again with another!";
			}			
		}

		public function loginCompany($userName, $password) {
			if($_POST['action'] != 'loginCompany') {
				return "Invalid action supplied for loginCompany.";
			}

			$uname = $this->sanitizeValue($userName);
			$pword = $this->sanitizeValue($password);

			$sql = "SELECT
				`id`, `companyId`, `name`, `email`, `password`, `isActivated`
				FROM `company`
				WHERE
				`email` = '$uname' 
				LIMIT 1";

			$user = $this->query($sql)[0];

			$res = new Response_Obj();

			if (!isset($user) || empty($user)){
				$res->responseCode = 400;
				$res->message = "Your username or password is invalid.";
			} else if(!boolVal($user['isActivated'])) {
				$res->responseCode = 400;
				$res->message = 'Your account is not activated yet. Please check your email.';
				echo json_encode($res);
			}

			$hash = $user['password'];

			if(password_verify($pword, $hash)) {
				$_SESSION['company'] = array(
					'id' => $user['id'],
					'name' => $user['name'],
					'email' => $user['email']
				);
				$res->responseCode = 200;
				$res->message = '';
			} else {
				$res->responseCode = 400;
				$res->message = 'Your username or password is invalid.';
			}
			echo json_encode($res);
		}

		private function createResponse($code, $message) {
			return new Response_Obj(array(
				'responseCode' => $code,
				'message'=> $message
			));
		}

		public function companyVerifyEmail($email) {
			if($_POST['action'] != 'companyVerifyEmail') {
				return "Invalid action supplied for companyVerifyEmail.";
			}

			$email = $this->sanitizeValue($email);

			$sql = "SELECT `email` FROM `company` WHERE `email` = '$email' LIMIT 1";

			$user = $this->query($sql);
			$res = new Response_Obj();

			if(!empty($user)) {
				$res->message = 'E-mail already registered.';
				$res->responseCode = 400;
			} else {
				$res->message = 'E-mail ok.';
				$res->responseCode = 200;
			}

			return $res;
		}

		public function logoutCompany() {
			if($_POST['action'] != 'logoutCompany') {
				echo "Invalid action supplied for logoutCompany.";
			}

			$_SESSION['company'] = array(
				'id' => '',
				'name' => '',
				'email' => ''
			);
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

		public function activateCompany($email, $token) {
			if($_POST['action'] != 'activateCompany') {
				return "Invalid action supplied for activateCompany.";
			}
			
			$email = $this->sanitizeValue($email);
			$token = $this->sanitizeValue($token);

			$company = $this->fetchCompanyForActivation($email, $token);
			
			$res = new Response_Obj();

			if(!isset($company) || $company['isActivationTokenExpired'] || $this->isActivationTokenExpired($company['tokenSent'], $this->_expirationPeriod)) {
				$res->responseCode = 400;
				$res->message = "Session expired.";
			} else {
				$sql = "UPDATE `company` SET `isActivated` = 1, `isActivationTokenExpired` = 1 WHERE `email` = '$email' and tempActivationToken = '$token'";
				$this->query($sql);

				$res->responseCode = 200;
				$res->message = "Session activated.";
			}

			echo json_encode($res);
		}

		public function companyForgotPassword($email) {
			if($_POST['action'] != 'companyForgotPassword') {
				return "Invalid action supplied for companyForgotPassword.";
			}

			$email = $this->sanitizeValue($email);
			$token = $this->generateToken($email);
		
			if(($this->companyVerifyEmail($email)->responseCode == 400)) {
				$sql = "UPDATE `company` SET `tempResetToken` = '$token', `resetTokenSent` = now(), `isResetTokenExpired` = 0 WHERE `email` = '$email'";

				try {
				    $this->getDb()->beginTransaction();
					$this->getDb()->exec($sql);		
				    $this->getDb()->commit();

				    $mh = new Mail_Handler();
					$mh->sendResetPasswordEmail($email, $this->generateResetLink($email, $token));

					echo "Reset password was successful. Check your inbox!";
			    }
				catch(PDOException $e) {
				    $this->getDb()->rollback();
				    echo "Error: " . $e->getMessage();
			    }
			}
			else {
				echo "The e-mail address you used was not recognised. Please try again!";
			}			
		}

		public function companyResetPassword($email, $password) {
			if($_POST['action'] != 'companyResetPassword') {
				return "Invalid action supplied for companyResetPassword.";
			}

			$email = $this->sanitizeValue($email);
			$password = $this->sanitizeValue($password);
			$userhash = $this->_getHashFromPassword($password);
		
			$query = "UPDATE `company` SET `password` = '$userhash' WHERE `email` = '$email'";
			
			try {
			    $this->getDb()->beginTransaction();
				$this->getDb()->exec($query);		
			    $this->getDb()->commit();

				echo "Reset password was successful.";
		    }
			catch(PDOException $e) {
			    $this->getDb()->rollback();
			    echo "Error: " . $e->getMessage();
		    }			
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
				$this->query($sql);
				$res->message = 'Company and token valid.';
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

		private function generateVefificationLink($email, $token) {
			if(!$email || !$token) {
				throw new Exception('missing key info');
				exit();
			}
			return $this->ROOT."/verify?email=".$email."&token=".$token;
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

		private function isActivationTokenExpired($sentTime, $limit) {
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
	}
?>
