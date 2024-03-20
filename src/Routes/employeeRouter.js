import {Router} from 'express';
import { verifyToken } from './AuthMiddleware.js';
import * as EmployeeController from './EmployeeController.js';

const employeeRouter =Router();

// Endpoint to list all employees
employeeRouter.get('/employees', verifyToken, async (req, res) => {
    try {
        const employees = await EmployeeController.listEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to get an employee by ID
employeeRouter.get('/employees/:employeeID', verifyToken, async (req, res) => {
    const { employeeID } = req.params;
    try {
        const employee = await EmployeeController.getEmployeeById(employeeID);
        if (!employee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to create a new employee
employeeRouter.post('/employees', verifyToken, async (req, res) => {
    const employeeData = req.body;
    try {
        const newEmployee = await EmployeeController.createEmployee(employeeData);
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to update an employee by ID
employeeRouter.put('/employees/:employeeID', verifyToken, async (req, res) => {
    const { employeeID } = req.params;
    const employeeData = req.body;
    try {
        const updatedEmployee = await EmployeeController.updateEmployee(employeeID, employeeData);
        if (!updatedEmployee) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json(updatedEmployee);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to delete an employee by ID
employeeRouter.delete('/employees/:employeeID', verifyToken, async (req, res) => {
    const { employeeID } = req.params;
    try {
        const result = await EmployeeController.deleteEmployee(employeeID);
        if (!result) {
            return res.status(404).json({ error: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default employeeRouter;
