/*
  Warnings:

  - You are about to drop the column `teste` on the `notasfiscais` table. All the data in the column will be lost.
  - You are about to drop the column `fornecedorId` on the `produtos` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `produtos` DROP FOREIGN KEY `produtos_fornecedorId_fkey`;

-- AlterTable
ALTER TABLE `notasfiscais` DROP COLUMN `teste`;

-- AlterTable
ALTER TABLE `produtos` DROP COLUMN `fornecedorId`;

-- CreateTable
CREATE TABLE `itensnotafiscal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `notaFiscalId` INTEGER NOT NULL,
    `produtoId` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `valorUnitario` DECIMAL(12, 2) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FornecedorToProduto` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FornecedorToProduto_AB_unique`(`A`, `B`),
    INDEX `_FornecedorToProduto_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `itensnotafiscal` ADD CONSTRAINT `itensnotafiscal_notaFiscalId_fkey` FOREIGN KEY (`notaFiscalId`) REFERENCES `notasfiscais`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itensnotafiscal` ADD CONSTRAINT `itensnotafiscal_produtoId_fkey` FOREIGN KEY (`produtoId`) REFERENCES `produtos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FornecedorToProduto` ADD CONSTRAINT `_FornecedorToProduto_A_fkey` FOREIGN KEY (`A`) REFERENCES `fornecedores`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FornecedorToProduto` ADD CONSTRAINT `_FornecedorToProduto_B_fkey` FOREIGN KEY (`B`) REFERENCES `produtos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
