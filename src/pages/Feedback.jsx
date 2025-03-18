import '../styles/Feedback.css';
import React, { useState } from 'react';

const Feedback = () => {
    const [feedbackType, setFeedbackType] = useState('none');

    return(
        <div className='feedback'>
            <h1>Help Us Improve: Clockwork Feedback</h1>
            <form id='feedbackForm'>
                <select name='feedbackType' 
                id='feedbackType'
                onChange={(e) => setFeedbackType(e.target.value)}
                >
                    <option value="none">Select Feedback Type</option>
                    <option value="feature">Feature Feedback</option>
                    <option value="bug">Bug Report</option>
                    <option value="general">General Feedback</option>
                </select>

                {feedbackType === "feature" && (
                    <div className='featureFeedback'>
                        <div className='featureFeedbackInput'>
                            <label htmlFor='appSatisfaction'>How Satisfied Are You With The App?</label>
                            <select name='appSatisfaction' id='appSatisfaction'>
                                <option value='verySatisfied'>Very Satisfied</option>
                                <option value='satisfied'>Satisfied</option>
                                <option value='neutral'>Neutral</option>
                                <option value='unsatisfied'>Unsatisfied</option>
                                <option value='veryUnsatisfied'>Very Unsatisfied</option>
                            </select>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
};

export default Feedback;