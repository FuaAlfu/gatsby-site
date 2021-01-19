import styled from 'styled-components';

export const Button = styled.button`
padding:  8px 1rem;
/* background: rebeccapurple; */
background: #fde8cd;
color: #fff;
border-radius: 4px;
cursor: pointer;
white-space: nowrap;

    /* block coming from a prop inside Button at login.js */
    ${props => props.block ? 'display: block; width: 100%;' : '' }

&:hover{
    /* color: indigo; */
    /* background:#433520; */
    background:#ffcda3;
}
`;