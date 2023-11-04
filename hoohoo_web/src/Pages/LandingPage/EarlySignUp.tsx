import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BgImage, theme } from '../../style';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import '@coreui/coreui/dist/css/coreui.min.css'
import { CFormInput, CFormLabel, CFormCheck,CForm } from '@coreui/react';
import { useNavigate } from 'react-router-dom';
import i18next from 'i18next';
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID2;
const public_Key = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;


const SectionContainer = styled.section`
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    width: calc(100% );
    padding: 0 10px;
    align-items: center;
    margin-top: 82px;
    
    @media screen and (max-width: 800px) {
    }
`;
const Input = styled(CFormInput)`
  width: 350px;
  @media screen and (max-width: 800px) {
    width: 250px;
    }
`;
const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 60px 0;
  padding: 60px 60px;
  border-radius: 30px;
  background-color: white;
  backdrop-filter: blur(30px);
  background-color: rgba(255, 255, 255, 0.5);
`;

const Form = styled(CForm)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
`;

// const Input = styled.input`
//   padding: 10px;
//   border-radius: 5px;
// `;
const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width:100%;
  justify-content: center;
  align-items: center;
`;

const SubmitBtn = styled.button`
  text-decoration: none;
  background-color: #006DFF;
  height: 50px;
  border-radius: 15px;
  border-color: ${theme.white};
  color:${theme.white};
  width:250px;
  font-weight: 700;
  margin-bottom: 26px;
`;

const HeaderCotainer = styled.div`
  display: flex;
  align-items: center;
`;
const HeaderText = styled.h1`
    color: ${theme.darkGray};
    font-size: 24px;
    text-align: center;
    line-height: 1.7;
    font-weight: 600;
    text-transform: uppercase;
    font-family: 'Fredoka';
    @media screen and (max-width: 800px) {
        font-size: 1.1rem;
    }
`;
const TermsLink = styled.a`
  text-decoration: underline;
  padding-left: 5px;
`;
const AgreeText = styled(CFormLabel)`
margin-bottom: 0;
  @media screen and (max-width: 800px) {
        font-size: 0.7rem;
    } 
`;
const Check = styled(CFormCheck)`
`;

interface DataProps {
    image: string;
    header: {
        part1:string;
        part2: string;
    };
    terms: {
        part1:string;
        part2: string;
    };
    button: string;
}

function EarlySignUp() {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [validated, setValidated] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        secondPassword: ''
    });
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };
    const handleCheckboxChange = (e: any) => {
        setIsChecked(e.target.checked);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget
        if (form.checkValidity() === false) {
            e.preventDefault()
            e.stopPropagation()
        }
        setValidated(true)
        if (!isChecked) {
            alert("Please agree with the Terms and Conditions before submitting.");
            return;
        }
        if (formData.password !== formData.secondPassword) {
            alert("Password and Confirm Password do not match!");
            return;
        }
        e.preventDefault();
        if (formRef.current && serviceId && templateId && public_Key) {
            try {
                setIsSubmitting(true);
                await emailjs.sendForm(
                    serviceId,
                    templateId,
                    formRef.current,
                    public_Key
                );
                toast.success("SignUp successfully Submitted!");
                navigate('/home')
            } catch (error: unknown) {
                toast.error("Error occured in submitting.");
                if (typeof error === 'object' && error !== null && 'text' in error) {
                    console.log("Error sending email:", (error as { text: string }).text);
                } else {
                    console.log("Error sending email:", error);
                }
            } finally {
                setIsSubmitting(false);
            }
        } else {
            console.log("Form reference is null");
        }
        
    };
    const data: DataProps = i18next.t('earlysignup', { returnObjects: true });
    return (
        <BgImage>
                <SectionContainer>
                    <LoginContainer>
                            <Form ref={formRef} onSubmit={handleSubmit}
                            noValidate
                            validated={validated}
                            >
                                <HeaderCotainer>
                                    <HeaderText>{data.header.part1} <br /> {data.header.part2} </HeaderText>
                                </HeaderCotainer>
                            <InputBox>
                                <Input
                                    name="fullName"
                                    type="text"
                                    id="floatingInput1" 
                                    floatingLabel="Full Name"
                                    
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    required
                                />
                                <Input type="email"
                                    
                                    name="email"
                                    floatingLabel="Email Address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required
                                    />
                                <Input type="tel"
                                    aria-label="default input example"
                                    name="phone"
                                    floatingLabel="Phone Number"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Phone Number"
                                    required
                                    />
                                <Input type="password"
                                    floatingLabel="Password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="******"
                                    required
                                    />
                                <Input type="password"
                                    name="secondPassword"
                                    floatingLabel="Confirm Password"
                                    value={formData.secondPassword}
                                    invalid={formData.password=== "" && formData.secondPassword === "" && formData.password !== formData.secondPassword}
                                    feedbackInvalid="Please enter the same password."
                                    onChange={handleChange}
                                    placeholder="******"
                                    required
                                    />
                                    <HeaderCotainer>
                                    <Check
                                        type="checkbox"
                                        id="termsAndConditions"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        style={{marginTop:0}}
                                    />
                                        <AgreeText htmlFor="termsAndConditions" style={{ marginLeft: '10px' }}>
                                        {data.terms.part1} 
                                            <TermsLink href="/term_of_use"
                                            rel="noopener noreferrer">
                                                 {data.terms.part2} </TermsLink>
                                        </AgreeText>
                                        </HeaderCotainer>
                                    </InputBox>
                                <SubmitBtn type="submit" data-l10n-id="partnership-submit" disabled={isSubmitting}>
                                {data.button}
                                </SubmitBtn>
                            </Form>
                            </LoginContainer></SectionContainer>
                            </BgImage>
    );
}

export default EarlySignUp;
