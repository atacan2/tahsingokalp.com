<?php
$mtime = explode(" ",microtime());
$starttime = $mtime[1] + $mtime[0];
/**
 * Project Euler Problem 1
 * If we list all the natural numbers below 10 that are multiples of 3 or 5,
 * we get 3, 5, 6 and 9. The sum of these multiples is 23. Find the sum of all the multiples of 3 or 5 below 1000.
 */
$sayilar=array();
for ($i = 1; $i <= 999; $i++) {
	if($i%3==0 || $i%5==0){
		array_push($sayilar,$i);
	}
}
echo array_sum($sayilar).'<br />';
$mtime = explode(" ",microtime());
$endtime = $mtime[1] + $mtime[0];
echo ($endtime - $starttime)." saniye";