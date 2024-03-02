import { builder } from '../builder'
import { prisma } from '../db'

builder.prismaObject('Company', {
  fields: (t) => ({
    id: t.exposeInt('id'),
    name: t.exposeString('name'),
    address: t.exposeString('address'),
    employees: t.relation('employees'),
  }),
})

const CompanyCreateInput = builder.inputType('CompanyCreateInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    address: t.string({ required: true }),
  }),
})

builder.queryFields((t) => ({
  allCompany: t.prismaField({
    type: ['Company'],
    resolve: (query) => prisma.company.findMany({ ...query }),
  }),
}))

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
}))