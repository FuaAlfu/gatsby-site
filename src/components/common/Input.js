import styled from 'styled-components';

export const Input = styled.input`
background: #fde8cd;
display: block;
width: 100%;
padding:8px;
font-size: 14px;
margin-bottom: 8px;
border-radius: 4px;
border: 1px solid #ddd;
box-shadow: none;

&:focus, &:active{
    /* border: 1px solid rebeccapurple; */
    border: 1px solid #433520;
}
`;