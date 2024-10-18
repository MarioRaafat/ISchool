# ISchool

ISchool is a web application designed for educational institutions, catering to two types of users: **students** and **teachers**. The application allows users to manage classes, subjects, assignments, exams, and results effectively.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Database Schema](#database-schema)
- [Contributing](#contributing)

## Features

### For Students:
- **Class Enrollment**: Students can enroll in classes.
- **Assignments**: View assignments and their details.
- **Exams**: Check upcoming exams and their schedules.
- **Results**: Access scores for assignments and exams.

### For Teachers:
- **Assignments**: Create and manage assignments for students.
- **Exams**: Set up exams and manage their details.
- **Results Management**: Record and manage students' scores.


## Technologies Used

- **Backend**: Node.js with Express
- **Database**: PostgreSQL
- **Frontend**: React

## Database Schema

The ISchool application uses PostgreSQL as its database. The schema includes the following tables:

- **teacher**: Stores information about teachers, including their name, gender, email, phone, and password.
- **grade**: Represents different educational levels.
- **class**: Contains details about classes, including the grade associated with each class.
- **student**: Stores information about students, including their name, gender, email, password, class, and grade.
- **subject**: Represents subjects taught in the school, linked to grades.
- **class_teachers**: A many-to-many relationship table connecting teachers and classes.
- **class_subjects**: A many-to-many relationship table connecting subjects and classes.
- **assignment**: Stores assignment details, including the teacher, class, and grading criteria.
- **exams**: Contains exam details, including the teacher, class, and grading criteria.
- **results**: Stores scores for students, linking them to assignments and exams.

## Contributing

- [Mahmoud Abdel Malek](https://github.com/mahmoud-malek)
- [Mario Raafat](https://github.com/MarioRaafat)
