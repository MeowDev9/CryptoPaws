const faker = require("@faker-js/faker").faker;
const Case = require("../models/Case"); // Import your Case model

// Function to seed the database with dummy cases
const insertCases = async () => {
    try {
        // Delete all existing cases from the database before inserting new data
        await Case.deleteMany({});
        console.log("Previous data deleted!");

        const cases = [];

        for (let i = 0; i < 50; i++) { // Generate 50 dummy cases
            cases.push({
                image: faker.image.url(640, 480), // Random animal image URL
                description: faker.lorem.sentences(3), // Random description
                amount: faker.number.int({ min: 100, max: 5000 }), // Random amount
            });
        }

        // Insert all new cases into the database
        await Case.insertMany(cases);
        console.log("Database seeded with dummy cases!");
    } catch (err) {
        console.error("Error seeding database:", err);
    }
};

module.exports = insertCases; // Export the function
