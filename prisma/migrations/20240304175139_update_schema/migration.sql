/*
  Warnings:

  - You are about to drop the column `policyId` on the `Coverage` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `Policy` table. All the data in the column will be lost.
  - Added the required column `coverageId` to the `Policy` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Coverage" DROP CONSTRAINT "Coverage_policyId_fkey";

-- DropForeignKey
ALTER TABLE "Policy" DROP CONSTRAINT "Policy_companyId_fkey";

-- AlterTable
ALTER TABLE "Coverage" DROP COLUMN "policyId";

-- AlterTable
ALTER TABLE "Policy" DROP COLUMN "companyId",
ADD COLUMN     "coverageId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Policy" ADD CONSTRAINT "Policy_coverageId_fkey" FOREIGN KEY ("coverageId") REFERENCES "Coverage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
