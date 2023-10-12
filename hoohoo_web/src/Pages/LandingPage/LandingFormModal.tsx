import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../style';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const public_Key = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const ModalBackground = styled.div`
  position: fixed;
  z-index: 9999;
  top: 82px;
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
  /* border: 1px solid #ccc; */
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  /* border: 1px solid #ccc; */
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
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function LandingFormModal({ isOpen, setIsOpen }: Props) {

    const [formData, setFormData] = useState({
        name: '',
        festival: '',
        email: '',
        message: ''
    });
    const formRef = useRef<HTMLFormElement | null>(null);
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formRef.current && serviceId && templateId && public_Key) {
            try {
                await emailjs.sendForm(
                    serviceId,
                    templateId,
                    formRef.current,
                    public_Key
                );
                toast.success("Email successfully sent!");

                setIsOpen(false);
            } catch (error: unknown) {
                toast.error("Error sending email.");
                if (typeof error === 'object' && error !== null && 'text' in error) {
                    console.log("Error sending email:", (error as { text: string }).text);
                } else {
                    console.log("Error sending email:", error);
                }
            }
        } else {
            console.log("Form reference is null");
        }

    };
    return (
        <React.Fragment>
            {isOpen && (
                <ModalBackground>
                    <Wrapper>
                        <ModalContent>
                            <CloseButton onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faX} /></CloseButton>
                            <Form ref={formRef} onSubmit={handleSubmit}>
                                <HeaderCotainer>
                                    <HeaderText>Discover more about what Earthmera can provide!</HeaderText>
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
                                <Label>Festival Name</Label>
                                <Input type="text"
                                    name="festival"
                                    value={formData.festival}
                                    onChange={handleChange}
                                    placeholder="Festival Name"
                                    required />
                                <Label>Message</Label>
                                <Textarea rows={5} name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Reach out for an exclusive 50% partner discount!"
                                    required />
                                <ConsentContainer>
                                    {/* <RichText></RichText> */}
                                    {/* <AgreeBox>
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
                                    </AgreeBox> */}
                                    {/* <ReCaptchaBox>
                                        <ReCap>
                                            <Iframe src="https://www.google.com/recaptcha/enterprise/anchor?ar=1&k=6Ld_ad8ZAAAAAAqr0ePo1dUfAi0m4KPkCMQYwPPm&co=aHR0cHM6Ly93d3cubWlzdHBsYXkuY29tOjQ0Mw..&hl=en&v=0hCdE87LyjzAkFO5Ff-v7Hj1&size=invisible&badge=inline&cb=ti16pg6gvhcq" />
                                        </ReCap>
                                    </ReCaptchaBox> */}
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

export default LandingFormModal;
