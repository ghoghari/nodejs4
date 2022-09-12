var joi = require("joi");

var salaryvalidationmiddleware = (req,res,next)=>{
    
    const schema1 = joi.object({
        employeeid:joi.number().required(),
        designation:joi.string().min(1),
        startdate:joi.date(),
        enddate:joi.date(),
        basic:joi.string().min(1)
    })
    var error1 = schema1.validate(req.body);
    console.log(error1);
    if(error1.error){
        res.status(200).json({error:error1})
        // res.json({error:error})
        // res.send('validation error');
    }else{
        next();
    }
} ;

var employeevalidationmiddleware = (req,res,next)=>{
    const schema2 = joi.object({
        employeeid:joi.number().required(),
        addprofilepicture:{
            type: String,
            required: true,
          },
        firstname:joi.string().min(1),
        lastname:joi.string().min(1),
        personalemail:joi.string().min(1),
        companyemail:joi.string().min(1),
        mobile:joi.number().min(1),
        bloodgroup:joi.string().min(1),
        dateofjoin:joi.date(),
        dateofbirth:joi.date(),
        relievingdate:joi.date(),
        anniversary:joi.string().min(1),
        bondduration:joi.string().min(1),
        department:joi.string().min(1),
        fathername:joi.string().min(1),
        fathermobile:joi.number().min(1),
        fatheroccupation:joi.string().min(1),
        fatherbloodgroup:joi.string(),
        mothername:joi.string().min(1),
        mothermobile:joi.number().min(1),
        motheroccupation:joi.string().min(1),
        motherbloodgroup:joi.string().min(1),

    })
    var error2 = schema2.validate(req.body);
    if(error2.error){
        res.status(200).json({error:error2})
        // res.json({error:error})
        // res.send('validation error');
    }else{
        next();
    }
} ;

var applicationvalidationmiddleware = (req,res,next)=>{
    const schema3 = joi.object({
        projectid:joi.number().required(),
        appliedby:joi.string().min(1),
        applicationdate:joi.date().required(),
        projectname:joi.string().min(1),
        rate:joi.string().min(1),
        technology:joi.string().min(1),
        platform:joi.string().min(1),
        link:joi.string().min(1),
        location:joi.string().min(1)
    })
    var error3 = schema3.validate(req.body);
    if(error3.error){
        res.status(200).json({error:error3})
        // res.json({error:error})
        // res.send('validation error');
    }else{
        next();
    }
} ;

var clientvalidationmiddleware = (req,res,next)=>{
    const schema4 = joi.object({
        clientid:joi.number().required(),
        skypeid:joi.string().min(1),
        firstname:joi.string().min(1),
        lastname:joi.string().min(1),
        email:joi.string().min(1),
        mobile:joi.number().min(1),
        linkedin:joi.string().min(1),
        addprofilepicture:{
            type: String,
            required: true,
          },
        location: joi.string().min(1),
        company: joi.string().min(1)
    })
    var error4 = schema4.validate(req.body);
    if(error4.error){
        res.status(200).json({error:error4})
        // res.json({error:error})
        // res.send('validation error');
    }else{
        next();
    }
} ;

var inquiryvalidationmiddleware = (req,res,next)=>{
    const schema5 = joi.object({
        inquiryid:joi.number().required(),
        projectname:joi.string().min(1),
        firstname:joi.string().min(1),
        lastname:joi.string().min(1),
        link:joi.string().min(1),
        Projectyype:joi.string().min(1),
        technology:joi.string().min(1),
        platform:joi.string().min(1),
        applicationdate:joi.date().required(),
        appliedby:joi.string().min(1),
        rate:joi.string().min(1),
        location:joi.string().min(1),
        frdate:joi.date().required(),
        lrdate:joi.date().required(),
        lfdate:joi.date().required(),
        managedby:joi.string().min(1),
        meetingwith:joi.string().min(1),
        assignedto:joi.string().min(1)
    })
    var error5 = schema5.validate(req.body);
    if(error5.error){
        res.status(200).json({error:error5})
        // res.json({error:error})
        // res.send('validation error');
    }else{
        next();
    }
} ;

module.exports = { salaryvalidationmiddleware , applicationvalidationmiddleware , inquiryvalidationmiddleware ,  employeevalidationmiddleware , clientvalidationmiddleware } 