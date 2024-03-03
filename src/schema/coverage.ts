
// // Define Coverage entity
// model Coverage {
//     id            Int      @id @default(autoincrement())
//     type          String
//     description   String
//     amount        Float    // Amount covered by the policy for this specific coverage
//     terms         String?  // Any specific terms or conditions related to the coverage
//     // Add other relevant coverage details
//     policyId      Int
//     policy        Policy   @relation(fields: [policyId], references: [id])
//   }
  

import { builder } from '../builder'
import { prisma } from '../db'

builder.prismaObject('Coverage', {
    fields: (t) => ({
        id: t.exposeInt('id'),
        type: t.exposeString('type'),
        description: t.exposeString('description'),
        amount: t.exposeFloat('amount'),
        terms: t.exposeString('terms', {nullable: true }), // Add an empty object as the second argument
        policy: t.relation('policy'),
    }),
})