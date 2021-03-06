
const isEmpty = function (value) {
    return !value || value.length === 0;
};

const updateObject = (oldObject, updatedValue) => {
    return {
        ...oldObject,
        ...updatedValue
    }
};

// fetched from https://stackoverflow.com/questions/1026069/how-do-i-make-the-first-letter-of-a-string-uppercase-in-javascript
const capitalizeEveryFirstChar = (str) => {
    return str.replace(/\b\w/g, v => v.toUpperCase())
}

const getFormatedDate = (stringDate) => {
    return new Date(stringDate).toLocaleString("en-GB", {
        month: "short",
        day: "numeric",
        year: "2-digit"
    })
}

const showTextColor = (amount) => {
    return amount >= 0 ? "text-success" : "text-danger";
}


export default {
    isEmpty,
    updateObject,
    capitalizeEveryFirstChar,
    getFormatedDate,
    showTextColor
};

