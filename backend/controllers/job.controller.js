import { Job } from "../models/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobtype, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobtype || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location, //String(location || ""),     
            jobtype,
            experience: Number(experience),
            position: Number(position || ""),
            company: companyId,
            created_by: userId
        });
        // const job = await Job.create({
        //     title,
        //     description,
        //     requirements: requirements.split(",").map(req => req.trim()), // Trim whitespace
        //     salary: Number(salary),
        //     location,
        //     jobype, // Ensure the field name matches your schema
        //     experience: Number(experience), // Use 'experience' instead of 'experienceLevel'
        //     position: Number(position), // Convert to number if necessary
        //     company: companyId,
        //     created_by: userId
        // });

        return res.status(201).json({
            message: "new job created successfully",
            job,
            success: true
        })
    }
    catch (err) {
        console.error(err);
    };
}



export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "jobs not found",
                success: false
            });
        }

        return res.status(200).json({
            jobs,
            success: true
        });
    }

    catch (err) {
        console.error(err)
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            model: 'Application', 
        });
        
        if (!job) {
            return req.status(404).json({
                message: "Job Not found",
                success: true
            });

        };
        return res.status(200).json({ job, success: true });

    }
    catch (err) {
        console.error(err);
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; // Ensure `req.id` is set by authentication middleware
        const jobs = await Job.find({ created_by: adminId }).populate({
            path:'company',
            createdAt:-1
        })
        console.log("Admin ID from request:", req.id);


        // Check if jobs are found
        if (jobs.length === 0) {
            return res.status(404).json({
                message: "No jobs found for the admin.",
                success: false,
            });
        }

        // Return jobs if found
        return res.status(200).json({
            jobs,
            message: "Jobs fetched successfully.",
            success: true,
        });
    } catch (err) {
        console.error("Error fetching admin jobs:", err);

        // Send a 500 response for server errors
        return res.status(500).json({
            message: "Server error while fetching jobs.",
            success: false,
        });
    }
};
