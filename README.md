Dev branch created 6/7/18

Create new feature branches from dev (call them 'feature/whatever')

Create pull requests back to dev

phpmyadmin config: (add to end of config.inc.php)
$i++;
$cfg['Servers'][$i]['host'] = 'HostName:port'; //provide hostname and port if other than default
$cfg['Servers'][$i]['user'] = 'userName';      //user name for your remote server
$cfg['Servers'][$i]['password'] = 'Password';  //password
$cfg['Servers'][$i]['auth_type'] = 'config';   // leave as config
