# Prisma Schema

## Company Model

### Fields:
- `id`: `Int`
  - Auto-incremented, Primary Key
- `name`: `String`
  - Name of the company
- `address`: `String`
  - Address of the company

### Relationships:
- `employees`: Array of `Employee`
  - Employees associated with the company (Related through foreign key `companyId`)

---

## Employee Model

### Fields:
- `id`: `Int`
  - Auto-incremented, Primary Key
- `firstName`: `String`
  - First name of the employee
- `lastName`: `String`
  - Last name of the employee
- `email`: `String`
  - Email address of the employee
- `companyId`: `Int`
  - Foreign Key referencing `Company`

### Relationships:
- `company`: `Company`
  - Company to which the employee belongs (Related through foreign key `companyId`)
- `policies`: Array of `Policy`
  - Policies associated with the employee (Related through foreign key `employeeId`)

---

## Policy Model

### Fields:
- `id`: `Int`
  - Auto-incremented, Primary Key
- `number`: `String`
  - Unique policy number
- `startDate`: `DateTime`
  - Start date of the policy
- `endDate`: `DateTime`
  - End date of the policy
- `premium`: `Float`
  - Premium amount for the policy
- `coverageId`: `Int`
  - Foreign Key referencing `Coverage`
- `employeeId`: `Int`
  - Foreign Key referencing `Employee`

### Relationships:
- `coverage`: `Coverage`
  - Coverage details associated with the policy (Related through foreign key `coverageId`)
- `employee`: `Employee`
  - Employee to whom the policy belongs (Related through foreign key `employeeId`)

---

## Coverage Model

### Fields:
- `id`: `Int`
  - Auto-incremented, Primary Key
- `type`: `String`
  - Type of coverage
- `description`: `String`
  - Description of the coverage
- `amount`: `Float`
  - Amount covered by the policy for this specific coverage
- `terms`: `String?`
  - Any specific terms or conditions related to the coverage (Optional)

### Relationships:
- `Policy`: Array of `Policy`
  - Policies associated with the coverage (Related through foreign key `coverageId`)
