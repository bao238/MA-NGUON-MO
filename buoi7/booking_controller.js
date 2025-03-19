const moment = require('moment');

// Dữ liệu bookings (tạm thời lưu trong memory)
let bookings = [];

exports.showBooking = (req, res) => {
    res.render('booking');
};

exports.getAllBookings = (req, res) => {
    try {
        console.log('Danh sách bookings hiện tại:', bookings);
        res.json(bookings);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách:', error);
        res.status(500).json({ error: 'Lỗi khi lấy danh sách đặt chỗ' });
    }
};

exports.createBooking = (req, res) => {
    try {
        console.log('Received booking data:', req.body);
        const { customerName, date, time } = req.body;

        if (!customerName || !date || !time) {
            console.log('Thiếu thông tin:', { customerName, date, time });
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
        }

        const bookingDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
        const now = moment();

        // Kiểm tra thời gian đặt chỗ có hợp lệ không
        if (!bookingDateTime.isValid()) {
            console.log('Ngày giờ không hợp lệ:', { date, time });
            return res.status(400).json({ error: 'Ngày giờ không hợp lệ' });
        }

        // Kiểm tra xem thời gian đặt chỗ có trong quá khứ không
        if (bookingDateTime.isBefore(now)) {
            console.log('Thời gian đặt chỗ trong quá khứ:', { date, time });
            return res.status(400).json({ error: 'Không thể đặt chỗ trong quá khứ' });
        }

        const isConflict = bookings.some(booking => 
            booking.date === date && 
            booking.time === time && 
            booking.status !== 'Cancelled'
        );

        if (isConflict) {
            console.log('Trùng lịch:', { date, time });
            return res.status(400).json({ error: 'Thời gian này đã có người đặt' });
        }

        const newBooking = {
            id: Date.now().toString(),
            customerName,
            date,
            time,
            status: 'Pending'
        };

        bookings.push(newBooking);
        console.log('Đã tạo booking mới:', newBooking);
        console.log('Danh sách bookings sau khi thêm:', bookings);
        res.status(201).json(newBooking);
    } catch (error) {
        console.error('Lỗi khi tạo booking:', error);
        res.status(500).json({ error: 'Lỗi khi tạo đặt chỗ' });
    }
};

exports.updateBooking = (req, res) => {
    try {
        const { id } = req.params;
        const { customerName, date, time, status } = req.body;
        console.log('Cập nhật booking:', { id, customerName, date, time, status });

        const booking = bookings.find(b => b.id === id);
        if (!booking) {
            console.log('Không tìm thấy booking:', id);
            return res.status(404).json({ error: 'Không tìm thấy lịch đặt chỗ' });
        }

        // Nếu có cập nhật thông tin đặt chỗ
        if (customerName && date && time) {
            const bookingDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD HH:mm');
            const now = moment();

            // Kiểm tra thời gian đặt chỗ có hợp lệ không
            if (!bookingDateTime.isValid()) {
                console.log('Ngày giờ không hợp lệ:', { date, time });
                return res.status(400).json({ error: 'Ngày giờ không hợp lệ' });
            }

            // Kiểm tra xem thời gian đặt chỗ có trong quá khứ không
            if (bookingDateTime.isBefore(now)) {
                console.log('Thời gian đặt chỗ trong quá khứ:', { date, time });
                return res.status(400).json({ error: 'Không thể đặt chỗ trong quá khứ' });
            }

            // Kiểm tra trùng lịch (trừ chính booking đang sửa)
            const isConflict = bookings.some(b => 
                b.id !== id && 
                b.date === date && 
                b.time === time && 
                b.status !== 'Cancelled'
            );

            if (isConflict) {
                console.log('Trùng lịch:', { date, time });
                return res.status(400).json({ error: 'Thời gian này đã có người đặt' });
            }

            booking.customerName = customerName;
            booking.date = date;
            booking.time = time;
        }

        // Cập nhật trạng thái nếu có
        if (status) {
            booking.status = status;
        }

        console.log('Đã cập nhật booking:', booking);
        res.json(booking);
    } catch (error) {
        console.error('Lỗi khi cập nhật booking:', error);
        res.status(500).json({ error: 'Lỗi khi cập nhật đặt chỗ' });
    }
};

exports.cancelBooking = (req, res) => {
    try {
        const { id } = req.params;
        console.log('Hủy booking:', id);

        const bookingIndex = bookings.findIndex(b => b.id === id);
        if (bookingIndex === -1) {
            console.log('Không tìm thấy booking để hủy:', id);
            return res.status(404).json({ error: 'Không tìm thấy lịch đặt chỗ' });
        }

        bookings[bookingIndex].status = 'Cancelled';
        console.log('Đã hủy booking:', bookings[bookingIndex]);
        res.json(bookings[bookingIndex]);
    } catch (error) {
        console.error('Lỗi khi hủy booking:', error);
        res.status(500).json({ error: 'Lỗi khi hủy đặt chỗ' });
    }
}; 