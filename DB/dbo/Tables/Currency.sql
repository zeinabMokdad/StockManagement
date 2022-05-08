CREATE TABLE [dbo].[Currency] (
    [Id]     INT           IDENTITY (1, 1) NOT NULL,
    [Symbol] VARCHAR (50)  NOT NULL,
    [Name]   VARCHAR (255) NULL,
    CONSTRAINT [PK_Currency] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Currency_Name]
    ON [dbo].[Currency]([Name] ASC);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Currency_Symbol]
    ON [dbo].[Currency]([Symbol] ASC);

