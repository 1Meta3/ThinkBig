import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeight.bold};
  margin-bottom: ${(props) => props.theme.spacing.xl};
  font-size: ${(props) => props.theme.typography.fontSize["3xl"]};
  text-align: center;
`;

const Form = styled.form`
  background: ${(props) => props.theme.colors.surface};
  padding: ${(props) => props.theme.spacing.xl};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  box-shadow: ${(props) => props.theme.shadows.lg};
`;

const FormGroup = styled.div`
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  color: ${(props) => props.theme.colors.text};
  font-weight: ${(props) => props.theme.typography.fontWeight.medium};
  font-size: ${(props) => props.theme.typography.fontSize.base};
`;

const Input = styled.input`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  transition: all 0.2s ease;
  background: ${(props) => props.theme.colors.surface};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textLight};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${(props) => props.theme.spacing.md};
  border: 2px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.typography.fontSize.base};
  transition: all 0.2s ease;
  background: ${(props) => props.theme.colors.surface};
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${(props) => props.theme.colors.primary}20;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background: linear-gradient(
    135deg,
    ${(props) => props.theme.colors.primary},
    ${(props) => props.theme.colors.accent}
  );
  color: white;
  padding: ${(props) => props.theme.spacing.lg};
  border: none;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  font-size: ${(props) => props.theme.typography.fontSize.lg};
  font-weight: ${(props) => props.theme.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: ${(props) => props.theme.shadows.md};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${(props) => props.theme.shadows.lg};
  }

  &:active {
    transform: translateY(0);
  }
`;

const categories = {
  스포츠: ["축구", "야구", "테니스", "탁구"],
  전략게임: ["체스", "장기", "바둑", "보드게임"],
  e스포츠: ["롤", "오버워치", "배그"],
};

const regions = [
  "서울",
  "경기",
  "부산",
  "인천",
  "대구",
  "광주",
  "대전",
  "울산",
];

const CreateMatchForm = ({ addMatch }) => {
  const [form, setForm] = useState({
    title: "",
    region: "",
    subCategory: "",
    thumbnail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMatch = {
      ...form,
      id: Date.now(),
    };

    addMatch(newMatch);
    navigate("/");
  };

  const allSubCategories = Object.values(categories).flat();

  return (
    <Layout>
      <Container>
        <Title>새 경기 등록</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>경기 제목</Label>
            <Input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="예: 주말 축구 리그"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label>지역</Label>
            <Select
              name="region"
              value={form.region}
              onChange={handleChange}
              required
            >
              <option value="">지역을 선택하세요</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>종목</Label>
            <Select
              name="subCategory"
              value={form.subCategory}
              onChange={handleChange}
              required
            >
              <option value="">종목을 선택하세요</option>
              {allSubCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Label>썸네일 이미지 URL (선택사항)</Label>
            <Input
              type="text"
              name="thumbnail"
              value={form.thumbnail}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </FormGroup>

          <SubmitButton type="submit">경기 등록하기</SubmitButton>
        </Form>
      </Container>
    </Layout>
  );
};

export default CreateMatchForm;
