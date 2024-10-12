CREATE TABLE teacher (
                         id UUID PRIMARY KEY,
                         name VARCHAR(50) NOT NULL,
                         gender VARCHAR(50) NOT NULL,
                         password VARCHAR(255) NOT NULL,
                         email VARCHAR(50) NOT NULL UNIQUE,
                         phone VARCHAR(50) NOT NULL
);

CREATE TABLE grade (
                       id UUID PRIMARY KEY,
                       level INT NOT NULL
);

CREATE TABLE class (
                       id UUID PRIMARY KEY,
                       name VARCHAR(50) NOT NULL,
                       grade_id UUID NOT NULL,
                       FOREIGN KEY (grade_id) REFERENCES grade(id) ON DELETE CASCADE
);

CREATE TABLE student (
                         id UUID PRIMARY KEY,
                         name VARCHAR(50) NOT NULL,
                         gender VARCHAR(50) NOT NULL,
                         email VARCHAR(50) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL,
                         class_id UUID NOT NULL,
                         grade_id UUID NOT NULL,
                         FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE SET NULL,
                         FOREIGN KEY (grade_id) REFERENCES grade(id) ON DELETE CASCADE
);

CREATE TABLE subject (
                         id UUID PRIMARY KEY,
                         name VARCHAR(50) NOT NULL,
                         grade_id UUID NOT NULL,
                         FOREIGN KEY (grade_id) REFERENCES grade(id) ON DELETE CASCADE
);

-- Many-to-many relationship between teacher and class
CREATE TABLE class_teachers (
                                teacher_id UUID NOT NULL,
                                class_id UUID NOT NULL,
                                PRIMARY KEY (teacher_id, class_id),
                                FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE CASCADE,
                                FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
);

-- Many-to-many relationship between subject and class
CREATE TABLE class_subjects (
                                subject_id UUID NOT NULL,
                                class_id UUID NOT NULL,
                                PRIMARY KEY (subject_id, class_id),
                                FOREIGN KEY (subject_id) REFERENCES subject(id) ON DELETE CASCADE,
                                FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
);

CREATE TABLE assignment (
                            id UUID PRIMARY KEY,
                            name VARCHAR(50) NOT NULL,
                            startDate VARCHAR(50) NOT NULL,
                            endDate VARCHAR(50) NOT NULL,
                            maxGrade INT NOT NULL,
                            teacher_id UUID NOT NULL,
                            class_id UUID NOT NULL,
                            FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE CASCADE,
                            FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
);

CREATE TABLE exams (
                       id UUID PRIMARY KEY,
                       name VARCHAR(50) NOT NULL,
                       startTime VARCHAR(50) NOT NULL,
                       endTime VARCHAR(50) NOT NULL,
                       maxGrade INT NOT NULL,
                       teacher_id UUID NOT NULL,
                       class_id UUID NOT NULL,
                       FOREIGN KEY (teacher_id) REFERENCES teacher(id) ON DELETE CASCADE,
                       FOREIGN KEY (class_id) REFERENCES class(id) ON DELETE CASCADE
);

CREATE TABLE results (
                         id UUID PRIMARY KEY,
                         score INT NOT NULL,
                         exam_id UUID,
                         assignment_id UUID,
                         student_id UUID NOT NULL,
                         FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
                         FOREIGN KEY (assignment_id) REFERENCES assignment(id) ON DELETE SET NULL,
                         FOREIGN KEY (student_id) REFERENCES student(id) ON DELETE CASCADE
);
