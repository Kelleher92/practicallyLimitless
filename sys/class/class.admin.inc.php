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
			
			$res = new Response_Obj();
		
			if($this->isUniqueForCompanies('email', $email)) {
				$query ="INSERT INTO company". "(companyId, name, email, address, password, tempActivationToken, tokenSent) ";
				$values = "values ('$companyId', '$uname', '$email', '$address', '$userhash', '$token', now())";

				try {
				    $this->getDb()->beginTransaction();
				    $this->getDb()->exec($query . $values);		
				    $this->getDb()->commit();

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
						$_SESSION['company'] = array(
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

		public function logoutCompany() {
			if($_POST['action'] != 'logoutCompany') {
				echo "Invalid action supplied for logoutCompany.";
			}

			$_SESSION['company'] = array(
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
				* 
				FROM `company`
				WHERE `companyId` = '$companyId'
				LIMIT 1";

			$res = new Response_Obj();

			$company = $this->query($sql);

			if(!empty($company)) {
				$res->message = 'Successful fetch.';
				$res->responseCode = 200;
				$res->data = $company[0];
			} else {
				$res->message = 'No company found.';
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

		public function activateCompany($email, $token) {
			if($_POST['action'] != 'activateCompany') {
				return "Invalid action supplied for activateCompany.";
			}
			
			$email = $this->sanitizeValue($email);
			$token = $this->sanitizeValue($token);

			$company = $this->fetchCompanyForActivation($email, $token);
			
			$res = new Response_Obj();

			if(!isset($company) || $company['isActivationTokenExpired'] || $this->isTokenExpired($company['tokenSent'], $this->_expirationPeriod)) {
				$res->responseCode = 400;
				$res->message = "Session expired.";
			} else {
				$sql = "UPDATE `company` SET `isActivated` = 1, `isActivationTokenExpired` = 1 WHERE `email` = '$email' and tempActivationToken = '$token'";
				$this->insertQuery($sql);

				$res->responseCode = 200;
				$res->message = "Company activated.";
			}

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
				    $this->getDb()->beginTransaction();
					$this->getDb()->exec($sql);		
				    $this->getDb()->commit();

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
			    $this->getDb()->beginTransaction();
				$this->getDb()->exec($query);		
			    $this->getDb()->commit();

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

		public function processPayment($token) {
			$res = new Response_Obj();

			// if() {
				$res->message = 'Payment success.';
				$res->responseCode = 200;
			// } else {
				// $res->message = 'Payment processed successfully.';
				// $res->responseCode = 200;
			// }

			return $res;
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
