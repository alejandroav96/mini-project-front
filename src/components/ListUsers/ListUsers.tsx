import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import React from "react";
import { User } from "../../models/User";
import './ListUsers.scss';

export interface ListUsersProps {
    user: User;
}

export const ListUsers: React.FC<ListUsersProps> = props => {
    const [open, setOpen] = React.useState(false);
    let user = props.user;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <ListItem alignItems="flex-start" onClick={handleClickOpen}>
                <ListItemAvatar>
                    {user.image ? (<Avatar alt={user.name} src={user.image} />) : (<Avatar>{user.name[0]}</Avatar>)}
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                    secondary={<React.Fragment>
                        {(user.description && user.description.length > 200) ? user.description.substr(0, 200) + "..." : user.description}
                    </React.Fragment>} />
            </ListItem>
            <Divider variant="inset" component="li" />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{user.name}</DialogTitle>
                <DialogContent>
                    {user.image ? <img src={user.image} alt={user.name} className="image-dialog" /> : <b></b>}
                    <DialogContentText id="alert-dialog-description">
                        {user.description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}