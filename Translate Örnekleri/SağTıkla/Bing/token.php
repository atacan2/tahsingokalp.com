<?php
$ClientID="ClientID";
$ClientSecret="Secret Key";
$ClientSecret = urlencode ($ClientSecret);
$ClientID = urlencode($ClientID);
//10 dakikalık api erişimi
$url = "https://datamarket.accesscontrol.windows.net/v2/OAuth2-13";
$postParams = "grant_type=client_credentials&client_id=$ClientID&client_secret=$ClientSecret&scope=http://api.microsofttranslator.com";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url); 
curl_setopt($ch, CURLOPT_POSTFIELDS, $postParams);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);  
$rsp = curl_exec($ch); 
print $rsp;
?>