import React, { useState } from 'react';
import PropTypes from 'prop-types';

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
};

TodoForm.defaultProps = {
    onSubmit: null,
}

function TodoForm(props) {
    const { onSubmit } = props;
    const [value, setValue] = useState('')

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!onSubmit) return;

        const formValues = {
            title: value,
        }

        onSubmit(formValues);

        setValue('');
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} />
        </form>
    );
}

export default TodoForm;