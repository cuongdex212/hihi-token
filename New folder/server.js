const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// API xử lý token thật từ Garena / Kiosgamer
app.post('/api/check-token', async (req, res) => {
    const { eatToken } = req.body;
    
    try {
        // Gửi request thật tới máy chủ Garena/Kiosgamer để trích xuất dữ liệu
        const response = await axios.get(`https://discstore.kiosgamer.co.id/api/get_user_info?eat=${eatToken}`);
        
        // Trả về dữ liệu thật cho giao diện Frontend
        res.json({
            success: true,
            nickname: response.data.nickname,
            region: response.data.region,
            account_id: response.data.open_id,
            level: response.data.level,
            access_token: response.data.access_token,
            email: response.data.email
        });
    } catch (error) {
        res.status(400).json({ success: false, message: "Token không hợp lệ hoặc đã hết hạn!" });
    }
});

app.listen(3000, () => console.log('Server đang chạy tại port 3000'));