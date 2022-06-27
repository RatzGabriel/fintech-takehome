<?php
$authToken = $_GET['authToken'];

$data = array(
  'authToken' => $authToken,
  'returnValueList' => 'transactionList',
);

$url = 'https://www.expensify.com/api?command=Get' . '&' . http_build_query($data);
$result = file_get_contents($url, false);

echo $result;
