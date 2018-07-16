<?php
	$DB_ACCESS = array();

	/**
	 * server name
	 */
	$DB_ACCESS['DB_HOST'] = getenv('DB_HOST');

	/**
	 * user name
	 */
	$DB_ACCESS['DB_USER'] = getenv('DB_USER');

	/**
	 * passoword if any
	 */
	$DB_ACCESS['DB_PASS'] = getenv('DB_PASS');

	/**
	 * database name
	 */
	$DB_ACCESS['DB_NAME'] = getenv('DB_NAME');

?>
