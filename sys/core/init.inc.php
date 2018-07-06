<?php 
	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	/*
	 * Enable sessions
	 */
	session_start();
	/*
	 * Generate an anti-CSRF token if one doesn't exist
	 */

	if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY'] > 3600)) {
	    // last request was more than 10 minutes ago
	    session_unset();     // unset $_SESSION variable for the run-time 
	    session_destroy();   // destroy session data in storage
	}
	$_SESSION['LAST_ACTIVITY'] = time(); // update last activity time stamp

	

	if ( !isset($_SESSION['token']) ){
	 	$_SESSION['token'] = (uniqid(mt_rand(), TRUE));
	}

	
	/**
	 * Define constants for db config
	 */
	include_once dirname(dirname(__FILE__)).'/config/db_cred.inc.php';
	// include_once '../engine-sys/config/db_cred.inc.php';
	foreach($DB_ACCESS as $name => $value) {
		define($name, $value);
	}
	
	/**
	 * Define constants for cipher config
	 */
	// include_once '../engine-sys/config/cipher_config.inc.php';
	include_once dirname(dirname(__FILE__)).'/config/cipher_config.inc.php';
	foreach($CIPHER as $name => $value) {
		define($name,  $value);
	}

	/**
	 * define chain config
	 * @param {}
	 */
	// include_once '../engine-sys/config/chain_config.inc.php';
	include_once dirname(dirname(__FILE__)).'/config/chain_config.inc.php';
	foreach($CHAIN as $name => $value) {
		define($name,  $value);
	}

	/**
	 * database object
	 */
	$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
	$dbo = new PDO($dsn, DB_USER, DB_PASS);


	

	function autoLoad($className) {
        $filename = dirname(dirname(__FILE__)).'/class/class.'. $className . '.inc.php';
 
        $filename = str_replace('\\', '/', strtolower($filename));
        if(file_exists($filename)) {
            require_once($filename);
        }
        else {
            echo "$filename not found<br>\n";
        }
    }

    function autoLoadInterface($interfaceName) {
        $filename = dirname(dirname(__FILE__)).'/interface/interface.'. $interfaceName . '.inc.php';
 
        $filename = str_replace('\\', '/', strtolower($filename));
        if(file_exists($filename)) {
            require_once($filename);
        }
        else {
            echo "$filename not found<br>\n";
        }
    }

	// Next, register it with PHP.
	spl_autoload_register('autoLoad');
	//spl_autoload_register('autoLoadInterface');
?>