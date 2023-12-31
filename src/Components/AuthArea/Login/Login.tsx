import { useNavigate, NavLink } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import "./Login.css";
import { useForm } from 'react-hook-form'
import notify from "../../../Services/NotifyService";
import authService from "../../../Services/AuthService";
import store from "../../../Redux/Store";
import { useEffect } from "react";
import { Typography, TextField, Button } from '@mui/material/'
import SendIcon from '@mui/icons-material/Send';
import socketService from "../../../Services/SocketService";

function Login(): JSX.Element {

    const { register, handleSubmit, formState, setFocus } = useForm<CredentialsModel>()
    const navigate = useNavigate()

    useEffect(() => {
        setFocus("username");
    }, [setFocus]);

    async function submit(credentials: CredentialsModel): Promise<void> {
        try {

            await authService.login(credentials)

            //Check if user role in token is admin and if so navigate to admins portal
            if (store.getState().authState.user.roleId === 2) {
                navigate('/admin/home')
                notify.success('You are now logged-in!')
                return
            }

            notify.success('You are now logged-in!')

            //Open socket connection
            socketService.connect()

            //if user.roleId = 1 -regular user than navigate to home
            navigate('/home')


        } catch (err: any) {
            notify.error(err)
        }
    }

    return (

        <div className="Login">
            <form onSubmit={handleSubmit(submit)} noValidate>
                <TextField className="TextBox" variant="filled" label="Username" type="text" {...register('username', {
                    required: { value: true, message: "Missing username" },
                    minLength: { value: 2, message: "Username must be more than 2 characters" },
                    maxLength: { value: 100, message: "Username must not exceed 100 characters" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.username?.message}</Typography>

                <TextField label="Password" variant="filled" className="TextBox" type="password" {...register('password', {
                    required: { value: true, message: 'Missing password' },
                    minLength: { value: 2, message: "Password must be more than 2 characters" },
                    maxLength: { value: 100, message: "Password must not exceed 100 characters" }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.password?.message}</Typography>

                <Button endIcon={<SendIcon />} type="submit" variant="contained" fullWidth color="primary">Login</Button>

                <p className='RegisterText'>New user? <NavLink to='/register'>Register</NavLink></p>
            </form>
        </div>
    );
}

export default Login;

