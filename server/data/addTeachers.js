import models from '../models/index.js';
import dotenv from 'dotenv';
import faker from 'faker';

dotenv.config();
const { Teacher } = models;

const hashedPassword = '$2a$12$05JKG6CDGZczKJSoRqzqOu18JDNr6Zx39oPZG0eTnPNq90KH1r7nW';

const addTeachers = async () => {
	try {
		for (let i = 1; i <= 20; i++) {
			const firstName = faker.name.firstName();
			const lastName = faker.name.lastName();
			const email = faker.internet.email(firstName, lastName);
			const phone = faker.phone.phoneNumber('555-###-####');

			const teacher = new Teacher({
				firstName,
				lastName,
				gender: i % 2 === 0 ? 'male' : 'female',
				password: hashedPassword,
				email,
				phone
			});

			await teacher.save();
			console.log(`Teacher ${firstName} ${lastName} added to the database`);
		}
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addTeachers();