import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useClock from '../../hooks/useClock';

Clock.propTypes = {};

function Clock() {
    const { timeString } = useClock();
    return (
        <p style={{ fontSize: "45px" }}>{timeString}</p>
    );
}

export default Clock;