import emailjs from '@emailjs/browser';
import {faX} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useRef, useState} from 'react';
import {toast} from 'react-toastify';
import styled from 'styled-components';
import {theme} from '../../style';
const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const public_Key = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const ModalBackground = styled.div`
  position: absolute;
  z-index: 10000;
  top: 40px;
  left: 0;
  width: 100%;
  bottom: 0;
  right: 0;
  max-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  width: 100%;
  max-height: 100%;
  padding: 6rem 2rem 3rem;
  overflow: auto;
  @media screen and (max-width: 700px) {
    padding: 10px 5px;
  }
`;
const ModalContent = styled.div`
  width: calc(100%);
  max-width: 40rem;
  min-width: 600px;
  background-color: #1d1d1d;
  border-radius: 1rem;
  margin-left: auto;
  margin-right: auto;
  padding: 3rem;
  position: relative;
  box-shadow: 0 16px 32px rgba(220, 220, 200, 0.25);
  overflow-y: auto;
  @media screen and (max-width: 700px) {
    min-width: 300px;
    width: calc(100% - 20px);
    margin-left: 0;
  }
`;

const CloseButton = styled.a`
  position: absolute;
  color: ${theme.white};
  right: 20px;
  top: 10px;
  padding: 5px;
  text-decoration: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
`;

const SubmitBtn = styled.button`
  text-decoration: none;
  background-color: ${theme.mainNeon};
  height: 50px;
  border-radius: 15px;
  border-color: ${theme.darkGray};
  width: 200px;
  font-weight: bold;
  margin-bottom: 26px;
`;
const Label = styled.label`
  color: ${theme.white};
`;
const HeaderCotainer = styled.div``;
const HeaderText = styled.h1`
  color: ${theme.white};
  font-size: 24px;
`;
const ConsentContainer = styled.div``;
type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

function LandingFormModal({isOpen, handleClose}: Props) {
  const [formData, setFormData] = useState({
    name: '',
    festival: '',
    email: '',
    message: '',
  });
  const formRef = useRef<HTMLFormElement | null>(null);
  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setFormData(prevData => ({...prevData, [name]: value}));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current && serviceId && templateId && public_Key) {
      try {
        await emailjs.sendForm(
          serviceId,
          templateId,
          formRef.current,
          public_Key,
        );
        toast.success('Email successfully sent!');
        handleClose();
      } catch (error: unknown) {
        toast.error('Error sending email.');
        if (typeof error === 'object' && error !== null && 'text' in error) {
          console.log('Error sending email:', (error as {text: string}).text);
        } else {
          console.log('Error sending email:', error);
        }
      }
    } else {
      console.log('Form reference is null');
    }
  };
  return (
    <React.Fragment>
      {isOpen && (
        <ModalBackground>
          <Wrapper>
            <ModalContent>
              <CloseButton
                onClick={() => {
                  handleClose();
                }}>
                <FontAwesomeIcon icon={faX} />
              </CloseButton>
              <Form ref={formRef} onSubmit={handleSubmit}>
                <HeaderCotainer>
                  <HeaderText>
                    Discover more about what Earthmera can provide!
                  </HeaderText>
                </HeaderCotainer>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                />

                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
                <Label>Festival Name</Label>
                <Input
                  type="text"
                  name="festival"
                  value={formData.festival}
                  onChange={handleChange}
                  placeholder="Festival Name"
                  required
                />
                <Label>Message</Label>
                <Textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Reach out for an exclusive 50% partner discount!"
                  required
                />
                <ConsentContainer></ConsentContainer>
                <SubmitBtn data-l10n-id="partnership-submit">Submit</SubmitBtn>
              </Form>
            </ModalContent>
          </Wrapper>
        </ModalBackground>
      )}
    </React.Fragment>
  );
}

export default LandingFormModal;
