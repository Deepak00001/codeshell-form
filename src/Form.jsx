import React, { useState } from "react";
import { Button } from "@material-ui/core";
import useStyle from './style'
import axios from 'axios'
import Recaptcha from "react-recaptcha";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {

    const [captaverify, setcaptaverify] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState(false);

    // var date1;
    const verifyCallback = (response) => {
        if (response) {
            // console.log(date1)
            setcaptaverify(true);
            console.log(response)
        }
    }


    // const date1 = new Date("2021-08-11T17:28:03.880+00:00");
    // const date2 = new Date("2021-08-11T17:23:29.793+00:00");
    // const diffDays = parseInt((date1 - date2) / (1000 * 60)); //gives day difference
    // //one_day means 1000*60*60*24
    // //one_hour means 1000*60*60
    // //one_minute means 1000*60
    // //one_second means 1000
    // console.log(diffDays)


    var callback = function () {
        console.log('Done!!!!');
    };
    const classes = useStyle()
    const [fullData, setFullData] = useState({
        name: "",
        studentNumber: "",
        year: "",
        email: "",
        phoneNumber: "",
        branch: "",
        hackerrank: "",
    })

    const inputEvent = (event) => {
        // console.log(event.target.value);
        // console.log(event.target.name);
        const value = event.target.value;
        const name = event.target.name;
        setFullData((preValue) => {
            return {
                ...preValue,
                [name]: value
            }
        })
    };
    const Validate = () => {
        let email = fullData.email;
        let eletters = /^[a-z0-9](\.?[a-z0-9]){5,}@akgec\.ac\.in$/;
            if(eletters.test(email)){
                setVerifyEmail(true);
               }
            else{
                setVerifyEmail(false);
            }
    }

    const onSubmit = (event) => {
        const user = { ...fullData };
        console.log(user);
        Validate();
        if(verifyEmail)
        {
            if (captaverify) {
                axios.post('https://cine21.herokuapp.com/register', user)
                    .then(res => {
                        console.log(res);
                        toast.success("Congratulation, You are successfully registered");
                        setcaptaverify(false);
                        event.preventDefault(true);
                    })
                    .catch(err => {
                        toast.warn('Error', {
                            position: "top-center"
                        });
                        console.log(err);
                    })
            } 
            else {
                toast("Please verify captcha again");
            }
        }
        else
        {
            toast.warn("Email is not valid");
        } 
        event.preventDefault();
    }

    return (
        <>
            <div id="formmain">
                <form onSubmit={onSubmit}>
                <img src="../image/S3.svg" alt="fbg" id="back" />
                    <input id="input1" type="text" required placeholder="Full Name" name="name" onChange={inputEvent} value={fullData.name} />
                    <input id="input2" type="number" required maxLength={7} minLength={7} placeholder="Student Number" name="studentNumber" onChange={inputEvent} value={fullData.studentNumber} />
                    {/* <input id="input3" type="text" maxLength={1} minLength={1} required placeholder="Year (2, 3, 4)" name="year" onChange={inputEvent} value={fullData.year} /> */}
                    <select id="select1" name="year" onChange={inputEvent} value={fullData.year}>
                        <option value="YEAR">Year</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                    <input id="input4" type="email" required placeholder="College Email(@akgec.ac.in)" name="email" onChange={inputEvent} value={fullData.email}/>
                    <input id="input5" type="number" required maxLength={10} minLength={10} placeholder="Whatsapp Number" name="phoneNumber" onChange={inputEvent} value={fullData.phoneNumber} />
                    <select id="select1" name="branch"  onChange={inputEvent} value={fullData.branch}>
                        <option value="BRANCH">Branch</option>
                        <option value="CSE">CSE</option>
                        <option value="CS">CS</option>
                        <option value="CSE(DS)">CSE(DS)</option>
                        <option value="CSE(ML)">CSE(ML & AI)</option>
                        <option value="CSIT">CSIT</option>
                        <option value="IT">IT</option>
                        <option value="ECE">ECE</option>
                        <option value="ME">ME</option>
                        <option value="EI">EI</option>
                        <option value="EN">EN</option>
                        <option value="CE">CE</option>
                    </select>
                    <input id="input6" type="text" placeholder="Hackerrank Id" name="hackerrank" onChange={inputEvent} value={fullData.hackerrank} />


                    {/* <select id="select2" name="residency" value={fullData.residency}  onChange={inputEvent}>
                        <option value="RESIDENCY">Residency</option>
                        <option value="HOSTELLER">HOSTELLER</option>
                        <option value="DAY-SCHOLAR">DAY-SCHOLAR</option>
                    </select> */}

                    <div className="recaptcha">
                        <Recaptcha
                            className="captcha"
                            sitekey="6LcTNxkdAAAAAJR3uwxsfSyEziZD_iDyesnx6Mpl"
                            render="explicit"
                            verifyCallback={verifyCallback}
                            onloadCallback={callback}
                        />
                    </div>
                    <div id="btn">
                        <div className="btnborder">
                            <Button type="submit" variant="contained" size="large" className={classes.button} id="submitbtn">Submit</Button>
                        </div>
                    </div>
                    {/* <img src="../image/c2.svg" alt="fbg1" id="back1" /> */}
                </form>
            </div>
            <ToastContainer
            // position="top-right"
            // autoClose={5000}
            // hideProgressBar={false}
            // newestOnTop={false}
            // closeOnClick
            // rtl={false}
            // pauseOnFocusLoss
            // draggable
            // pauseOnHover
            />
        </>
    );
}
export default Form;
