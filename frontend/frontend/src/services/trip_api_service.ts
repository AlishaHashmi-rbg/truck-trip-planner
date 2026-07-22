import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;


export const generateTrip = async (data: {
    current_location: string;
    pickup_location: string;
    dropoff_location: string;
    cycle_used: number;
}) => {

    const response = await axios.post(
        `${API_URL}/generate/`,
        data
    );

    return response.data;
};