var express = require("express");
var app = express();

const router = express.Router();

var { class1 } = require('./controller');
var { upload , upload2 , upload3 } = require('./middleware/middleware');
var { salaryvalidationmiddleware , applicationvalidationmiddleware , inquiryvalidationmiddleware , employeevalidationmiddleware , clientvalidationmiddleware } = require('./models/schema');

router.get('/', (req, res) => {
    res.send(process.env.SECRET_KEY);
})

router.get('/employee', class1.employeeget);
router.post('/employee',upload.single('addprofilepicture'),employeevalidationmiddleware,class1.employeepost);
router.get('/salary', class1.salaryget);
router.post('/salary',salaryvalidationmiddleware,class1.salarypost);
router.get('/leave', class1.leaveget);
router.post('/leave',class1.leavepost);
router.get('/request',class1.request);
router.get('/approve/:_id', class1.approve);
router.get('/reject/:_id', class1.rejectget);
router.post('/reject/:_id',class1.rejectpost);
router.get('/allemployee', class1.allemployee);
router.get('/employee/:_id', class1.employeeidget);
router.post('/employee/:_id',upload.single('addprofilepicture'),class1.employeeidpost);
router.get('/application', class1.applicationget);
router.post('/application',applicationvalidationmiddleware,class1.applicationpost);
router.get('/client', class1.clientget);
router.post('/client',upload2.single('addprofilepicture'),clientvalidationmiddleware,class1.clientpost);
router.get('/clientcompany', class1.clientcompanyget);
router.post('/clientcompany',upload3.single('companylogo'),class1.clientcompanypost);
router.get('/sales', class1.salesget);
router.post('/sales',class1.salespost);
router.get('/inquiry', class1.inquiryget);
router.post('/inquiry',inquiryvalidationmiddleware,class1.inquirypost);
router.get('/application/delete/:_id',class1.applicationdelete);
router.get('/client/delete/:_id',class1.clientdelete);
router.get('/sales/delete/:_id', class1.salesdelete);
router.get('/inquiry/delete/:_id',class1.inquirydelete);
router.get('/application/update/:_id',class1.applicationupdateget);
router.get('/client/update/:_id',class1.clientupdateget);
router.get('/sales/update/:_id', class1.salesupdateget);
router.get('/inquiry/update/:_id',class1.inquiryupdateget);
router.post('/application/update/:_id',class1.applicationupdatepost);
router.post('/client/update/:_id',upload2.single('addprofilepicture'),class1.clientupdatepost);
router.post('/sales/update/:_id', class1.salesupdatepost);
router.post('/inquiry/update/:_id',class1.inquiryupdatepost);
router.get('/application/show', class1.applicationshow);
router.get('/client/show', class1.clientshow);
router.get('/client/showfull', class1.clientshowfull);
router.get('/client/company/show', class1.clientcompanyshow);
router.get('/sales/show', class1.salesshow);
router.get('/inquiry/show', class1.inquiryshow);
router.get('/approved', class1.approved);
router.get('/holiday', class1.holidayget);
router.post('/holiday',class1.holidaypost);
router.get('/holidayrequest',class1.holidayrequest);
router.get('/holidayapprove/:_id', class1.holidayapprove);
router.get('/holidayreject/:_id', class1.holidayrejectget);
router.post('/holidayreject/:_id',class1.holidayrejectpost);
router.get('/attendance/:_id1/:_id2/:_id3',class1.attendance);
router.get('/delay', class1.delayget);
router.post('/delay',class1.delaypost);

module.exports = router;