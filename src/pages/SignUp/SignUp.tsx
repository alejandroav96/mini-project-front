import Button from "@material-ui/core/Button";
import Container from '@material-ui/core/Container';
import React, { useState } from "react";
import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import { Loading } from "../../components/Loading/Loading";
import { toBase64 } from "../../helpers/base64";
import { firebase } from '../../helpers/firebase';
import { UsersService } from '../../services/users';
import './SignUp.scss';

export interface SignUpProps { }

export const SignUp: React.FC<SignUpProps> = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState<Boolean>(false);

    const { register, handleSubmit, formState, errors, reset } = useForm({
        mode: 'onChange',
    });

    let history = useHistory();

    const onSubmit = async (data: any) => {
        setLoading(true);
        data.image = await toBase64(data.image[0]);
        firebase.auth.createUserWithEmailAndPassword(data.email, data.password).then((authUser: any) => {
            data.uid = authUser.user.uid;
            UsersService.create(data).then((res: any) => {
                history.push("/profile");
                reset();
            }).catch(error => {
                setLoading(false);
                setError(error.message);
            })
        }).catch(error => {
            setLoading(false);
            setError(error.message);
        });
    }

    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <div>
                <Container maxWidth="sm" className="container-signup">
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="container-input">
                            <label>Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Alejandro Alvarez"
                                name="name"
                                ref={register({ required: true })}
                                className={errors.name && 'invalid'}
                            />
                        </div>
                        <div className="container-input">
                            <label>Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="alejandro.alvarez@ceiba.com.co"
                                name="email"
                                ref={register({
                                    required: true
                                })}
                                className={errors.email && 'invalid'}
                            />
                        </div>
                        <div className="container-input">
                            <label>Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="password"
                                name="password"
                                ref={register({
                                    required: true
                                })}
                                className={errors.password && 'invalid'}
                            />
                        </div>
                        <div className="container-input">
                            <label>Description</label>
                            <textarea
                                typeof="text"
                                id="description"
                                placeholder="I am physical engineer"
                                name="description"
                                ref={register({ required: true })}
                                className={errors.description && 'invalid'}
                            ></textarea>
                        </div>
                        <div className="container-input">
                            <label>Picture</label>
                            <input accept="image/*" id="image" name="image" ref={register({ required: true })} type="file" />
                            <label htmlFor="image">
                                <Button variant="contained" color="primary" component="span">
                                    Upload
                            </Button>
                            </label>
                            <Button type="submit" variant="contained" disabled={!formState.isValid} className="button">SignUp</Button>
                        </div>
                    </form>
                </Container>
            </div>
        )
    }
}