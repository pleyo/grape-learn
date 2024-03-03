import { builder } from '../builder'
import { prisma } from '../db'

builder.prismaObject('Employee', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    firstname: t.exposeString('firstName'),
    lastname: t.exposeString('lastName'),
    email: t.exposeString('email'),
    company: t.relation('company'),
    policies: t.relation('policies'),
  }),
})

const EmployeeCreateInput = builder.inputType('EmployeeCreateInput', {
    fields: (t) => ({
    firstname: t.string({ required: true }),
    lastname: t.string({ required: true }),
    email: t.string({ required: true }),
    companyId: t.int({ required: true }),
    }),
  })

builder.mutationFields((t) => ({
    createEmployee: t.prismaField({
    type: 'Employee',
    args: {
      data: t.arg({
        type: EmployeeCreateInput,
        required: true,
      }),
    },
    resolve: (query, parent, args) => {
      return prisma.employee.create({
        ...query,
        data: {
            firstName: args.data.firstname,
            lastName: args.data.lastname,
            email: args.data.email,
            company: {
                connect: { id: args.data.companyId },
            },
        },
      })
    },
  }),
  deleteEmployee: t.prismaField({
    type: 'Employee',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (query, parent, args) => {
      return prisma.employee.delete({
        ...query,
        where: { id: args.id },
      })
    },
  }),
}))

builder.queryFields((t) => ({
    allEmployee: t.prismaField({
      type: ['Employee'],
      resolve: (query) => prisma.employee.findMany({ ...query }),
    }),
  }))