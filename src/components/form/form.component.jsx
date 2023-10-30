import React, {useState} from 'react';
import { useForm } from 'react-hook-form';
import styles from "./styles.module.scss";
import {useMessage} from "../hooks/useMessage";

export const Form = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { message, status, setStatus } = useMessage();


    const onSubmit = async data => {
        await message(data);
        console.log(data);
        setOpenPopup(true);
    }
    console.log(errors);

    return (
<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.form}>
                <p>Заполните форму ниже и мы с вами свяжемся!</p>
                <input
                    type="text"
                    placeholder="Name"
                    aria-invalid={errors.name ? "true" : "false"}
                    {...register("Name", {required: true, pattern: /^[A-Za-z]+$/i})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    aria-invalid={errors.mail ? "true" : "false"}
                    {...register("Email", {required: "Email address is required"})} />
                <input type="tel"
                       placeholder="Mobile Number"
                       aria-invalid={errors.phone ? "true" : "false"}
                       {...register("Mobile Number", {required: true, pattern: /^[+]?[(]?[0-9]{1,3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,12}$/i})} />
                <textarea {...register("Message", {max: 300, min: 0, maxLength: 400})} />
                <input type="submit" />
            </div>
        </form>
    {!!openPopup &&
        <div className={styles.modal} onClick={()=> setOpenPopup(false)}>
            {errors.name && <p role="alert">{errors.name.message}</p>}
            {errors.mail && <p role="alert">{errors.mail.message}</p>}
            {errors.phone && <p role="alert">{errors.phone.message}</p>}
            {status}
        </div>
    }
</>
    )
};
