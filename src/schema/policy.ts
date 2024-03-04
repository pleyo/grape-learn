import { builder } from '../builder'
import { prisma } from '../db'

// Define the Policy type
builder.prismaObject('Policy', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        number: t.exposeString('number'),
        startDate: t.expose('startDate', { type: 'DateTime' }),
        endDate: t.expose('endDate', { type: 'DateTime' }),
        premium: t.exposeFloat('premium'),
        company: t.relation('company'),
        employee: t.relation('employee'),
        coverages: t.relation('coverages'),
    }),
})

// Define the mutation resolvers for the Policy type
builder.mutationFields((t) => ({
    extendPolicy: t.prismaField({
    type: 'Policy',
    args: {
        id: t.arg.int({ required: true }),
        endDate: t.arg.string({ required: true }),
      },
    resolve: async (query, parent, args) => {
        const updatedPolicy = await prisma.policy.update({
            ...query,
            where: { id: args.id },
            data: {
                endDate: new Date(args.endDate),
            },
            select: {
                id: true,
                number: true,
                startDate: true,
                endDate: true,
                premium: true,
                companyId: true,
                employeeId: true,
            },
        });

        return updatedPolicy;
    },
  }),
}))
