export const validateEmployeeData = (employeeData) => {
    const { FirstName, LastName, Username, Password } = employeeData;

    if (!FirstName || !LastName || !Username || !Password) {
        return false; 
    }

    return true;
};
