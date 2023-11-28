import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { theme } from '../../../style';
import { useCookies } from 'react-cookie';
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
    background-color: #1e1e1e;
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
  top: 20px;
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
  /* color: ${theme.white}; */
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
const PreviewImage = styled.img`

  width: 500px;
  height: 300px;
  object-fit: contain;
`;
type BlogData = {
    'image': File | null;
    'category': string;
    'date': string;
    'title': string;
    'desc': string;
};
type Props = {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;

};
function BlogModal({ isOpen, setIsOpen }: Props) {
    function formatDate(date: Date): string {
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

        const month = months[date.getMonth()];  // getMonth()는 0부터 시작해서 11까지의 숫자를 반환합니다.
        const day = date.getDate();
        const year = date.getFullYear();

        return `${month} ${day} ${year}`;
    }
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [cookies] = useCookies(['token', 'username']);


    const [formData, setFormData] = useState<BlogData>({
        image: null,
        category: '',
        date: '',
        title: '',
        desc: ''
    });
    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log('file', file)
        if (file) {
            // 이미지를 미리보기하기 위해 URL을 생성
            const imageUrl = URL.createObjectURL(file);
            console.log('imageUrl', imageUrl)
            setPreviewImage(imageUrl);
            const { name } = e.target;
            setFormData(prevData => ({ ...prevData, [name]: file }));
        }
    };
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('formData', formData)
        try {
            const response = await fetch('YOUR_SERVER_ENDPOINT_HERE', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.token}`, // 토큰을 헤더에 추가
                    'Username': cookies.username // 필요하면 사용자 이름도 헤더에 추가할 수 있습니다.
                },
                body: JSON.stringify(formData)
            });

            if (response.status === 200) {
                console.log("Data sent successfully.");
                setFormData({
                    image: null,
                    category: '',
                    date: '',
                    title: '',
                    desc: ''
                });
            } else {
                console.log("Error sending data.");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };
    return (
        <React.Fragment>
            {isOpen && (
                <ModalBackground>
                    <Wrapper>
                        <ModalContent>
                            <CloseButton onClick={() => setIsOpen(false)}><FontAwesomeIcon icon={faX} /></CloseButton>
                            <Form onSubmit={handleSubmit} id="form">
                                <HeaderCotainer>
                                    <HeaderText>Add New Blog</HeaderText>
                                </HeaderCotainer>
                                <Label>Image</Label>
                                {previewImage && <PreviewImage src={previewImage} alt="Preview" />}
                                <Input type="file"
                                    name="image"
                                    onChange={handleImageChange}
                                    required />
                                <Label>Category</Label>
                                <Input type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="category"
                                    required />
                                <Label>Date</Label>
                                <Input type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required />
                                <Label>Title</Label>
                                <Input type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    required />
                                <Label>Description</Label>
                                <textarea cols={30} rows={5} name="desc"
                                    value={formData.desc}
                                    onChange={handleChange}
                                    placeholder="Your description"
                                    form='form'
                                />
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

export default BlogModal;
