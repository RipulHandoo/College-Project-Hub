// routes/search.js

const db = require('../utils/DB.js'); // Import your database module

// function to search for projects
async function search(req, res) {
    try {
        // Extract query parameters
        const projectName = req.query.projectName;
        const techStack = req.query.techStack;

        // Initialize query and values array
        let query = 'SELECT * FROM projects WHERE 1=1';
        const values = [];

        // Add conditions to the query based on provided parameters
        if (projectName) {
            query += ' AND repo_name ILIKE $1';
            values.push(`%${projectName}%`);
        }
        if (techStack) {
            query += ' AND tech_stack ILIKE $2';
            values.push(`%${techStack}%`);
        }

        // Execute the query
        const result = await db.query(query, values);

        // Send the list of projects matching the search criteria
        console.log('Search results:', result.rows);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error searching for projects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = search;
