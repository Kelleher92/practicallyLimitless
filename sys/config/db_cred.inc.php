<?php

	$DB_ACCESS = array();

	/**
	 * server name
	 */
	//$DB_ACCESS['DB_HOST'] = 'f8ogy1hm9ubgfv2s.chr7pe7iynqr.eu-west-1.rds.amazonaws.com';
	$DB_ACCESS['DB_HOST'] = getenv('DB_HOST');

	/**
	 * user name
	 */
	//$DB_ACCESS['DB_USER'] = 'fwrwpolumasf0ilb';
	$DB_ACCESS['DB_USER'] = getenv('DB_USER');

	/**
	 * passoword if any
	 */
	//$DB_ACCESS['DB_PASS'] = 'd7ilnzckkj45v82n';
	$DB_ACCESS['DB_PASS'] = getenv('DB_PASS');

	/**
	 * database name
	 */
	//$DB_ACCESS['DB_NAME'] = 'efqr54vwc4uxerpy';
	$DB_ACCESS['DB_NAME'] = getenv('DB_NAME');	

?>
