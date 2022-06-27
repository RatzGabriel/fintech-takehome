<?php
$partnerName = 'applicant';
$partnerPassword = 'd7c3119c6cdab02d68d9';
$userEmail = $_POST['login-email'];
$userPassword = $_POST['login-pass'];

$data = array(
  'partnerName' => $partnerName,
  'partnerPassword' => $partnerPassword,
  'partnerUserID' => $userEmail,
  'partnerUserSecret' => $userPassword,
);

$options = array(
  'http' => array(
    'method' => 'POST',
    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
    'content' => http_build_query($data)
  )
);

$url = 'https://www.expensify.com/api?command=Authenticate';
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;
