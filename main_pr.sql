-- Employees table
CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(100),
    BirthDate DATE,
    ContactInfo VARCHAR(50),
    Gender VARCHAR(10),
    PositionID INT,
    ScheduleID INT,
    PhotoURL VARCHAR(255),
    Email VARCHAR(100) UNIQUE
);

-- User table
CREATE TABLE Users (
    UserID INT PRIMARY KEY,
    EmployeeID INT UNIQUE,
    Username VARCHAR(50) NOT NULL UNIQUE,
    PasswordHash VARCHAR(255) NOT NULL,
    RoleID INT,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID),
    FOREIGN KEY (RoleID) REFERENCES Roles(RoleID)
);

-- Roles table
CREATE TABLE Roles (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(50) NOT NULL UNIQUE
);

-- Attendance table
CREATE TABLE Attendance (
    AttendanceID INT PRIMARY KEY,
    EmployeeID INT,
    Date DATE,
    TimeIn TIME,
    TimeOut TIME,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Overtime table
CREATE TABLE Overtime (
    OvertimeID INT PRIMARY KEY,
    EmployeeID INT,
    Date DATE,
    Hours INT,
    Minutes INT,
    Rate DECIMAL(10, 2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Advance Cash table
CREATE TABLE AdvanceCash (
    AdvanceCashID INT PRIMARY KEY,
    EmployeeID INT,
    Date DATE,
    Amount DECIMAL(10, 2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Schedules table
CREATE TABLE Schedules (
    ScheduleID INT PRIMARY KEY,
    EmployeeID INT,
    StartTime TIME,
    EndTime TIME,
    Days VARCHAR(50),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);

-- Deductions table
CREATE TABLE Deductions (
    DeductionID INT PRIMARY KEY,
    Description VARCHAR(100),
    Amount DECIMAL(10, 2)
);

-- Positions table
CREATE TABLE Positions (
    PositionID INT PRIMARY KEY,
    Title VARCHAR(50)
);

-- Payroll table
CREATE TABLE Payroll (
    PayrollID INT PRIMARY KEY,
    EmployeeID INT,
    GrossPay DECIMAL(10, 2),
    Deductions DECIMAL(10, 2),
    NetPay DECIMAL(10, 2),
    PayrollDate DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID)
);
