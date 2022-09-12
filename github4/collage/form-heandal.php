<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email from 'udayvasoya603@gmail.com'

$email_subject = 'new form submmision';

$email_body = "user name: $name.\n".
               "user email: $visitor_email.\n".
               "subject: $subject.\n".
               "user message: $message.\n".;

 $to 'dhruvgohil530@gmail.com';
 
 $headers = "from: $email_from \r\n";

 $headers .= "Reply to: $visitor email \r\n";

 mail($to,$email subject,$email body,$headers);

 header("location: contact.html");



?>