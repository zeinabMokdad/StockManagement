CREATE TABLE [dbo].[Product] (
    [Id]         BIGINT          IDENTITY (1, 1) NOT NULL,
    [Name]       NVARCHAR (255)  NOT NULL,
    [Barcode]    NVARCHAR (255)  NOT NULL,
    [Price]      DECIMAL (20, 4) NOT NULL,
    [CurrencyId] INT             NOT NULL,
    [Quantity]   INT             NOT NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE UNIQUE NONCLUSTERED INDEX [IX_Product_Barcode]
    ON [dbo].[Product]([Barcode] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_Product_Name]
    ON [dbo].[Product]([Name] ASC);

