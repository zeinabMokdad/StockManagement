CREATE TABLE [dbo].[CustomerInvoice] (
    [Id]          BIGINT        IDENTITY (1, 1) NOT NULL,
    [InvoiceDate] DATETIME      CONSTRAINT [DF_Invoice_InvoiceDate] DEFAULT (getdate()) NOT NULL,
    [CustomerID]  BIGINT        NULL,
    [Products]    VARCHAR (MAX) NOT NULL,
    CONSTRAINT [PK_Invoice] PRIMARY KEY CLUSTERED ([Id] ASC)
);


GO
CREATE NONCLUSTERED INDEX [IX_CustomerInvoice_CustomerId]
    ON [dbo].[CustomerInvoice]([CustomerID] ASC);


GO
CREATE NONCLUSTERED INDEX [IX_CustomerInvoice_InvoiceDate]
    ON [dbo].[CustomerInvoice]([InvoiceDate] ASC);

