import axios from "axios";


const API_URL = "http://127.0.0.1:8000/api/trips";


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