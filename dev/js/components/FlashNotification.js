import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
// import Snackbar from 'material-ui/Snackbar';

let openSnackbarFn;

class FlashNotification extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
            message: '',
        };
        this.openSnackbar = this.openSnackbar.bind(this);
        this.handleSnackbarClose = this.handleSnackbarClose.bind(this);
    }

    componentDidMount() {
        openSnackbarFn = this.openSnackbar;
    }

    openSnackbar({ message }) {
        this.setState({
            open: true,
            message,
        });
    };

    handleSnackbarClose() {
        this.setState({
            open: false,
            message: '',
        });
    };

    render() {
        const message = (
            <span
                id="snackbar-message-id"
                dangerouslySetInnerHTML={{ __html: this.state.message }}   // This allows us to add HTML code to the Snackbar’s message prop.
            />
        );

        return (
            <Snackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                message={message}
                autoHideDuration={3000}
                onClose={this.handleSnackbarClose}
                open={this.state.open}
            />
        );
    }
}

export function openSnackbar({ message }) {
    openSnackbarFn({ message });
}

export default FlashNotification;