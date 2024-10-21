import axios from "axios";
import { Crop } from "../interfaces/AdminTypes";

export const addCrops = async (crops: Crop[]) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}/add-crops`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crops),
    });
    return response.json(); // Assuming the response is in JSON format
  } catch (error) {
    console.error('Error adding crops:', error);
    return error;
  }
};


export const getCrops = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_CANISTER_URL}/crops`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    console.error('Error fetching crops:', error);
    return error;
  }
};

