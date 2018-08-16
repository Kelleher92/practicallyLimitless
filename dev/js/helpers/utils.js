import FlashNotification, {openSnackbar} from '../components/FlashNotification';

const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordPattern = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/;

export const isValidEmail = (input) => {
    return emailPattern.test(input) ? true : openSnackbar({message: 'Entered e-mail address is invalid.'}); false;
}

export const isValidPassword = (input) => {
    return passwordPattern.test(input) ? true : openSnackbar({message: 'Password must be at least 8 characters, at least one uppercase and at least one numeric character.'}); false;
}

export const isValidString = (input) => {
    return !(input === "") ? true : openSnackbar({message: 'Please fill in all the fields.'}); false;
}

export const doPasswordsMatch = (input, confirm) => {
    return (input === confirm) ? true : openSnackbar({message: 'Your password and confirm password do not match.'}); false;
}

export const dateIsNotPast = (input) => {
	var then = new Date(input);
	var today = new Date();
    return !(then < today) ? true : openSnackbar({message: 'Date cannot be in the past.'}); false;
}

export const areAllFieldsComplete = (input) => {
	for(var i = 0; i < input.length; i++) {
		if(input[i] === "") {
			openSnackbar({message: 'Please fill in all the fields.'}); 
			return false;
		}  
	}
	return true;	
}