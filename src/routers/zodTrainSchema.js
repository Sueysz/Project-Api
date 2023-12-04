import {z} from "zod";

export const trainCreationPayload = z.object({
    name: z.string(),
    start_station: z.string(),
    end_station: z.string(),
    time_of_departure: z.date(),
});