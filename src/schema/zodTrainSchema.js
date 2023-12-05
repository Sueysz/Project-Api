import { z } from "zod";

export const trainPayload = z.object({
    name: z.string().min(1).max(30),
    start_station: z.string().min(1).max(50),
    end_station: z.string().min(1).max(50),
    time_of_departure: z.string().datetime().refine(date => new Date(date) > new Date(), { message: "Departure time must be in the future" })
});

export const trainStationPayload = z.object({
    name: z.string(),
    open_at: z.string(),
    close_at: z.string(),
    img: z.string(),
});

