import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { User } from "firebase";
import React, { useContext, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { firebase } from '../../helpers/firebase';
import { Auth } from "../../helpers/providers/auth";
import './Header.scss';


export interface HeaderProps { }

export const Header: React.FC<HeaderProps> = () => {
    const [user, setUser] = useState<User>();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const isSignIn = useContext(Auth);

    useEffect(() => {
        getEmail();
    });

    const getEmail = () => {
        if (isSignIn) {
            let user = firebase.auth.currentUser;
            if (user) setUser(user);
        }
        else setUser(undefined);
    }
    const signOut = () => {
        firebase.auth.signOut().then(() => { });
    }

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="base">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className="title">
                        <Link to="/" className="link">Home</Link>
                    </Typography>
                    {!user && (
                        <Link to="/signin" className="link">
                            <Button variant="contained" color="secondary">signIn</Button>
                        </Link>
                    )}
                    {user && (
                        <div>

                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                                onClick={handleMenu}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <Link to="/profile" className="link-menu">
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                </Link>
                                <Link to="/" onClick={signOut} className="link-menu">
                                    <MenuItem onClick={handleClose}>Sign out</MenuItem>
                                </Link>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    )
}