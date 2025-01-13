import { application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job is required",
                success: false
            })
        };
        const existingApplication = await application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this Jobs",
                success: false
            });
        }
        //check if the job is exist
        const job = await Job.findById(jobId)

        if (!job) {
            return res.status(404).json({
                message: "job not found",
                success: false
            })
        }
        //will create a new application
        const newApplication = await application.create({
            job: jobId,
            applicant: userId,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "job is applied successfully",
            success: true
        });
    }
    catch (err) {
        console.error(err);
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        const Application = await application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: 'job',
            options: { sort: { createdAt: -1 } },

            populate: {
                path: 'company',
                options: { sort: { createdAt: -1 } },

            }
        });
        if (!Application) {
            return res.status(400).json({
                message: "No Application",
                success: false
            })
        };
        return res.status(200).json({
            Application,
            success: true
        });
    }
    catch (err) {
        console.error(err);
    }
};
// Admin will know how much user applied.
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            },
        });

        if (!job) {
            console.error('Job not found');
            return res.status(404).json({
                message: 'Job not found',
                success: false,
            });
        }

        if (!job.applications || job.applications.length === 0) {
            console.error('No applications found for the job');
        }

        return res.status(200).json({
            job,
            success: true,
        });
    } catch (err) {
        console.error('Error in getApplicants:', err);
        return res.status(500).json({
            message: 'Internal Server Error',
            success: false,
        });
    }
};


export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id
        if (!status) {
            return res.status(400).json({
                message: "status is required",
                success: false
            })
        };
        //find the application by applicant Id

        const Application = await application.findOne({ _id: applicationId });
        if (!Application) {
            try {
                return res.status(401).json({
                    message: "application not found",
                    success: false
                });
            }

            catch (err) {
                console.error(err);
            }

        };
        //update the status
        Application.status = status.toLowerCase();
        await Application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true
        })


    }
    catch (err) {
        console.error(err);
    }
}