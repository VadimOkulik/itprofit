import {useCallback, useState} from "react";
import axios from "axios";

const Status = {
    pending: "pending",
    success: "success",
    loading: "loading",
    error: "error",
}

export const useMessage = () => {
    const [status, setStatus] = useState(Status.pending);

    const message = useCallback(
        async (state) => {
            const { name, email, phone, text } = state;

            if (name === null || email === null || phone === null || text === null) {
                return;
            }

            setStatus(Status.loading);

            await axios
                .post("http://localhost:9090/api/registration", state)
                .then(() => setStatus(Status.success))
                .catch(() => setStatus(Status.error));
        },
        [setStatus]
    );

    return {
        status,
        setStatus,
        message,
    };
};

