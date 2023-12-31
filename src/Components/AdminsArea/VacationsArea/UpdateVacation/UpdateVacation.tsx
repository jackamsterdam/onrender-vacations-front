import { Typography, TextField, Button } from '@mui/material/'
import SendIcon from '@mui/icons-material/Send';
import { SyntheticEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../../Models/VacationModel";
import notify from "../../../../Services/NotifyService";
import vacationsService from "../../../../Services/VacationsService";
import "./UpdateVacation.css";
import authService from '../../../../Services/AuthService';

function UpdateVacation(): JSX.Element {

    const [minFromDate, setMinFromDate] = useState('')
    const [minToDate, setMinToDate] = useState(new Date().toISOString().split('T')[0])

    const params = useParams()
    const vacationId = +params.vacationId

    const { register, handleSubmit, formState, setFocus, setValue } = useForm<VacationModel>()
    const navigate = useNavigate()

    useEffect(() => {
        setFocus('destination')
    }, [setFocus])


    useEffect(() => {

        (async function () {

            try {

                const vacation = await vacationsService.getOneVacation(vacationId)

                setValue('destination', vacation.destination)
                setValue('description', vacation.description)
                setValue('fromDate', vacation.fromDate.slice(0, 10))
                setValue('toDate', vacation.toDate.slice(0, 10))
                setValue('star', vacation.star)
                setValue('rating', vacation.rating)
                setValue('review', vacation.review)
                setValue('price', vacation.price)

                setMinFromDate(vacation.fromDate.split('T')[0])
                setMinToDate(vacation.toDate.split('T')[0])

            } catch (err: any) {
                if (err.response.status === 401) {
                    authService.logout()
                    navigate('/login')
                } else {
                    notify.error(err)
                }
            }
        })()
    }, [])

    function changeMinFromDate(e: SyntheticEvent) {
        const fromSelectedDateValue = (e.target as HTMLInputElement).value

        if (fromSelectedDateValue === '') return
        const selectedDate = new Date(fromSelectedDateValue)
        const dayAfterTommorow = new Date(selectedDate.getTime() + 86400000).toISOString().split('T')[0]

        setMinToDate(dayAfterTommorow)
    }

    async function submit(vacation: VacationModel) {

        try {

            vacation.vacationId = vacationId

            await vacationsService.updateVacation(vacation)
            notify.success('Vacation updated')
            navigate('/admin/home')

        }
        catch (err: any) {
            if (err.response.status === 401) {
                authService.logout()
                navigate('/login')
            } else {
                notify.error(err)
            }
        }
    }

    return (
        <div className="UpdateVacation">
            <form onSubmit={handleSubmit(submit)} noValidate>
                <Typography variant="h4">Edit Vacation</Typography>
                <br />
                <TextField InputLabelProps={{ shrink: true }} label="Destination" variant="filled" type="text" className="TextBox" {...register('destination', {
                    required: { value: true, message: "Missing destination" },
                    minLength: { value: 2, message: "Destination length is too short" },
                    maxLength: { value: 100, message: "Destination length is too long" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.destination?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} label="Description" variant="filled" type="text" className="TextBox" {...register('description', {
                    required: { value: true, message: "Missing description" },
                    minLength: { value: 2, message: "Description length is too short" },
                    maxLength: { value: 1000, message: "Description length is too long" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.description?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} variant="filled" label="From" type="date" className="TextBox" inputProps={{ min: minFromDate }} {...register('fromDate', {
                    onChange: changeMinFromDate,
                    required: { value: true, message: "Missing date" }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.fromDate?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} variant="filled" label="To" type="date" inputProps={{ min: minToDate, format: 'YYYY/MM/DD' }} className="TextBox" {...register('toDate', {
                    required: { value: true, message: "Missing date" },
                    min: { value: minToDate, message: "Date can't be before previous date" }
                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.toDate?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} inputProps={{ step: 0.01 }} variant="filled" label="Price" type="number" className="TextBox" {...register('price', {
                    required: { value: true, message: "Missing price" },
                    min: { value: 0, message: "Price can't be negative" },
                    max: { value: 100000, message: "Price can't exceed 100,000" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.price?.message}</Typography>

                <TextField InputLabelProps={{ shrink: true }} label="Star" type="number" variant="filled" className="TextBox" inputProps={{ max: 5, min: 1 }}   {...register('star', {
                    required: { value: true, message: "Missing stars" },
                    min: { value: 0, message: "Star count can't be negative" },
                    max: { value: 5, message: "Stars can't exceed 5" }

                })} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.star?.message}</Typography>

                <label className='ImageUploader'>Image:</label>
                {/* Image not required if customer doesnt find the old photo will give him the previous one */}
                <input type="file" accept="image/*" className="TextBox" {...register('image')} />
                <Typography component="span" className="ErrorMsg">{formState.errors?.image?.message}</Typography>

                <Button type="submit" endIcon={<SendIcon />} fullWidth color="primary" variant="contained">Update</Button>
            </form>
        </div>
    );
}

export default UpdateVacation;
