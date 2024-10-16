import React from 'react';
import style from './registerFormSelect.module.css';

const RegisterFormSelect = ({ name, value, onChange, required, children }) => {
    return (
        <select
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            className={`${value === "" ? style.placeholder : style.selectBorder} ${style.select}`}
            required={required}
        >
            {children}
        </select>
    );
};

export default RegisterFormSelect;
