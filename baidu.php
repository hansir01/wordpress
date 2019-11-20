<?php
$urls = array(
    'http://www.younghb.com/?p=102',
    'http://www.younghb.com/?p=100',
    'http://www.younghb.com/?p=98',
    'http://www.younghb.com/?p=96',
    'http://www.younghb.com/?p=93',
    'http://www.younghb.com/?p=91',
);
$api = 'http://data.zz.baidu.com/urls?site=www.younghb.com&token=wveTpPxMcxUmG52i';
$ch = curl_init();
$options =  array(
    CURLOPT_URL => $api,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => implode("\n", $urls),
    CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
);
curl_setopt_array($ch, $options);
$result = curl_exec($ch);
echo $result;