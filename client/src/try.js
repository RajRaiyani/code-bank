import React, { useState } from 'react';
import './index.css'

function Try() {
    const [isChecked, setIsChecked] = useState(false);

    function handleCheckboxChange(event) {
        setIsChecked(event.target.value);
    }

    return (
        <div>
            <label>
                <input
                    type="radio"

                    value="admin"
                    name="try"
                    onChange={handleCheckboxChange}
                    class="btn btn btn-secondary"
                />
                <b>admin</b>

                <input
                    type="radio"
                    value="user"
                    name="try"
                    onChange={handleCheckboxChange}
                />
                <b>user</b>



            </label>
            <p>here is {isChecked}</p>
        </div>

    );
}

export default Try;
