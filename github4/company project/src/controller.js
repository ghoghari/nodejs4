var express = require("express");
var app = express();

var fs = require('fs');

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var { connection } = require("./db/conn")

var path = require("path");
// const { FORMERR } = require("dns");
// const { Console } = require("console");

var array2 = [];
var a = [];
var leave = [];
var holiday = [];
var b = [];
var c = [];
var d = [];
var abd = [];

var moment = require('moment');
const { Console } = require("console");

var joi = require("joi");

class class1 {

    static employeeget = async (req, res) => {

        var sql = "SELECT * FROM employee ORDER BY employeeid DESC LIMIT 0, 1";

        connection.query(sql, function (err, result) {

            if (err) throw err;
            var employeeid = result[0].employeeid + 1;
            res.render('employee', { employeeid });

        });

    }

    static employeepost = async (req, res) => {

        try {

            var path2 = `http://192.168.1.96:4500/employees/${req.body.employeeid}.png`;

            // console.log(req.file)
            var sql = `INSERT INTO employee (employeeid,addprofilepicture,firstname,lastname,personalemail,companyemail,mobile,bloodgroup,dateofjoin,dateofbirth,relievingdate,anniversary,bondduration,department,fathername,fathermobile,fatheroccupation,fatherbloodgroup,mothername,mothermobile,motheroccupation,motherbloodgroup) VALUES ("${req.body.employeeid}","${path2}","${req.body.firstname}","${req.body.lastname}","${req.body.personalemail}","${req.body.companyemail}","${req.body.mobile}","${req.body.bloodgroup}","${req.body.dateofjoin}","${req.body.dateofbirth}","${req.body.relievingdate}","${req.body.anniversary}","${req.body.bondduration}","${req.body.department}","${req.body.fathername}","${req.body.fathermobile}","${req.body.fatheroccupation}","${req.body.fatherbloodgroup}","${req.body.mothername}","${req.body.mothermobile}","${req.body.motheroccupation}","${req.body.motherbloodgroup}")`;
            // var sql = `INSERT INTO employee (employeeid,firstname,lastname,personalemail,companyemail,mobile,bloodgroup,dateofjoin,dateofbirth,relievingdate,anniversary,bondduration,department,fathername,fathermobile,fatheroccupation,fatherbloodgroup,mothername,mothermobile,motheroccupation,motherbloodgroup) VALUES ("${req.body.employeeid}","${req.body.firstname}","${req.body.lastname}","${req.body.personalemail}","${req.body.companyemail}","${req.body.mobile}","${req.body.bloodgroup}","${req.body.dateofjoin}","${req.body.dateofbirth}","${req.body.relievingdate}","${req.body.anniversary}","${req.body.bondduration}","${req.body.department}","${req.body.fathername}","${req.body.fathermobile}","${req.body.fatheroccupation}","${req.body.fatherbloodgroup}","${req.body.mothername}","${req.body.mothermobile}","${req.body.motheroccupation}","${req.body.motherbloodgroup}")`;

            var imageid1 = path.join(__dirname, "../src/public/employees", req.file.filename);
            var imageid2 = path.join(__dirname, "../src/public/employees", req.body.employeeid + ".png");

            fs.rename(imageid1, imageid2, function (err) {
                if (err) console.log('ERROR: ' + err);
            });

            connection.query(sql, function (err, result) {
                // console.log("1 record inserted");
                if (err) {
                    fs.unlinkSync(imageid2);
                    res.json({ "message": `${err}` });
                } else {
                    res.json({ "message": "data uploaded" });
                }
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static salaryget = async (req, res) => {
        res.render('salary');
    }

    static salarypost = async (req, res) => {

        try {

            var sql2 = `INSERT INTO salary (employeeid,startdate,enddate,designation,basic) VALUES ("${req.body.employeeid}","${req.body.startdate}","${req.body.enddate}","${req.body.designation}","${req.body.basic}") `;

            connection.query(sql2, function (err, result) {
                if (err) {
                    res.json({ "message": `${err}` });
                } else {
                    // console.log("1 record inserted");
                    res.json({ "message": "data uploaded" });
                }
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static leaveget = async (req, res) => {
        res.render('leave');
    }

    static leavepost = async (req, res) => {

        try {

            // console.log(req.body);

            // var sql = "INSERT INTO `leave` (employeeid) VALUES ('1')";
            var sql = 'INSERT INTO `holiday` (employeeid,startingdate,endingdate,leavesub,body,pending) VALUES (' + `${req.body.employeeid},"${req.body.startingdate}","${req.body.endingdate}","${req.body.leavesub}","${req.body.body}","yes"` + ')';
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static request = async (req, res) => {

        try {

            var sql1 = "SELECT * FROM holiday LEFT JOIN employee ON employee.employeeid = holiday.employeeid";

            connection.query(sql1, async function (err, data) {

                // console.log(data);

                a = [];

                for (var i = 0; i < data.length; i++) {

                    if (data[i].pending == "yes") {
                        a.push(data[i]);
                    }

                }

                var b = [];
                for (var j = 0; j < a.length; j++) {
                    const promise = fs.promises.readFile(path.join(`public/employee/${a[j].employeeid}.png`));
                    b.push(promise)
                }

                var c = [];
                for (var k = 0; k < b.length; k++) {

                    await Promise.resolve(b[k]).then(function (buffer) {

                        var abc = {
                            data: buffer,
                            contentType: 'image/png'
                        }

                        c.push(abc);

                    });

                }

                var d = [];
                d.push(a);
                d.push(c);

                var a = [];

                // console.log(d);

                res.render('request', { d });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static approve = async (req, res) => {

        try {

            // console.log("Hi");

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' UPDATE `holiday` SET pending = "no" , status = "approve" ' + ` WHERE employeeid = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

            res.redirect('/request');

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }
    }

    static rejectget = async (req, res) => {
        res.render('reject');
    }

    static rejectpost = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            // console.log(req.body.reason)

            var no = "no"
            var reject = "reject"

            var sql = ' UPDATE `holiday` SET ' + ` pending="${no}" , status="${reject}" , reason="${req.body.reason}" ` + ` WHERE id = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
            });

            res.redirect('/request');

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static allemployee = async (req, res) => {

        try {

            var sql1 = 'select * from `employee`';
            connection.query(sql1, async function (err, data) {

                // var array = [];
                // for (var j = 0; j < data.length; j++) {
                //     const promisee = fs.promises.readFile(path.join(`public/employee/${data[j].employeeid}.png`));
                //     array.push(promisee);
                // }

                // for (var k = 0; k < array.length; k++) {

                //     await Promise.resolve(array[k]).then(function (buffer) {

                //         var abc = {
                //             data: buffer,
                //             contentType: 'image/png'
                //         }

                //         array2.push(abc);
                //     });


                // }

                // console.log(array2);

                res.json(data);
                // res.render('allemployee', { data, array2 });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static employeeidget = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' select * from employee ' + ` WHERE employeeid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                var select = ['ABC'];
                var A = 'A'
                var B = 'B'
                // console.log(typeof (data[0].dateofbirth));

                // const promise = fs.promises.readFile(path.join('public/1.png'));
                const promise = fs.promises.readFile(path.join(`public/employee/${data[0].employeeid}.png`));

                var abc

                Promise.resolve(promise).then(function (buffer) {

                    var abc = {
                        data: buffer,
                        contentType: 'image/png'
                    }

                    res.render('employeeedit', { data, select, A, B, abc });
                });

            }
            )

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static employeeidpost = async (req, res) => {

        try {

            if (req.file) {

                var imageid2 = path.join(__dirname, "../src/public/employee", req.body.employeeid + ".png");
                fs.unlinkSync(imageid2);

                var imageid1 = path.join(__dirname, "../src/public/employee", req.file.filename);
                var imageid3 = path.join(__dirname, "../src/public/employee", req.body.employeeid + ".png");

                fs.rename(imageid1, imageid3, function (err) {
                    if (err) console.log('ERROR: ' + err);
                });

            }

            var sql = ' UPDATE `employee` SET ' + ` employeeid="${req.body.employeeid}" , pic="${req.body.employeeid}.png" , firstname="${req.body.firstname}" , lastname="${req.body.lastname}" , personalemail="${req.body.personalemail}" , companyemail="${req.body.companyemail}" , mobile="${req.body.mobile}" , bloodgroup="${req.body.bloodgroup}" , dateofjoin="${req.body.dateofjoin}" , dateofbirth="${req.body.dateofbirth}" , relievingdate="${req.body.relievingdate}" , anniversary="${req.body.anniversary}" , bondduration="${req.body.bondduration}" , department="${req.body.department}" ` + ` WHERE employeeid = ${req.params._id}; `

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data update" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static applicationget = async (req, res) => {


        var sql = "SELECT * FROM application ORDER BY projectid DESC LIMIT 0, 1";

        connection.query(sql, function (err, result) {

            if (err) throw err;
            var projectid = result[0].projectid + 1;
            res.json({ projectid });
            // res.render('application',{projectid});

        });

    }

    static applicationpost = async (req, res) => {

        try {

            // console.log(req.body);

            // var sql = 'INSERT INTO application (projectid,appliedby,applicationdate,projectname,rate,technology,platform,link,location) VALUES (' + `${req.body.projectid},"${req.body.appliedby}","${req.body.applicationdate}","${req.body.projectname}","${req.body.rate}","${req.body.technology}","${req.body.platform}","${req.body.link}","${req.body.location}"` + ')';
            var sql = 'INSERT INTO application (projectid,appliedby,applicationdate,projectname,rate,technology,platform,link,location,disable) VALUES (' + `${req.body.projectid},"${req.body.appliedby}","${req.body.applicationdate}","${req.body.projectname}","${req.body.rate}","${req.body.technology}","${req.body.platform}","${req.body.link}","${req.body.location}","no"` + ')';

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientget = async (req, res) => {

        var sql = "SELECT * FROM client ORDER BY clientid DESC LIMIT 0, 1";

        connection.query(sql, function (err, result) {

            if (err) throw err;
            var clientid = result[0].clientid + 1;
            res.render('client', { clientid });

        });

    }

    static clientpost = async (req, res) => {

        try {

            console.log(req.file);
            console.log(req.body);
            var path2 = `http://192.168.1.96:4500/client/${req.body.clientid}.png`;

            // var sql = 'INSERT INTO `client` (clientid,skypeid,firstname,lastname,email,phonenumber,linkedin,addprofilepicture,location,company) VALUES (' + `${req.body.clientid},"${req.body.skypeid}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.phonenumber}","${req.body.linkdin}","${path2}","${req.body.location}","${req.body.company}"` + ')';
            var sql = 'INSERT INTO `client` (clientid,skypeid,firstname,lastname,email,phonenumber,linkedin,addprofilepicture,location,company,disable) VALUES (' + `${req.body.clientid},"${req.body.skypeid}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.phonenumber}","${req.body.linkdin}","${path2}","${req.body.location}","${req.body.company}","no"` + ')';
            // // var sql = 'INSERT INTO `client` (clientid,skypeid,firstname,lastname,email,phonenumber,linkedin,location,company) VALUES (' + `${req.body.clientid},"${req.body.skypeid}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.mobile}","${req.body.linkedin}","${req.body.location}","${req.body.company}"` + ')';

            var imageid1 = path.join(__dirname, "../src/public/client", req.file.filename);
            var imageid2 = path.join(__dirname, "../src/public/client", req.body.clientid + ".png");

            fs.rename(imageid1, imageid2, function (err) {
                if (err) console.log('ERROR: ' + err);
            });

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientcompanyget = async (req, res) => {
        res.render('clientcompany');
    }

    static clientcompanypost = async (req, res) => {

        try {

            // console.log(req.body);
            // console.log(req.file);

            var sql = 'INSERT INTO `clientcompany` (companyid ,companyname,email,phone,website,linkedinid,companylogo,disable) VALUES (' + `${req.body.companyid},"${req.body.companyname}","${req.body.email}","${req.body.phone}","${req.body.website}","${req.body.linkedinid}","${req.body.companyid}.png","no"` + ')';

            var imageid1 = path.join(__dirname, "../src/public/client/company", req.file.filename);
            var imageid2 = path.join(__dirname, "../src/public/client/company", req.body.companyid + ".png");

            fs.rename(imageid1, imageid2, function (err) {
                if (err) console.log('ERROR: ' + err);
            });

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static salesget = async (req, res) => {
        res.render('sales');
    }

    static salespost = async (req, res) => {

        try {

            console.log(req.body);

            // var sql = 'INSERT INTO `sales` (inquiryid,projectname,firstname,lastname,link,Projectyype,technology,platform,applicationdate,appliedby,rate,location,frdate,lrdate,lfdate,managedby,meetingwith,assignedto,trackerid,trackername,devname) VALUES (' + `"${req.body.inquiryid}","${req.body.projectname}","${req.body.firstname}","${req.body.lastname}","${req.body.link}","${req.body.projecttype}","${req.body.technology}","${req.body.platform}","${req.body.applicationdate}","${req.body.appliedby}","${req.body.rate}","${req.body.location}","${req.body.frdate}","${req.body.lrdate}","${req.body.lfdate}","${req.body.managedby}","${req.body.meetingwith}","${req.body.assignedto}","${req.body.trackerid}","${req.body.trackername}","${req.body.devname}"` + ')';
            var sql = 'INSERT INTO `sales` (inquiryid,projectname,firstname,lastname,link,Projectyype,technology,platform,applicationdate,appliedby,rate,location,frdate,lrdate,lfdate,managedby,meetingwith,assignedto,trackerid,trackername,devname,disable) VALUES (' + `"${req.body.inquiryid}","${req.body.projectname}","${req.body.firstname}","${req.body.lastname}","${req.body.link}","${req.body.projecttype}","${req.body.technology}","${req.body.platform}","${req.body.applicationdate}","${req.body.appliedby}","${req.body.rate}","${req.body.location}","${req.body.frdate}","${req.body.lrdate}","${req.body.lfdate}","${req.body.managedby}","${req.body.meetingwith}","${req.body.assignedto}","${req.body.trackerid}","${req.body.trackername}","${req.body.devname}","no"` + ')';
            // var sql = 'INSERT INTO `sales` (clientid,skypeid,firstname,lastname,email,phonenumber,linkedin,addprofilepicture,location,company) VALUES (' +`${req.body.clientid},"${req.body.skypeid}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.mobile}","${req.body.linkedin}","${req.file.filename}","${req.body.Location}","${req.body.Company}"` +')';
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static inquiryget = async (req, res) => {
        res.render('inquiry');
    }

    static inquirypost = async (req, res) => {

        try {

            // console.log(req.body);

            // var sql = 'INSERT INTO `inquiry` (inquiryid,projectname,firstname,lastname,link,Projectyype,technology,platform,applicationdate,appliedby,rate,location,frdate,lrdate,lfdate,managedby,meetingwith,assignedto) VALUES (' + `${req.body.inquiryid},"${req.body.projectname}","${req.body.firstname}","${req.body.lastname}","${req.body.link}","${req.body.Projectyype}","${req.body.technology}","${req.body.platform}","${req.body.applicationdate}","${req.body.appliedby}","${req.body.rate}","${req.body.location}","${req.body.frdate}","${req.body.lrdate}","${req.body.lfdate}","${req.body.managedby}","${req.body.meetingwith}","${req.body.assignedto}"` + ')';
            var sql = 'INSERT INTO `inquiry` (inquiryid,projectname,firstname,lastname,link,Projectyype,technology,platform,applicationdate,appliedby,rate,location,frdate,lrdate,lfdate,managedby,meetingwith,assignedto,disable) VALUES (' + `${req.body.inquiryid},"${req.body.projectname}","${req.body.firstname}","${req.body.lastname}","${req.body.link}","${req.body.Projectyype}","${req.body.technology}","${req.body.platform}","${req.body.applicationdate}","${req.body.appliedby}","${req.body.rate}","${req.body.location}","${req.body.frdate}","${req.body.lrdate}","${req.body.lfdate}","${req.body.managedby}","${req.body.meetingwith}","${req.body.assignedto}","no"` + ')';
            // var sql = 'INSERT INTO `sales` (clientid,skypeid,firstname,lastname,email,phonenumber,linkedin,addprofilepicture,location,company) VALUES (' +`${req.body.clientid},"${req.body.skypeid}","${req.body.firstname}","${req.body.lastname}","${req.body.email}","${req.body.mobile}","${req.body.linkedin}","${req.file.filename}","${req.body.Location}","${req.body.Company}"` +')';
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static applicationdelete = async (req, res) => {

        try {

            // console.log(req.params._id)

            // var sql = ' DELETE from application ' + ` WHERE projectid = ${req.params._id}; `
            var sql = ' UPDATE `application` SET ' + ` disable="yes" ` + ` WHERE disable="no" AND projectid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                console.log(data);

                if (data.affectedRows == 0) {
                    res.send("does not find this data")
                } else {
                    res.json({ "message": "data delete" });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientdelete = async (req, res) => {

        try {

            // console.log(req.params)

            // var sql = ' DELETE from client ' + ` WHERE clientid = ${req.params._id}; `
            var sql = ' UPDATE `client` SET ' + ` disable="yes" ` + ` WHERE disable="no" AND clientid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                // console.log(data.changedRows);  // please open log for one time

                if (data.changedRows == 0) {
                    res.send("does not find this data")
                } else {
                    res.json({ "message": "data delete" });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static salesdelete = async (req, res) => {

        try {

            // console.log(req.params)

            var sql = ' UPDATE `sales` SET ' + ` disable="yes" ` + ` WHERE inquiryid = ${req.params._id}; `
            // var sql = ' DELETE from sales ' + ` WHERE inquiryid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                if (data.changedRows == 0) {
                    res.send("does not find this data")
                } else {
                    res.json({ "message": "data delete" });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static inquirydelete = async (req, res) => {

        try {

            // console.log(req.params)

            var sql = ' UPDATE `inquiry` SET ' + ` disable="yes" ` + ` WHERE inquiryid = ${req.params._id}; `
            // var sql = ' DELETE from inquiry ' + ` WHERE inquiryid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                if (data.changedRows == 0) {
                    res.send("does not find this data")
                } else {
                    res.json({ "message": "data delete" });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static applicationupdateget = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' select * from application ' + ` WHERE disable="no" AND projectid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                var A = 'A'
                var select = [];

                // res.json({data});

                if (data.length == 0) {
                    res.send("does not find this data")
                } else {
                    res.render('applicationupdate', { data, A, select });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientupdateget = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' select * from client ' + ` WHERE disable="no" AND clientid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                var A = 'A'
                var select = [];

                if (data.length == 0) {
                    // console.log("file not exits")
                    var filename = "default.png"
                    var promise = fs.promises.readFile(path.join(`public/client/${filename}`));
                } else {
                    // console.log("file exits")
                    var filename = path.basename(data[0].addprofilepicture)
                    var promise = fs.promises.readFile(path.join(`public/client/${filename}`));
                }

                // var filename = path.basename(data[0].addprofilepicture)
                // var promise = fs.promises.readFile(path.join(`public/client/${filename}`));

                var abc

                Promise.resolve(promise).then(function (buffer) {

                    var abc = {
                        data: buffer,
                        contentType: 'image/png'
                    }

                    if (data.length == 0) {
                        res.send("does not find this data")
                    } else {
                        res.render('clientupdate', { data, A, select, abc });
                    }

                });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static salesupdateget = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' select * from sales ' + ` WHERE disable="no" AND inquiryid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                var A = 'A'
                var select = [];

                if (data.length == 0) {
                    res.send("does not find this data")
                } else {
                    res.render('salesupdate', { data, A, select });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static inquiryupdateget = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' select * from inquiry ' + ` WHERE disable="no" AND inquiryid = ${req.params._id}; `

            connection.query(sql, function (err, data) {

                var A = 'A'
                var select = [];

                if (data.length == 0) {
                    res.send("does not find this data")
                } else {
                    res.json({ "message": `error:${data, A, select}` });
                    // res.render('inquiryupdate', { data, A, select });
                }

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static applicationupdatepost = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' UPDATE `application` SET ' + ` projectid="${req.body.projectid}" , appliedby="${req.body.appliedby}" , applicationdate="${req.body.applicationdate}" , projectname="${req.body.projectname}" , rate="${req.body.rate}" , technology="${req.body.technology}" , platform="${req.body.platform}" , link="${req.body.link}" , location="${req.body.location}" ` + ` WHERE projectid = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data update" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientupdatepost = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            if (req.file) {

                var imageid2 = path.join(__dirname, "../src/public/client", req.body.clientid + ".png");
                fs.unlinkSync(imageid2);

                var imageid1 = path.join(__dirname, "../src/public/client", req.file.filename);
                var imageid3 = path.join(__dirname, "../src/public/client", req.body.clientid + ".png");

                fs.rename(imageid1, imageid3, function (err) {
                    if (err) console.log('ERROR: ' + err);
                });

            }

            var sql = ' UPDATE `client` SET ' + ` clientid="${req.body.clientid}" , skypeid="${req.body.skypeid}" , firstname="${req.body.firstname}" , lastname="${req.body.lastname}" , email="${req.body.email}" , phonenumber="${req.body.mobile}" , linkedin="${req.body.linkedin}" , addprofilepicture="${req.body.clientid}.png" , location="${req.body.location}" , company="${req.body.company}" WHERE clientid = ${req.params._id}; `
            // var sql = ' UPDATE `client` SET ' + ` clientid="${req.body.clientid}" , skypeid="${req.body.skypeid}" , firstname="${req.body.firstname}" , lastname="${req.body.lastname}" , email="${req.body.email}" , phonenumber="${req.body.mobile}" , linkedin="${req.body.linkedin}" , location="${req.body.location}" , company="${req.body.company}" WHERE clientid = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data update" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static salesupdatepost = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' UPDATE `sales` SET ' + ` inquiryid="${req.body.inquiryid}" , projectname="${req.body.projectname}" , firstname="${req.body.firstname}" , lastname="${req.body.lastname}" , link="${req.body.link}" , Projectyype="${req.body.Projectyype}" , technology="${req.body.technology}" , platform="${req.body.platform}" , applicationdate="${req.body.applicationdate}" , appliedby="${req.body.appliedby}" , rate="${req.body.rate}" , location="${req.body.location}" , frdate="${req.body.frdate}" , lrdate="${req.body.lrdate}" , lfdate="${req.body.lfdate}" , managedby="${req.body.managedby}" , meetingwith="${req.body.meetingwith}"  , assignedto="${req.body.assignedto}" , trackerid="${req.body.trackerid}" , trackername="${req.body.trackername}" , devname="${req.body.devname}"  ` + ` WHERE inquiryid = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data update" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static inquiryupdatepost = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' UPDATE `inquiry` SET ' + ` inquiryid="${req.body.inquiryid}" , projectname="${req.body.projectname}" , firstname="${req.body.firstname}" , lastname="${req.body.lastname}" , link="${req.body.link}" , Projectyype="${req.body.Projectyype}" , technology="${req.body.technology}" , platform="${req.body.platform}" , applicationdate="${req.body.applicationdate}" , appliedby="${req.body.appliedby}" , rate="${req.body.rate}" , location="${req.body.location}" , frdate="${req.body.frdate}" , lrdate="${req.body.lrdate}" , lfdate="${req.body.lfdate}" , managedby="${req.body.managedby}" , meetingwith="${req.body.meetingwith}"  , assignedto="${req.body.assignedto}"  ` + ` WHERE inquiryid = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data update" });
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static applicationshow = async (req, res) => {

        try {

            // var sql = ' select * from application '
            var sql = ' select * from application WHERE disable = "no" '

            connection.query(sql, function (err, data) {

                res.json(data);
                // res.render('applicationshow', { data });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientshow = async (req, res) => {

        try {

            var sql = ' select * from client WHERE disable = "no" '

            connection.query(sql, async function (err, data) {

                // var a = [];
                // for(var i=0;i<data.length;i++){
                //     const promise = fs.promises.readFile(path.join(`public/client/${data[i].addprofilepicture}`));
                //     a.push(promise)
                // }

                // var b = [];
                // for (var k = 0; k < a.length; k++) {

                //     await Promise.resolve(a[k]).then(function (buffer) {

                //         var abc = {
                //             data: buffer,
                //             contentType: 'image/png'
                //         }

                //         b.push(abc);

                //     });

                // }

                res.json(data);
                // res.render('clientshow', { data , b });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientshowfull = async (req, res) => {

        try {

            var sql = ' select * from client '

            connection.query(sql, async function (err, data) {

                // var a = [];
                // for(var i=0;i<data.length;i++){
                //     const promise = fs.promises.readFile(path.join(`public/client/${data[i].addprofilepicture}`));
                //     a.push(promise)
                // }

                // var b = [];
                // for (var k = 0; k < a.length; k++) {

                //     await Promise.resolve(a[k]).then(function (buffer) {

                //         var abc = {
                //             data: buffer,
                //             contentType: 'image/png'
                //         }

                //         b.push(abc);

                //     });

                // }

                // res.render('clientshowfull', { data , b });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static clientcompanyshow = async (req, res) => {

        try {

            var sql = ' select * from clientcompany WHERE disable = "no"  '

            connection.query(sql, async function (err, data) {

                var a = [];
                for (var i = 0; i < data.length; i++) {
                    const promise = fs.promises.readFile(path.join(`public/client/company/${data[i].companylogo}`));
                    a.push(promise)
                }

                var b = [];
                for (var k = 0; k < a.length; k++) {

                    await Promise.resolve(a[k]).then(function (buffer) {

                        var abc = {
                            data: buffer,
                            contentType: 'image/png'
                        }

                        b.push(abc);

                    });

                }

                if (data.length == 0) {
                    res.send("does not find this data")
                } else {
                    res.render('clientcompanyshow', { data, b });
                }


            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static salesshow = async (req, res) => {

        try {

            var sql = ' select * from sales WHERE disable = "no" '

            connection.query(sql, function (err, data) {

                res.json(data);
                // res.render('salesshow', { data });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static inquiryshow = async (req, res) => {

        try {

            var sql = ' select * from inquiry WHERE disable = "no" '

            connection.query(sql, function (err, data) {

                res.json(data);
                // res.render('inquiryshow', { data });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static approved = async (req, res) => {

        try {

            var leave = [];
            var holiday = [];

            var sql = "SELECT * FROM holiday LEFT JOIN employee ON employee.employeeid = holiday.employeeid WHERE status = 'approve' ";
            // var sql = ' select * from holiday WHERE status = "approve" '

            connection.query(sql, async function (err, data) {

                for (var i = 0; i < data.length; i++) {

                    var c = [];
                    c.push(data[i].startingdate);
                    c.push(data[i].endingdate);

                    leave.push(c);

                }

                for (var j = 0; j < leave.length; j++) {

                    var daysOfYear = [];
                    for (var d = new Date(leave[j][0]); d <= leave[j][1]; d.setDate(d.getDate() + 1)) {
                        daysOfYear.push('Hi');
                    }
                    holiday.push(daysOfYear.length);

                    // console.log(daysOfYear);

                }

                var b = [];
                for (var k = 0; k < data.length; k++) {

                    const promise = fs.promises.readFile(path.join(`public/employee/${data[k].employeeid}.png`));
                    b.push(promise)

                }

                var c = [];
                for (var ijk = 0; ijk < b.length; ijk++) {

                    await Promise.resolve(b[ijk]).then(function (buffer) {

                        var abc = {
                            data: buffer,
                            contentType: 'image/png'
                        }

                        c.push(abc);

                    });

                }
                // console.log(holiday);

                // res.json(data);
                res.render('approved', { data, holiday, c });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static holidayget = async (req, res) => {
        res.render('holiday');
    }

    static holidaypost = async (req, res) => {

        if (req.body.startingdate == req.body.endingdate) {

            var date1 = req.body.startingdate;
            var time1 = req.body.startingtime;
            var time2 = req.body.endingtime;

            var timeAndDate1 = moment(date1 + ' ' + time1);
            var timeAndDate2 = moment(date1 + ' ' + time2);

            var hours = moment.duration(timeAndDate2.diff(timeAndDate1)).asHours();

            if (hours <= 4) {
                var dayy = 0.5
                var sql = 'INSERT INTO `holiday` (employeeid,startingdate,startleave,endingdate,day,leavesub,body,pending) VALUES (' + `${req.body.employeeid},"${req.body.startingdate}","half","${req.body.startingdate}","${dayy}","${req.body.leavesub}","${req.body.body}","yes"` + ')';
            } else {
                var dayy = 1
                var sql = 'INSERT INTO `holiday` (employeeid,startingdate,startleave,endingdate,day,leavesub,body,pending) VALUES (' + `${req.body.employeeid},"${req.body.startingdate}","full","${req.body.startingdate}","${dayy}","${req.body.leavesub}","${req.body.body}","yes"` + ')';
            }

            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
                res.json({ "message": "data uploaded" });
            });

        }

        if (req.body.startingdate !== req.body.endingdate) {

            var date2 = req.body.startingdate;
            var time3 = req.body.startingtime;
            var time4 = "18:00";

            var timeAndDate3 = moment(date2 + ' ' + time3);
            var timeAndDate4 = moment(date2 + ' ' + time4);

            var hours2 = moment.duration(timeAndDate4.diff(timeAndDate3)).asHours();

            if (hours2 <= 4) {
                var a = 0.5
            } else {
                var a = 1
            }

            var date3 = req.body.endingdate;
            var time5 = req.body.endingtime;
            var time6 = "18:00";

            var timeAndDate5 = moment(date3 + ' ' + time5);
            var timeAndDate6 = moment(date3 + ' ' + time6);

            var hours3 = moment.duration(timeAndDate6.diff(timeAndDate5)).asHours();

            if (hours3 <= 4) {
                var b = 0.5
            } else {
                var b = 1
            }

            var day = [];
            for (var aa = new Date(req.body.startingdate); aa < new Date(req.body.endingdate); aa.setDate(aa.getDate() + 1)) {
                day.push(aa);
            }

            day.pop();

            var day = day.length;

            var day = day + a + b

            var sql1 = 'INSERT INTO `holiday` (employeeid,startingdate,startleave,endingdate,endleave,day,leavesub,body,pending) VALUES (' + `${req.body.employeeid},"${req.body.startingdate}","${a}","${req.body.endingdate}","${b}","${day}","${req.body.leavesub}","${req.body.body}","yes"` + ')';
            connection.query(sql1, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

        }

    }

    static holidayrequest = async (req, res) => {

        try {

            var sql1 = "SELECT * FROM holiday LEFT JOIN employee ON employee.employeeid = holiday.employeeid WHERE pending = 'yes' ";

            connection.query(sql1, async function (err, data) {

                var b = [];
                for (var i = 0; i < data.length; i++) {

                    const promise = fs.promises.readFile(path.join(`public/employee/${data[i].employeeid}.png`));
                    b.push(promise)

                }

                var d = [];
                for (var j = 0; j < b.length; j++) {

                    await Promise.resolve(b[j]).then(function (buffer) {

                        var abc = {
                            data: buffer,
                            contentType: 'image/png'
                        }

                        d.push(abc);

                    });

                }

                res.render('holidayrequest', { data, d });

            })

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static holidayapprove = async (req, res) => {

        try {

            // console.log("Hi");

            // console.log(req.params);
            // console.log(req.params._id);

            var sql = ' UPDATE `holiday` SET pending = "no" , status = "approve" ' + ` WHERE id = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record inserted");
            });

            res.redirect('/holidayrequest');

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }
    }

    static holidayrejectget = async (req, res) => {
        res.render('holidayreject');
    }

    static holidayrejectpost = async (req, res) => {

        try {

            // console.log(req.params);
            // console.log(req.params._id);

            // console.log(req.body.reason)

            var no = "no"
            var reject = "reject"

            var sql = ' UPDATE `holiday` SET ' + ` pending="${no}" , status="${reject}" , reason="${req.body.reason}" ` + ` WHERE id = ${req.params._id}; `
            connection.query(sql, function (err, result) {
                if (err) throw err;
                console.log("1 record updated");
            });

            res.redirect('/holidayrequest');

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

    static attendance = async (req, res) => {

        var year = req.params._id1;
        var month = req.params._id2;
        var employee = req.params._id3;

        var absenthalf = [];
        var absent = [];
        var present = [];
        var today = [];

        function daysInMonth(month, year) {
            return new Date(year, month, 0).getDate();
        }
        var daysinmonth = daysInMonth(month, year);

        if (month < 10) {
            var length = month.toString().length;
        }
        if (length == 1) {
            var month = ('0' + month).slice(-2)
        }

        var date = year + "-" + month + "-" + 1;
        var date = new Date(date)

        const optionss = { weekday: 'long' };
        var weekend = date.toLocaleDateString('en-US', optionss);

        if (weekend == "Monday") {
            var space = 0
        } else if (weekend == "Tuesday") {
            var space = 1
        } else if (weekend == "Wednesday") {
            var space = 2
        } else if (weekend == "Thursday") {
            var space = 3
        } else if (weekend == "Friday") {
            var space = 4
        } else if (weekend == "Saturday") {
            var space = 5
        } else {
            var space = 6
        }

        const todaydate = new Date();

        if (todaydate.getMonth() + 1 == month && todaydate.getFullYear() == year) {
            today.push(todaydate.getDate());
        }

        var delay=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];
        var sql2 = `SELECT * FROM delay WHERE employeeid = ${employee}`

        connection.query(sql2, function (err, result) {

            for(var delaytime=0;delaytime<result.length;delaytime++){

                if(result[delaytime].time !== 0){

                    if(result[delaytime].date.getMonth() + 1 == month && result[delaytime].date.getFullYear() == year){
                        delay[result[delaytime].date.getDate()] = `Delay time(min): ${result[delaytime].time}`
                    }
                    
                }

            }

        });

        var sql2 = `SELECT * FROM holiday WHERE pending = 'no' AND employeeid = ${employee}`
        connection.query(sql2, function (err, result) {
            function sundaysInMonth(m, y) {
                var days = new Date(y, m, 0).getDate();
                var sundays = [8 - (new Date(m + '/01/' + y).getDay())];
                for (var i = sundays[0] + 7; i < days; i += 7) {
                    sundays.push(i);
                }
                return sundays;
            }
            var sunday = sundaysInMonth(month, year);
            if (sunday.includes(8)) {
                sunday.push(1)
                sunday.push(15)
                sunday.push(22)
                sunday.push(29)
            }
            if (sunday.includes(9)) {
                sunday.push(2)
                sunday.push(16)
                sunday.push(23)
                sunday.push(30)
            } if (sunday.includes(10)) {
                sunday.push(3)
                sunday.push(17)
                sunday.push(24)
                sunday.push(31)
            }
            if (sunday.includes(11)) {
                sunday.push(4)
                sunday.push(18)
                sunday.push(25)
            } if (sunday.includes(12)) {
                sunday.push(5)
                sunday.push(19)
                sunday.push(26)
            }
            if (sunday.includes(13)) {
                sunday.push(6)
                sunday.push(20)
                sunday.push(27)
            } if (sunday.includes(14)) {
                sunday.push(7)
                sunday.push(21)
                sunday.push(28)
            } // first day of the month is sunday so we can't push 1 into sunday so we are add this extra logic code created by me 

            function isInTheFuture(date) {
                const today = new Date();

                today.setHours(23, 59, 59, 998);

                return date > today;
            }

            // let date_ob = new Date();
            // let datee = ("0" + date_ob.getDate()).slice(-2); 
            for (var i = 0; i < result.length; i++) {

                if (result[i].startingdate.getMonth() + 1 == month && result[i].startingdate.getFullYear() == year && result[i].startleave == 0.5) {  // add 1 here result[i].startingdate.getMonth() + 1 == month bcz month start from 0 
                    absenthalf.push(result[i].startingdate.getDate())
                }

                if (result[i].endingdate.getMonth() + 1 == month && result[i].endingdate.getFullYear() == year && result[i].endleave == 0.5) {
                    absenthalf.push(result[i].endingdate.getDate())
                }

                if (result[i].startingdate.getMonth() + 1 == month && result[i].startingdate.getFullYear() == year && result[i].startleave == 1) {
                    absent.push(result[i].startingdate.getDate())
                }

                if (result[i].endingdate.getMonth() + 1 == month && result[i].endingdate.getFullYear() == year && result[i].endleave == 1) {
                    absent.push(result[i].endingdate.getDate())
                }

                if (result[i].startingdate.getMonth() + 1 == month && result[i].startingdate.getFullYear() == year && result[i].startingdate.getMonth() == result[i].startingdate.getMonth()) {

                    for (var j = result[i].startingdate.getDate() + 1; j < result[i].endingdate.getDate(); j++) {
                        absent.push(j);
                    }

                }

                if (result[i].endingdate.getMonth() + 1 == month && result[i].endingdate.getFullYear() == year && result[i].startingdate.getMonth() != result[i].endingdate.getMonth()) {

                    for (var k = 1; k < result[i].endingdate.getDate(); k++) {
                        absent.push(k);
                    }

                }

                if (result[i].startingdate.getMonth() + 1 == month && result[i].startingdate.getFullYear() == year && result[i].startingdate.getMonth() != result[i].endingdate.getMonth()) {

                    for (var l = result[i].startingdate.getDate() + 1; l < 32; l++) {
                        absent.push(l);
                    }

                }

            }

            for (var m = 1; m <= 31; m++) {

                if (absenthalf.includes(m)) {
                } else if (absent.includes(m)) {
                } else if (isInTheFuture(new Date(`${year}-${month}-${m}`))) {
                } else if (today.includes(m)) {
                } else {
                    present.push(m);
                }

            }

            res.render("attendance", { daysinmonth, today, sunday, space, absenthalf, absent, present , delay });

        });

    }

    static delayget = async (req, res) => {

        res.render("delay");

    }

    static delaypost = async (req, res) => {

        try {

            // console.log(req.body);

            var time1 = "9:00";
            var time2 = req.body.time;

            var timeAndDate1 = moment(req.body.date + ' ' + time1);
            var timeAndDate2 = moment(req.body.date + ' ' + time2);

            var minites = moment.duration(timeAndDate2.diff(timeAndDate1)).asMinutes();

            var sql = `INSERT INTO delay (employeeid,date,time) VALUES ("${req.body.employeeid}","${req.body.date}","${minites}")`;

            connection.query(sql, function (err, result) {
                // console.log("1 record inserted");
                if(err){
                    fs.unlinkSync(imageid2);
                    res.json({"message":`${err}`});
                }else{
                    res.json({"message":"data uploaded"});
                }  
            });

        } catch (e) {

            res.json({ "message": `error:${e}` });
            console.log(e);

        }

    }

}

module.exports = { class1 };