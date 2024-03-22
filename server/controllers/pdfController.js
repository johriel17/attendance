import PDFDocument from 'pdfkit-table';
import Dtr from '../models/dtrModel.js';
import fs from 'fs'
import DtrEmployee from '../models/dtrEmployeeModel.js';
import DtrEmployeeSub from '../models/dtrEmployeeSubModel.js';

export const attendancePdf = async (req, res) => {
    try {
        const { dtrId } = req.params;
        const dtr = await Dtr.findById(dtrId).populate('department');
        const dtrEmployees = await DtrEmployee.find({ dtr: dtr._id }).populate('employee');

        const title = dtr.dtrNum
        const startDate = new Date(dtr.startDate)
        const formattedStartDate = startDate.toLocaleString('en-US', {year: 'numeric', month : 'long', day : 'numeric', timeZone : 'UTC'})
        const endDate = new Date(dtr.endDate)
        const formattedEndDate = endDate.toLocaleString('en-US', {year: 'numeric', month : 'long', day : 'numeric', timeZone : 'UTC'})
        // console.log(title, startDate, endDate)
        // console.log(dtrEmployees)

        // Create a new PDF document
        let doc = new PDFDocument({ margin: 30, size: 'A4' });

        // Set response headers
        res.setHeader('Content-Disposition', 'attachment; filename=attendance.pdf');
        res.setHeader('Content-Type', 'application/pdf');

        // Pipe the PDF to the response
        doc.pipe(res);
  
        for (const dtrEmployee of dtrEmployees) {
            const employeeName = `${dtrEmployee.employee.firstName} ${dtrEmployee.employee.middleName} ${dtrEmployee.employee.lastName}`;
            const table = {
                title: employeeName,
                subtitle: `${formattedStartDate} - ${formattedEndDate}`,
                headers: ['Date', 'Time In', 'Time Out'],
                rows: [],
            };

            // Populate the table with the employee's attendance data
            // dtrEmployee.forEach(sub => {
            //     table.rows.push([sub.date, sub.timeIn, sub.timeOut]);
            // });

            const dtrEmployeeSubs = await DtrEmployeeSub.find({ dtrEmployee: dtrEmployee._id, date : { $gte: startDate, $lte : endDate}}).sort({date : 1});

            for (const dtrEmployeeSub of dtrEmployeeSubs){
                const date = new Date(dtrEmployeeSub.date)
                const formattedDate = date.toLocaleString('en-US', {year: 'numeric', month : 'long', day : 'numeric', timeZone : 'UTC'})
                table.rows.push([formattedDate, dtrEmployeeSub.timeIn, dtrEmployeeSub.timeOut]);
            }

            // Add spacing between tables
            doc.moveDown();

            // Draw the table on the PDF document
            await doc.table(table, {
                prepareHeader: () => doc.font('Helvetica-Bold'),
                prepareRow: (row, i) => doc.font('Helvetica').fontSize(10),
            });

            // Add spacing between tables
            doc.moveDown();
        }

          doc.end();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Error occurred while generating PDF.' });
    }
}

// export const getDtr = async (req,res) => {
//     try{
//         const { id } = req.params
//         const dtr = await Dtr.findById(id)
//         .populate('department')

//         const dtrEmployees = await DtrEmployee.find({dtr : dtr._id})
//         .populate('employee')

//         return res.status(200).json({
//           dtr,
//           dtrEmployees
//         })
//     }catch(error){
//         console.log(error.message)
//         res.status(500).json({error: error.message})
//     }
// }