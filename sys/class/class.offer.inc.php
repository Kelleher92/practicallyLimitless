<?php
	require 'Stripe/init.php';

	class Offer extends Admin{
		public function insertOffer($companyId, $offerName, $requirements, $expiryDate) {
			if($_POST['action'] != 'insertOffer') {
				return "Invalid action supplied for insertOffer.";
			}

			$companyId = $this->sanitizeValue($companyId);
			$offerName = $this->sanitizeValue($offerName);
			$offerName = $this->sanitizeValue($requirements);
			$expiryDate = $this->sanitizeValue($expiryDate);
			
			$res = new Response_Obj();
		
			$query ="INSERT INTO offer". "(companyId, offerName, requirements, expiryDate) ";
			$values = "values ('$companyId', '$offerName', '$requirements', '$expiryDate')";

			try {
			    $this->insertQuery($query . $values);		

			    $res->responseCode = 200;
			    $res->message = "Your offer was inserted successfully!";
		    }
			catch(PDOException $e) {
			    $this->getDb()->rollback();
			    $res->responseCode = 400;
			    $res->message = "Error: " . $e->getMessage();
		    }		

			return $res;	
		}

		public function processPayment($stripeToken, $amount) {
			$stripeToken = $this->sanitizeValue($stripeToken);
			$amount = $this->sanitizeValue($amount);
			$res = new Response_Obj();

			if(!$stripeToken || !$amount) {
				$res->message = 'Payment failure...please try again';
				$res->responseCode = 400;
			} else {
				$privateKey = getenv('STRIPE_PK');
				\Stripe\Stripe::setApiKey($privateKey);
				
				$charge = \Stripe\Charge::create([
					'amount' => $amount,
					'currency' => 'eur',
					'description' => 'Sample charge',
					'source' => $stripeToken,
				]);

				$res->message = 'Payment success.';
				$res->responseCode = 200;
			}

			return $res;
		}
	}
?>
