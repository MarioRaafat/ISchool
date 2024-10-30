import models from '../models/index.js';
import faker from 'faker';

const { Subject, Grade, Class } = models;

const addHourAndHalf = (startTime) => {
	// generate the end time by adding 1 hour and 30 minutes to the start time
	const [hours, minutes] = startTime.split(':');
	
	let endHours = parseInt(hours) + 1;

	let endMinutes = parseInt(minutes) + 30;

	if (endMinutes >= 60) {
		endMinutes = endMinutes - 60;
		endHours = endHours + 1;
	}

	const formattedHours = endHours > 12 ? endHours - 12 : endHours;

	let period = formattedHours < 8 ? 'PM' : 'AM';
	if (formattedHours === 12) {
		period = 'PM';
	}


	const formattedMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;
	return `${formattedHours}:${formattedMinutes} ${period}`;

}

// Function to generate random time in 'HH:MM AM/PM' format
const generateRandomTime = () => {
	let hours = faker.datatype.number({ min: 8, max: 14 });
	const minutes = faker.datatype.number({ min: 0, max: 59 });
	hours = hours > 12 ? hours - 12 : hours;
	let period = hours < 8 ? 'PM' : 'AM';
	if (hours === 12) {
		period = 'PM';
	}
	const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
	return `${hours}:${formattedMinutes} ${period}`;
};

// Function to generate random day of the week
const generateRandomDay = () => {
	const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Saturday'];
	return days[faker.datatype.number({ min: 0, max: days.length - 1 })];
};

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
				const startTime = generateRandomTime();
				const endTime = addHourAndHalf(startTime);

				const subject = new Subject({
					name: subjectName,
					grade_id: grade.id,
					time,
					description,
					startTime: startTime,
					endTime: endTime,
					day: generateRandomDay()
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