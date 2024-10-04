-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "complemento" TEXT,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "website" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "descricao" TEXT,
    "areasAtuacao" TEXT NOT NULL,
    "publicoAlvo" TEXT NOT NULL,
    "projetos" TEXT NOT NULL,
    "nomeResponsavel" TEXT NOT NULL,
    "horarioFuncionamento" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Institution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Institution" ("areasAtuacao", "bairro", "cep", "cidade", "cnpj", "complemento", "descricao", "email", "endereco", "estado", "facebook", "horarioFuncionamento", "id", "instagram", "linkedin", "nome", "nomeResponsavel", "numero", "projetos", "publicoAlvo", "rua", "telefone", "userId", "website") SELECT "areasAtuacao", "bairro", "cep", "cidade", "cnpj", "complemento", "descricao", "email", "endereco", "estado", "facebook", "horarioFuncionamento", "id", "instagram", "linkedin", "nome", "nomeResponsavel", "numero", "projetos", "publicoAlvo", "rua", "telefone", "userId", "website" FROM "Institution";
DROP TABLE "Institution";
ALTER TABLE "new_Institution" RENAME TO "Institution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
