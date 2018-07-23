<?php
	require 'PHPMailer/src/PHPMailer.php';
	require 'PHPMailer/src/SMTP.php';
	require 'PHPMailer/src/Exception.php';
	
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	class Mail_Handler {
		public function sendVerificationEmail($email, $verificationLink) {
			$mail = new PHPMailer(true);                              // Passing `true` enables exceptions
			try {
			    //Server settings
			    $mail->SMTPDebug = false;                             // Disable verbose debug output
			    $mail->isSMTP();                                      // Set mailer to use SMTP
			    $mail->Host = getenv('EMAIL_HOST');   		 		  // Specify main server
			    $mail->SMTPAuth = true;                               // Enable SMTP authentication
			    $mail->Username = getenv('EMAIL_UNAME');              // Username
			    $mail->Password = getenv('EMAIL_PASS');               // Password    			 
			    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
			    $mail->Port = getenv('EMAIL_PORT');                   // TCP port to connect to
			    //Recipients
			    $mail->setFrom('iankelleher92@gmail.com', 'Mailer');
			    $mail->addAddress($email);              
			    $mail->addReplyTo('iankelleher92@gmail.com', 'Information');
			   
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
			    $mail->SMTPDebug = false;                             // Disable verbose debug output
			    $mail->isSMTP();                                      // Set mailer to use SMTP
			    $mail->Host = getenv('EMAIL_HOST');   		 		  // Specify main server
			    $mail->SMTPAuth = true;                               // Enable SMTP authentication
			    $mail->Username = getenv('EMAIL_UNAME');              // Username
			    $mail->Password = getenv('EMAIL_PASS');               // Password    			 
			    $mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
			    $mail->Port = getenv('EMAIL_PORT');                   // TCP port to connect to
			    //Recipients
			    $mail->setFrom('iankelleher92@gmail.com', 'Mailer');
			    $mail->addAddress($email);              
			    $mail->addReplyTo('iankelleher92@gmail.com', 'Information');
			   
			    //Content
			    $mail->isHTML(true);                                  // Set email format to HTML
			    $mail->Subject = 'Please click below to reset your password';
			    $mail->Body = "<a href =".$resetLink.">".$resetLink."</a>";
			    $mail->AltBody = $resetLink;
				
			    $mail->send();
			} catch (Exception $e) {
			    echo 'Mailer Error: ' . $mail->ErrorInfo;
			}
		}
	}
?>
