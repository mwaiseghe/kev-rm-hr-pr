import bcrypt from 'bcrypt';
import { validateEmployeeData } from '../validators/employeeValidator.js'; 
import { employees } from './employeeData.js'; 

export const listEmployees = () => {
    return employees;
};

export const getEmployeeById = (employeeID) => {
    return employees.find(emp => emp.EmployeeID === parseInt(employeeID));
};

export const createEmployee = (employeeData) => {
    const { FirstName, LastName, Username, Password } = employeeData;
    const EmployeeID = employees.length > 0 ? employees[employees.length - 1].EmployeeID + 1 : 1;
    const PasswordHash = bcrypt.hashSync(Password, 10);
    const newEmployee = { EmployeeID, FirstName, LastName, Username, PasswordHash };
    employees.push(newEmployee);
    return newEmployee;
};

export const updateEmployee = (employeeID, employeeData) => {
    const employeeIndex = employees.findIndex(emp => emp.EmployeeID === parseInt(employeeID));
    if (employeeIndex === -1) {
        return null; 
    }
    const { FirstName, LastName, Username, Password } = employeeData;
    if (FirstName) employees[employeeIndex].FirstName = FirstName;
    if (LastName) employees[employeeIndex].LastName = LastName;
    if (Username) employees[employeeIndex].Username = Username;
    if (Password) employees[employeeIndex].PasswordHash = bcrypt.hashSync(Password, 10);
    return employees[employeeIndex];
};

export const deleteEmployee = (employeeID) => {
    const employeeIndex = employees.findIndex(emp => emp.EmployeeID === parseInt(employeeID));
    if (employeeIndex === -1) {
        return false; 
    }
    employees.splice(employeeIndex, 1);
    return true;
};
