import { builder } from '../builder'

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