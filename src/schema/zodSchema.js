import { z } from "zod";

export const BookingSchema = z.object({
    train_id: z.string()
}).strict()

export const BookingValidationSchema = z.object({
    train_id: z.string(),
    user_id: z.string(),
}).strict()

export const TrainPayload = z.object({
    name: z.string().min(1).max(30),
    start_station: z.string().min(1).max(50),
    end_station: z.string().min(1).max(50),
    time_of_departure: z.string().datetime().refine(date => new Date(date) > new Date(), { message: "Departure time must be in the future" })
}).strict();

export const TrainStationPayload = z.object({
    name: z.string(),
    open_at: z.string(),
    close_at: z.string(),
    img: z.string(),
}).strict();

export const UserCreateSchema = z.object({
    email: z.string().refine((value) => /^[a-zA-Z]+$/.test(value), {
        message:"Invalid email format.",
    }),
    username: z.string(),
    password: z.string().min(12),
  }).strict();
