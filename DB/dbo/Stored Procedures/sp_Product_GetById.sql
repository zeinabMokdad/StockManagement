CREATE PROCEDURE [dbo].[sp_Product_GetById]
@Id bigint
AS
BEGIN
	SELECT [Id], [Name], Barcode, Quantity, Price, CurrencyId
	FROM [Product]
	WHERE Id = @Id
END