import { builder } from '../builder'
import { prisma } from '../db'

// Define the Company type
builder.prismaObject('Company', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    address: t.exposeString('address'),
    employees: t.relation('employees'),
  }),
})

// Define the CompanyCreateInput type
const CompanyCreateInput = builder.inputType('CompanyCreateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    address: t.string({ required: true }),
  }),
})

// Define query resolvers for the Company type
builder.queryFields((t) => ({
  allCompany: t.prismaField({
    type: ['Company'],
    resolve: (query) => prisma.company.findMany({ ...query }),
  }),
}))

// Define mutation resolvers for the Company type
builder.mutationFields((t) => ({
  createCompany: t.prismaField({
    type: 'Company',
    args: {
      data: t.arg({
        type: CompanyCreateInput,
        required: true,
      }),
    },
    resolve: (query, parent, args) => {
      return prisma.company.create({
        ...query,
        data: {
          name: args.data.name,
          address: args.data.address,
        },
      })
    },
  }),
  deleteCompany: t.prismaField({
    type: 'Company',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: (query, parent, args) => {
      return prisma.company.delete({
        ...query,
        where: { id: args.id },
      })
    },
  }),
}))