<?php 
function replace_string_in_file($filename, $string_to_replace, $replace_with){
    $content=file_get_contents($filename);
    $content_chunks=explode($string_to_replace, $content);
    $content=implode($replace_with, $content_chunks);
    file_put_contents($filename, $content);
}
$str=file_get_contents('index.html');
//get config variable from heroku
$configVar = getenv('apiKey');
replace_string_in_file($str, 'apiKeyFirebase', $configVar);

include_once("index.html"); 

?>
