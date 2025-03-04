const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const QRCode = require('qrcode')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/qrcode')
.then(() => {
    console.log('Connected to MongoDB')
})
.catch((err) => {
    console.log(" MongoDB Error: ", err)
})

const QRCodeSchema = new mongoose.Schema({
    link: String,
    qrCode: String
})

const QRCodeModel = mongoose.model('QR', QRCodeSchema);

app.post('/generate', async (req, res) => {
    const { link } = req.body;
    const qrCode = await QRCode.toDataURL(link);
    const qrEntry = new QRCodeModel({
        link,
        qrCode
    });
    await qrEntry.save();
    res.json(qrEntry);
});

app.get("/history", async (req, res) => {
    const history = await QRCodeModel.find();
    res.json(history);
});

app.listen(5000, () => console.log('Server is running on port 5000'));
