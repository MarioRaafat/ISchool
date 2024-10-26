// server/data/addSubjects.js
import models from '../models/index.js';
import faker from 'faker';

const { Subject, Grade, Class} = models;

const addSubjects = async () => {
	try {
		console.log("Fetching grades...");
		const grades = await Grade.findAll({
			include: [
				{
					model: Class, as: 'Classes'
				 }
			]
		});
		console.log(`Fetched ${grades.length} grades.`);

		let subjectCount = 0;

		for (const grade of grades) {
			console.log(`Processing grade: ${grade.level}`);
			for (let i = 1; i <= Math.ceil(100 / grades.length); i++) {
				const subjectName = faker.random.word();
				const time = faker.time.recent();
				const description = faker.lorem.sentence();

				const subject = new Subject({
					name: subjectName,
					grade_id: grade.id,
					time,
					description,
					startTime: '08:00 AM',
					endTime: '10:00 AM',
					day: 'Monday'
				});

				await subject.save();
				subjectCount++;
				console.log(`Subject ${subjectName} added to the database for Grade ${grade.level}`);
			}
		}

		console.log(`Total ${subjectCount} subjects added to the database.`);
	} catch (err) {
		console.log(`Error: ${err}`);
	}
};

addSubjects();