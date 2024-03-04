import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Sample Company data
  const createdCompanies = await Promise.all([
    prisma.company.upsert({
      where: { id: 1, name: 'SwissCorp1' },
      update: {},
      create: { id: 1, name: 'SwissCorp1', address: '123 Main Street, Zurich' },
    }),
    prisma.company.upsert({
      where: { id: 2, name: 'SwissCorp2' },
      update: {},
      create: { id: 2, name: 'SwissCorp2', address: '456 Market Street, Geneva' },
    }),
    prisma.company.upsert({
      where: { id: 3, name: 'SwissCorp3' },
      update: {},
      create: { id: 3, name: 'SwissCorp3', address: '789 Business Avenue, Basel' },
    }),
  ]);

  // Sample Employee data
  const employeeData = [
    { id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@swisscorp1.com', companyId: createdCompanies[0].id },
    { id: 2, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@swisscorp1.com', companyId: createdCompanies[0].id },
    { id: 3, firstName: 'Bob', lastName: 'Johnson', email: 'bob.johnson@swisscorp2.com', companyId: createdCompanies[1].id },
    { id: 4, firstName: 'Eva', lastName: 'Müller', email: 'eva.muller@swisscorp3.com', companyId: createdCompanies[2].id },
  ];

  const createdEmployees = await Promise.all(
    employeeData.map((employee) =>
      prisma.employee.upsert({
        where: { id: employee.id, email: employee.email },
        update: {},
        create: employee,
      })
    )
  );

  // Sample Coverage data
  const coverageData = [
    { id: 1, type: 'Health', description: 'Basic health coverage', amount: 500.0, terms: 'Covers basic health expenses' },
    { id: 2, type: 'Life', description: 'Life insurance', amount: 100000.0, terms: 'Coverage in case of death' },
    { id: 3, type: 'Dental', description: 'Dental care', amount: 200.0, terms: 'Coverage for dental procedures' },
    { id: 4, type: 'Disability', description: 'Disability coverage', amount: 800.0, terms: 'Monthly disability benefit' },
    { id: 5, type: 'Accident', description: 'Accident insurance', amount: 5000.0, terms: 'Coverage in case of accidents' },
  ];

  const createdCoverages = await Promise.all(
    coverageData.map((coverage) =>
      prisma.coverage.upsert({
        where: { id: coverage.id, type: coverage.type },
        update: {},
        create: coverage,
      })
    )
  );

  // Sample Policy data
  const policyData = [
    { id: 1, number: 'POL-001', startDate: new Date('2023-01-01'), endDate: new Date('2023-12-31'), premium: 1000.0, coverageId: createdCoverages[4].id, employeeId: createdEmployees[0].id },
    { id: 2, number: 'POL-002', startDate: new Date('2023-02-01'), endDate: new Date('2023-11-30'), premium: 1200.0, coverageId: createdCoverages[4].id, employeeId: createdEmployees[1].id },
    { id: 3, number: 'POL-003', startDate: new Date('2023-03-01'), endDate: new Date('2023-10-31'), premium: 900.0, coverageId: createdCoverages[2].id, employeeId: createdEmployees[2].id },
    { id: 4, number: 'POL-004', startDate: new Date('2023-04-01'), endDate: new Date('2023-09-30'), premium: 800.0, coverageId: createdCoverages[3].id, employeeId: createdEmployees[3].id },
    { id: 5, number: 'POL-005', startDate: new Date('2023-04-01'), endDate: new Date('2023-09-30'), premium: 800.0, coverageId: createdCoverages[4].id, employeeId: createdEmployees[3].id },
  ];

  const createdPolicies = await Promise.all(
    policyData.map((policy) =>
      prisma.policy.upsert({
        where: { id: policy.id, number: policy.number },
        update: {},
        create: policy,
      })
    )
  );

  console.log('Seed data inserted successfully!');
}

main()
  .catch(async (e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
