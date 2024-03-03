// model
// Define the Policy entity
// model Policy {
//     id             Int      @id @default(autoincrement())
//     number         String   @unique
//     startDate      DateTime
//     endDate        DateTime
//     premium        Float
//     // Add other relevant policy details
//     companyId      Int
//     employeeId     Int
//     company        Company @relation(fields: [companyId], references: [id])
//     employee       Employee @relation(fields: [employeeId], references: [id])
//     coverages      Coverage[]
//   } 

import { builder } from '../builder'
import { prisma } from '../db'

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
