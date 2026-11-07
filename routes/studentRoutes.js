const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// POST - Create a new student
router.post("/", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();

        res.status(201).json({
            message: "Student created successfully",
            student: student
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error creating student",
            error: error.message
        });
    }
});

// GET - Read all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            message: "Students retrieved successfully",
            students: students
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving students",
            error: error.message
        });
    }
});

// GET - Read student by USN
router.get("/:usn", async (req, res) => {
    try {
        const student = await Student.findOne({
            usn: req.params.usn
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student retrieved successfully",
            student: student
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Error retrieving student",
            error: error.message
        });
    }
});

module.exports = router;