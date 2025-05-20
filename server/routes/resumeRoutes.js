import express from 'express'
import upload from '../middlewares/upload.js'
import { uploadResume, askAI } from '../controllers/resumeController.js'

// Router
const router = express.Router()

router.post('/upload', upload.single('resume'), uploadResume)
router.post('/ai', askAI)

export default router
