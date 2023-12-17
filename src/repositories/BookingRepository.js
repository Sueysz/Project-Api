import { BookingModel } from "../models/BookingModel.js";

class BookingRepository {
    async createBooking(userId, trainId) {
        return BookingModel.create({ user_id: userId, train_id: trainId })
    }

    async getBookingById(id) {
        try {
            return await BookingModel.findOne({ _id: id })
        } catch (error) {
            if (error.message.startsWith('Cast to ObjectId failed for value "')) {
                return null
            }
            throw error
        }
    }
}

export default new BookingRepository();