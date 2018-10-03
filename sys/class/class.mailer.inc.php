<?php
	require 'PHPMailer/src/PHPMailer.php';
	require 'PHPMailer/src/SMTP.php';
	require 'PHPMailer/src/Exception.php';
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	class Mailer {
		public function sendVerificationEmail($email, $verificationLink) {
			$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
			try {
			    //Server settings
			    $mail->SMTPDebug = 2;                              // Disable verbose debug output
			    $mail->isSMTP();                                      // Set mailer to use SMTP
			    $mail->Host = "smtp.gmail.com";   		 		  // Specify main server
			    $mail->SMTPAuth = true;                               // Enable SMTP authentication
			    //$mail->Username = getenv('EMAIL_UNAME');              // Username
			    //$mail->Password = getenv('EMAIL_PASS'); 

			    $mail->Username = "phoebestaab@gmail.com";
				//Password to use for SMTP authentication
				$mail->Password = "60221phoebe";              // Password    			 
			    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
			    $mail->Port = getenv('EMAIL_PORT');                   // TCP port to connect to
			    //Recipients
			    $mail->setFrom('phoebestaab@gmail.com', 'Mailer');
			    $mail->addAddress($email);              
			    $mail->addReplyTo('phoebestaab@gmail.com', 'Information');
			   
			    //Content
			    $mail->isHTML(true);                                  // Set email format to HTML
			    $mail->Subject = 'Please click below to verify your identity';
			    $mail->Body = "<a href =".$verificationLink.">".$verificationLink."</a>";
			    $mail->AltBody = $verificationLink;
				
			    $mail->send();
			} catch (Exception $e) {
			    echo 'Mailer Error: ' . $mail->ErrorInfo;
			}
		}	

		

		public function sendResetPasswordEmail($email, $resetLink) {
			$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
			try {
			    //Server settings
			    $mail->SMTPDebug = 2;                              // Disable verbose debug output
			    $mail->isSMTP();                                      // Set mailer to use SMTP
			    $mail->Host = "smtp.gmail.com";   		 		  // Specify main server
			    $mail->SMTPAuth = true;                               // Enable SMTP authentication
			    //$mail->Username = getenv('EMAIL_UNAME');              // Username
			    //$mail->Password = getenv('EMAIL_PASS'); 

			    $mail->Username = "phoebestaab@gmail.com";
				//Password to use for SMTP authentication
				$mail->Password = "60221phoebe";              // Password    			 
			    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
			    $mail->Port = getenv('EMAIL_PORT');                   // TCP port to connect to
			    //Recipients
			    $mail->setFrom('phoebestaab@gmail.com', 'Mailer');
			    $mail->addAddress($email);              
			    $mail->addReplyTo('phoebestaab@gmail.com', 'Information');
			   
			    //Content
			    $mail->isHTML(true);                                  // Set email format to HTML
			    $mail->Subject = 'Please click below to reser your password';
			    $mail->Body = "<a href =".$resetLink.">".$resetLink."</a>";
			    $mail->AltBody = $resetLink;
				
			    $mail->send();
			} catch (Exception $e) {
			    echo 'Mailer Error: ' . $mail->ErrorInfo;
			}
		}
	}
?>
