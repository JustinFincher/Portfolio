<?php

// Clean up the input values
foreach($_POST as $key => $value) {
	if(ini_get('magic_quotes_gpc'))
		$_POST[$key] = stripslashes($_POST[$key]);	
	$_POST[$key] = htmlspecialchars(strip_tags($_POST[$key]));
}

// Assign the input values to variables for easy reference
$firstname = $_POST["firstname"];
$lastname = $_POST["lastname"];
$email = $_POST["email"];
$subject = $_POST["subject"];
$message = $_POST["message"];

// Test input values for errors
$errors = array();
if(strlen($firstname) < 2) {
	if(!$firstname) {
		$errors[] = "You must enter your first name.";
	} else {
		$errors[] = "First name must be at least 2 characters.";
	}
}
if(strlen($lastname) < 2) {
	if(!$lastname) {
		$errors[] = "You must enter your last name.";
	} else {
		$errors[] = "Last name must be at least 2 characters.";
	}
}
if(!$email) {
	$errors[] = "You must enter an email.";
} else if(!validEmail($email)) {
	$errors[] = "You must enter a valid email.";
}
if(strlen($message) < 10) {
	if(!$message) {
		$errors[] = "You must enter a message.";
	} else {
		$errors[] = "Message must be at least 10 characters.";
	}
}

if($errors) {
	// Output errors and die with a failure message
	$errortext = "";
	foreach($errors as $error) {
		$errortext .= "<li>".$error."</li>";
	}
	die("<span class='failure'>The following errors occured:<ul>". $errortext ."</ul></span>");
}

// Send the email
$to = "name@email.com"; // Enter your email address here

$subject = $subject ? $subject : "iFolio Contact Form";
 
// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
 
// Create email headers
$headers .= 'From: '.$email."\r\n".
    'Reply-To: '.$email."\r\n" .
    'X-Mailer: PHP/' . phpversion();
$send_message = "<html><body>";
$send_message .= "<div style='background-color:#eee; padding:40px; font-family: Helvetica Neue, Open Sans, sans-serif;'><h1 style='text-align:center; margin-bottom:0px; text-transform:uppercase;'><strong>$firstname $lastname</h1>";
$send_message .= "<h2 style='text-align:center; margin-bottom:30px;'>$email</h2>";
$send_message .= "<h3 style='border-bottom:1px solid #d6d6d6; padding-bottom:10px; margin-bottom:10px; font-size:17px; text-transform:uppercase; color:#666;'>Subject: $subject</h3>";
$send_message .= "<p style='font-size:17px;'>$message</p></div>";
$send_message .= "</body></html>";

mail($to, $subject, $send_message, $headers);

// Die with a success message
die("<div class='text-success'><i class='fa fa-check'></i> Thank you! Your message has been received. We will get back to you shortly.</div>");

// A function that checks to see if
// an email is valid
function validEmail($email)
{
   $isValid = true;
   $atIndex = strrpos($email, "@");
   if (is_bool($atIndex) && !$atIndex)
   {
      $isValid = false;
   }
   else
   {
      $domain = substr($email, $atIndex+1);
      $local = substr($email, 0, $atIndex);
      $localLen = strlen($local);
      $domainLen = strlen($domain);
      if ($localLen < 1 || $localLen > 64)
      {
         // local part length exceeded
         $isValid = false;
      }
      else if ($domainLen < 1 || $domainLen > 255)
      {
         // domain part length exceeded
         $isValid = false;
      }
      else if ($local[0] == '.' || $local[$localLen-1] == '.')
      {
         // local part starts or ends with '.'
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $local))
      {
         // local part has two consecutive dots
         $isValid = false;
      }
      else if (!preg_match('/^[A-Za-z0-9\\-\\.]+$/', $domain))
      {
         // character not valid in domain part
         $isValid = false;
      }
      else if (preg_match('/\\.\\./', $domain))
      {
         // domain part has two consecutive dots
         $isValid = false;
      }
      else if(!preg_match('/^(\\\\.|[A-Za-z0-9!#%&`_=\\/$\'*+?^{}|~.-])+$/',
                 str_replace("\\\\","",$local)))
      {
         // character not valid in local part unless 
         // local part is quoted
         if (!preg_match('/^"(\\\\"|[^"])+"$/',
             str_replace("\\\\","",$local)))
         {
            $isValid = false;
         }
      }
      if ($isValid && !(checkdnsrr($domain,"MX") || checkdnsrr($domain,"A")))
      {
         // domain not found in DNS
         $isValid = false;
      }
   }
   return $isValid;
}

?>