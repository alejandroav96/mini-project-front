import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { firebase } from "../../helpers/firebase";
import { Auth } from "../../helpers/providers/auth";
import './SignIn.scss';

export interface SignInProps { }

export const SignIn: React.FC<SignInProps> = () => {
    const [error, setError] = useState(null);
    const isSignIn = useContext(Auth);
    let history = useHistory();

    useEffect(() => {
        redirect();
    });

    const redirect = () => {
        if (isSignIn) history.push("/profile");
    }

    const { register, handleSubmit, formState, errors, reset } = useForm({
        mode: 'onChange',
    });

    const onSubmit = (data: any) => {
        reset();
        firebase.auth.signInWithEmailAndPassword(data.email, data.password).then((authUser: any) => {
        }).catch(error => {
            setError(error.message);
        });
    }

    const googleSignIn = () => {
        firebase.auth.signInWithPopup(firebase.google).then((authUser: any) => {
        }).catch(error => {
            setError(error.message);
        });
    }

    const goSignUp = () => {
        history.push("/signup");
    }

    return (
        <div>
            <Container maxWidth="sm" className="container">
            {error && <p className="error">{error}</p>}
                <form>
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
                </form>
                <div className="container-button">
                    <Button onClick={handleSubmit(onSubmit)} variant="contained" disabled={!formState.isValid} className="button">SignIn</Button>
                    <Button variant="contained" color="primary" onClick={googleSignIn} className="button">Signin With Google</Button>
                    <p>Or</p>
                    <Button variant="contained" color="secondary" onClick={goSignUp}>SignUp now!</Button>
                </div>

                

            </Container>
        </div>
    )
}