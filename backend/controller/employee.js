const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const async = require('async');
const XLSX = require('xlsx');

exports.fetchUser = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.addUser=(req, res, next) => {
    try {
        let path = req.file.path;
        var workbook = XLSX.readFile(path);
        var sheet_name_list = workbook.SheetNames;
        let jsonData = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[0]]
        );
        if (jsonData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Sheet has no data",
            });
        }

        async.eachSeries(jsonData, async (item, callback) => {
            try {
                const val = await Employee.countDocuments({ Email: item.Email });
        
                if (val > 0) {
                    console.log(`Skip item: ${item['Email']}`);
                } else {
                    const employee = new Employee(item);
                    await employee.save();
                }
        
                if (typeof callback === 'function') {
                    callback(); 
                }
            } catch (err) {
                console.error('Error:', err);
                if (typeof callback === 'function') {
                    callback(err);
                }
            }
        }, (err) => {
            if (err) {
                console.error(err);
            } else {
                let message = `File Successfuly Uploaded`
                console.log( `unique items saved successfully!`);
                return res.status(201).json({
                    success: true,
                    message: message
                });
            }
        });
        
        

    } catch (err) {
        console.log(err.message)
        return res.status(500).json({ success: false, message: err.message });
    }
}