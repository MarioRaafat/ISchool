import models from '../models/index.js';

const { Exam, Student, Result } = models;

export const getResultsByStudent = async (req, res) => {
    const { studentId } = req.body;
    try {
        const results = await Result.findAll({ where: { student_id: studentId } });
        const formattedResults = await Promise.all(results.map(async (result) => {
            const exam = await Exam.findByPk(result.exam_id);
            return {
                id: result.id,
                grade: result.grade,
                maxGrade: exam.maxGrade,
                examName: exam.name,
            };
        }));
        res.status(200).json(formattedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting results' });
    }
};

export const getResultsByTeacher = async (req, res) => {};

export const getAverageResultsByStudent = async (req, res) => {};

export const getRankByStudent = async (req, res) => {
    const { studentId, classId } = req.body;
    try {
        const students = await Student.findAll({ where: { class_id: classId } });
        const results = await Result.findAll({ where: { student_id: studentId } });
        const studentResults = results.map(result => result.grade);
        const studentAverage = studentResults.reduce((acc, grade) => acc + grade, 0) / studentResults.length;
        const ranks = await Promise.all(students.map(async (student) => {
            const studentResults = await Result.findAll({ where: { student_id: student.id } });
            const studentGrades = studentResults.map(result => result.grade);
            const studentAverage = studentGrades.reduce((acc, grade) => acc + grade, 0) / studentGrades.length;
            return {
                studentId: student.id,
                studentAverage,
            };
        }));
        const sortedRanks = ranks.sort((a, b) => b.studentAverage - a.studentAverage);
        const studentRank = sortedRanks.findIndex(rank => rank.studentId === studentId) + 1;
        res.status(200).json({ studentRank });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting rank' });
    }
};

export const getAverageResultsByTeacher = async (req, res) => {};

