export async function up(knex) {
    await knex.schema.createTable('teacher', (table) => {
        table.uuid('id').primary();
        table.string('name', 50).notNullable();
        table.string('gender', 50).notNullable();
        table.string('password', 255).notNullable();
        table.string('email', 50).notNullable().unique();
        table.string('phone', 50).notNullable();
    });

    await knex.schema.createTable('grade', (table) => {
        table.uuid('id').primary();
        table.integer('level').notNullable();
    });

    await knex.schema.createTable('class', (table) => {
        table.uuid('id').primary();
        table.string('name', 50).notNullable();
        table.uuid('grade_id').notNullable();
        table.foreign('grade_id').references('grade.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('student', (table) => {
        table.uuid('id').primary();
        table.string('name', 50).notNullable();
        table.string('gender', 50).notNullable();
        table.string('email', 50).notNullable().unique();
        table.string('password', 255).notNullable();
        table.uuid('class_id').notNullable();
        table.uuid('grade_id').notNullable();
        table.foreign('class_id').references('class.id').onDelete('SET NULL');
        table.foreign('grade_id').references('grade.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('subject', (table) => {
        table.uuid('id').primary();
        table.string('name', 50).notNullable();
        table.uuid('grade_id').notNullable();
        table.foreign('grade_id').references('grade.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('class_teachers', (table) => {
        table.uuid('teacher_id').notNullable();
        table.uuid('class_id').notNullable();
        table.primary(['teacher_id', 'class_id']);
        table.foreign('teacher_id').references('teacher.id').onDelete('CASCADE');
        table.foreign('class_id').references('class.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('class_subjects', (table) => {
        table.uuid('subject_id').notNullable();
        table.uuid('class_id').notNullable();
        table.primary(['subject_id', 'class_id']);
        table.foreign('subject_id').references('subject.id').onDelete('CASCADE');
        table.foreign('class_id').references('class.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('assignment', (table) => {
        table.uuid('id').primary();
        table.string('name', 50).notNullable();
        table.string('startDate', 50).notNullable();
        table.string('endDate', 50).notNullable();
        table.integer('maxGrade').notNullable();
        table.uuid('teacher_id').notNullable();
        table.uuid('class_id').notNullable();
        table.foreign('teacher_id').references('teacher.id').onDelete('CASCADE');
        table.foreign('class_id').references('class.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('exams', (table) => {
        table.uuid('id').primary();
        table.string('name', 50).notNullable();
        table.string('startTime', 50).notNullable();
        table.string('endTime', 50).notNullable();
        table.integer('maxGrade').notNullable();
        table.uuid('teacher_id').notNullable();
        table.uuid('class_id').notNullable();
        table.foreign('teacher_id').references('teacher.id').onDelete('CASCADE');
        table.foreign('class_id').references('class.id').onDelete('CASCADE');
    });

    await knex.schema.createTable('results', (table) => {
        table.uuid('id').primary();
        table.integer('score').notNullable();
        table.uuid('exam_id');
        table.uuid('assignment_id');
        table.uuid('student_id').notNullable();
        table.foreign('exam_id').references('exams.id').onDelete('CASCADE');
        table.foreign('assignment_id').references('assignment.id').onDelete('SET NULL');
        table.foreign('student_id').references('student.id').onDelete('CASCADE');
    });
}

export async function down(knex) {
    await knex.schema.dropTableIfExists('results');
    await knex.schema.dropTableIfExists('exams');
    await knex.schema.dropTableIfExists('assignment');
    await knex.schema.dropTableIfExists('class_subjects');
    await knex.schema.dropTableIfExists('class_teachers');
    await knex.schema.dropTableIfExists('subject');
    await knex.schema.dropTableIfExists('student');
    await knex.schema.dropTableIfExists('class');
    await knex.schema.dropTableIfExists('grade');
    await knex.schema.dropTableIfExists('teacher');
}