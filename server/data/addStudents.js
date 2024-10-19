import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Student, Class, Grade } = models;

const hashedPassword = '$2a$12$05JKG6CDGZczKJSoRqzqOu18JDNr6Zx39oPZG0eTnPNq90KH1r7nW';

const addStudents = async () => {
	try {
		const grades = await Grade.findAll();
		for (const grade of grades) {
			const classes = await Class.findAll({ where: { grade_id: grade.id } });
			for (const class_ of classes) {
				for (let i = 1; i <= 20; i++) {
					const firstName = faker.name.firstName();
					const lastName = faker.name.lastName();
					const email = faker.internet.email(firstName, lastName);
					const phone = faker.phone.phoneNumber('555-###-####');

					const student = new Student({
						firstName,
						lastName,
						gender: i % 2 === 0 ? 'male' : 'female',
						password: hashedPassword,
						email,
						phone,
						class_id: class_.id,
						grade_id: grade.id
					});

					await student.save();
					console.log(`Student ${firstName} ${lastName} added to the database for Class ${class_.name} in Grade ${grade.level}`);
				}
			}
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addStudents();