import React, { Component } from 'react';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Success from './success';
import SaveFormContext from '../contexts/SaveFormContext';



export default class Signup extends Component {




    state ={
        step: 1,
        email: '',
        username: '',
        password: '',
        firstName: '',
        lastName: '',
        country: '',
        levelOfEducation: '',
    }

        
        //Go to previous step
        prevStep = () => {
            const { step } = this.state;
            this.setState ({ step: step -1 });
        }

        //Proceed to next step
        nextStep = () => {
            const { step } = this.state;
            this.setState({ step: step + 1 });
        };

        //handle field change
        handleChange = input => e => {
            this.setState({ [input]: e.target.value });
        }
        

    render(){

        
        
        const { step } = this.state;
        const { 
            email, 
            username, 
            password, 
            firstName, 
            lastName, 
            country, 
            levelOfEducation, 
            contactForm, 
            schedulingDatetime 
        } = this.state;
        const values = { email, username, password, firstName, lastName, country }


        

            switch(step) {
                case 1:
                    return(
                        
                            <Step2 
                                nextStep={ this.nextStep} 
                                handleChange={ this.handleChange }
                                values={ values }
                            
                            />  

                    )

                case 2:
                    return(
                        
                        <Step3 
                            prevStep={ this.prevStep }
                            nextStep={ this.nextStep }
                            handleChange={ this.handleChange }
                            values={ values }
                        
                        />
                    )
                case 3:
                    return(
                        <Step4
                            prevStep={this.prevStep }
                            nextStep={ this.nextStep }
                            values={ values }
                        
                        />
                    )
                case 4:
                    return(
                        <Success />
                    )
                default:
            }

    }
}


