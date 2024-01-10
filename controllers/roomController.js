import express from "express";
import { v4 as uuidv4 } from 'uuid';
// import roomService from "../business/roomService";


const router = express.Router();


router.post('/rooms', async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Room name is required" });
        }

        
        res.status(201).json(newRoom.rows[0]);
    } catch (error) {
        console.error('Error creating room:', error);
        res.status(500).json({ error: error.message });
    }
});


router.get('/rooms', async (req, res) => {
    try {
        const allRooms = roomService.getAllrooms()
        res.status(200).send(allRooms)
    } catch (error) {
        console.error('Error retrieving rooms:', error);
        res.status(500).json({ error: error.message });
    }
});















export default router;