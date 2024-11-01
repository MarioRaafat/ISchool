import models from '../models/index.js';

const { Exam, Student, Result, Assignment } = models;

export const getResultsByStudent = async (req, res) => {
    const { studentId } = req.body;
    try {
        const results = await Result.findAll({ where: { student_id: studentId } });
        const formattedResults = await Promise.all(results
            .map(async (result) => {
                let paper;
                if (result.exam_id) {
                    paper = await Exam.findByPk(result.exam_id);
                } else if (result.assignment_id) {
                    paper = await Assignment.findByPk(result.assignment_id);
                } else {
                    console.error('Result does not have an exam or assignment');
                    return {
                        id: result.id,
                        grade: 0,
                        maxGrade: 0,
                    };
                }
                return {
                    id: result.id,
                    grade: result.grade,
                    maxGrade: paper.maxGrade,
                };
        }));
        res.status(200).json(formattedResults);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error getting results' });
    }
};

export const getResultsByTeacher = async (req, res) => {};

export const getRankByStudent = async (req, res) => {
    const { studentId, classId } = req.body;
    try {
        const students = await Student.findAll({ where: { class_id: classId } });
        const ranks = await Promise.all(students.map(async (student) => {
            const studentResults = await Result.findAll({ where: { student_id: student.id } });
            const studentGrades = studentResults.map(result => result.grade);
            const StudentTotalGrades = studentGrades.reduce((acc, grade) => acc + grade, 0);
            return {
                studentId: student.id,
                StudentTotalGrades,
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


export const getExamResultsByTeacher = async (req, res) => {};

export const getExamAverageResultsByStudent = async (req, res) => {};

export const getAssignmentResultsByTeacher = async (req, res) => {};

export const getAssignmentAverageResultsByStudent = async (req, res) => {};



export const getAverageResultsByTeacher = async (req, res) => {};


