import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Edit from '@material-ui/icons/Edit';
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toBase64 } from '../../helpers/base64';
import { Auth } from "../../helpers/providers/auth";
import { INITIAL_USER, User } from "../../models/User";
import { ProfileService } from "../../services/profile";
import './Profile.scss';

export interface ProfileProps { }

export const Profile: React.FC<ProfileProps> = () => {
    const [edit, setEdit] = useState<Boolean>(false);
    const [error, setError] = useState(null);
    const [user, setUser] = useState<User>(INITIAL_USER);
    const [call, setCall] = useState(false);
    const isSignIn = useContext(Auth);
    let history = useHistory();

    useEffect(() => {
        redirect();
        getData();
    });

    const redirect = () => {
        if (!isSignIn) history.push("/");
    }

    const getData = () => {
        if (!call) {
            ProfileService.get().then((res: any) => {
                setUser(res.data);
            }).catch(error => {
                setError(error.message);
            })
        }
        setCall(true);
    }

    const { register, handleSubmit, errors } = useForm({
        mode: 'onSubmit',
    });

    const onSubmit = async (data: any) => {
        if (data.image[0]) {
            data.image = await toBase64(data.image[0]);
            user.image = data.image;
        } else data.image = null;
        ProfileService.update(data).then((res: any) => {
            changeEdit();
            user.name = data.name;
            user.description = data.description;
            setUser(user);
        }).catch(error => {
            setError(error.message);
        })
    }

    const changeEdit = () => {
        setEdit(!edit);
    }

    if (!edit) {
        return (
            <div className="container-card-wrapper">
                <Card className="container-card">
                    <CardHeader
                        avatar={
                            <Avatar aria-label={user.name}>
                                {user.name[0]}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings" onClick={changeEdit}>
                                <Edit />
                            </IconButton>
                        }
                        title={user.name}
                        subheader={user.email}
                    />
                    {user.image && (
                        <CardMedia
                            className="image"
                            image={user.image}
                            title={user.name}
                        />
                    )}
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {user.description}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        )
    } else {
        return (
            <Container maxWidth="sm" className="container-profile">
                {error && <p className="error">{error}</p>}
                <form>
                    <div className="container-input">
                        <label>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Alejandro Alvarez"
                            defaultValue={user.name}
                            name="name"
                            ref={register({
                                required: true
                            })}
                            className={errors.name && 'invalid'}
                        />
                    </div>
                    <div className="container-input">
                        <label>Description</label>
                        <textarea
                            typeof="text"
                            id="description"
                            placeholder="I am physical engineer"
                            name="description"
                            defaultValue={user.description}
                            ref={register({ required: true })}
                            className={errors.description && 'invalid'}
                        ></textarea>
                    </div>
                    <div className="container-input">
                        <label>Picture</label>
                        <input accept="image/*" id="image" name="image" ref={register()} type="file" />
                        <label htmlFor="image">
                            <Button variant="contained" color="primary" component="span">
                                Upload
                            </Button>
                        </label>
                    </div>
                </form>
                <div className="container-button-profile">
                    <Button onClick={changeEdit} variant="contained" color="secondary" className="button">Cancel</Button>
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" className="button">Save</Button>
                </div>
            </Container>
        )
    }
}
