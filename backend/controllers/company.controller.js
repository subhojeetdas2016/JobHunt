import { company } from "../models/company.model.js"
import getDataUri from '../utils/datauri.js'; 
import cloudinary from '../utils/cloudinary.js';

//register company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "company name is required",
                success: false
            });
        }
        
        let Company = await company.findOne({ name: companyName });
        if (Company) {
            return res.status(400).json({
                message: "You cannot add the same company",
                success: false
            });
        }

        Company = await company.create({
            name: companyName,
            userId: req.id
        });

        return res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company: Company // Make sure the 'company' is included in the response
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "An error occurred while registering the company",
            success: false
        });
    }
};

//get company  details

export const getCompany = async (req, res) => {
    //user want the company not all the companies exist in database
    try {
        const userId = req.id;
        const companies = await company.find({ userId });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });

        }
        return res.status(200).json({   
            companies,
            success: true
        });
    }

    catch (err) {
        console.error(err);
    };


    //getting error so this is the chat gpt code

    // try {
    //     const userId = req.id; usererId;
    //     const companies = await company.find({ userId: userId }); 

    //     if (companies.length === 0) { 
    //         return res.status(404).json({
    //             message: "Companies not found",
    //             success: false
    //         });
    //     }

    //     return res.status(200).json({
    //         companies, 
    //         success: true
    //     });
    // } catch (err) {
    //     console.error(err);
    //     return res.status(500).json({ 
    //         message: "An error occurred",
    //         success: false
    //     });
    // }
}
//get company by id details
export const getCompanybyId = async (req, res) => {
    try {
        const CompanyId = req.params.id;
        const Company = await company.findById(CompanyId);
        if (!Company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            Company,
            success: true
        })
    }
    catch (err) {
        console.error(err);
    }
};
// update company details
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        //cloudindary will be here for the company logo image;

        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        

        const updateData = { name, description, website, location, logo };
        console.log(name,description,website,location);

        const Company = await company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!Company) {
            return res.status(404).json({
                message: "Company not found",
                success: true
            });
        }

        return res.status(200).json({
            message: "Company information updated",
            success: true
        });
    }
    catch (err) {
        console.error(err);
    }
};

// export const updateCompany = async (req, res) => {
//     try {
//         const { name, description, website, location } = req.body;
//         const file = req.file;


//         const updateData = { name, description, website, location };


//         const Company = await company.findByIdAndUpdate(req.params.id, updateData, { new: true });

//         if (!Company) {
//             return res.status(404).json({
//                 message: "Company not found",
//                 success: false
//             });
//         }

//         return res.status(200).json({
//             message: "Company information updated",
//             success: true,
//             company: Company
//         });

//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({
//             message: "An error occurred",
//             success: false
//         });
//     }
// };


