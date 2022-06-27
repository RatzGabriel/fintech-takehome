<?php
$date = $_POST['transaction-date'];
$amount = $_POST['transaction-amount'];
$merchant = $_POST['transaction-merchant'];
$authToken = $_POST['authToken'];

$data = array(
  'authToken' => $authToken,
  'created' => $date,
  'amount' => $amount,
  'merchant' => $merchant,
);

$options = array(
  'http' => array(
    'method' => 'POST',
    'header' => "Content-Type: application/x-www-form-urlencoded\r\n",
    'content' => http_build_query($data)
  ),
);

$url = 'https://www.expensify.com/api?command=CreateTransaction';
$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo $result;