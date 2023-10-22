import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../style';
import i18next from 'i18next';
const ModalBackground = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
    bottom:0;
    right:0;
    max-height:100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
    width: 100%;
    max-height: 100%;
    padding: 6rem 2rem 3rem;
    overflow: auto;
`;
const ModalContent = styled.div`
    z-index: 10;
    width: 100%;
    max-width: 35rem;
    min-width: 600px;
    background-color: #1d1d1d;
    border-radius: 1rem;
    margin-left: auto;
    margin-right: auto;
    padding: 40px;
    position: relative;
    box-shadow: 0 16px 32px rgba(220, 220, 200, 0.25);
    overflow-y: auto;
    font-family: arial, helvetica, sans-serif;
`;

const CloseButton = styled.a`
  position: absolute;
  color: ${theme.white};
  right: 20px;
  top: 10px;
  text-decoration: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SubmitBtn = styled.button`
  text-decoration: none;
  background-color: ${theme.mainNeon};
  height: 50px;
  border-radius: 15px;
  border-color: ${theme.darkGray};
  width:200px;
  font-weight: bold;
  margin-bottom: 26px;
`;
const Label = styled.label`
  color: ${theme.white};
`;
const HeaderCotainer = styled.div`
  
`;
const HeaderText = styled.h1`
  color: ${theme.white};
    font-size: 24px;
`;
const ConsentContainer = styled.div`
  
`;
const RichText = styled.div`
  font-size: 14px;
  color: ${theme.white};
  word-break: break-word;
`;
const AgreeBox = styled.div`
    margin-bottom: 8px;
`;
const InputList = styled.ul`
  padding-top: 6px;
  margin: 0 0 5px;
  width: 100%;
  padding-left: 5px;
`;
const CheckList = styled.li`
  display:block;
  padding:0;
  width:100%;
`;
const Check = styled.input`
    font-family: arial, helvetica, sans-serif;
  float:left;
  max-width:100%;
  cursor: pointer;
  padding:0;
  margin: 5px 5px 3px 0;
  border: none;
`;
const RichTextP = styled.p`
display: block;
margin-block-start: 1em;
margin-block-end: 1em;
margin-inline-start: 0px;
margin-inline-end: 0px;
font-size: 14px;
  color: ${theme.white};
`;
const ReCaptchaBox = styled.div`
  margin: 18px 0;
`;
const ReCap = styled.div`
    width: 256px;
    height: 60px;
    box-shadow: gray 0px 0px 5px;
`;
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
function PartnerModal({ isOpen, setIsOpen }: Props) {
    const [formData, setFormData] = useState({
        name: '',
        company: '',
        email: '',
        message: ''
    });

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.status === 200) {
                console.log("Email sent successfully.");
                // Optionally, clear the form after successful submission
                setFormData({
                    name: '',
                    company: '',
                    email: '',
                    message: ''
                });
            } else {
                console.log("Error sending email.");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    const data: any = i18next.t('partnerModal', { returnObjects: true });
    return (
        <React.Fragment>
            {isOpen && (
                <ModalBackground>
                    <Wrapper>
                        <ModalContent>
                            <CloseButton onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faX} /></CloseButton>

                            <Form onSubmit={handleSubmit}>
                                <HeaderCotainer>
                                    <HeaderText>{data["header"]}</HeaderText>
                                </HeaderCotainer>
                                <Label>Email</Label>
                                <Input type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email Address"
                                    required />

                                <Label>Name</Label>
                                <Input type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Name"
                                    required />
                                <Label>Company Name</Label>
                                <Input type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="Company Name"
                                    required />
                                <Label>Message</Label>
                                <Textarea rows={5} name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Your Message"
                                    required />
                                <ConsentContainer>
                                    <RichText>{data["rich"]}</RichText>
                                    <AgreeBox>
                                        <legend />
                                        <React.Fragment>
                                            <InputList>
                                                <CheckList>
                                                    <Label style={{ fontSize: 14 }}>
                                                        <Check type="checkbox" />
                                                        I agree to the terms and conditions.
                                                    </Label>
                                                </CheckList>
                                            </InputList>
                                        </React.Fragment>
                                    </AgreeBox>
                                    <RichTextP>{data["rich1"]} <a href={'/privacy'}>Privacy Policy</a>.</RichTextP>
                                    <RichTextP>{data["rich2"]}</RichTextP>
                                    <ReCaptchaBox>
                                        <ReCap>
                                            <iframe src="https://www.google.com/recaptcha/enterprise/anchor?ar=1&k=6Ld_ad8ZAAAAAAqr0ePo1dUfAi0m4KPkCMQYwPPm&co=aHR0cHM6Ly93d3cubWlzdHBsYXkuY29tOjQ0Mw..&hl=en&v=0hCdE87LyjzAkFO5Ff-v7Hj1&size=invisible&badge=inline&cb=ti16pg6gvhcq"></iframe>
                                        </ReCap>
                                    </ReCaptchaBox>
                                </ConsentContainer>
                                <SubmitBtn data-l10n-id="partnership-submit">
                                    Submit</SubmitBtn>
                            </Form>
                        </ModalContent>
                    </Wrapper>
                </ModalBackground>
            )}
        </React.Fragment>
    );
}

export default PartnerModal;
