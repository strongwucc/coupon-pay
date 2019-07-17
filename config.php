<?php
$config = array(
    'ALIPAY_APPID' => '2018102361827267',
    'KEY' => 'GJSBZ-GNC3W-HJXRF-O4IZ7-37AS7-UUBD7',//腾讯地图api接口key
//    'APPID' => 'wxe413db41714cb4c7',// Miao
//    'APPSECRET' => '42604eded9c04bff44ea7f4230a09bcb', // Miao
    'APPID' => 'wx583be2083a929fb0',// Etone
    'APPSECRET' => 'f1b91e175d32e8a601a7d4d8fe1b8516', // Etone
    'ETONE_ID' => 'yt6eb45ebc33750e02',
    'ETONE_KEY' => '33750e02fa24f170',
    'WXGW_BASE_URL' => 'http://wxgw.yklsh.etonepay.com/',
    'OAUTH_REDIRECT_URL' => 'http://shop00001.yklsh.etonepay.com/wx_oauth_redirect.php',
    'OAUTH_CODE_URL' => 'https://open.weixin.qq.com/connect/oauth2/authorize',
    'OAUTH_TOKEN_URL' => 'https://api.weixin.qq.com/sns/oauth2/access_token',
    'OAUTH_REFRESH_CODE_URL' => 'https://api.weixin.qq.com/sns/oauth2/refresh_token',
    'OAUTH_USERINFO_URL' => 'https://api.weixin.qq.com/sns/userinfo',
    'OAUTH_CODE_URL' => 'https://open.weixin.qq.com/connect/oauth2/authorize',
    'ACCESS_CHECK_TOKEN_URL' => 'https://api.weixin.qq.com/sns/auth',
    'CATERING_BASE_URL' => 'http://ceshi6.sdykt.com.cn:1280/catering/#/',
    'ESHOP_BASE_URL' => 'http://ceshi6.sdykt.com.cn:1280/eshop/#/',
    'FONT_LOC' => 'D:\wamp\www\sellerpok\app\promotion\lib\code\FreeSansBold.ttf',      //条码字体资源
    'GENBARCODE_LOC' => 'D:\wamp\www\sellerpok\app\promotion\lib\code\genbarcode.exe',  //条码生成程序windows
    'RESTAURANT_URL' => 'http://ceshi6.sdykt.com.cn:1280/restaurant/#/',
//    'CODE_FILE_TMP' => 'D:\wamp\www\sellerpok\tmp\code'
    'CODE_FILE_TMP' => 'D:/wamp/www/sellerpok/data/qrcode',
//    'ALLOW_ORIGIN' => 'http://192.168.2.160:8081'
    'PLATFORM_ORIGIN' => 'http://ceshi4.sdykt.com.cn:1280',
    'ALLOW_ORIGIN' => 'http://ceshi4.sdykt.com.cn:1280',
    'WEIXIN_TOKEN' => '571ae9d6c3aedssq75c408jdsws2257f'
//    'ALLOW_ORIGIN' => 'http://ceshi6.sdykt.com.cn:1280'
);
if(!empty($config))
{
    foreach($config as $key=>$value)
    {
        if(!defined(strtoupper($key)))
        {
            define(strtoupper($key),$value);
        }
    }
}

