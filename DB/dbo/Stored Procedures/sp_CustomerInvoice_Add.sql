CREATE PROCEDURE [dbo].[sp_CustomerInvoice_Add]
@CustomerId bigint = null,
@Products nvarchar(max)

AS
BEGIN
	INSERT INTO [CustomerInvoice] (CustomerID, [Products])
	VALUES (@CustomerId, @Products)
END